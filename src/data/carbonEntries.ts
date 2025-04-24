import { CarbonDataEntry } from '../types/carbonTypes';

// Carbon footprint dataset derived from dataset_cc.csv
export const carbonDataset: CarbonDataEntry[] = [
  // United States
  {
    country: "United States",
    sector: "Transportation",
    subSector: "Electric Car",
    totalCarbonEmission: 0.085, // kg CO2 per kilometer
    reusableAllocation: ["Renewable Charging", "Smart Charging", "Battery Recycling"],
    reusableCarbonPercentage: 0.40
  },
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
    subSector: "Smart Home Systems",
    totalCarbonEmission: 0.32, // kg CO2 per kWh
    reusableAllocation: ["IoT Optimization", "Automated Energy Management"],
    reusableCarbonPercentage: 0.55
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
    sector: "Agriculture",
    subSector: "Livestock",
    totalCarbonEmission: 13.5, // kg CO2 per kg product
    reusableAllocation: ["Sustainable Farming", "Methane Capture"],
    reusableCarbonPercentage: 0.25
  },
  {
    country: "United States",
    sector: "Transportation",
    subSector: "High-Speed Rail",
    totalCarbonEmission: 0.041, // kg CO2 per passenger kilometer
    reusableAllocation: ["Electric Trains", "Energy Recovery Systems"],
    reusableCarbonPercentage: 0.65
  },
  
  // India (Added as requested)
  {
    country: "India",
    sector: "Transportation",
    subSector: "Electric Rickshaw",
    totalCarbonEmission: 0.05, // kg CO2 per kilometer
    reusableAllocation: ["Solar Charging", "Battery Swapping"],
    reusableCarbonPercentage: 0.45
  },
  {
    country: "India",
    sector: "Transportation",
    subSector: "Car (Gasoline)",
    totalCarbonEmission: 0.210, // kg CO2 per kilometer
    reusableAllocation: ["Electric Vehicles", "Public Transportation", "CNG Conversion"],
    reusableCarbonPercentage: 0.30
  },
  {
    country: "India",
    sector: "Transportation",
    subSector: "Two-Wheeler",
    totalCarbonEmission: 0.08, // kg CO2 per kilometer
    reusableAllocation: ["Electric Scooters", "Cycling"],
    reusableCarbonPercentage: 0.40
  },
  {
    country: "India",
    sector: "Energy",
    subSector: "Electricity",
    totalCarbonEmission: 0.82, // kg CO2 per kWh (higher due to coal reliance)
    reusableAllocation: ["Solar Power", "Wind Power", "Biogas"],
    reusableCarbonPercentage: 0.50
  },
  {
    country: "India",
    sector: "Industry",
    subSector: "Textile Production",
    totalCarbonEmission: 0.75, // kg CO2 per kg product
    reusableAllocation: ["Sustainable Fibers", "Energy-Efficient Processing"],
    reusableCarbonPercentage: 0.40
  },
  {
    country: "India",
    sector: "Industry",
    subSector: "Manufacturing",
    totalCarbonEmission: 0.95, // kg CO2 per unit
    reusableAllocation: ["Energy Efficiency", "Clean Production"],
    reusableCarbonPercentage: 0.35
  },
  {
    country: "India",
    sector: "Agriculture",
    subSector: "Rice Cultivation",
    totalCarbonEmission: 3.9, // kg CO2 per kg
    reusableAllocation: ["Alternate Wetting Drying", "Improved Varieties"],
    reusableCarbonPercentage: 0.30
  },
  
  // United Kingdom
  {
    country: "United Kingdom",
    sector: "Building",
    subSector: "Smart Office",
    totalCarbonEmission: 0.15, // kg CO2 per square meter per hour
    reusableAllocation: ["Smart HVAC", "Occupancy-Based Lighting"],
    reusableCarbonPercentage: 0.55
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
    country: "United Kingdom",
    sector: "Building",
    subSector: "Residential Heating",
    totalCarbonEmission: 0.19, // kg CO2 per kWh
    reusableAllocation: ["Heat Pumps", "Home Insulation"],
    reusableCarbonPercentage: 0.50
  },
  
  // Germany
  {
    country: "Germany",
    sector: "Industry",
    subSector: "Chemical Manufacturing",
    totalCarbonEmission: 2.1, // kg CO2 per kg product
    reusableAllocation: ["Green Chemistry", "Process Optimization"],
    reusableCarbonPercentage: 0.35
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
    country: "Germany",
    sector: "Industry",
    subSector: "Steel Production",
    totalCarbonEmission: 1.8, // kg CO2 per kg steel
    reusableAllocation: ["Hydrogen Steel", "Electric Arc Furnaces"],
    reusableCarbonPercentage: 0.40
  },
  
  // Japan
  {
    country: "Japan",
    sector: "Transportation",
    subSector: "Hydrogen Bus",
    totalCarbonEmission: 0.085, // kg CO2 per kilometer
    reusableAllocation: ["Green Hydrogen", "Fuel Cell Optimization"],
    reusableCarbonPercentage: 0.60
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
    country: "Japan",
    sector: "Industry",
    subSector: "Automotive Manufacturing",
    totalCarbonEmission: 5.2, // kg CO2 per vehicle
    reusableAllocation: ["Green Manufacturing", "Recycled Materials"],
    reusableCarbonPercentage: 0.35
  },
  
  // China
  {
    country: "China",
    sector: "Industry",
    subSector: "Electronics Assembly",
    totalCarbonEmission: 0.45, // kg CO2 per unit
    reusableAllocation: ["Energy-Efficient Assembly", "Smart Factory Systems"],
    reusableCarbonPercentage: 0.40
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
  },
  {
    country: "China",
    sector: "Industry",
    subSector: "Cement Production",
    totalCarbonEmission: 0.83, // kg CO2 per kg
    reusableAllocation: ["Alternative Materials", "Energy Efficiency"],
    reusableCarbonPercentage: 0.25
  },
  
  // Brazil
  {
    country: "Brazil",
    sector: "Land Use",
    subSector: "Deforestation",
    totalCarbonEmission: 12.5, // kg CO2 per square meter
    reusableAllocation: ["Reforestation", "Sustainable Agriculture"],
    reusableCarbonPercentage: 0.70
  },
  {
    country: "Brazil",
    sector: "Agriculture",
    subSector: "Cattle Ranching",
    totalCarbonEmission: 16.3, // kg CO2 per kg beef
    reusableAllocation: ["Improved Feed", "Rotational Grazing"],
    reusableCarbonPercentage: 0.40
  },
  
  // Canada
  {
    country: "Canada",
    sector: "Transportation",
    subSector: "SUV/Truck",
    totalCarbonEmission: 0.23, // kg CO2 per kilometer
    reusableAllocation: ["Electric Vehicles", "Car Sharing"],
    reusableCarbonPercentage: 0.30
  },
  {
    country: "Canada",
    sector: "Building",
    subSector: "Winter Heating",
    totalCarbonEmission: 0.26, // kg CO2 per kWh
    reusableAllocation: ["Better Insulation", "Heat Pumps"],
    reusableCarbonPercentage: 0.45
  },
  
  // Australia
  {
    country: "Australia",
    sector: "Energy",
    subSector: "Coal Power",
    totalCarbonEmission: 0.85, // kg CO2 per kWh
    reusableAllocation: ["Solar Power", "Wind Power"],
    reusableCarbonPercentage: 0.60
  },
  {
    country: "Australia",
    sector: "Building",
    subSector: "Air Conditioning",
    totalCarbonEmission: 0.18, // kg CO2 per hour
    reusableAllocation: ["Solar Cooling", "Efficient Design"],
    reusableCarbonPercentage: 0.50
  }
];
