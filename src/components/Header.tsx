
import React from 'react';
import { Leaf } from 'lucide-react';

const Header = () => {
  return (
    <header className="w-full py-4 bg-gradient-to-r from-eco-green-light to-eco-blue-light shadow-md">
      <div className="container mx-auto px-4 flex items-center justify-between">
        <div className="flex items-center space-x-2">
          <Leaf className="h-8 w-8 text-eco-forest" />
          <h1 className="text-2xl font-bold text-eco-forest">Carbon Footprint Fuse</h1>
        </div>
        <div className="hidden md:flex items-center space-x-6">
          <a href="#calculator" className="text-eco-forest hover:text-eco-green-dark transition-colors">Calculator</a>
          <a href="#about" className="text-eco-forest hover:text-eco-green-dark transition-colors">About</a>
          <a href="#blockchain" className="text-eco-forest hover:text-eco-green-dark transition-colors">Blockchain</a>
        </div>
        <div className="flex items-center">
          <button className="bg-eco-green text-white px-4 py-2 rounded-md hover:bg-eco-green-dark transition-colors">
            Connect Wallet
          </button>
        </div>
      </div>
    </header>
  );
};

export default Header;
