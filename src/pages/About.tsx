
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Leaf, Users, Target, Award } from 'lucide-react';

const About = () => {
  return (
    <div className="min-h-screen bg-gradient-to-b from-eco-blue-light/30 to-eco-green-light/30">
      <div className="container mx-auto px-4 py-8">
        <div className="flex justify-center mb-8">
          <div className="flex items-center gap-2">
            <Leaf className="h-8 w-8 text-eco-forest" />
            <h1 className="text-2xl font-bold text-eco-forest">Carbon Footprint Fuse</h1>
          </div>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          <Card className="shadow-md border-eco-green">
            <CardHeader>
              <CardTitle className="flex items-center text-eco-forest">
                <Target className="mr-2 h-6 w-6" /> Our Mission
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p>
                Empower individuals and organizations to reduce their carbon footprint 
                using verified, transparent, and tokenized actions through blockchain technology.
              </p>
            </CardContent>
          </Card>
          
          <Card className="shadow-md border-eco-blue-light">
            <CardHeader>
              <CardTitle className="flex items-center text-eco-forest">
                <Users className="mr-2 h-6 w-6" /> Our Team
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div>
                  <h3 className="font-semibold">Rithvik Kaki</h3>
                  <p className="text-sm text-muted-foreground">
                    Lead Developer & Blockchain Strategist
                  </p>
                </div>
                <div>
                  <h3 className="font-semibold">Pragna Sai</h3>
                  <p className="text-sm text-muted-foreground">
                    Product Designer & Sustainability Consultant
                  </p>
                </div>
                <div>
                  <h3 className="font-semibold">Dr. Karthikeyan</h3>
                  <p className="text-sm text-muted-foreground">
                    Project Mentor & Academic Advisor
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>
          
          <Card className="shadow-md border-eco-green-light">
            <CardHeader>
              <CardTitle className="flex items-center text-eco-forest">
                <Award className="mr-2 h-6 w-6" /> Our Impact
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p>
                By bridging blockchain technology with carbon footprint tracking, 
                we're creating a transparent, verifiable system for environmental accountability.
              </p>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default About;
