
import React from 'react';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import CarbonCalculator from '@/components/CarbonCalculator';

const CalculatorPage = () => {
  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      
      <main className="flex-1 container mx-auto px-4 py-8">
        <div className="mb-8 text-center">
          <h1 className="text-3xl font-bold text-eco-forest">Calculate Your Carbon Footprint</h1>
          <p className="text-muted-foreground mt-2">
            Measure your environmental impact and discover how you can offset it with carbon credits
          </p>
        </div>
        
        <CarbonCalculator />
      </main>
      
      <Footer />
    </div>
  );
};

export default CalculatorPage;
