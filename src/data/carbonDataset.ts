
// Carbon footprint dataset derived from dataset_cc.csv
export interface CarbonDataEntry {
  country: string;
  sector: string;
  subSector: string;
  totalCarbonEmission: number;
  reusableAllocation: string[];
  reusableCarbonPercentage: number;
}

// Sample dataset structure - in a real application, this would be loaded from an API or CSV
export const carbonDataset: CarbonDataEntry[] = [
  {
    country: "United States",
    sector: "Transportation",
    subSector: "Car (Gasoline)",
    totalCarbonEmission: 0.192, // kg CO2 per kilometer
    reusableAllocation: ["Electric Vehicles", "Public Transportation", "Carpooling"],
    reusableCarbonPercentage: 0.35
  },
  {
    country: "United States",
    sector: "Transportation",
    subSector: "Car (Diesel)",
    totalCarbonEmission: 0.171, // kg CO2 per kilometer
    reusableAllocation: ["Electric Vehicles", "Biofuels", "Carpooling"],
    reusableCarbonPercentage: 0.30
  },
  {
    country: "United States",
    sector: "Transportation",
    subSector: "Bus",
    totalCarbonEmission: 0.105, // kg CO2 per passenger kilometer
    reusableAllocation: ["Electric Buses", "Biofuel Buses"],
    reusableCarbonPercentage: 0.45
  },
  {
    country: "United States",
    sector: "Transportation",
    subSector: "Air Travel",
    totalCarbonEmission: 0.255, // kg CO2 per passenger kilometer
    reusableAllocation: ["Sustainable Aviation Fuels", "Carbon Offset Programs"],
    reusableCarbonPercentage: 0.15
  },
  {
    country: "United States",
    sector: "Energy",
    subSector: "Electricity",
    totalCarbonEmission: 0.42, // kg CO2 per kWh
    reusableAllocation: ["Solar Power", "Wind Power", "Hydropower"],
    reusableCarbonPercentage: 0.60
  },
  {
    country: "United States",
    sector: "Energy",
    subSector: "Natural Gas",
    totalCarbonEmission: 0.198, // kg CO2 per kWh
    reusableAllocation: ["Biogas", "Hydrogen Blending"],
    reusableCarbonPercentage: 0.25
  },
  {
    country: "United States",
    sector: "Household",
    subSector: "Heating",
    totalCarbonEmission: 0.35, // kg CO2 per hour
    reusableAllocation: ["Heat Pumps", "Solar Thermal", "Improved Insulation"],
    reusableCarbonPercentage: 0.40
  },
  {
    country: "United States",
    sector: "Household",
    subSector: "Cooking",
    totalCarbonEmission: 0.17, // kg CO2 per hour
    reusableAllocation: ["Induction Cooking", "Solar Cookers"],
    reusableCarbonPercentage: 0.35
  },
  {
    country: "United Kingdom",
    sector: "Transportation",
    subSector: "Car (Gasoline)",
    totalCarbonEmission: 0.18, // kg CO2 per kilometer
    reusableAllocation: ["Electric Vehicles", "Public Transportation", "Cycling Infrastructure"],
    reusableCarbonPercentage: 0.38
  },
  {
    country: "United Kingdom",
    sector: "Energy",
    subSector: "Electricity",
    totalCarbonEmission: 0.23, // kg CO2 per kWh
    reusableAllocation: ["Offshore Wind", "Solar Power", "Tidal Energy"],
    reusableCarbonPercentage: 0.65
  },
  {
    country: "Germany",
    sector: "Transportation",
    subSector: "Car (Diesel)",
    totalCarbonEmission: 0.16, // kg CO2 per kilometer
    reusableAllocation: ["Electric Vehicles", "Hydrogen Fuel Cells"],
    reusableCarbonPercentage: 0.32
  },
  {
    country: "Germany",
    sector: "Energy",
    subSector: "Electricity",
    totalCarbonEmission: 0.35, // kg CO2 per kWh
    reusableAllocation: ["Wind Power", "Solar Power", "Biomass"],
    reusableCarbonPercentage: 0.58
  },
  {
    country: "Japan",
    sector: "Transportation",
    subSector: "Train",
    totalCarbonEmission: 0.021, // kg CO2 per passenger kilometer
    reusableAllocation: ["Electric Trains", "Maglev Technology"],
    reusableCarbonPercentage: 0.75
  },
  {
    country: "Japan",
    sector: "Household",
    subSector: "Electronics",
    totalCarbonEmission: 0.12, // kg CO2 per hour
    reusableAllocation: ["Energy-Efficient Appliances", "Smart Home Systems"],
    reusableCarbonPercentage: 0.48
  },
  {
    country: "China",
    sector: "Transportation",
    subSector: "Electric Vehicle",
    totalCarbonEmission: 0.08, // kg CO2 per kilometer
    reusableAllocation: ["Renewable Charging", "Battery Recycling"],
    reusableCarbonPercentage: 0.52
  },
  {
    country: "China",
    sector: "Energy",
    subSector: "Coal Power",
    totalCarbonEmission: 0.9, // kg CO2 per kWh
    reusableAllocation: ["Carbon Capture", "Transition to Renewables"],
    reusableCarbonPercentage: 0.18
  }
];

// Get unique countries
export const getCountries = (): string[] => {
  return Array.from(new Set(carbonDataset.map(entry => entry.country)));
};

// Get sectors for a specific country
export const getSectors = (country: string): string[] => {
  const filtered = carbonDataset.filter(entry => entry.country === country);
  return Array.from(new Set(filtered.map(entry => entry.sector)));
};

// Get sub-sectors for a specific country and sector
export const getSubSectors = (country: string, sector: string): string[] => {
  const filtered = carbonDataset.filter(entry => entry.country === country && entry.sector === sector);
  return Array.from(new Set(filtered.map(entry => entry.subSector)));
};

// Get data entry for a specific combination
export const getDataEntry = (country: string, sector: string, subSector: string): CarbonDataEntry | undefined => {
  return carbonDataset.find(entry => 
    entry.country === country && 
    entry.sector === sector && 
    entry.subSector === subSector
  );
};

export interface CarbonFootprintResult {
  totalEmission: number;
  reusableCarbon: number;
  suggestions: string[];
  timestamp: number;
  activity: {
    country: string;
    sector: string;
    subSector: string;
    value: number;
  };
}

// Save result to localStorage
export const saveCalculationResult = (result: CarbonFootprintResult): void => {
  localStorage.setItem('carbonCalculationResult', JSON.stringify(result));
};

// Get saved result from localStorage
export const getSavedCalculationResult = (): CarbonFootprintResult | null => {
  const saved = localStorage.getItem('carbonCalculationResult');
  if (saved) {
    return JSON.parse(saved);
  }
  return null;
};
