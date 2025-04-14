
import React, { useState, useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Loader2, AlertCircle, Check } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import { 
  getCountries, 
  getSectors, 
  getSubSectors, 
  getDataEntry, 
  saveCalculationResult, 
  CarbonFootprintResult 
} from '../data/carbonDataset';

interface CalculatorFormValues {
  country: string;
  sector: string;
  subSector: string;
  activityValue: number;
}

const CarbonCalculator = () => {
  const { toast } = useToast();
  const [countries, setCountries] = useState<string[]>([]);
  const [sectors, setSectors] = useState<string[]>([]);
  const [subSectors, setSubSectors] = useState<string[]>([]);
  const [isCalculating, setIsCalculating] = useState(false);
  const [result, setResult] = useState<CarbonFootprintResult | null>(null);
  
  const form = useForm<CalculatorFormValues>({
    defaultValues: {
      country: '',
      sector: '',
      subSector: '',
      activityValue: 0,
    }
  });

  // Initialize countries
  useEffect(() => {
    setCountries(getCountries());
  }, []);

  // Update sectors when country changes
  const handleCountryChange = (value: string) => {
    form.setValue('country', value);
    form.setValue('sector', '');
    form.setValue('subSector', '');
    
    const sectorsList = getSectors(value);
    setSectors(sectorsList);
    setSubSectors([]);
  };

  // Update sub-sectors when sector changes
  const handleSectorChange = (value: string) => {
    form.setValue('sector', value);
    form.setValue('subSector', '');
    
    const country = form.getValues('country');
    const subSectorsList = getSubSectors(country, value);
    setSubSectors(subSectorsList);
  };

  const onSubmit = (data: CalculatorFormValues) => {
    setIsCalculating(true);
    
    // Simulate API call with setTimeout
    setTimeout(() => {
      try {
        const dataEntry = getDataEntry(data.country, data.sector, data.subSector);
        
        if (!dataEntry) {
          toast({
            title: "Calculation Error",
            description: "Could not find matching data for your selection.",
            variant: "destructive",
          });
          setIsCalculating(false);
          return;
        }
        
        // Calculate total emission
        const totalEmission = dataEntry.totalCarbonEmission * data.activityValue;
        
        // Calculate reusable carbon
        const reusableCarbon = totalEmission * dataEntry.reusableCarbonPercentage;
        
        // Create result object
        const calculationResult: CarbonFootprintResult = {
          totalEmission: parseFloat(totalEmission.toFixed(2)),
          reusableCarbon: parseFloat(reusableCarbon.toFixed(2)),
          suggestions: dataEntry.reusableAllocation,
          timestamp: Date.now(),
          activity: {
            country: data.country,
            sector: data.sector,
            subSector: data.subSector,
            value: data.activityValue
          }
        };
        
        // Save result
        saveCalculationResult(calculationResult);
        setResult(calculationResult);
        
        toast({
          title: "Calculation Complete",
          description: `Total CO₂ emission: ${calculationResult.totalEmission} kg`,
        });
      } catch (error) {
        toast({
          title: "Calculation Error",
          description: "An error occurred while calculating your carbon footprint.",
          variant: "destructive",
        });
      } finally {
        setIsCalculating(false);
      }
    }, 1000);
  };

  return (
    <div className="w-full max-w-3xl mx-auto">
      <Card className="shadow-lg border-eco-green-light">
        <CardHeader className="bg-gradient-to-r from-eco-green-light/50 to-eco-blue-light/50">
          <CardTitle className="text-2xl text-eco-forest">Carbon Footprint Calculator</CardTitle>
          <CardDescription>Calculate your carbon footprint and explore offsetting options</CardDescription>
        </CardHeader>
        <CardContent className="pt-6">
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
              <FormField
                control={form.control}
                name="country"
                render={() => (
                  <FormItem>
                    <FormLabel>Country</FormLabel>
                    <Select 
                      onValueChange={handleCountryChange}
                      value={form.getValues('country')}
                    >
                      <FormControl>
                        <SelectTrigger>
                          <SelectValue placeholder="Select your country" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        {countries.map((country) => (
                          <SelectItem key={country} value={country}>
                            {country}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                    <FormDescription>
                      The country where the activity takes place
                    </FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />
              
              <FormField
                control={form.control}
                name="sector"
                render={() => (
                  <FormItem>
                    <FormLabel>Sector</FormLabel>
                    <Select 
                      onValueChange={handleSectorChange}
                      value={form.getValues('sector')}
                      disabled={!form.getValues('country')}
                    >
                      <FormControl>
                        <SelectTrigger>
                          <SelectValue placeholder="Select a sector" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        {sectors.map((sector) => (
                          <SelectItem key={sector} value={sector}>
                            {sector}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                    <FormDescription>
                      The category of your activity
                    </FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />
              
              <FormField
                control={form.control}
                name="subSector"
                render={() => (
                  <FormItem>
                    <FormLabel>Sub-Sector</FormLabel>
                    <Select 
                      onValueChange={(value) => form.setValue('subSector', value)}
                      value={form.getValues('subSector')}
                      disabled={!form.getValues('sector')}
                    >
                      <FormControl>
                        <SelectTrigger>
                          <SelectValue placeholder="Select a sub-sector" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        {subSectors.map((subSector) => (
                          <SelectItem key={subSector} value={subSector}>
                            {subSector}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                    <FormDescription>
                      The specific type of activity
                    </FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />
              
              <FormField
                control={form.control}
                name="activityValue"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Activity Value</FormLabel>
                    <FormControl>
                      <Input
                        type="number"
                        placeholder="0"
                        min="0"
                        step="0.1"
                        {...field}
                        onChange={(e) => field.onChange(parseFloat(e.target.value) || 0)}
                      />
                    </FormControl>
                    <FormDescription>
                      {form.getValues('sector') === 'Transportation' 
                        ? 'Distance traveled (km)' 
                        : form.getValues('sector') === 'Energy' 
                        ? 'Energy consumed (kWh)'
                        : 'Usage (hours)'}
                    </FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />
              
              <Button 
                type="submit" 
                className="w-full bg-eco-green hover:bg-eco-green-dark text-white"
                disabled={isCalculating || !form.getValues('country') || !form.getValues('sector') || !form.getValues('subSector') || form.getValues('activityValue') <= 0}
              >
                {isCalculating ? (
                  <>
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    Calculating...
                  </>
                ) : (
                  'Calculate Footprint'
                )}
              </Button>
            </form>
          </Form>
        </CardContent>
      </Card>
      
      {result && (
        <Card className="mt-8 shadow-md border-eco-blue-light animate-fade-in">
          <CardHeader>
            <CardTitle className="text-xl text-eco-forest">Your Carbon Footprint</CardTitle>
            <CardDescription>
              Based on {result.activity.value} {result.activity.sector === 'Transportation' ? 'km' : result.activity.sector === 'Energy' ? 'kWh' : 'hours'} of {result.activity.subSector} in {result.activity.country}
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <div className="bg-eco-green/10 p-4 rounded-lg">
                <h3 className="text-sm font-medium text-muted-foreground">Total Emission</h3>
                <p className="text-2xl font-bold text-eco-forest">{result.totalEmission} kg CO₂</p>
              </div>
              <div className="bg-eco-blue-light/10 p-4 rounded-lg">
                <h3 className="text-sm font-medium text-muted-foreground">Reusable Carbon</h3>
                <p className="text-2xl font-bold text-eco-blue">{result.reusableCarbon} kg CO₂</p>
              </div>
            </div>
            
            <div>
              <h3 className="text-sm font-medium mb-2">Suggestions for Reduction</h3>
              <ul className="space-y-2">
                {result.suggestions.map((suggestion, index) => (
                  <li key={index} className="flex items-start gap-2">
                    <Check className="h-5 w-5 text-eco-green flex-shrink-0 mt-0.5" />
                    <span>{suggestion}</span>
                  </li>
                ))}
              </ul>
            </div>
          </CardContent>
          <CardFooter>
            <Button 
              variant="outline" 
              className="w-full border-eco-green text-eco-green hover:bg-eco-green/10"
              onClick={() => {
                toast({
                  title: "Result Saved",
                  description: "Your carbon footprint result has been saved for offsetting.",
                });
              }}
            >
              Save for Carbon Credit Minting
            </Button>
          </CardFooter>
        </Card>
      )}
    </div>
  );
};

export default CarbonCalculator;
