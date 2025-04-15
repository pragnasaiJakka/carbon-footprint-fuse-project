
import React, { useEffect, useState } from 'react';
import { getTokenBalance } from '@/services/blockchainService';
import { Card, CardContent } from "@/components/ui/card";
import { Leaf } from 'lucide-react';

interface TokenBalanceProps {
  address: string;
  refreshTrigger?: number;
}

const TokenBalance: React.FC<TokenBalanceProps> = ({ address, refreshTrigger }) => {
  const [balance, setBalance] = useState<number>(0);
  const [isLoading, setIsLoading] = useState<boolean>(true);

  useEffect(() => {
    const fetchBalance = async () => {
      setIsLoading(true);
      
      // First try to get from localStorage for immediate feedback
      const localBalance = parseFloat(localStorage.getItem('tokenBalance') || '0');
      setBalance(localBalance);
      
      if (address) {
        try {
          // Then try to get from blockchain (in case it's different)
          const tokenBalance = await getTokenBalance(address);
          if (tokenBalance > 0) {
            setBalance(tokenBalance);
            // Update localStorage if blockchain balance is valid
            localStorage.setItem('tokenBalance', tokenBalance.toString());
          }
        } catch (error) {
          console.error('Error fetching token balance:', error);
          // Already set from localStorage above
        } finally {
          setIsLoading(false);
        }
      } else {
        setIsLoading(false);
      }
    };

    fetchBalance();
  }, [address, refreshTrigger]);

  return (
    <Card className="shadow-md border-eco-green-light">
      <CardContent className="pt-6">
        <div className="flex justify-between items-center">
          <div className="space-y-1">
            <p className="text-sm text-muted-foreground">Carbon Credit Balance</p>
            <div className="flex items-center">
              <Leaf className="h-5 w-5 text-eco-green mr-2" />
              <p className="text-2xl font-bold text-eco-forest">
                {isLoading ? "Loading..." : `${balance.toFixed(2)} CCT`}
              </p>
            </div>
          </div>
          <div className="rounded-full bg-eco-green/10 p-3">
            <Leaf className="h-6 w-6 text-eco-green" />
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default TokenBalance;
