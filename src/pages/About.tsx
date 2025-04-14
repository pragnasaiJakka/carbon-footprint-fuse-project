
import React from 'react';
import { useNavigate } from 'react-router-dom';
import { 
  Info, 
  ArrowLeft, 
  Leaf, 
  AlertTriangle, 
  Lightbulb, 
  Users, 
  HandshakeIcon, 
  HelpCircle,
  Shield
} from 'lucide-react';
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import Header from '@/components/Header';

const About = () => {
  const navigate = useNavigate();
  
  const handleGoBack = () => {
    navigate(-1);
  };

  return (
    <div className="min-h-screen flex flex-col bg-gradient-to-b from-white to-eco-green/5">
      <Header />
      
      <main className="flex-1 container mx-auto px-4 py-8">
        <div className="flex items-center space-x-4 mb-8">
          <Button 
            variant="outline" 
            size="icon" 
            onClick={handleGoBack}
            className="text-eco-forest border-eco-forest hover:bg-eco-forest/10"
          >
            <ArrowLeft className="h-5 w-5" />
          </Button>
          <h1 className="text-3xl font-bold text-eco-forest flex items-center">
            <Info className="mr-2 h-6 w-6" />
            About Carbon Footprint Fuse
          </h1>
        </div>

        <div className="space-y-8">
          {/* Mission */}
          <section>
            <Card className="hover:shadow-md transition-shadow border-eco-blue-light">
              <CardHeader>
                <CardTitle className="flex items-center text-eco-forest">
                  <Leaf className="mr-2 h-5 w-5 text-eco-green" />
                  Our Mission
                </CardTitle>
                <CardDescription>
                  Why we built this platform
                </CardDescription>
              </CardHeader>
              <CardContent>
                <p className="text-lg mb-4">
                  <span className="font-semibold">We empower individuals and organizations to reduce their carbon footprint using verified, transparent, and tokenized actions.</span>
                </p>
                <p>
                  Carbon Footprint Fuse combines blockchain technology with practical carbon tracking to create a new paradigm for environmental action. We believe that by making carbon footprint reduction measurable, verifiable, and rewarding, we can accelerate the transition to a more sustainable future.
                </p>
              </CardContent>
            </Card>
          </section>

          {/* The Problem */}
          <section>
            <Card className="hover:shadow-md transition-shadow border-eco-blue-light">
              <CardHeader>
                <CardTitle className="flex items-center text-eco-forest">
                  <AlertTriangle className="mr-2 h-5 w-5 text-eco-earth-dark" />
                  The Problem
                </CardTitle>
                <CardDescription>
                  What we're trying to solve
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <p>
                    Traditional carbon tracking faces several critical challenges:
                  </p>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-4">
                    <div className="p-4 bg-eco-green/5 rounded-lg">
                      <h3 className="font-semibold mb-2">Lack of Transparency</h3>
                      <p className="text-sm">
                        Carbon offset claims are often difficult to verify and trace
                      </p>
                    </div>
                    <div className="p-4 bg-eco-green/5 rounded-lg">
                      <h3 className="font-semibold mb-2">Centralized Control</h3>
                      <p className="text-sm">
                        Offset markets are controlled by intermediaries who take large fees
                      </p>
                    </div>
                    <div className="p-4 bg-eco-green/5 rounded-lg">
                      <h3 className="font-semibold mb-2">Complex Access</h3>
                      <p className="text-sm">
                        Individuals have few options to participate in carbon markets
                      </p>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </section>

          {/* Our Solution */}
          <section>
            <Card className="hover:shadow-md transition-shadow border-eco-blue-light">
              <CardHeader>
                <CardTitle className="flex items-center text-eco-forest">
                  <Lightbulb className="mr-2 h-5 w-5 text-eco-blue" />
                  Our Solution
                </CardTitle>
                <CardDescription>
                  How we're addressing the challenge
                </CardDescription>
              </CardHeader>
              <CardContent>
                <p className="mb-4">
                  Carbon Footprint Fuse combines several innovative approaches to create a more transparent, accessible, and effective carbon tracking system:
                </p>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-4">
                    <div className="flex items-start">
                      <div className="bg-eco-green-light p-2 rounded-full mr-3 mt-1">
                        <Leaf className="h-4 w-4 text-eco-forest" />
                      </div>
                      <div>
                        <h3 className="font-semibold">Accurate Carbon Calculation</h3>
                        <p className="text-sm">
                          Our advanced calculator considers multiple factors to provide precise carbon footprint measurements
                        </p>
                      </div>
                    </div>
                    <div className="flex items-start">
                      <div className="bg-eco-green-light p-2 rounded-full mr-3 mt-1">
                        <Shield className="h-4 w-4 text-eco-forest" />
                      </div>
                      <div>
                        <h3 className="font-semibold">Blockchain Verification</h3>
                        <p className="text-sm">
                          Every carbon-saving action is recorded on the blockchain, creating an immutable audit trail
                        </p>
                      </div>
                    </div>
                  </div>
                  <div className="space-y-4">
                    <div className="flex items-start">
                      <div className="bg-eco-green-light p-2 rounded-full mr-3 mt-1">
                        <Users className="h-4 w-4 text-eco-forest" />
                      </div>
                      <div>
                        <h3 className="font-semibold">Individual Empowerment</h3>
                        <p className="text-sm">
                          Direct rewards for personal carbon-saving activities, making sustainable choices financially beneficial
                        </p>
                      </div>
                    </div>
                    <div className="flex items-start">
                      <div className="bg-eco-green-light p-2 rounded-full mr-3 mt-1">
                        <Info className="h-4 w-4 text-eco-forest" />
                      </div>
                      <div>
                        <h3 className="font-semibold">Education & Awareness</h3>
                        <p className="text-sm">
                          Interactive tools that make carbon footprint concepts accessible and actionable
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </section>

          {/* Who We Are */}
          <section>
            <Card className="hover:shadow-md transition-shadow border-eco-blue-light">
              <CardHeader>
                <CardTitle className="flex items-center text-eco-forest">
                  <Users className="mr-2 h-5 w-5 text-eco-blue" />
                  Who We Are
                </CardTitle>
                <CardDescription>
                  The team behind Carbon Footprint Fuse
                </CardDescription>
              </CardHeader>
              <CardContent>
                <p className="mb-6">
                  Carbon Footprint Fuse was created by a team of students and developers passionate about using technology to address environmental challenges. We believe that blockchain technology offers unique opportunities to create more transparent, efficient, and accessible systems for environmental action.
                </p>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div className="flex flex-col items-center text-center p-6 bg-eco-green/5 rounded-lg">
                    <div className="w-20 h-20 bg-eco-green/20 rounded-full flex items-center justify-center mb-4">
                      <Users className="h-10 w-10 text-eco-forest" />
                    </div>
                    <h3 className="font-semibold">The Developers</h3>
                    <p className="text-sm mt-2">
                      Computer science students with expertise in blockchain, web development, and UI/UX design
                    </p>
                  </div>
                  <div className="flex flex-col items-center text-center p-6 bg-eco-green/5 rounded-lg">
                    <div className="w-20 h-20 bg-eco-green/20 rounded-full flex items-center justify-center mb-4">
                      <Leaf className="h-10 w-10 text-eco-forest" />
                    </div>
                    <h3 className="font-semibold">Environmental Advisors</h3>
                    <p className="text-sm mt-2">
                      Sustainability experts who ensure our carbon calculations and methodologies are scientifically sound
                    </p>
                  </div>
                  <div className="flex flex-col items-center text-center p-6 bg-eco-green/5 rounded-lg">
                    <div className="w-20 h-20 bg-eco-green/20 rounded-full flex items-center justify-center mb-4">
                      <Info className="h-10 w-10 text-eco-forest" />
                    </div>
                    <h3 className="font-semibold">You!</h3>
                    <p className="text-sm mt-2">
                      Our community of users who provide feedback, suggest features, and help us improve the platform
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </section>

          {/* Future Partners */}
          <section>
            <Card className="hover:shadow-md transition-shadow border-eco-blue-light">
              <CardHeader>
                <CardTitle className="flex items-center text-eco-forest">
                  <HandshakeIcon className="mr-2 h-5 w-5 text-eco-green" />
                  Our Partners
                </CardTitle>
                <CardDescription>
                  Organizations we work with (Future)
                </CardDescription>
              </CardHeader>
              <CardContent>
                <p className="mb-6 italic">
                  We're actively building partnerships with environmental organizations, carbon offset projects, and sustainability-focused companies. If you're interested in partnering with us, please reach out.
                </p>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
                  <div className="flex flex-col items-center justify-center p-6 bg-white/50 border border-eco-green/20 rounded-lg h-32">
                    <div className="text-eco-green/30 text-center">
                      <Leaf className="h-12 w-12 mx-auto" />
                      <p className="text-sm mt-2">Future Partner</p>
                    </div>
                  </div>
                  <div className="flex flex-col items-center justify-center p-6 bg-white/50 border border-eco-green/20 rounded-lg h-32">
                    <div className="text-eco-green/30 text-center">
                      <Leaf className="h-12 w-12 mx-auto" />
                      <p className="text-sm mt-2">Future Partner</p>
                    </div>
                  </div>
                  <div className="flex flex-col items-center justify-center p-6 bg-white/50 border border-eco-green/20 rounded-lg h-32">
                    <div className="text-eco-green/30 text-center">
                      <Leaf className="h-12 w-12 mx-auto" />
                      <p className="text-sm mt-2">Future Partner</p>
                    </div>
                  </div>
                  <div className="flex flex-col items-center justify-center p-6 bg-white/50 border border-eco-green/20 rounded-lg h-32">
                    <div className="text-eco-green/30 text-center">
                      <Leaf className="h-12 w-12 mx-auto" />
                      <p className="text-sm mt-2">Future Partner</p>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </section>

          {/* FAQs */}
          <section>
            <Card className="hover:shadow-md transition-shadow border-eco-blue-light">
              <CardHeader>
                <CardTitle className="flex items-center text-eco-forest">
                  <HelpCircle className="mr-2 h-5 w-5 text-eco-blue" />
                  Frequently Asked Questions
                </CardTitle>
                <CardDescription>
                  Common questions about our platform
                </CardDescription>
              </CardHeader>
              <CardContent>
                <Accordion type="single" collapsible className="w-full">
                  <AccordionItem value="item-1">
                    <AccordionTrigger>Are these real carbon credits?</AccordionTrigger>
                    <AccordionContent>
                      Currently, our platform is operating on the Polygon Mumbai testnet, which means the carbon credits are for demonstration purposes only. When we launch on mainnet, our tokens will represent real carbon offsets that comply with recognized standards.
                    </AccordionContent>
                  </AccordionItem>
                  <AccordionItem value="item-2">
                    <AccordionTrigger>Can I trade my Carbon Credit Tokens (CCT)?</AccordionTrigger>
                    <AccordionContent>
                      Yes, you can trade your CCT tokens on our marketplace with other users. This creates a decentralized market for carbon credits, allowing those who reduce their carbon footprint to be rewarded by those looking to offset their emissions.
                    </AccordionContent>
                  </AccordionItem>
                  <AccordionItem value="item-3">
                    <AccordionTrigger>How accurate is the carbon footprint calculator?</AccordionTrigger>
                    <AccordionContent>
                      Our calculator uses industry-standard methodologies and data sources to provide estimates of your carbon footprint. While no calculator can be 100% accurate due to the complexity of carbon emissions, we strive to provide the most accurate estimates possible based on the information you provide.
                    </AccordionContent>
                  </AccordionItem>
                  <AccordionItem value="item-4">
                    <AccordionTrigger>Is the platform secure?</AccordionTrigger>
                    <AccordionContent>
                      Yes, we utilize blockchain technology which provides inherent security benefits. Your tokens are stored in your non-custodial wallet, meaning only you have access to them. Additionally, all transactions are transparent and verifiable on the blockchain.
                    </AccordionContent>
                  </AccordionItem>
                  <AccordionItem value="item-5">
                    <AccordionTrigger>How can I contribute to the project?</AccordionTrigger>
                    <AccordionContent>
                      We welcome contributions from developers, environmental experts, and enthusiasts. You can contribute by providing feedback, suggesting features, or even contributing code if you're a developer. Reach out to us through our GitHub repository or contact form.
                    </AccordionContent>
                  </AccordionItem>
                </Accordion>
              </CardContent>
            </Card>
          </section>
        </div>
      </main>
    </div>
  );
};

export default About;
