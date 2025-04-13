
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { HoverCard, HoverCardContent, HoverCardTrigger } from "@/components/ui/hover-card";
import { Wallet, ArrowUpDown, Leaf, Info, TrendingUp, TrendingDown } from 'lucide-react';
import { toast } from "@/components/ui/use-toast";

// Mock carbon credit data
const carbonCredits = [
  { id: 1, name: "Rainforest Conservation", vintage: "2024", price: 12.5, amount: 100, score: 95, type: "Avoidance" },
  { id: 2, name: "Wind Farm Project", vintage: "2023", price: 9.8, amount: 250, score: 88, type: "Reduction" },
  { id: 3, name: "Solar Energy Initiative", vintage: "2024", price: 11.2, amount: 180, score: 92, type: "Reduction" },
  { id: 4, name: "Reforestation Program", vintage: "2023", price: 14.5, amount: 75, score: 97, type: "Removal" },
  { id: 5, name: "Ocean Cleanup Project", vintage: "2023", price: 10.9, amount: 120, score: 85, type: "Removal" },
];

// Price history for chart
const priceHistory = [
  { date: "Jan", price: 9.2 },
  { date: "Feb", price: 9.8 },
  { date: "Mar", price: 10.5 },
  { date: "Apr", price: 11.2 },
  { date: "May", price: 12.1 },
  { date: "Jun", price: 11.8 },
];

const Dashboard = () => {
  const navigate = useNavigate();
  const [isWalletConnected, setIsWalletConnected] = useState(false);
  const [walletAddress, setWalletAddress] = useState('');
  const [balance, setBalance] = useState(0);
  const [selectedCredit, setSelectedCredit] = useState<typeof carbonCredits[0] | null>(null);
  const [purchaseAmount, setPurchaseAmount] = useState(1);

  useEffect(() => {
    // Check if user is logged in
    const isLoggedIn = localStorage.getItem('isLoggedIn');
    if (!isLoggedIn) {
      navigate('/login');
    }
    
    // Check if wallet is already connected
    const connectedWallet = localStorage.getItem('walletAddress');
    if (connectedWallet) {
      setIsWalletConnected(true);
      setWalletAddress(connectedWallet);
      setBalance(parseFloat(localStorage.getItem('walletBalance') || '1000'));
    }
  }, [navigate]);

  const connectWallet = async () => {
    // Simulate wallet connection (replace with actual wallet connection)
    try {
      // Check if window.ethereum is available (MetaMask or similar)
      if (typeof window.ethereum !== 'undefined') {
        console.log('MetaMask is installed!');
        
        // Request wallet connection
        const accounts = await window.ethereum.request({ method: 'eth_requestAccounts' });
        const account = accounts[0];
        
        setWalletAddress(account);
        setIsWalletConnected(true);
        
        // Set mock balance
        const mockBalance = 1000; // USDC or similar
        setBalance(mockBalance);
        
        // Store to localStorage
        localStorage.setItem('walletAddress', account);
        localStorage.setItem('walletBalance', mockBalance.toString());
        
        toast({
          title: "Wallet Connected",
          description: `Successfully connected to ${account.substring(0, 6)}...${account.substring(account.length - 4)}`,
        });
      } else {
        toast({
          title: "Wallet Not Found",
          description: "Please install MetaMask or another web3 wallet",
          variant: "destructive",
        });
      }
    } catch (error) {
      console.error('Error connecting wallet:', error);
      
      // Fallback for demo (simulated wallet)
      const mockAddress = '0x742d35Cc6634C0532925a3b844Bc454e4438f44e';
      setWalletAddress(mockAddress);
      setIsWalletConnected(true);
      setBalance(1000);
      
      localStorage.setItem('walletAddress', mockAddress);
      localStorage.setItem('walletBalance', '1000');
      
      toast({
        title: "Demo Mode",
        description: "Connected to simulated wallet for demo purposes",
      });
    }
  };

  const disconnectWallet = () => {
    setIsWalletConnected(false);
    setWalletAddress('');
    setBalance(0);
    localStorage.removeItem('walletAddress');
    localStorage.removeItem('walletBalance');
    
    toast({
      title: "Wallet Disconnected",
      description: "Your wallet has been disconnected",
    });
  };

  const handleBuy = (credit: typeof carbonCredits[0]) => {
    setSelectedCredit(credit);
  };

  const confirmPurchase = () => {
    if (!selectedCredit) return;
    
    const totalCost = selectedCredit.price * purchaseAmount;
    
    if (totalCost > balance) {
      toast({
        title: "Insufficient Balance",
        description: "You don't have enough funds to complete this purchase",
        variant: "destructive",
      });
      return;
    }
    
    // Update balance
    const newBalance = balance - totalCost;
    setBalance(newBalance);
    localStorage.setItem('walletBalance', newBalance.toString());
    
    toast({
      title: "Purchase Successful",
      description: `You've purchased ${purchaseAmount} credits of ${selectedCredit.name}`,
    });
    
    setSelectedCredit(null);
  };

  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      
      <main className="flex-1 container mx-auto px-4 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">
          <Card className="lg:col-span-2 shadow-md border-eco-blue-light">
            <CardHeader>
              <CardTitle className="text-xl text-eco-forest">Carbon Market Overview</CardTitle>
              <CardDescription>Current carbon credit prices and trends</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="h-64 w-full">
                {/* Price chart would go here - simplified for this example */}
                <div className="h-full w-full bg-gray-50 rounded-md flex items-center justify-center">
                  <div className="text-center">
                    <p className="text-muted-foreground">Carbon Credit Price Trend ($/ton)</p>
                    <div className="flex items-end justify-center h-32 gap-3 mt-4">
                      {priceHistory.map((data, i) => (
                        <div key={i} className="flex flex-col items-center">
                          <div 
                            className="w-10 bg-eco-green rounded-t-sm" 
                            style={{ height: `${data.price * 8}px` }}
                          ></div>
                          <p className="text-xs mt-1">{data.date}</p>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
          
          <Card className="shadow-md border-eco-green-light">
            <CardHeader>
              <CardTitle className="text-xl text-eco-forest">Wallet</CardTitle>
              <CardDescription>Connect your wallet to trade carbon credits</CardDescription>
            </CardHeader>
            <CardContent>
              {isWalletConnected ? (
                <div className="space-y-4">
                  <div className="p-4 border rounded-md bg-gray-50">
                    <p className="text-sm text-muted-foreground">Connected Address</p>
                    <p className="font-mono text-sm truncate">{walletAddress}</p>
                  </div>
                  
                  <div className="p-4 border rounded-md bg-gray-50">
                    <p className="text-sm text-muted-foreground">Balance</p>
                    <p className="text-2xl font-bold text-eco-forest">${balance.toFixed(2)}</p>
                  </div>
                  
                  <Button 
                    variant="outline" 
                    className="w-full border-eco-red text-eco-red hover:bg-red-50"
                    onClick={disconnectWallet}
                  >
                    Disconnect Wallet
                  </Button>
                </div>
              ) : (
                <div className="space-y-4">
                  <p className="text-center text-muted-foreground">Connect your wallet to start trading carbon credits</p>
                  <Button 
                    className="w-full bg-eco-green hover:bg-eco-green-dark text-white"
                    onClick={connectWallet}
                  >
                    <Wallet className="mr-2 h-4 w-4" />
                    Connect Wallet
                  </Button>
                </div>
              )}
            </CardContent>
          </Card>
        </div>
        
        <Card className="shadow-md border-eco-blue-light mb-8">
          <CardHeader className="flex flex-row items-center justify-between">
            <div>
              <CardTitle className="text-xl text-eco-forest">Carbon Credits Marketplace</CardTitle>
              <CardDescription>Browse and purchase verified carbon credits</CardDescription>
            </div>
            <HoverCard>
              <HoverCardTrigger asChild>
                <Button variant="ghost" size="icon">
                  <Info className="h-4 w-4" />
                </Button>
              </HoverCardTrigger>
              <HoverCardContent className="w-80">
                <div className="space-y-2">
                  <h4 className="text-sm font-semibold">About Carbon Credits</h4>
                  <p className="text-sm">
                    Carbon credits represent one metric ton of carbon dioxide 
                    equivalent that is either removed from the atmosphere or 
                    prevented from being emitted.
                  </p>
                  <p className="text-sm">
                    The quality score is based on verification standards, permanence, 
                    and additional environmental benefits.
                  </p>
                </div>
              </HoverCardContent>
            </HoverCard>
          </CardHeader>
          <CardContent>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Project</TableHead>
                  <TableHead>Vintage</TableHead>
                  <TableHead>Type</TableHead>
                  <TableHead>Quality Score</TableHead>
                  <TableHead>Price ($/ton)</TableHead>
                  <TableHead>Available</TableHead>
                  <TableHead className="text-right">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {carbonCredits.map((credit) => (
                  <TableRow key={credit.id}>
                    <TableCell className="font-medium">
                      <div className="flex items-center">
                        <Leaf className="h-4 w-4 text-eco-green mr-2" />
                        {credit.name}
                      </div>
                    </TableCell>
                    <TableCell>{credit.vintage}</TableCell>
                    <TableCell>{credit.type}</TableCell>
                    <TableCell>
                      <div className="flex items-center">
                        <span className={credit.score >= 90 ? "text-eco-green" : "text-amber-500"}>
                          {credit.score}/100
                        </span>
                      </div>
                    </TableCell>
                    <TableCell>
                      <div className="flex items-center">
                        ${credit.price.toFixed(2)}
                        {Math.random() > 0.5 ? (
                          <TrendingUp className="h-4 w-4 text-eco-green ml-1" />
                        ) : (
                          <TrendingDown className="h-4 w-4 text-amber-500 ml-1" />
                        )}
                      </div>
                    </TableCell>
                    <TableCell>{credit.amount} tons</TableCell>
                    <TableCell className="text-right">
                      <Button 
                        variant="outline" 
                        className="border-eco-green text-eco-green hover:bg-eco-green/10"
                        onClick={() => handleBuy(credit)}
                        disabled={!isWalletConnected}
                      >
                        Buy
                      </Button>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
            
            {selectedCredit && (
              <div className="mt-6 p-4 border rounded-md bg-gray-50">
                <h3 className="text-lg font-semibold mb-4">Purchase Carbon Credits</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <p className="text-sm text-muted-foreground">Project</p>
                    <p className="font-medium">{selectedCredit.name}</p>
                  </div>
                  <div>
                    <p className="text-sm text-muted-foreground">Price per Credit</p>
                    <p className="font-medium">${selectedCredit.price.toFixed(2)}</p>
                  </div>
                  <div>
                    <p className="text-sm text-muted-foreground">Quantity</p>
                    <div className="flex items-center gap-2 mt-1">
                      <Button 
                        variant="outline" 
                        size="sm"
                        onClick={() => setPurchaseAmount(Math.max(1, purchaseAmount - 1))}
                      >
                        -
                      </Button>
                      <span className="px-4">{purchaseAmount}</span>
                      <Button 
                        variant="outline" 
                        size="sm"
                        onClick={() => setPurchaseAmount(Math.min(selectedCredit.amount, purchaseAmount + 1))}
                      >
                        +
                      </Button>
                    </div>
                  </div>
                  <div>
                    <p className="text-sm text-muted-foreground">Total Cost</p>
                    <p className="font-medium text-xl">${(selectedCredit.price * purchaseAmount).toFixed(2)}</p>
                  </div>
                </div>
                <div className="flex gap-2 mt-4">
                  <Button 
                    className="bg-eco-green hover:bg-eco-green-dark text-white"
                    onClick={confirmPurchase}
                  >
                    Confirm Purchase
                  </Button>
                  <Button 
                    variant="outline"
                    onClick={() => setSelectedCredit(null)}
                  >
                    Cancel
                  </Button>
                </div>
              </div>
            )}
          </CardContent>
        </Card>
      </main>
      
      <Footer />
    </div>
  );
};

export default Dashboard;
