
import React from 'react';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import CarbonCalculator from '@/components/CarbonCalculator';
import InfoCard from '@/components/InfoCard';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Calculator, Leaf, Lightbulb, Car, Link } from 'lucide-react';

const Index = () => {
  return (
    <div className="min-h-screen flex flex-col bg-gradient-to-b from-white to-eco-green-light/10">
      <Header />
      
      <main className="flex-grow container mx-auto px-4 py-8">
        {/* Hero Section */}
        <section className="py-12 md:py-20">
          <div className="max-w-4xl mx-auto text-center">
            <h1 className="text-4xl md:text-5xl font-bold text-eco-forest mb-6 animate-float">Carbon Footprint Fuse</h1>
            <p className="text-xl text-gray-700 mb-8">
              Merging accurate carbon footprint estimation with blockchain technology for a sustainable future.
            </p>
            <div className="flex flex-col sm:flex-row justify-center gap-4">
              <a href="#calculator" className="bg-eco-green hover:bg-eco-green-dark text-white px-6 py-3 rounded-lg font-medium transition-colors shadow-md">
                Calculate Your Footprint
              </a>
              <a href="#about" className="bg-white hover:bg-gray-100 text-eco-green-dark border border-eco-green px-6 py-3 rounded-lg font-medium transition-colors shadow-md">
                Learn More
              </a>
            </div>
          </div>
        </section>
        
        {/* Calculator Section */}
        <section className="py-12" id="calculator">
          <div className="max-w-4xl mx-auto text-center mb-12">
            <div className="inline-block p-2 bg-eco-green-light/30 rounded-lg mb-4">
              <Calculator className="h-6 w-6 text-eco-forest" />
            </div>
            <h2 className="text-3xl font-bold text-eco-forest mb-4">Calculate Your Impact</h2>
            <p className="text-gray-600">
              Understand your carbon footprint and explore ways to reduce or offset it.
            </p>
          </div>
          <CarbonCalculator />
        </section>
        
        {/* Information Section */}
        <section className="py-12" id="about">
          <div className="max-w-4xl mx-auto text-center mb-12">
            <div className="inline-block p-2 bg-eco-blue-light/30 rounded-lg mb-4">
              <Lightbulb className="h-6 w-6 text-eco-ocean" />
            </div>
            <h2 className="text-3xl font-bold text-eco-forest mb-4">Understanding Carbon Footprint</h2>
            <p className="text-gray-600">
              Learn about carbon emissions and how you can make a difference.
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
            <InfoCard
              title="What is a Carbon Footprint?"
              description="A carbon footprint measures the total greenhouse gas emissions caused by an individual, event, organization, service, or product."
              icon={<Leaf className="h-5 w-5 text-eco-forest" />}
              className="border-eco-green-light"
            />
            <InfoCard
              title="Reducing Your Impact"
              description="Simple lifestyle changes can significantly reduce your carbon footprint, from energy conservation to transportation choices."
              icon={<Lightbulb className="h-5 w-5 text-eco-forest" />}
              className="border-eco-green-light"
            />
            <InfoCard
              title="Carbon Offsets"
              description="Carbon offsets fund projects that reduce greenhouse gas emissions, effectively canceling out your own carbon footprint."
              icon={<Car className="h-5 w-5 text-eco-forest" />}
              className="border-eco-green-light"
            />
          </div>
        </section>
        
        {/* Blockchain Integration */}
        <section className="py-12" id="blockchain">
          <div className="max-w-4xl mx-auto text-center mb-12">
            <div className="inline-block p-2 bg-eco-earth-light/30 rounded-lg mb-4">
              <Link className="h-6 w-6 text-eco-earth" />
            </div>
            <h2 className="text-3xl font-bold text-eco-forest mb-4">Blockchain Integration</h2>
            <p className="text-gray-600">
              How we're using blockchain to revolutionize carbon credits and offsets.
            </p>
          </div>
          
          <Card className="border-eco-earth shadow-lg mb-8">
            <CardHeader>
              <CardTitle>Smart Contracts for Carbon Credits</CardTitle>
              <CardDescription>Transparent and verifiable carbon credit transactions</CardDescription>
            </CardHeader>
            <CardContent>
              <p className="text-gray-700 mb-4">
                Our platform leverages Ethereum smart contracts to tokenize carbon credits, making them easy to buy, sell, and track. Each credit represents 1 ton of CO₂ offset through verified environmental projects.
              </p>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-6">
                <div className="bg-eco-earth-light/20 p-4 rounded-lg text-center">
                  <h3 className="font-semibold text-eco-earth-dark">Transparency</h3>
                  <p className="text-sm">All transactions are publicly verifiable on the blockchain</p>
                </div>
                <div className="bg-eco-earth-light/20 p-4 rounded-lg text-center">
                  <h3 className="font-semibold text-eco-earth-dark">Traceability</h3>
                  <p className="text-sm">Track the origin and impact of each carbon credit</p>
                </div>
                <div className="bg-eco-earth-light/20 p-4 rounded-lg text-center">
                  <h3 className="font-semibold text-eco-earth-dark">Trust</h3>
                  <p className="text-sm">Eliminates intermediaries and reduces fraud</p>
                </div>
              </div>
            </CardContent>
          </Card>
          
          <div className="text-center">
            <p className="text-gray-600 italic">Smart contract integration coming soon!</p>
          </div>
        </section>
      </main>
      
      <Footer />
    </div>
  );
};

export default Index;
