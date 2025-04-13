
import React, { useState } from 'react';
import { Button } from "@/components/ui/button";
import { Wallet, AlertCircle, Info } from 'lucide-react';
import { connectWallet } from '@/services/blockchainService';
import { useToast } from '@/hooks/use-toast';
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";

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
    <div>
      <Button 
        className={className || "w-full bg-eco-green hover:bg-eco-green-dark text-white"}
        onClick={handleConnect}
        disabled={isConnecting}
      >
        <Wallet className="mr-2 h-4 w-4" />
        {isConnecting ? "Connecting..." : "Connect Wallet"}
      </Button>
      
      <div className="mt-2 flex justify-center">
        <TooltipProvider>
          <Tooltip>
            <TooltipTrigger asChild>
              <Button variant="ghost" size="icon" className="h-6 w-6 rounded-full">
                <Info className="h-4 w-4 text-muted-foreground" />
                <span className="sr-only">Wallet info</span>
              </Button>
            </TooltipTrigger>
            <TooltipContent>
              <p className="text-xs">Connect your MetaMask wallet to access the carbon credit marketplace</p>
            </TooltipContent>
          </Tooltip>
        </TooltipProvider>
      </div>
    </div>
  );
};

export default WalletConnect;
