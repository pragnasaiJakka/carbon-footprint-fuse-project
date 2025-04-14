
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { Card, CardContent, CardDescription, CardHeader, CardTitle, CardFooter } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Separator } from '@/components/ui/separator';
import { 
  User, 
  LogOut, 
  Shield, 
  Trophy, 
  Clock, 
  Download, 
  ExternalLink, 
  Wallet, 
  Recycle, 
  Bike, 
  Leaf, 
  BarChart, 
  Award
} from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import { getTokenBalance } from '@/services/blockchainService';

// Mock data for activities (in a real app, this would come from localStorage or a backend)
const mockActivities = [
  { id: 1, type: 'Recycling', description: 'Recycled 5kg of waste', tokens: 5, date: '2025-04-10', icon: <Recycle className="h-4 w-4" /> },
  { id: 2, type: 'Transportation', description: 'Biked to work 10km', tokens: 2, date: '2025-04-08', icon: <Bike className="h-4 w-4" /> },
  { id: 3, type: 'Energy', description: 'Used renewable energy', tokens: 3, date: '2025-04-05', icon: <Leaf className="h-4 w-4" /> },
  { id: 4, type: 'Calculator', description: 'Calculated carbon footprint', tokens: 1, date: '2025-04-02', icon: <BarChart className="h-4 w-4" /> },
];

// Mock data for milestones/badges
const mockMilestones = [
  { id: 1, title: '50kg CO₂ Saved', description: 'You have saved 50kg of CO₂', achieved: true, date: '2025-04-09', icon: <Award className="h-4 w-4" /> },
  { id: 2, title: 'First Transaction', description: 'Completed your first marketplace transaction', achieved: true, date: '2025-04-07', icon: <Trophy className="h-4 w-4" /> },
  { id: 3, title: 'Eco Warrior', description: 'Submitted 5 eco-friendly activities', achieved: false, date: null, icon: <Shield className="h-4 w-4" /> },
];

const Profile = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const [tokenBalance, setTokenBalance] = useState(0);
  const [walletAddress, setWalletAddress] = useState('');
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Check if user is logged in
    const isLoggedIn = localStorage.getItem('isLoggedIn');
    if (!isLoggedIn) {
      navigate('/login');
      return;
    }

    // Get wallet address from localStorage
    const storedWalletAddress = localStorage.getItem('walletAddress');
    if (storedWalletAddress) {
      setWalletAddress(storedWalletAddress);
      
      // Fetch token balance
      const fetchBalance = async () => {
        try {
          const balance = await getTokenBalance(storedWalletAddress);
          setTokenBalance(balance);
        } catch (error) {
          console.error('Error fetching token balance:', error);
          // For demo purposes, fallback to a dummy value
          setTokenBalance(25);
        } finally {
          setIsLoading(false);
        }
      };
      
      fetchBalance();
    } else {
      setIsLoading(false);
    }
  }, [navigate]);

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

  const handleExportCSV = () => {
    // Convert activities to CSV format
    const headers = ['ID', 'Type', 'Description', 'Tokens', 'Date'];
    const csvData = mockActivities.map(activity => [
      activity.id,
      activity.type,
      activity.description,
      activity.tokens,
      activity.date
    ]);
    
    // Create CSV content
    const csvContent = [
      headers.join(','),
      ...csvData.map(row => row.join(','))
    ].join('\n');
    
    // Create a blob and download link
    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.setAttribute('href', url);
    link.setAttribute('download', `carbon-activity-${new Date().toISOString().split('T')[0]}.csv`);
    link.style.visibility = 'hidden';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    
    toast({
      title: "Export Successful",
      description: "Your activity log has been exported to CSV",
    });
  };

  // Helper function to format wallet address
  const formatWalletAddress = (address) => {
    if (!address) return '';
    return `${address.substring(0, 6)}...${address.substring(address.length - 4)}`;
  };

  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      
      <main className="flex-1 container mx-auto px-4 py-8">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-6">
          <h1 className="text-3xl font-bold text-eco-forest flex items-center">
            <User className="mr-2 h-6 w-6" />
            My Profile
          </h1>
          <Button 
            variant="outline"
            className="mt-4 md:mt-0 text-eco-forest border-eco-forest hover:bg-eco-forest/10"
            onClick={handleLogout}
          >
            <LogOut className="mr-2 h-4 w-4" />
            Logout
          </Button>
        </div>
        
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="lg:col-span-2 space-y-6">
            <Card className="shadow-md border-eco-blue-light">
              <CardHeader>
                <CardTitle className="text-xl text-eco-forest flex items-center">
                  <Wallet className="mr-2 h-5 w-5" />
                  Wallet Information
                </CardTitle>
                <CardDescription>
                  Your blockchain wallet and token details
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                {isLoading ? (
                  <div className="animate-pulse space-y-3">
                    <div className="h-4 bg-slate-200 rounded w-3/4"></div>
                    <div className="h-4 bg-slate-200 rounded w-1/2"></div>
                  </div>
                ) : walletAddress ? (
                  <>
                    <div className="flex flex-col md:flex-row md:items-center justify-between p-4 bg-eco-green/5 rounded-md">
                      <div>
                        <h3 className="font-medium text-eco-forest">Wallet Address</h3>
                        <p className="text-sm font-mono">{formatWalletAddress(walletAddress)}</p>
                      </div>
                      <Badge className="mt-2 md:mt-0 bg-eco-green hover:bg-eco-green/90">Connected</Badge>
                    </div>
                    <div className="flex flex-col md:flex-row md:items-center justify-between p-4 bg-eco-blue-light/5 rounded-md">
                      <div>
                        <h3 className="font-medium text-eco-forest">Token Balance</h3>
                        <p className="text-2xl font-bold">{tokenBalance} CCT</p>
                      </div>
                      <Button size="sm" variant="outline" className="mt-2 md:mt-0" onClick={() => navigate('/calculator')}>
                        Earn More
                      </Button>
                    </div>
                    <div className="flex flex-col md:flex-row md:items-center justify-between p-4 bg-slate-100 rounded-md">
                      <div>
                        <h3 className="font-medium text-eco-forest">Network</h3>
                        <p className="text-sm">Polygon Mumbai</p>
                      </div>
                      <Button size="sm" variant="ghost" className="mt-2 md:mt-0" asChild>
                        <a href="https://mumbai.polygonscan.com/" target="_blank" rel="noopener noreferrer" className="flex items-center">
                          View <ExternalLink className="ml-1 h-3 w-3" />
                        </a>
                      </Button>
                    </div>
                  </>
                ) : (
                  <div className="p-4 bg-amber-50 border border-amber-200 rounded-md">
                    <p className="text-amber-700">No wallet connected. Please connect your wallet from the dashboard.</p>
                    <Button 
                      variant="outline" 
                      size="sm" 
                      className="mt-2" 
                      onClick={() => navigate('/dashboard')}
                    >
                      Go to Dashboard
                    </Button>
                  </div>
                )}
              </CardContent>
            </Card>
            
            <Tabs defaultValue="activity" className="w-full">
              <TabsList className="grid w-full grid-cols-2">
                <TabsTrigger value="activity">Activity History</TabsTrigger>
                <TabsTrigger value="milestones">Milestones</TabsTrigger>
              </TabsList>
              
              <TabsContent value="activity" className="mt-4">
                <Card>
                  <CardHeader className="pb-3">
                    <div className="flex justify-between items-center">
                      <CardTitle className="text-xl text-eco-forest flex items-center">
                        <Clock className="mr-2 h-5 w-5" />
                        Activity Log
                      </CardTitle>
                      <Button 
                        variant="outline" 
                        size="sm" 
                        className="text-eco-forest border-eco-forest hover:bg-eco-forest/10"
                        onClick={handleExportCSV}
                      >
                        <Download className="mr-2 h-4 w-4" />
                        Export CSV
                      </Button>
                    </div>
                  </CardHeader>
                  <CardContent>
                    {mockActivities.length > 0 ? (
                      <div className="space-y-4">
                        {mockActivities.map((activity) => (
                          <div 
                            key={activity.id} 
                            className="flex items-start p-3 rounded-md hover:bg-slate-50 transition-colors"
                          >
                            <div className="h-8 w-8 rounded-full bg-eco-green/10 text-eco-green flex items-center justify-center mr-3">
                              {activity.icon}
                            </div>
                            <div className="flex-1">
                              <div className="flex flex-col md:flex-row md:items-center md:justify-between">
                                <h4 className="font-medium">{activity.description}</h4>
                                <div className="flex items-center mt-1 md:mt-0">
                                  <Badge variant="outline" className="text-eco-green border-eco-green">
                                    +{activity.tokens} CCT
                                  </Badge>
                                </div>
                              </div>
                              <div className="flex items-center text-sm text-muted-foreground mt-1">
                                <span className="font-medium mr-2">{activity.type}</span>
                                <span>•</span>
                                <span className="ml-2">{activity.date}</span>
                              </div>
                            </div>
                          </div>
                        ))}
                      </div>
                    ) : (
                      <div className="text-center p-4">
                        <p className="text-muted-foreground">No activities recorded yet.</p>
                      </div>
                    )}
                  </CardContent>
                </Card>
              </TabsContent>
              
              <TabsContent value="milestones" className="mt-4">
                <Card>
                  <CardHeader>
                    <CardTitle className="text-xl text-eco-forest flex items-center">
                      <Trophy className="mr-2 h-5 w-5" />
                      Milestones & Achievements
                    </CardTitle>
                    <CardDescription>
                      Badges and rewards earned through your eco-friendly activities
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      {mockMilestones.map((milestone) => (
                        <div 
                          key={milestone.id} 
                          className={`p-4 rounded-md border ${milestone.achieved ? 'bg-eco-green/5 border-eco-green/20' : 'bg-gray-100 border-gray-200'}`}
                        >
                          <div className="flex items-center">
                            <div className={`rounded-full p-2 ${milestone.achieved ? 'bg-eco-green text-white' : 'bg-gray-300 text-gray-600'}`}>
                              {milestone.icon}
                            </div>
                            <div className="ml-3">
                              <h4 className={`font-semibold ${milestone.achieved ? 'text-eco-forest' : 'text-gray-500'}`}>
                                {milestone.title}
                              </h4>
                              <p className="text-sm text-muted-foreground">{milestone.description}</p>
                            </div>
                          </div>
                          {milestone.achieved && milestone.date && (
                            <div className="mt-2 text-xs text-right text-muted-foreground">
                              Achieved on {milestone.date}
                            </div>
                          )}
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>
            </Tabs>
          </div>
          
          <div className="space-y-6">
            <Card className="shadow-md border-eco-forest">
              <CardHeader>
                <CardTitle className="text-xl text-eco-forest flex items-center">
                  <Shield className="mr-2 h-5 w-5" />
                  Security Settings
                </CardTitle>
                <CardDescription>
                  Manage your account security options
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <Button 
                  variant="outline" 
                  className="w-full justify-start" 
                  onClick={() => navigate('/dashboard')}
                >
                  <Wallet className="mr-2 h-4 w-4" />
                  Reconnect Wallet
                </Button>
                
                <Separator />
                
                <div className="pt-2">
                  <h4 className="font-medium text-sm mb-2">Account Information</h4>
                  <p className="text-sm text-muted-foreground">
                    Login method: Username & Password
                  </p>
                  <p className="text-sm text-muted-foreground mt-1">
                    Last login: {new Date().toLocaleDateString()}
                  </p>
                </div>
              </CardContent>
              <CardFooter className="flex flex-col">
                <p className="text-xs text-muted-foreground mb-2">
                  Having issues with your account? Contact our support team.
                </p>
                <Button variant="ghost" size="sm" className="self-end" asChild>
                  <a href="mailto:support@carbonfootprintfuse.com">
                    Get Help
                  </a>
                </Button>
              </CardFooter>
            </Card>
            
            <Card>
              <CardHeader>
                <CardTitle className="text-xl text-eco-forest">Carbon Impact</CardTitle>
                <CardDescription>
                  Your environmental contribution
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  <div className="flex justify-between items-center">
                    <span className="text-sm font-medium">CO₂ Offset</span>
                    <span className="font-bold">75kg</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-sm font-medium">Activities Submitted</span>
                    <span className="font-bold">{mockActivities.length}</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-sm font-medium">Total CCT Earned</span>
                    <span className="font-bold">{mockActivities.reduce((sum, activity) => sum + activity.tokens, 0)}</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-sm font-medium">Current Rank</span>
                    <Badge className="bg-eco-blue">Eco Enthusiast</Badge>
                  </div>
                </div>
              </CardContent>
              <CardFooter>
                <Button 
                  className="w-full bg-eco-forest hover:bg-eco-forest/90" 
                  onClick={() => navigate('/calculator')}
                >
                  Calculate New Footprint
                </Button>
              </CardFooter>
            </Card>
          </div>
        </div>
      </main>
      
      <Footer />
    </div>
  );
};

export default Profile;
