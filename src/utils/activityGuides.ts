
import { ActivityGuide } from '../types/carbonTypes';

// Update the activity value guide based on sub-sector
export const getActivityGuide = (sector: string, subSector: string): ActivityGuide => {
  if (sector === 'Transportation') {
    if (subSector.includes('Electric')) {
      return {
        label: "Distance Traveled",
        description: "Total distance traveled in your electric vehicle",
        unit: "km",
        placeholder: "e.g., 100"
      };
    } else if (subSector.includes('Rail') || subSector.includes('Train')) {
      return {
        label: "Journey Distance",
        description: "Total distance of your rail journey",
        unit: "km",
        placeholder: "e.g., 500"
      };
    } else if (subSector.includes('Rickshaw')) {
      return {
        label: "Trip Distance",
        description: "Total distance of your rickshaw trip",
        unit: "km",
        placeholder: "e.g., 15"
      };
    }
    // Default transportation guide
    return {
      label: "Distance",
      description: "Total distance traveled",
      unit: "km",
      placeholder: "Enter distance"
    };
  }

  if (sector === 'Industry') {
    if (subSector.includes('Manufacturing') || subSector.includes('Production')) {
      return {
        label: "Production Volume",
        description: "Total units or weight of products manufactured",
        unit: "kg",
        placeholder: "e.g., 1000"
      };
    } else if (subSector.includes('Assembly')) {
      return {
        label: "Units Assembled",
        description: "Number of units assembled",
        unit: "units",
        placeholder: "e.g., 500"
      };
    }
  }

  if (sector === 'Building') {
    if (subSector.includes('Smart')) {
      return {
        label: "Operating Hours",
        description: "Total hours of smart building operation",
        unit: "hours",
        placeholder: "e.g., 168"
      };
    }
  }

  // Default guide for other sectors
  return {
    label: "Activity Amount",
    description: "Amount of activity performed",
    unit: "units",
    placeholder: "Enter amount"
  };
};
