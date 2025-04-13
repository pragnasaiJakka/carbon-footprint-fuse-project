
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import WalletConnect from '@/components/blockchain/WalletConnect';
import TokenDashboard from '@/components/blockchain/TokenDashboard';
import { setupAccountsChangedListener, setupChainChangedListener } from '@/services/blockchainService';
import { Button } from "@/components/ui/button";
import { LogOut } from 'lucide-react';
import { useToast } from "@/hooks/use-toast";

const Dashboard = () => {
  const navigate = useNavigate();
  const [isWalletConnected, setIsWalletConnected] = useState(false);
  const [walletAddress, setWalletAddress] = useState('');
  const { toast } = useToast();

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
    }

    // Setup wallet listeners
    const removeAccountsListener = setupAccountsChangedListener((accounts) => {
      if (accounts.length === 0) {
        // User disconnected wallet
        setIsWalletConnected(false);
        setWalletAddress('');
        localStorage.removeItem('walletAddress');
      } else {
        // User switched account
        setWalletAddress(accounts[0]);
        localStorage.setItem('walletAddress', accounts[0]);
      }
    });

    const removeChainListener = setupChainChangedListener(() => {
      // Chain changed, refresh the page
      window.location.reload();
    });

    return () => {
      removeAccountsListener();
      removeChainListener();
    };
  }, [navigate]);

  const handleWalletConnect = (address: string) => {
    setIsWalletConnected(true);
    setWalletAddress(address);
    localStorage.setItem('walletAddress', address);
  };

  const handleLogout = () => {
    // Clear user session
    localStorage.removeItem('isLoggedIn');
    localStorage.removeItem('walletAddress');
    
    // Reset states
    setIsWalletConnected(false);
    setWalletAddress('');
    
    // Show toast notification
    toast({
      title: "Logged out",
      description: "You have been successfully logged out",
    });
    
    // Navigate to login page
    navigate('/login');
  };

  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      
      <main className="flex-1 container mx-auto px-4 py-8">
        <div className="flex justify-end mb-4">
          <Button 
            variant="outline"
            className="text-eco-forest border-eco-forest hover:bg-eco-forest/10"
            onClick={handleLogout}
          >
            <LogOut className="mr-2 h-4 w-4" />
            Logout
          </Button>
        </div>
        
        {isWalletConnected ? (
          <TokenDashboard walletAddress={walletAddress} />
        ) : (
          <Card className="max-w-md mx-auto shadow-lg border-eco-blue-light">
            <CardHeader>
              <CardTitle className="text-xl text-eco-forest">Connect Your Wallet</CardTitle>
              <CardDescription>
                Connect your wallet to access the carbon credit marketplace
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <p className="text-muted-foreground">
                Your wallet allows you to securely store, trade, and redeem carbon credits.
                Connect with MetaMask or another compatible wallet to get started.
              </p>
              <WalletConnect onConnect={handleWalletConnect} />
            </CardContent>
          </Card>
        )}
      </main>
      
      <Footer />
    </div>
  );
};

export default Dashboard;
