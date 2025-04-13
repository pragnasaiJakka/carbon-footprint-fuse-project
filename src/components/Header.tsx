
import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Leaf, LogIn } from 'lucide-react';
import { Button } from "@/components/ui/button";

const Header = () => {
  const navigate = useNavigate();
  const isLoggedIn = localStorage.getItem('isLoggedIn') === 'true';

  return (
    <header className="w-full py-4 bg-gradient-to-r from-eco-green-light to-eco-blue-light shadow-md">
      <div className="container mx-auto px-4 flex items-center justify-between">
        <div className="flex items-center space-x-2">
          <Link to="/" className="flex items-center space-x-2">
            <Leaf className="h-8 w-8 text-eco-forest" />
            <h1 className="text-2xl font-bold text-eco-forest">Carbon Footprint Fuse</h1>
          </Link>
        </div>
        <div className="hidden md:flex items-center space-x-6">
          <Link to="/" className="text-eco-forest hover:text-eco-green-dark transition-colors">Calculator</Link>
          <Link to="/dashboard" className="text-eco-forest hover:text-eco-green-dark transition-colors">Marketplace</Link>
          <a href="#about" className="text-eco-forest hover:text-eco-green-dark transition-colors">About</a>
          <a href="#blockchain" className="text-eco-forest hover:text-eco-green-dark transition-colors">Blockchain</a>
        </div>
        <div className="flex items-center">
          {isLoggedIn ? (
            <Button 
              className="bg-eco-green text-white px-4 py-2 rounded-md hover:bg-eco-green-dark transition-colors"
              onClick={() => navigate('/dashboard')}
            >
              Dashboard
            </Button>
          ) : (
            <Button 
              className="bg-eco-green text-white px-4 py-2 rounded-md hover:bg-eco-green-dark transition-colors"
              onClick={() => navigate('/login')}
            >
              <LogIn className="mr-2 h-4 w-4" />
              Login
            </Button>
          )}
        </div>
      </div>
    </header>
  );
};

export default Header;
