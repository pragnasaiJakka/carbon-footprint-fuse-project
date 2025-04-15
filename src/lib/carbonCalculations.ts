
// Simple carbon footprint calculation utilities

// Electricity carbon factors (kg CO2 per kWh)
const ELECTRICITY_FACTORS = {
  coal: 0.9, // kg CO2 per kWh
  natural_gas: 0.4,
  renewable: 0.01,
  mixed: 0.5,
  nuclear: 0.02,
  biomass: 0.23,
  hydroelectric: 0.024
};

// Transportation carbon factors (kg CO2 per km)
const TRANSPORTATION_FACTORS = {
  car_gasoline: 0.19, // kg CO2 per km
  car_diesel: 0.17,
  car_electric: 0.05,
  car_hybrid: 0.11,
  motorcycle: 0.11,
  bus: 0.1,
  train: 0.04,
  subway: 0.03,
  plane_short: 0.25,
  plane_long: 0.18,
  ferry: 0.22,
  walking: 0,
  cycling: 0
};

// Diet carbon factors (kg CO2 per day)
const DIET_FACTORS = {
  meat_heavy: 7.19, // kg CO2 per day
  balanced: 4.67,
  pescatarian: 3.91,
  vegetarian: 3.81,
  vegan: 2.89,
  low_carbon: 2.5
};

// Country adjustment factors (multipliers)
// These adjust for country-specific conditions like grid mix, infrastructure, etc.
const COUNTRY_FACTORS = {
  "United States": 1.0,
  "United Kingdom": 0.8,
  "Germany": 0.85,
  "France": 0.55, // Low due to high nuclear mix
  "China": 1.2,
  "India": 1.15,
  "Japan": 0.9,
  "Australia": 1.1,
  "Brazil": 0.7, // Low due to high renewables
  "Canada": 0.75,
  "Russia": 1.25,
  "South Africa": 1.3,
  "Mexico": 0.95,
  "Spain": 0.8,
  "Italy": 0.85,
  "Netherlands": 0.9,
  "Sweden": 0.5, // Very low carbon electricity
  "Singapore": 1.0,
  "Nigeria": 1.05,
  "South Korea": 0.95
};

// Housing carbon factors (kg CO2 per square meter per year)
const HOUSING_FACTORS = {
  apartment: 32,
  house_small: 45,
  house_medium: 60,
  house_large: 80,
  passive_house: 15,
  energy_efficient: 25
};

// Waste carbon factors (kg CO2 per kg of waste)
const WASTE_FACTORS = {
  recycling_high: 0.5,
  recycling_medium: 1.0,
  recycling_low: 1.5,
  no_recycling: 2.0
};

export interface CarbonFootprintInputs {
  country: string;
  electricity: {
    amount: number; // kWh per month
    source: keyof typeof ELECTRICITY_FACTORS;
  };
  transportation: {
    distance: number; // km per week
    mode: keyof typeof TRANSPORTATION_FACTORS;
  };
  diet: keyof typeof DIET_FACTORS;
  // Optional additional fields
  housing?: {
    type: keyof typeof HOUSING_FACTORS;
    size: number; // square meters
  };
  waste?: {
    level: keyof typeof WASTE_FACTORS;
    amount: number; // kg per week
  };
}

export interface CarbonFootprintResult {
  electricity: number; // kg CO2
  transportation: number; // kg CO2
  diet: number; // kg CO2
  housing?: number; // kg CO2
  waste?: number; // kg CO2
  total: number; // kg CO2
  treesNeeded: number; // Number of trees to offset
  carbonCredits: number; // Estimated carbon credits
}

// Calculate carbon footprint based on inputs
export const calculateCarbonFootprint = (inputs: CarbonFootprintInputs): CarbonFootprintResult => {
  // Get country adjustment factor (default to 1.0 if country not found)
  const countryFactor = COUNTRY_FACTORS[inputs.country as keyof typeof COUNTRY_FACTORS] || 1.0;
  
  // Calculate electricity footprint (monthly to yearly)
  const electricityFootprint = inputs.electricity.amount * 12 * ELECTRICITY_FACTORS[inputs.electricity.source] * countryFactor;
  
  // Calculate transportation footprint (weekly to yearly)
  const transportationFootprint = inputs.transportation.distance * 52 * TRANSPORTATION_FACTORS[inputs.transportation.mode] * countryFactor;
  
  // Calculate diet footprint (daily to yearly)
  const dietFootprint = DIET_FACTORS[inputs.diet] * 365 * countryFactor;

  // Calculate optional housing footprint
  let housingFootprint = 0;
  if (inputs.housing) {
    housingFootprint = HOUSING_FACTORS[inputs.housing.type] * inputs.housing.size * countryFactor;
  }

  // Calculate optional waste footprint
  let wasteFootprint = 0;
  if (inputs.waste) {
    wasteFootprint = WASTE_FACTORS[inputs.waste.level] * inputs.waste.amount * 52 * countryFactor;
  }
  
  // Calculate total footprint
  const totalFootprint = electricityFootprint + transportationFootprint + dietFootprint + housingFootprint + wasteFootprint;
  
  // Estimate trees needed to offset (1 tree absorbs ~25kg CO2 per year)
  const treesNeeded = Math.ceil(totalFootprint / 25);
  
  // Estimate carbon credits (1 credit = 1 ton of CO2)
  const carbonCredits = totalFootprint / 1000;
  
  const result: CarbonFootprintResult = {
    electricity: parseFloat(electricityFootprint.toFixed(2)),
    transportation: parseFloat(transportationFootprint.toFixed(2)),
    diet: parseFloat(dietFootprint.toFixed(2)),
    total: parseFloat(totalFootprint.toFixed(2)),
    treesNeeded,
    carbonCredits: parseFloat(carbonCredits.toFixed(2))
  };

  // Add optional fields if provided
  if (inputs.housing) {
    result.housing = parseFloat(housingFootprint.toFixed(2));
  }
  
  if (inputs.waste) {
    result.waste = parseFloat(wasteFootprint.toFixed(2));
  }
  
  return result;
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

export const getCountryOptions = () => {
  return Object.keys(COUNTRY_FACTORS).map(key => ({
    value: key,
    label: key
  }));
};

export const getHousingTypeOptions = () => {
  return Object.keys(HOUSING_FACTORS).map(key => ({
    value: key,
    label: key.charAt(0).toUpperCase() + key.slice(1).replace('_', ' ')
  }));
};

export const getWasteLevelOptions = () => {
  return Object.keys(WASTE_FACTORS).map(key => ({
    value: key,
    label: key.charAt(0).toUpperCase() + key.slice(1).replace('_', ' ')
  }));
};
