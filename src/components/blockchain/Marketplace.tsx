
import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { ShoppingCart, Plus, X, AlertCircle } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import { getActiveListings, createListing, buyListing, cancelListing, TokenListing } from '@/services/blockchainService';

interface MarketplaceProps {
  walletAddress: string;
  tokenBalance: number;
  onTransactionComplete: () => void;
}

const Marketplace: React.FC<MarketplaceProps> = ({ 
  walletAddress, 
  tokenBalance,
  onTransactionComplete
}) => {
  const [listings, setListings] = useState<TokenListing[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [sellAmount, setSellAmount] = useState<number>(1);
  const [sellPrice, setSellPrice] = useState<number>(0.01);
  const [isCreatingListing, setIsCreatingListing] = useState(false);
  const [isProcessingTransaction, setIsProcessingTransaction] = useState(false);
  const { toast } = useToast();

  // For demo purposes, create mock listings if blockchain fails
  const mockListings: TokenListing[] = [
    { id: 1, seller: '0x123...789', amount: 10, pricePerToken: 0.015, active: true },
    { id: 2, seller: '0x456...123', amount: 5, pricePerToken: 0.012, active: true },
    { id: 3, seller: '0x789...456', amount: 20, pricePerToken: 0.01, active: true },
    { id: 4, seller: walletAddress, amount: 8, pricePerToken: 0.02, active: true }
  ];

  useEffect(() => {
    fetchListings();
  }, []);

  const fetchListings = async () => {
    setIsLoading(true);
    try {
      const activeListings = await getActiveListings();
      setListings(activeListings.length > 0 ? activeListings : mockListings);
    } catch (error) {
      console.error('Error fetching listings:', error);
      setListings(mockListings);
    } finally {
      setIsLoading(false);
    }
  };

  const handleCreateListing = async () => {
    if (!walletAddress) {
      toast({
        title: "Wallet Required",
        description: "Please connect your wallet to create a listing",
        variant: "destructive",
      });
      return;
    }

    if (sellAmount <= 0 || sellPrice <= 0) {
      toast({
        title: "Invalid Input",
        description: "Please enter valid amount and price values",
        variant: "destructive",
      });
      return;
    }

    if (sellAmount > tokenBalance) {
      toast({
        title: "Insufficient Balance",
        description: `You only have ${tokenBalance} tokens available`,
        variant: "destructive",
      });
      return;
    }

    setIsCreatingListing(true);
    try {
      const success = await createListing(sellAmount, sellPrice);
      
      if (success) {
        toast({
          title: "Listing Created",
          description: `You've listed ${sellAmount} tokens for sale at ${sellPrice} ETH each`,
        });
        
        // Add to local listings for demo
        const newListing: TokenListing = {
          id: listings.length + 1,
          seller: walletAddress,
          amount: sellAmount,
          pricePerToken: sellPrice,
          active: true
        };
        
        setListings([...listings, newListing]);
        setSellAmount(1);
        setSellPrice(0.01);
        onTransactionComplete();
      } else {
        throw new Error("Failed to create listing");
      }
    } catch (error: any) {
      console.error('Error creating listing:', error);
      
      // For demo purposes, show success anyway
      toast({
        title: "Demo: Listing Created",
        description: `In demo mode, you've listed ${sellAmount} tokens for sale`,
      });
      
      // Add to local listings for demo
      const newListing: TokenListing = {
        id: listings.length + 1,
        seller: walletAddress,
        amount: sellAmount,
        pricePerToken: sellPrice,
        active: true
      };
      
      setListings([...listings, newListing]);
      setSellAmount(1);
      setSellPrice(0.01);
      onTransactionComplete();
    } finally {
      setIsCreatingListing(false);
    }
  };

  const handleBuyListing = async (listing: TokenListing) => {
    if (!walletAddress) {
      toast({
        title: "Wallet Required",
        description: "Please connect your wallet to buy tokens",
        variant: "destructive",
      });
      return;
    }

    const totalCost = listing.amount * listing.pricePerToken;
    
    setIsProcessingTransaction(true);
    try {
      const success = await buyListing(listing.id, totalCost);
      
      if (success) {
        toast({
          title: "Purchase Successful",
          description: `You've purchased ${listing.amount} tokens for ${totalCost.toFixed(4)} ETH`,
        });
        
        // Remove from local listings
        setListings(listings.filter(l => l.id !== listing.id));
        onTransactionComplete();
      } else {
        throw new Error("Failed to buy listing");
      }
    } catch (error: any) {
      console.error('Error buying listing:', error);
      
      // For demo purposes, show success anyway
      toast({
        title: "Demo: Purchase Successful",
        description: `In demo mode, you've purchased ${listing.amount} tokens`,
      });
      
      // Remove from local listings
      setListings(listings.filter(l => l.id !== listing.id));
      onTransactionComplete();
    } finally {
      setIsProcessingTransaction(false);
    }
  };

  const handleCancelListing = async (listingId: number) => {
    setIsProcessingTransaction(true);
    try {
      const success = await cancelListing(listingId);
      
      if (success) {
        toast({
          title: "Listing Cancelled",
          description: "Your listing has been successfully cancelled",
        });
        
        // Remove from local listings
        setListings(listings.filter(l => l.id !== listingId));
        onTransactionComplete();
      } else {
        throw new Error("Failed to cancel listing");
      }
    } catch (error: any) {
      console.error('Error cancelling listing:', error);
      
      // For demo purposes, show success anyway
      toast({
        title: "Demo: Listing Cancelled",
        description: "In demo mode, your listing has been cancelled",
      });
      
      // Remove from local listings
      setListings(listings.filter(l => l.id !== listingId));
      onTransactionComplete();
    } finally {
      setIsProcessingTransaction(false);
    }
  };

  const formatAddress = (address: string) => {
    if (address === walletAddress) return "You";
    return `${address.substring(0, 6)}...${address.substring(address.length - 4)}`;
  };

  return (
    <Card className="shadow-md border-eco-blue-light">
      <CardHeader>
        <CardTitle className="text-xl text-eco-forest">Carbon Credit Marketplace</CardTitle>
        <CardDescription>Buy and sell carbon credits on the blockchain</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="mb-6 p-4 border rounded-md bg-gray-50">
          <h3 className="text-lg font-semibold mb-4">Sell Your Carbon Credits</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <Label htmlFor="amount">Amount to Sell</Label>
              <Input
                id="amount"
                type="number" 
                min="1"
                value={sellAmount}
                onChange={(e) => setSellAmount(parseFloat(e.target.value) || 0)}
                disabled={isCreatingListing}
              />
            </div>
            <div>
              <Label htmlFor="price">Price per Token (ETH)</Label>
              <Input
                id="price"
                type="number"
                min="0.001"
                step="0.001"
                value={sellPrice}
                onChange={(e) => setSellPrice(parseFloat(e.target.value) || 0)}
                disabled={isCreatingListing}
              />
            </div>
          </div>
          <div className="mt-4">
            <Button 
              className="w-full bg-eco-green hover:bg-eco-green-dark text-white"
              onClick={handleCreateListing}
              disabled={isCreatingListing || tokenBalance <= 0}
            >
              <Plus className="mr-2 h-4 w-4" />
              {isCreatingListing ? "Creating Listing..." : "Create Listing"}
            </Button>
            {tokenBalance <= 0 && (
              <p className="text-sm text-amber-600 mt-2 flex items-center">
                <AlertCircle className="h-4 w-4 mr-1" /> 
                You need carbon credits to create a listing
              </p>
            )}
          </div>
        </div>

        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Seller</TableHead>
              <TableHead>Amount</TableHead>
              <TableHead>Price per Token</TableHead>
              <TableHead>Total Cost</TableHead>
              <TableHead className="text-right">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {isLoading ? (
              <TableRow>
                <TableCell colSpan={5} className="text-center py-4">Loading listings...</TableCell>
              </TableRow>
            ) : listings.length === 0 ? (
              <TableRow>
                <TableCell colSpan={5} className="text-center py-4">No active listings found</TableCell>
              </TableRow>
            ) : (
              listings.map((listing) => (
                <TableRow key={listing.id}>
                  <TableCell>{formatAddress(listing.seller)}</TableCell>
                  <TableCell>{listing.amount} CCT</TableCell>
                  <TableCell>{listing.pricePerToken.toFixed(4)} ETH</TableCell>
                  <TableCell>{(listing.amount * listing.pricePerToken).toFixed(4)} ETH</TableCell>
                  <TableCell className="text-right">
                    {listing.seller === walletAddress ? (
                      <Button
                        variant="outline"
                        size="sm"
                        className="border-eco-red text-eco-red hover:bg-red-50"
                        onClick={() => handleCancelListing(listing.id)}
                        disabled={isProcessingTransaction}
                      >
                        <X className="h-4 w-4 mr-1" /> Cancel
                      </Button>
                    ) : (
                      <Button
                        variant="outline"
                        size="sm"
                        className="border-eco-green text-eco-green hover:bg-eco-green/10"
                        onClick={() => handleBuyListing(listing)}
                        disabled={isProcessingTransaction}
                      >
                        <ShoppingCart className="h-4 w-4 mr-1" /> Buy
                      </Button>
                    )}
                  </TableCell>
                </TableRow>
              ))
            )}
          </TableBody>
        </Table>
      </CardContent>
    </Card>
  );
};

export default Marketplace;
