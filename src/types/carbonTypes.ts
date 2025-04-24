
export interface CarbonDataEntry {
  country: string;
  sector: string;
  subSector: string;
  totalCarbonEmission: number;
  reusableAllocation: string[];
  reusableCarbonPercentage: number;
}

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

export interface ActivityGuide {
  label: string;
  description: string;
  unit: string;
  placeholder: string;
}
