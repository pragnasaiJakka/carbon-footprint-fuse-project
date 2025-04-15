
import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Form, FormField, FormItem, FormLabel, FormControl, FormMessage } from "@/components/ui/form";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Leaf, Bike, Car, Train, Plus } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import { mintCarbonCredits, EcoActivity } from '@/services/blockchainService';

interface EcoActivityFormProps {
  walletAddress: string;
  onSubmitSuccess: () => void;
}

const EcoActivityForm: React.FC<EcoActivityFormProps> = ({ walletAddress, onSubmitSuccess }) => {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { toast } = useToast();
  
  const form = useForm<EcoActivity>({
    defaultValues: {
      activity: '',
      distance: 0,
      date: new Date().toISOString().split('T')[0]
    }
  });

  const onSubmit = async (data: EcoActivity) => {
    if (!walletAddress) {
      toast({
        title: "Wallet Required",
        description: "Please connect your wallet to submit activities",
        variant: "destructive",
      });
      return;
    }

    setIsSubmitting(true);
    try {
      // Calculate earned credits based on distance
      const earnedCredits = (data.distance * 0.1).toFixed(1);
      
      // Try blockchain operation first
      const success = await mintCarbonCredits(walletAddress, data);
      
      // Store the activity in localStorage for history regardless of blockchain success
      const activities = JSON.parse(localStorage.getItem('ecoActivities') || '[]');
      activities.push({
        ...data,
        timestamp: new Date().toISOString(),
        credits: parseFloat(earnedCredits)
      });
      localStorage.setItem('ecoActivities', JSON.stringify(activities));
      
      // Update total balance in localStorage
      const currentBalance = parseFloat(localStorage.getItem('tokenBalance') || '0');
      const newBalance = currentBalance + parseFloat(earnedCredits);
      localStorage.setItem('tokenBalance', newBalance.toString());
      
      toast({
        title: success ? "Activity Submitted" : "Demo: Activity Submitted",
        description: `You've earned ${earnedCredits} carbon credits for your eco-friendly activity!`,
      });
      
      form.reset();
      // Trigger a refresh in parent component
      onSubmitSuccess();
      
    } catch (error: any) {
      console.error('Error submitting activity:', error);
      
      // Still update localStorage on error
      const earnedCredits = (data.distance * 0.1).toFixed(1);
      
      // Store the activity in localStorage for history
      const activities = JSON.parse(localStorage.getItem('ecoActivities') || '[]');
      activities.push({
        ...data,
        timestamp: new Date().toISOString(),
        credits: parseFloat(earnedCredits)
      });
      localStorage.setItem('ecoActivities', JSON.stringify(activities));
      
      // Update total balance in localStorage
      const currentBalance = parseFloat(localStorage.getItem('tokenBalance') || '0');
      const newBalance = currentBalance + parseFloat(earnedCredits);
      localStorage.setItem('tokenBalance', newBalance.toString());
      
      toast({
        title: "Demo: Activity Submitted",
        description: `In demo mode, you've earned ${earnedCredits} carbon credits!`,
      });
      
      form.reset();
      onSubmitSuccess();
    } finally {
      setIsSubmitting(false);
    }
  };

  const activityOptions = [
    { value: 'cycling', label: 'Cycling Instead of Driving', icon: <Bike className="h-4 w-4" /> },
    { value: 'public_transport', label: 'Using Public Transport', icon: <Train className="h-4 w-4" /> },
    { value: 'car_sharing', label: 'Car Sharing/Pooling', icon: <Car className="h-4 w-4" /> },
    { value: 'walking', label: 'Walking Instead of Driving', icon: <Leaf className="h-4 w-4" /> }
  ];

  return (
    <Card className="shadow-md border-eco-green-light">
      <CardHeader>
        <CardTitle className="text-lg text-eco-forest">Submit Eco-Friendly Activity</CardTitle>
        <CardDescription>Record your sustainable activities to earn carbon credits</CardDescription>
      </CardHeader>
      <CardContent>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
            <FormField
              control={form.control}
              name="activity"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Activity Type</FormLabel>
                  <Select 
                    onValueChange={field.onChange} 
                    defaultValue={field.value}
                  >
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue placeholder="Select activity type" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      {activityOptions.map(option => (
                        <SelectItem key={option.value} value={option.value}>
                          <div className="flex items-center">
                            {option.icon}
                            <span className="ml-2">{option.label}</span>
                          </div>
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                  <FormMessage />
                </FormItem>
              )}
            />
            
            <FormField
              control={form.control}
              name="distance"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Distance (km)</FormLabel>
                  <FormControl>
                    <Input 
                      type="number" 
                      min="0" 
                      step="0.1"
                      {...field}
                      onChange={e => field.onChange(parseFloat(e.target.value))}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            
            <FormField
              control={form.control}
              name="date"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Date</FormLabel>
                  <FormControl>
                    <Input type="date" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            
            <Button 
              type="submit" 
              className="w-full bg-eco-green hover:bg-eco-green-dark text-white"
              disabled={isSubmitting}
            >
              <Plus className="mr-2 h-4 w-4" />
              {isSubmitting ? "Submitting..." : "Submit Activity"}
            </Button>
          </form>
        </Form>
      </CardContent>
    </Card>
  );
};

export default EcoActivityForm;
