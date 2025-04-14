
import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Leaf, LogIn, LogOut, Calculator, Info, Database } from 'lucide-react';
import { Button } from "@/components/ui/button";
import { useToast } from '@/hooks/use-toast';

const Header = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const isLoggedIn = localStorage.getItem('isLoggedIn') === 'true';

  const handleLogout = () => {
    // Clear user session
    localStorage.removeItem('isLoggedIn');
    localStorage.removeItem('walletAddress');
    
    // Show toast notification
    toast({
      title: "Logged out",
      description: "You have been successfully logged out",
    });
    
    // Navigate to login page
    navigate('/login');
  };

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
          <Link to="/" className="text-eco-forest hover:text-eco-green-dark transition-colors">Home</Link>
          <Link to="/calculator" className="text-eco-forest hover:text-eco-green-dark transition-colors">Calculator</Link>
          <Link to="/dashboard" className="text-eco-forest hover:text-eco-green-dark transition-colors">Marketplace</Link>
          <Link to="/blockchain" className="text-eco-forest hover:text-eco-green-dark transition-colors flex items-center">
            <Database className="h-4 w-4 mr-1" />
            Blockchain
          </Link>
          <Link to="/about" className="text-eco-forest hover:text-eco-green-dark transition-colors flex items-center">
            <Info className="h-4 w-4 mr-1" />
            About
          </Link>
        </div>
        <div className="flex items-center">
          {isLoggedIn ? (
            <div className="flex items-center gap-2">
              <Button 
                className="bg-eco-green text-white px-4 py-2 rounded-md hover:bg-eco-green-dark transition-colors"
                onClick={() => navigate('/dashboard')}
              >
                Dashboard
              </Button>
              <Button 
                variant="outline"
                className="text-eco-forest border-eco-forest hover:bg-eco-forest/10"
                onClick={handleLogout}
              >
                <LogOut className="mr-2 h-4 w-4" />
                Logout
              </Button>
            </div>
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
