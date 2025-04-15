
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Building, Award, Check, TreeDeciduous, BadgePercent, FileText } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import { redeemReward } from '@/services/blockchainService';

interface RewardsProps {
  walletAddress: string;
  tokenBalance: number;
  onRedemption: () => void;
}

// Updated business-focused rewards
const businessRewards = [
  {
    id: 1,
    name: "Green Marketing Package",
    description: "Promote your company's eco-initiatives with a featured spot in a sustainability newsletter and social media mentions.",
    tokenCost: 10,
    icon: <BadgePercent className="h-5 w-5 text-eco-green" />
  },
  {
    id: 2,
    name: "Sustainable Supplier Directory Access",
    description: "Gain access to a curated list of verified sustainable suppliers and partners for your business.",
    tokenCost: 15,
    icon: <Building className="h-5 w-5 text-eco-green" />
  },
  {
    id: 3,
    name: "Carbon Footprint Assessment Voucher",
    description: "Get a professional assessment of your company's carbon footprint and personalized reduction strategies.",
    tokenCost: 20,
    icon: <FileText className="h-5 w-5 text-eco-green" />
  },
  {
    id: 4,
    name: "Eco-Certification Application Support",
    description: "Receive expert help in applying for recognized sustainability certifications (e.g., B Corp, ISO 14001).",
    tokenCost: 25,
    icon: <Award className="h-5 w-5 text-eco-green" />
  },
  {
    id: 5,
    name: "Tree Planting Partnership (Corporate Level)",
    description: "Partner with us to plant 50 trees in your company's name, including a certificate and impact report.",
    tokenCost: 30,
    icon: <TreeDeciduous className="h-5 w-5 text-eco-green" />
  }
];

const Rewards: React.FC<RewardsProps> = ({ walletAddress, tokenBalance, onRedemption }) => {
  const [redeeming, setRedeeming] = useState<number | null>(null);
  const [redeemed, setRedeemed] = useState<Record<number, string>>({});
  const { toast } = useToast();

  const handleRedeem = async (reward: typeof businessRewards[0]) => {
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
        
        // Update token balance in localStorage
        const currentBalance = parseFloat(localStorage.getItem('tokenBalance') || '0');
        const newBalance = Math.max(0, currentBalance - reward.tokenCost);
        localStorage.setItem('tokenBalance', newBalance.toString());
        
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
      
      // Update token balance in localStorage
      const currentBalance = parseFloat(localStorage.getItem('tokenBalance') || '0');
      const newBalance = Math.max(0, currentBalance - reward.tokenCost);
      localStorage.setItem('tokenBalance', newBalance.toString());
      
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
        <CardTitle className="text-xl text-eco-forest">Business Rewards Marketplace</CardTitle>
        <CardDescription>Redeem your carbon credits for sustainable business advantages</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {businessRewards.map((reward) => (
            <Card key={reward.id} className="border-eco-green-light overflow-hidden">
              <div className="p-4 flex flex-col h-full">
                <div className="mb-4 flex-grow">
                  <div className="flex items-start justify-between">
                    <div>
                      <h3 className="text-lg font-semibold text-eco-forest">{reward.name}</h3>
                      <p className="text-sm text-muted-foreground">{reward.description}</p>
                    </div>
                    <div className="bg-eco-green/10 rounded-full p-2">
                      {reward.icon}
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
