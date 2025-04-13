
// Simple carbon footprint calculation utilities
// Note: These are simplified estimates for demonstration purposes

// Electricity carbon factors (kg CO2 per kWh)
const ELECTRICITY_FACTORS = {
  coal: 0.9, // kg CO2 per kWh
  natural_gas: 0.4,
  renewable: 0.01,
  mixed: 0.5
};

// Transportation carbon factors (kg CO2 per km)
const TRANSPORTATION_FACTORS = {
  car_gasoline: 0.19, // kg CO2 per km
  car_diesel: 0.17,
  car_electric: 0.05,
  bus: 0.1,
  train: 0.04,
  plane: 0.25
};

// Diet carbon factors (kg CO2 per day)
const DIET_FACTORS = {
  meat_heavy: 7.19, // kg CO2 per day
  balanced: 4.67,
  vegetarian: 3.81,
  vegan: 2.89
};

export interface CarbonFootprintInputs {
  electricity: {
    amount: number; // kWh per month
    source: keyof typeof ELECTRICITY_FACTORS;
  };
  transportation: {
    distance: number; // km per week
    mode: keyof typeof TRANSPORTATION_FACTORS;
  };
  diet: keyof typeof DIET_FACTORS;
}

export interface CarbonFootprintResult {
  electricity: number; // kg CO2
  transportation: number; // kg CO2
  diet: number; // kg CO2
  total: number; // kg CO2
  treesNeeded: number; // Number of trees to offset
  carbonCredits: number; // Estimated carbon credits
}

// Calculate carbon footprint based on inputs
export const calculateCarbonFootprint = (inputs: CarbonFootprintInputs): CarbonFootprintResult => {
  // Calculate electricity footprint (monthly to yearly)
  const electricityFootprint = inputs.electricity.amount * 12 * ELECTRICITY_FACTORS[inputs.electricity.source];
  
  // Calculate transportation footprint (weekly to yearly)
  const transportationFootprint = inputs.transportation.distance * 52 * TRANSPORTATION_FACTORS[inputs.transportation.mode];
  
  // Calculate diet footprint (daily to yearly)
  const dietFootprint = DIET_FACTORS[inputs.diet] * 365;
  
  // Calculate total footprint
  const totalFootprint = electricityFootprint + transportationFootprint + dietFootprint;
  
  // Estimate trees needed to offset (1 tree absorbs ~25kg CO2 per year)
  const treesNeeded = Math.ceil(totalFootprint / 25);
  
  // Estimate carbon credits (1 credit = 1 ton of CO2)
  const carbonCredits = totalFootprint / 1000;
  
  return {
    electricity: parseFloat(electricityFootprint.toFixed(2)),
    transportation: parseFloat(transportationFootprint.toFixed(2)),
    diet: parseFloat(dietFootprint.toFixed(2)),
    total: parseFloat(totalFootprint.toFixed(2)),
    treesNeeded,
    carbonCredits: parseFloat(carbonCredits.toFixed(2))
  };
};

// Get carbon source options for UI
export const getElectricitySourceOptions = () => {
  return Object.keys(ELECTRICITY_FACTORS).map(key => ({
    value: key,
    label: key.charAt(0).toUpperCase() + key.slice(1).replace('_', ' ')
  }));
};

export const getTransportationModeOptions = () => {
  return Object.keys(TRANSPORTATION_FACTORS).map(key => ({
    value: key,
    label: key.charAt(0).toUpperCase() + key.slice(1).replace('_', ' ')
  }));
};

export const getDietOptions = () => {
  return Object.keys(DIET_FACTORS).map(key => ({
    value: key,
    label: key.charAt(0).toUpperCase() + key.slice(1).replace('_', ' ')
  }));
};
