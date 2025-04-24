import React, { useState, useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Loader2, Check, AlertCircle, ArrowRight } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import { motion } from 'framer-motion';
import { 
  getCountries, 
  getSectors, 
  getSubSectors, 
  getDataEntry, 
  saveCalculationResult, 
  CarbonFootprintResult,
  getActivityGuide
} from '../data/carbonDataset';

interface CalculatorFormValues {
  country: string;
  sector: string;
  subSector: string;
  activityValue: number;
}

interface ActivityValueGuide {
  label: string;
  description: string;
  unit: string;
  placeholder: string;
}

const CarbonCalculator = () => {
  const { toast } = useToast();
  const [countries, setCountries] = useState<string[]>([]);
  const [sectors, setSectors] = useState<string[]>([]);
  const [subSectors, setSubSectors] = useState<string[]>([]);
  const [isCalculating, setIsCalculating] = useState(false);
  const [result, setResult] = useState<CarbonFootprintResult | null>(null);
  const [currentStep, setCurrentStep] = useState<"country" | "sector" | "subsector" | "activity">("country");
  const [activityValueGuide, setActivityValueGuide] = useState<ActivityValueGuide>({
    label: "Activity Value",
    description: "Enter the value of your activity",
    unit: "",
    placeholder: "0"
  });
  
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
    
    // Animate to the next step
    setCurrentStep("sector");
  };

  // Update sub-sectors when sector changes
  const handleSectorChange = (value: string) => {
    form.setValue('sector', value);
    form.setValue('subSector', '');
    
    const country = form.getValues('country');
    const subSectorsList = getSubSectors(country, value);
    setSubSectors(subSectorsList);
    
    // Animate to the next step
    setCurrentStep("subsector");
  };
  
  // Update handleSubSectorChange to use the new guide function
  const handleSubSectorChange = (value: string) => {
    form.setValue('subSector', value);
    const sector = form.getValues('sector');
    
    // Use the new guide function
    const guide = getActivityGuide(sector, value);
    setActivityValueGuide(guide);
    
    // Animate to the next step
    setCurrentStep("activity");
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

  // Animation variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: { 
      opacity: 1,
      transition: { 
        when: "beforeChildren",
        staggerChildren: 0.3
      }
    }
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: { y: 0, opacity: 1 }
  };

  return (
    <div className="w-full max-w-3xl mx-auto">
      <Card className="shadow-lg border-eco-green-light overflow-hidden">
        <CardHeader className="bg-gradient-to-r from-eco-green-light/50 to-eco-blue-light/50">
          <CardTitle className="text-2xl text-eco-forest">Carbon Footprint Calculator</CardTitle>
          <CardDescription>Calculate your carbon footprint and explore offsetting options</CardDescription>
        </CardHeader>
        
        <CardContent className="p-0">
          <Tabs value={currentStep} className="w-full">
            <TabsList className="w-full grid grid-cols-4 rounded-none border-b">
              <TabsTrigger 
                value="country" 
                className={`data-[state=active]:bg-eco-green-light/30 ${currentStep === "country" ? "text-eco-forest" : ""}`}
                disabled
              >
                Country
              </TabsTrigger>
              <TabsTrigger 
                value="sector" 
                className={`data-[state=active]:bg-eco-green-light/30 ${currentStep === "sector" ? "text-eco-forest" : ""}`} 
                disabled
              >
                Sector
              </TabsTrigger>
              <TabsTrigger 
                value="subsector" 
                className={`data-[state=active]:bg-eco-green-light/30 ${currentStep === "subsector" ? "text-eco-forest" : ""}`} 
                disabled
              >
                Sub-Sector
              </TabsTrigger>
              <TabsTrigger 
                value="activity" 
                className={`data-[state=active]:bg-eco-green-light/30 ${currentStep === "activity" ? "text-eco-forest" : ""}`} 
                disabled
              >
                Activity
              </TabsTrigger>
            </TabsList>
            
            <Form {...form}>
              <form onSubmit={form.handleSubmit(onSubmit)}>
                <TabsContent value="country" className="py-6 px-6">
                  <motion.div
                    variants={containerVariants}
                    initial="hidden"
                    animate="visible"
                    className="space-y-6"
                  >
                    <motion.div variants={itemVariants}>
                      <FormField
                        control={form.control}
                        name="country"
                        render={() => (
                          <FormItem>
                            <FormLabel>Select Your Country</FormLabel>
                            <Select 
                              onValueChange={handleCountryChange}
                              value={form.getValues('country')}
                            >
                              <FormControl>
                                <SelectTrigger className="border-eco-green-light focus:ring-eco-green">
                                  <SelectValue placeholder="Choose a country" />
                                </SelectTrigger>
                              </FormControl>
                              <SelectContent className="max-h-[300px]">
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
                    </motion.div>
                    
                    <motion.div variants={itemVariants} className="flex justify-end">
                      <Button 
                        type="button"
                        disabled={!form.getValues("country")}
                        onClick={() => setCurrentStep("sector")}
                        className="bg-eco-green hover:bg-eco-green-dark text-white"
                      >
                        Next <ArrowRight className="ml-2 h-4 w-4" />
                      </Button>
                    </motion.div>
                  </motion.div>
                </TabsContent>
                
                <TabsContent value="sector" className="py-6 px-6">
                  <motion.div
                    variants={containerVariants}
                    initial="hidden"
                    animate="visible"
                    className="space-y-6"
                  >
                    <motion.div variants={itemVariants}>
                      <FormField
                        control={form.control}
                        name="sector"
                        render={() => (
                          <FormItem>
                            <FormLabel>Select Activity Sector</FormLabel>
                            <Select 
                              onValueChange={handleSectorChange}
                              value={form.getValues('sector')}
                            >
                              <FormControl>
                                <SelectTrigger className="border-eco-green-light focus:ring-eco-green">
                                  <SelectValue placeholder="Choose a sector" />
                                </SelectTrigger>
                              </FormControl>
                              <SelectContent className="max-h-[300px]">
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
                    </motion.div>
                    
                    <motion.div variants={itemVariants} className="flex justify-between">
                      <Button 
                        type="button"
                        onClick={() => setCurrentStep("country")}
                        variant="outline"
                        className="border-eco-green text-eco-green hover:bg-eco-green/10"
                      >
                        Back
                      </Button>
                      <Button 
                        type="button"
                        disabled={!form.getValues("sector")}
                        onClick={() => setCurrentStep("subsector")}
                        className="bg-eco-green hover:bg-eco-green-dark text-white"
                      >
                        Next <ArrowRight className="ml-2 h-4 w-4" />
                      </Button>
                    </motion.div>
                  </motion.div>
                </TabsContent>
                
                <TabsContent value="subsector" className="py-6 px-6">
                  <motion.div
                    variants={containerVariants}
                    initial="hidden"
                    animate="visible"
                    className="space-y-6"
                  >
                    <motion.div variants={itemVariants}>
                      <FormField
                        control={form.control}
                        name="subSector"
                        render={() => (
                          <FormItem>
                            <FormLabel>Select Sub-Sector</FormLabel>
                            <Select 
                              onValueChange={handleSubSectorChange}
                              value={form.getValues('subSector')}
                            >
                              <FormControl>
                                <SelectTrigger className="border-eco-green-light focus:ring-eco-green">
                                  <SelectValue placeholder="Choose a sub-sector" />
                                </SelectTrigger>
                              </FormControl>
                              <SelectContent className="max-h-[300px]">
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
                    </motion.div>
                    
                    <motion.div variants={itemVariants} className="flex justify-between">
                      <Button 
                        type="button"
                        onClick={() => setCurrentStep("sector")}
                        variant="outline"
                        className="border-eco-green text-eco-green hover:bg-eco-green/10"
                      >
                        Back
                      </Button>
                      <Button 
                        type="button"
                        disabled={!form.getValues("subSector")}
                        onClick={() => setCurrentStep("activity")}
                        className="bg-eco-green hover:bg-eco-green-dark text-white"
                      >
                        Next <ArrowRight className="ml-2 h-4 w-4" />
                      </Button>
                    </motion.div>
                  </motion.div>
                </TabsContent>
                
                <TabsContent value="activity" className="py-6 px-6">
                  <motion.div
                    variants={containerVariants}
                    initial="hidden"
                    animate="visible"
                    className="space-y-6"
                  >
                    <motion.div variants={itemVariants}>
                      <div className="bg-eco-green/5 p-4 rounded-md mb-4">
                        <h3 className="font-medium text-eco-forest mb-2">About {form.getValues('subSector')}</h3>
                        <p className="text-sm text-gray-600">
                          {form.getValues('sector') === 'Transportation' 
                            ? `Transportation via ${form.getValues('subSector')} is a common activity with significant carbon impact.`
                            : form.getValues('sector') === 'Energy'
                            ? `Energy usage through ${form.getValues('subSector')} contributes to your carbon footprint.`
                            : `Activities in the ${form.getValues('subSector')} sub-sector affect your overall emissions.`
                          }
                        </p>
                      </div>
                    </motion.div>
                    
                    <motion.div variants={itemVariants}>
                      <FormField
                        control={form.control}
                        name="activityValue"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>{activityValueGuide.label}</FormLabel>
                            <div className="flex items-center space-x-2">
                              <FormControl>
                                <Input
                                  type="number"
                                  placeholder={activityValueGuide.placeholder}
                                  min="0"
                                  step="0.1"
                                  className="border-eco-green-light focus:ring-eco-green"
                                  {...field}
                                  onChange={(e) => field.onChange(parseFloat(e.target.value) || 0)}
                                />
                              </FormControl>
                              {activityValueGuide.unit && (
                                <span className="text-sm font-medium text-gray-500">{activityValueGuide.unit}</span>
                              )}
                            </div>
                            <FormDescription>
                              {activityValueGuide.description}
                            </FormDescription>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                    </motion.div>
                    
                    <motion.div variants={itemVariants} className="flex justify-between">
                      <Button 
                        type="button"
                        onClick={() => setCurrentStep("subsector")}
                        variant="outline"
                        className="border-eco-green text-eco-green hover:bg-eco-green/10"
                      >
                        Back
                      </Button>
                      <Button 
                        type="submit" 
                        className="bg-eco-green hover:bg-eco-green-dark text-white"
                        disabled={isCalculating || form.getValues('activityValue') <= 0}
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
                    </motion.div>
                  </motion.div>
                </TabsContent>
              </form>
            </Form>
          </Tabs>
        </CardContent>
      </Card>
      
      {result && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3, duration: 0.5 }}
        >
          <Card className="mt-8 shadow-md border-eco-blue-light">
            <CardHeader className="bg-gradient-to-r from-eco-blue-light/20 to-eco-green-light/20">
              <CardTitle className="text-xl text-eco-forest">Your Carbon Footprint</CardTitle>
              <CardDescription>
                Based on {result.activity.value} {result.activity.sector === 'Transportation' ? 'km' : result.activity.sector === 'Energy' ? 'kWh' : 'hours'} of {result.activity.subSector} in {result.activity.country}
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4 pt-6">
              <motion.div 
                className="grid grid-cols-2 gap-4"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.5, duration: 0.5 }}
              >
                <motion.div 
                  className="bg-eco-green/10 p-4 rounded-lg"
                  initial={{ scale: 0.9 }}
                  animate={{ scale: 1 }}
                  transition={{ delay: 0.6, duration: 0.4, type: "spring" }}
                >
                  <h3 className="text-sm font-medium text-muted-foreground">Total Emission</h3>
                  <p className="text-2xl font-bold text-eco-forest">{result.totalEmission} kg CO₂</p>
                </motion.div>
                <motion.div 
                  className="bg-eco-blue-light/10 p-4 rounded-lg"
                  initial={{ scale: 0.9 }}
                  animate={{ scale: 1 }}
                  transition={{ delay: 0.7, duration: 0.4, type: "spring" }}
                >
                  <h3 className="text-sm font-medium text-muted-foreground">Reusable Carbon</h3>
                  <p className="text-2xl font-bold text-eco-blue">{result.reusableCarbon} kg CO₂</p>
                </motion.div>
              </motion.div>
              
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.8, duration: 0.5 }}
              >
                <h3 className="text-sm font-medium mb-2">Suggestions for Reduction</h3>
                <ul className="space-y-2">
                  {result.suggestions.map((suggestion, index) => (
                    <motion.li 
                      key={index} 
                      className="flex items-start gap-2"
                      initial={{ opacity: 0, x: -10 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: 0.9 + (index * 0.1), duration: 0.3 }}
                    >
                      <Check className="h-5 w-5 text-eco-green flex-shrink-0 mt-0.5" />
                      <span>{suggestion}</span>
                    </motion.li>
                  ))}
                </ul>
              </motion.div>
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
        </motion.div>
      )}
    </div>
  );
};

export default CarbonCalculator;
