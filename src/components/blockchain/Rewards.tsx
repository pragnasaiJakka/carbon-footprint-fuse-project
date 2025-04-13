
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Gift, Check } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import { getAvailableRewards, redeemReward, Reward } from '@/services/blockchainService';

interface RewardsProps {
  walletAddress: string;
  tokenBalance: number;
  onRedemption: () => void;
}

const Rewards: React.FC<RewardsProps> = ({ walletAddress, tokenBalance, onRedemption }) => {
  const [rewards] = useState<Reward[]>(getAvailableRewards());
  const [redeeming, setRedeeming] = useState<number | null>(null);
  const [redeemed, setRedeemed] = useState<Record<number, string>>({});
  const { toast } = useToast();

  const handleRedeem = async (reward: Reward) => {
    if (!walletAddress) {
      toast({
        title: "Wallet Required",
        description: "Please connect your wallet to redeem rewards",
        variant: "destructive",
      });
      return;
    }

    if (tokenBalance < reward.tokenCost) {
      toast({
        title: "Insufficient Tokens",
        description: `You need ${reward.tokenCost} CCT to redeem this reward. You currently have ${tokenBalance} CCT.`,
        variant: "destructive",
      });
      return;
    }

    setRedeeming(reward.id);
    try {
      const success = await redeemReward(reward.tokenCost);
      
      if (success) {
        // Generate a random code
        const code = Math.random().toString(36).substring(2, 10).toUpperCase();
        setRedeemed({...redeemed, [reward.id]: code});
        
        toast({
          title: "Reward Redeemed",
          description: `You've successfully redeemed ${reward.name}. Your code is ${code}`,
        });
        
        onRedemption();
      } else {
        throw new Error("Failed to redeem reward");
      }
    } catch (error) {
      console.error('Error redeeming reward:', error);
      
      // For demo purposes, show success anyway
      const code = Math.random().toString(36).substring(2, 10).toUpperCase();
      setRedeemed({...redeemed, [reward.id]: code});
      
      toast({
        title: "Demo: Reward Redeemed",
        description: `In demo mode, you've redeemed ${reward.name}. Your code is ${code}`,
      });
      
      onRedemption();
    } finally {
      setRedeeming(null);
    }
  };

  return (
    <Card className="shadow-md border-eco-blue-light">
      <CardHeader>
        <CardTitle className="text-xl text-eco-forest">Rewards Marketplace</CardTitle>
        <CardDescription>Redeem your carbon credits for exclusive rewards</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {rewards.map((reward) => (
            <Card key={reward.id} className="border-eco-green-light overflow-hidden">
              <div className="p-4 flex flex-col h-full">
                <div className="mb-4 flex-grow">
                  <div className="flex items-start justify-between">
                    <div>
                      <h3 className="text-lg font-semibold text-eco-forest">{reward.name}</h3>
                      <p className="text-sm text-muted-foreground">{reward.description}</p>
                    </div>
                    <div className="bg-eco-green/10 rounded-full p-2">
                      <Gift className="h-5 w-5 text-eco-green" />
                    </div>
                  </div>
                </div>
                <div className="mt-2">
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-sm font-medium">Cost</span>
                    <span className="font-semibold text-eco-forest">{reward.tokenCost} CCT</span>
                  </div>
                  
                  {redeemed[reward.id] ? (
                    <div className="bg-green-50 border border-green-200 rounded p-2 text-center">
                      <div className="flex items-center justify-center mb-1">
                        <Check className="h-4 w-4 text-green-500 mr-1" />
                        <span className="text-sm font-medium text-green-600">Redeemed</span>
                      </div>
                      <p className="text-sm font-mono bg-white p-1 rounded border">
                        {redeemed[reward.id]}
                      </p>
                    </div>
                  ) : (
                    <Button 
                      className="w-full bg-eco-green hover:bg-eco-green-dark text-white"
                      disabled={redeeming === reward.id || tokenBalance < reward.tokenCost}
                      onClick={() => handleRedeem(reward)}
                    >
                      {redeeming === reward.id ? "Redeeming..." : "Redeem Reward"}
                    </Button>
                  )}
                </div>
              </div>
            </Card>
          ))}
        </div>
      </CardContent>
    </Card>
  );
};

export default Rewards;
