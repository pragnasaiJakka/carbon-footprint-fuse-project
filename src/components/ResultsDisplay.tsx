
import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, PieChart, Pie, Cell } from 'recharts';
import { AlertTriangle, Tree, CreditCard } from 'lucide-react';
import { Button } from "@/components/ui/button";

interface ResultsDisplayProps {
  result: {
    electricity: number;
    transportation: number;
    diet: number;
    total: number;
    treesNeeded: number;
    carbonCredits: number;
  };
}

const ResultsDisplay: React.FC<ResultsDisplayProps> = ({ result }) => {
  const formattedData = [
    { name: 'Electricity', value: result.electricity },
    { name: 'Transportation', value: result.transportation },
    { name: 'Diet', value: result.diet },
  ];

  const COLORS = ['#8DD9B8', '#81D4FA', '#D7CCC8'];

  // Determine carbon footprint category
  const getCarbonCategory = (total: number) => {
    if (total < 5000) return { label: 'Low', color: 'text-eco-green' };
    if (total < 10000) return { label: 'Moderate', color: 'text-amber-500' };
    return { label: 'High', color: 'text-red-500' };
  };

  const category = getCarbonCategory(result.total);

  return (
    <div className="space-y-6">
      <Card className="shadow-lg border-eco-blue-light overflow-hidden">
        <CardHeader className="bg-gradient-to-r from-eco-blue-light/50 to-eco-green-light/50">
          <CardTitle className="text-2xl text-eco-forest">Your Carbon Footprint Results</CardTitle>
          <CardDescription>Based on the information you provided</CardDescription>
        </CardHeader>
        <CardContent className="pt-6">
          <div className="text-center mb-6">
            <h3 className="text-3xl font-bold">{result.total.toLocaleString()} kg CO₂</h3>
            <p className="text-muted-foreground">Estimated yearly emissions</p>
            <div className="flex items-center justify-center mt-2">
              <span className={`text-lg font-semibold ${category.color}`}>{category.label} Impact</span>
              {category.label === 'High' && <AlertTriangle className="ml-2 h-5 w-5 text-red-500" />}
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
            <div className="h-64">
              <h4 className="text-center font-semibold mb-2">Emission Sources</h4>
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={formattedData} layout="vertical">
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis type="number" unit=" kg" />
                  <YAxis dataKey="name" type="category" />
                  <Tooltip formatter={(value) => [`${value} kg CO₂`, 'Emissions']} />
                  <Bar dataKey="value" fill="#4CAF50" />
                </BarChart>
              </ResponsiveContainer>
            </div>
            <div className="h-64">
              <h4 className="text-center font-semibold mb-2">Breakdown</h4>
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={formattedData}
                    cx="50%"
                    cy="50%"
                    labelLine={false}
                    outerRadius={80}
                    fill="#8884d8"
                    dataKey="value"
                    label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                  >
                    {formattedData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                    ))}
                  </Pie>
                  <Tooltip formatter={(value) => [`${value} kg CO₂`, 'Emissions']} />
                </PieChart>
              </ResponsiveContainer>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <Card className="border-eco-green-light">
              <CardContent className="pt-6">
                <div className="flex flex-col items-center text-center">
                  <Tree className="h-12 w-12 text-eco-green mb-2" />
                  <h3 className="text-xl font-semibold">{result.treesNeeded} Trees</h3>
                  <p className="text-sm text-muted-foreground">needed yearly to offset your emissions</p>
                </div>
              </CardContent>
            </Card>
            <Card className="border-eco-blue-light">
              <CardContent className="pt-6">
                <div className="flex flex-col items-center text-center">
                  <CreditCard className="h-12 w-12 text-eco-blue mb-2" />
                  <h3 className="text-xl font-semibold">{result.carbonCredits} Credits</h3>
                  <p className="text-sm text-muted-foreground">estimated carbon credits (1 credit = 1 ton CO₂)</p>
                </div>
              </CardContent>
            </Card>
          </div>
          
          <div className="mt-8 text-center">
            <Button className="bg-eco-green hover:bg-eco-green-dark text-white">
              Purchase Carbon Offsets
            </Button>
            <p className="mt-2 text-sm text-muted-foreground">Coming soon with blockchain integration</p>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default ResultsDisplay;
