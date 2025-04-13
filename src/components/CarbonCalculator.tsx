
import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import { Slider } from "@/components/ui/slider";
import { Zap, Car, Utensils } from 'lucide-react';
import { CarbonFootprintInputs, calculateCarbonFootprint, getElectricitySourceOptions, getTransportationModeOptions, getDietOptions } from '@/lib/carbonCalculations';
import ResultsDisplay from './ResultsDisplay';
import { useToast } from '@/components/ui/use-toast';

const CarbonCalculator = () => {
  const { toast } = useToast();
  const [activeTab, setActiveTab] = useState<string>("electricity");
  const [inputs, setInputs] = useState<CarbonFootprintInputs>({
    electricity: {
      amount: 300,
      source: "mixed"
    },
    transportation: {
      distance: 100,
      mode: "car_gasoline"
    },
    diet: "balanced"
  });
  const [result, setResult] = useState<any>(null);
  const [isCalculating, setIsCalculating] = useState(false);

  const handleElectricityChange = (field: string, value: any) => {
    setInputs(prev => ({
      ...prev,
      electricity: {
        ...prev.electricity,
        [field]: value
      }
    }));
  };

  const handleTransportationChange = (field: string, value: any) => {
    setInputs(prev => ({
      ...prev,
      transportation: {
        ...prev.transportation,
        [field]: value
      }
    }));
  };

  const handleDietChange = (value: any) => {
    setInputs(prev => ({
      ...prev,
      diet: value
    }));
  };

  const handleCalculate = () => {
    setIsCalculating(true);
    
    // Simulate API call with setTimeout
    setTimeout(() => {
      try {
        const calculationResult = calculateCarbonFootprint(inputs);
        setResult(calculationResult);
        toast({
          title: "Calculation Complete",
          description: "Your carbon footprint has been calculated successfully.",
          duration: 3000,
        });
      } catch (error) {
        toast({
          title: "Calculation Error",
          description: "There was an error calculating your carbon footprint.",
          variant: "destructive",
          duration: 3000,
        });
      } finally {
        setIsCalculating(false);
      }
    }, 1000);
  };

  const electricityOptions = getElectricitySourceOptions();
  const transportationOptions = getTransportationModeOptions();
  const dietOptions = getDietOptions();

  return (
    <div className="w-full max-w-3xl mx-auto" id="calculator">
      <Card className="shadow-lg border-eco-green-light">
        <CardHeader className="bg-gradient-to-r from-eco-green-light/50 to-eco-blue-light/50">
          <CardTitle className="text-2xl text-eco-forest">Carbon Footprint Calculator</CardTitle>
          <CardDescription>Estimate your carbon footprint and explore offsetting options</CardDescription>
        </CardHeader>
        <CardContent className="pt-6">
          <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
            <TabsList className="grid grid-cols-3 mb-6">
              <TabsTrigger value="electricity" className="flex items-center gap-2">
                <Zap className="h-4 w-4" /> Electricity
              </TabsTrigger>
              <TabsTrigger value="transportation" className="flex items-center gap-2">
                <Car className="h-4 w-4" /> Transportation
              </TabsTrigger>
              <TabsTrigger value="diet" className="flex items-center gap-2">
                <Utensils className="h-4 w-4" /> Diet
              </TabsTrigger>
            </TabsList>
            
            <TabsContent value="electricity" className="space-y-4">
              <div className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="electricity-amount">Monthly Electricity Usage (kWh)</Label>
                  <div className="flex items-center gap-4">
                    <Slider 
                      id="electricity-amount"
                      min={50} 
                      max={1000} 
                      step={10}
                      value={[inputs.electricity.amount]} 
                      onValueChange={(value) => handleElectricityChange('amount', value[0])}
                      className="flex-1" 
                    />
                    <Input 
                      type="number" 
                      value={inputs.electricity.amount}
                      onChange={(e) => handleElectricityChange('amount', parseFloat(e.target.value) || 0)}
                      className="w-20" 
                    />
                  </div>
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="electricity-source">Electricity Source</Label>
                  <Select 
                    value={inputs.electricity.source}
                    onValueChange={(value) => handleElectricityChange('source', value)}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Select electricity source" />
                    </SelectTrigger>
                    <SelectContent>
                      {electricityOptions.map(option => (
                        <SelectItem key={option.value} value={option.value}>{option.label}</SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
              </div>
            </TabsContent>
            
            <TabsContent value="transportation" className="space-y-4">
              <div className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="transportation-distance">Weekly Distance (km)</Label>
                  <div className="flex items-center gap-4">
                    <Slider 
                      id="transportation-distance"
                      min={0} 
                      max={1000} 
                      step={10}
                      value={[inputs.transportation.distance]} 
                      onValueChange={(value) => handleTransportationChange('distance', value[0])}
                      className="flex-1" 
                    />
                    <Input 
                      type="number" 
                      value={inputs.transportation.distance}
                      onChange={(e) => handleTransportationChange('distance', parseFloat(e.target.value) || 0)}
                      className="w-20" 
                    />
                  </div>
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="transportation-mode">Transportation Mode</Label>
                  <Select 
                    value={inputs.transportation.mode}
                    onValueChange={(value) => handleTransportationChange('mode', value)}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Select transportation mode" />
                    </SelectTrigger>
                    <SelectContent>
                      {transportationOptions.map(option => (
                        <SelectItem key={option.value} value={option.value}>{option.label}</SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
              </div>
            </TabsContent>
            
            <TabsContent value="diet" className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="diet-type">Diet Type</Label>
                <Select 
                  value={inputs.diet}
                  onValueChange={handleDietChange}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Select diet type" />
                  </SelectTrigger>
                  <SelectContent>
                    {dietOptions.map(option => (
                      <SelectItem key={option.value} value={option.value}>{option.label}</SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            </TabsContent>
          </Tabs>
        </CardContent>
        <CardFooter className="flex justify-between">
          <Button variant="outline" onClick={() => setActiveTab(activeTab === "electricity" ? "transportation" : activeTab === "transportation" ? "diet" : "electricity")}>
            {activeTab === "diet" ? "Back to Electricity" : "Next Step"}
          </Button>
          <Button 
            className="bg-eco-green hover:bg-eco-green-dark text-white"
            onClick={handleCalculate}
            disabled={isCalculating}
          >
            {isCalculating ? "Calculating..." : "Calculate Footprint"}
          </Button>
        </CardFooter>
      </Card>
      
      {result && (
        <div className="mt-8 animate-fade-in">
          <ResultsDisplay result={result} />
        </div>
      )}
    </div>
  );
};

export default CarbonCalculator;
