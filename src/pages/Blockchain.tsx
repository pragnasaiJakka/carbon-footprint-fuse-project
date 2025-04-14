
import React from 'react';
import { useNavigate } from 'react-router-dom';
import { 
  Database, 
  Shield, 
  FileCode, 
  ExternalLink, 
  ArrowLeft,
  Leaf,
  Link,
  Github,
  MessageCircle,
  BookOpen,
  Lock
} from 'lucide-react';
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import Header from '@/components/Header';

const Blockchain = () => {
  const navigate = useNavigate();
  const CONTRACT_ADDRESS = '0x123456789abcdef123456789abcdef123456789a';
  
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
            <Database className="mr-2 h-6 w-6" />
            Blockchain Technology
          </h1>
        </div>

        <div className="space-y-8">
          {/* Introduction */}
          <section className="prose max-w-none">
            <p className="text-lg text-eco-forest">
              Our platform leverages blockchain technology to create a transparent, secure, and immutable record of carbon-saving activities, allowing users to track, trade, and verify their environmental impact.
            </p>
          </section>

          {/* How Blockchain Powers Carbon Credits */}
          <section>
            <Card className="hover:shadow-md transition-shadow border-eco-blue-light">
              <CardHeader>
                <CardTitle className="flex items-center text-eco-forest">
                  <Leaf className="mr-2 h-5 w-5 text-eco-green" />
                  How Blockchain Powers Carbon Credits
                </CardTitle>
                <CardDescription>
                  Transparent and immutable carbon credit tracking
                </CardDescription>
              </CardHeader>
              <CardContent>
                <p className="mb-4">
                  Every carbon-saving action you take through our platform is tokenized into Carbon Credit Tokens (CCT) and logged on the blockchain. This creates a permanent, verifiable record that cannot be altered or tampered with.
                </p>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-6">
                  <div className="flex flex-col items-center text-center p-4 bg-eco-green/5 rounded-lg">
                    <Shield className="h-10 w-10 text-eco-green mb-2" />
                    <h3 className="font-semibold">Verified Actions</h3>
                    <p className="text-sm">Each eco-activity is verified before minting tokens</p>
                  </div>
                  <div className="flex flex-col items-center text-center p-4 bg-eco-green/5 rounded-lg">
                    <Database className="h-10 w-10 text-eco-blue mb-2" />
                    <h3 className="font-semibold">Immutable Records</h3>
                    <p className="text-sm">All transactions are permanently recorded on the blockchain</p>
                  </div>
                  <div className="flex flex-col items-center text-center p-4 bg-eco-green/5 rounded-lg">
                    <Link className="h-10 w-10 text-eco-forest mb-2" />
                    <h3 className="font-semibold">Tokenized Value</h3>
                    <p className="text-sm">Your environmental impact becomes a tradable asset</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </section>

          {/* Why Polygon Mumbai Testnet */}
          <section>
            <Card className="hover:shadow-md transition-shadow border-eco-blue-light">
              <CardHeader>
                <CardTitle className="flex items-center text-eco-forest">
                  <Database className="mr-2 h-5 w-5 text-eco-blue" />
                  Why Polygon Mumbai Testnet?
                </CardTitle>
                <CardDescription>
                  Development and testing environment
                </CardDescription>
              </CardHeader>
              <CardContent>
                <p>
                  We currently utilize the Polygon Mumbai testnet for development and testing purposes. This allows users to:
                </p>
                <ul className="list-disc pl-5 mt-4 space-y-2">
                  <li>Test carbon actions without spending real ETH or MATIC</li>
                  <li>Experience fast and low-cost transactions</li>
                  <li>Interact with our smart contracts in a safe environment</li>
                  <li>Prepare for our eventual migration to the Polygon mainnet</li>
                </ul>
                <div className="mt-6 p-4 bg-eco-blue/5 rounded-lg">
                  <p className="text-sm italic">
                    Note: Tokens on the testnet have no monetary value. When we launch on mainnet, a new token contract will be deployed.
                  </p>
                </div>
              </CardContent>
            </Card>
          </section>

          {/* Smart Contracts */}
          <section>
            <Card className="hover:shadow-md transition-shadow border-eco-blue-light">
              <CardHeader>
                <CardTitle className="flex items-center text-eco-forest">
                  <FileCode className="mr-2 h-5 w-5 text-eco-blue" />
                  Smart Contracts
                </CardTitle>
                <CardDescription>
                  Transparency and accessibility
                </CardDescription>
              </CardHeader>
              <CardContent>
                <p className="mb-4">
                  Our smart contracts are deployed on the Polygon Mumbai testnet. You can view the code, transactions, and events directly on the blockchain.
                </p>
                <div className="flex flex-col space-y-4">
                  <div className="flex flex-col p-4 border border-eco-green/20 rounded-lg">
                    <h3 className="font-semibold mb-2">Carbon Credit Token (CCT) Contract</h3>
                    <div className="flex items-center space-x-2 font-mono text-sm bg-eco-green/5 p-2 rounded overflow-x-auto">
                      <span>{CONTRACT_ADDRESS}</span>
                      <a 
                        href={`https://mumbai.polygonscan.com/address/${CONTRACT_ADDRESS}`} 
                        target="_blank" 
                        rel="noopener noreferrer"
                        className="text-eco-blue hover:text-eco-blue-dark"
                      >
                        <ExternalLink className="h-4 w-4" />
                      </a>
                    </div>
                  </div>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-2">
                    <a
                      href="https://github.com/your-repo/carbon-credit-dapp"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center justify-center space-x-2 p-4 bg-eco-green text-white rounded-lg hover:bg-eco-green-dark transition-colors"
                    >
                      <Github className="h-5 w-5" />
                      <span>View Source Code</span>
                    </a>
                    <a
                      href={`https://mumbai.polygonscan.com/address/${CONTRACT_ADDRESS}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center justify-center space-x-2 p-4 bg-eco-blue text-white rounded-lg hover:bg-eco-blue-dark transition-colors"
                    >
                      <ExternalLink className="h-5 w-5" />
                      <span>View on Block Explorer</span>
                    </a>
                  </div>
                </div>
              </CardContent>
            </Card>
          </section>

          {/* Security */}
          <section>
            <Card className="hover:shadow-md transition-shadow border-eco-blue-light">
              <CardHeader>
                <CardTitle className="flex items-center text-eco-forest">
                  <Lock className="mr-2 h-5 w-5 text-eco-blue" />
                  Security
                </CardTitle>
                <CardDescription>
                  Your data and assets are safe
                </CardDescription>
              </CardHeader>
              <CardContent>
                <p className="mb-4">
                  Security is a core principle of our platform. We've implemented several measures to ensure your data and assets remain secure:
                </p>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="p-4 border border-eco-green/20 rounded-lg">
                    <h3 className="font-semibold mb-2 flex items-center">
                      <Shield className="mr-2 h-5 w-5 text-eco-green" />
                      Non-Custodial Wallet
                    </h3>
                    <p className="text-sm">
                      You maintain full control of your private keys and tokens. We never have access to your funds.
                    </p>
                  </div>
                  <div className="p-4 border border-eco-green/20 rounded-lg">
                    <h3 className="font-semibold mb-2 flex items-center">
                      <Database className="mr-2 h-5 w-5 text-eco-blue" />
                      Decentralized Storage
                    </h3>
                    <p className="text-sm">
                      Critical data is stored on the blockchain, not on centralized servers that can be compromised.
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </section>

          {/* Future Vision */}
          <section>
            <Card className="hover:shadow-md transition-shadow border-eco-blue-light">
              <CardHeader>
                <CardTitle className="flex items-center text-eco-forest">
                  <BookOpen className="mr-2 h-5 w-5 text-eco-green" />
                  Future Vision
                </CardTitle>
                <CardDescription>
                  Our roadmap for blockchain integration
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <p>
                    We're continuously working to enhance our blockchain integration. Here's what's on our roadmap:
                  </p>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-4">
                    <div className="p-4 bg-eco-green/5 rounded-lg">
                      <h3 className="font-semibold mb-2">Mainnet Launch</h3>
                      <p className="text-sm">
                        Moving from testnet to Polygon mainnet for real-value carbon credits
                      </p>
                    </div>
                    <div className="p-4 bg-eco-green/5 rounded-lg">
                      <h3 className="font-semibold mb-2">NFT Badges</h3>
                      <p className="text-sm">
                        Achievement badges as NFTs to showcase your environmental impact
                      </p>
                    </div>
                    <div className="p-4 bg-eco-green/5 rounded-lg">
                      <h3 className="font-semibold mb-2">Carbon Offset Partners</h3>
                      <p className="text-sm">
                        Partnerships with verified carbon offset projects and organizations
                      </p>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </section>
        </div>
      </main>
    </div>
  );
};

export default Blockchain;
