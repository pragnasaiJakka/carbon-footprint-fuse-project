
import { carbonDataset } from '../data/carbonEntries';
import { CarbonFootprintResult, ActivityGuide } from '../types/carbonTypes';

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
export const getDataEntry = (country: string, sector: string, subSector: string) => {
  return carbonDataset.find(entry => 
    entry.country === country && 
    entry.sector === sector && 
    entry.subSector === subSector
  );
};

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

// Get all sectors across all countries
export const getAllSectors = (): string[] => {
  return Array.from(new Set(carbonDataset.map(entry => entry.sector)));
};

// Get all subsectors across all countries and sectors
export const getAllSubSectors = (): string[] => {
  return Array.from(new Set(carbonDataset.map(entry => entry.subSector)));
};
