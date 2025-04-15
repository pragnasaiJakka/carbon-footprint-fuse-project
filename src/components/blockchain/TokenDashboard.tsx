
import React, { useState, useEffect } from 'react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import TokenBalance from './TokenBalance';
import EcoActivityForm from './EcoActivityForm';
import Marketplace from './Marketplace';
import Rewards from './Rewards';
import Collaborations from './Collaborations';
import { getTokenBalance } from '@/services/blockchainService';

interface TokenDashboardProps {
  walletAddress: string;
}

const TokenDashboard: React.FC<TokenDashboardProps> = ({ walletAddress }) => {
  const [tokenBalance, setTokenBalance] = useState(0);
  const [refreshTrigger, setRefreshTrigger] = useState(0);
  
  useEffect(() => {
    const fetchBalance = async () => {
      if (walletAddress) {
        // Get balance from localStorage first for immediate feedback
        const localBalance = parseFloat(localStorage.getItem('tokenBalance') || '0');
        setTokenBalance(localBalance);
        
        try {
          // Try to get from blockchain
          const balance = await getTokenBalance(walletAddress);
          if (balance > 0) {
            setTokenBalance(balance);
            // Update localStorage if blockchain value is valid
            localStorage.setItem('tokenBalance', balance.toString());
          }
        } catch (error) {
          console.error('Error fetching token balance:', error);
          // Already set from localStorage above
        }
      }
    };
    
    fetchBalance();
  }, [walletAddress, refreshTrigger]);
  
  const handleRefresh = () => {
    // Increment refresh trigger to force useEffect to run again
    setRefreshTrigger(prev => prev + 1);
  };

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2">
          <Card className="shadow-md border-eco-blue-light">
            <CardHeader>
              <CardTitle className="text-xl text-eco-forest">Carbon Credit Dashboard</CardTitle>
              <CardDescription>Manage your carbon credits on the blockchain</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="flex flex-col md:flex-row items-center justify-between p-4 bg-eco-green/5 rounded-md mb-4">
                <div>
                  <h3 className="text-lg font-semibold text-eco-forest">Connected Wallet</h3>
                  <p className="text-sm text-muted-foreground font-mono">
                    {walletAddress.substring(0, 6)}...{walletAddress.substring(walletAddress.length - 4)}
                  </p>
                </div>
                <div className="mt-4 md:mt-0">
                  <Button 
                    variant="outline" 
                    className="border-eco-green text-eco-green hover:bg-eco-green/10"
                    onClick={handleRefresh}
                  >
                    Refresh Data
                  </Button>
                </div>
              </div>
              
              <TokenBalance 
                address={walletAddress} 
                refreshTrigger={refreshTrigger} 
              />
            </CardContent>
          </Card>
        </div>
        
        <div>
          <EcoActivityForm 
            walletAddress={walletAddress} 
            onSubmitSuccess={handleRefresh}
          />
        </div>
      </div>
      
      <Tabs defaultValue="marketplace" className="w-full">
        <TabsList className="grid w-full grid-cols-4">
          <TabsTrigger value="marketplace">Marketplace</TabsTrigger>
          <TabsTrigger value="rewards">Rewards</TabsTrigger>
          <TabsTrigger value="collaborations">Collaborations</TabsTrigger>
          <TabsTrigger value="network">Network</TabsTrigger>
        </TabsList>
        
        <TabsContent value="marketplace" className="mt-4">
          <Marketplace 
            walletAddress={walletAddress}
            tokenBalance={tokenBalance}
            onTransactionComplete={handleRefresh}
          />
        </TabsContent>
        <TabsContent value="rewards" className="mt-4">
          <Rewards 
            walletAddress={walletAddress}
            tokenBalance={tokenBalance}
            onRedemption={handleRefresh}
          />
        </TabsContent>
        
        <TabsContent value="collaborations" className="mt-4">
          <Collaborations 
            walletAddress={walletAddress}
            tokenBalance={tokenBalance}
          />
        </TabsContent>
        
        <TabsContent value="network" className="mt-4">
          <Card>
            <CardHeader>
              <CardTitle>Blockchain Network Details</CardTitle>
              <CardDescription>Your current network and transaction overview</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div>
                  <strong>Network:</strong> Polygon Mumbai Testnet
                </div>
                <div>
                  <strong>Connected Wallet:</strong> {walletAddress}
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default TokenDashboard;
