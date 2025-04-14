
import React, { useEffect } from 'react';
import { Navigate, useLocation } from 'react-router-dom';
import { useToast } from '@/hooks/use-toast';

interface PrivateRouteProps {
  children: React.ReactNode;
  requireWallet?: boolean;
}

const PrivateRoute: React.FC<PrivateRouteProps> = ({ children, requireWallet = false }) => {
  const location = useLocation();
  const { toast } = useToast();
  const isLoggedIn = localStorage.getItem('isLoggedIn') === 'true';
  const hasWallet = !!localStorage.getItem('walletAddress');

  useEffect(() => {
    if (!isLoggedIn) {
      toast({
        title: "Authentication Required",
        description: "Please log in to access this page",
        variant: "destructive",
      });
    } else if (requireWallet && !hasWallet) {
      toast({
        title: "Wallet Connection Required",
        description: "Please connect your wallet to access this feature",
        variant: "destructive",
      });
    }
  }, [isLoggedIn, hasWallet, requireWallet, toast]);

  if (!isLoggedIn) {
    // Redirect to login page if not logged in
    return <Navigate to="/login" state={{ from: location }} replace />;
  }

  if (requireWallet && !hasWallet) {
    // Redirect to dashboard to connect wallet if needed
    return <Navigate to="/dashboard" state={{ from: location }} replace />;
  }

  return <>{children}</>;
};

export default PrivateRoute;
