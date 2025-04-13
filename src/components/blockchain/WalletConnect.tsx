
import React, { useState } from 'react';
import { Button } from "@/components/ui/button";
import { Wallet, AlertCircle } from 'lucide-react';
import { connectWallet } from '@/services/blockchainService';
import { useToast } from '@/hooks/use-toast';

interface WalletConnectProps {
  onConnect: (address: string) => void;
  className?: string;
}

const WalletConnect: React.FC<WalletConnectProps> = ({ onConnect, className }) => {
  const [isConnecting, setIsConnecting] = useState(false);
  const { toast } = useToast();

  const handleConnect = async () => {
    setIsConnecting(true);
    try {
      const address = await connectWallet();
      onConnect(address);
      toast({
        title: "Wallet Connected",
        description: `Successfully connected to ${address.substring(0, 6)}...${address.substring(address.length - 4)}`,
      });
    } catch (error: any) {
      console.error('Failed to connect wallet:', error);
      toast({
        title: "Connection Failed",
        description: error.message || "Failed to connect wallet. Please make sure MetaMask is installed.",
        variant: "destructive",
      });
      
      // Fallback for demo purposes
      const mockAddress = '0x742d35Cc6634C0532925a3b844Bc454e4438f44e';
      onConnect(mockAddress);
      toast({
        title: "Demo Mode",
        description: "Connected to simulated wallet for demo purposes",
      });
    } finally {
      setIsConnecting(false);
    }
  };

  return (
    <Button 
      className={className || "w-full bg-eco-green hover:bg-eco-green-dark text-white"}
      onClick={handleConnect}
      disabled={isConnecting}
    >
      <Wallet className="mr-2 h-4 w-4" />
      {isConnecting ? "Connecting..." : "Connect Wallet"}
    </Button>
  );
};

export default WalletConnect;
