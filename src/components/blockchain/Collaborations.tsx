import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { useToast } from "@/hooks/use-toast";
import { Handshake, Users, Globe, Building, Check, Send } from 'lucide-react';

interface CollaborationsProps {
  walletAddress: string;
  tokenBalance?: number; // Added tokenBalance as an optional prop
}

// Sample collaboration opportunities
const collaborationData = [
  {
    id: 1,
    company: "GreenTech Solutions",
    description: "Looking for partners in renewable energy projects and carbon tracking software integration.",
    industry: "Technology",
    contactEmail: "partnerships@greentech.example",
    icon: <Globe className="h-6 w-6 text-eco-green" />
  },
  {
    id: 2,
    company: "EcoTransport Ltd",
    description: "Seeking collaboration for developing sustainable logistics and transportation solutions.",
    industry: "Transportation",
    contactEmail: "collab@ecotransport.example",
    icon: <Building className="h-6 w-6 text-eco-green" />
  },
  {
    id: 3,
    company: "Sustainable Retail Co",
    description: "Looking for partners to develop carbon neutral supply chains and eco-friendly packaging.",
    industry: "Retail",
    contactEmail: "partners@sustainableretail.example",
    icon: <Users className="h-6 w-6 text-eco-green" />
  }
];

const Collaborations: React.FC<CollaborationsProps> = ({ walletAddress, tokenBalance }) => {
  const [contactFormVisible, setContactFormVisible] = useState<number | null>(null);
  const [message, setMessage] = useState("");
  const [contactDetails, setContactDetails] = useState("");
  const [submitting, setSubmitting] = useState(false);
  const [contacted, setContacted] = useState<number[]>([]);
  const { toast } = useToast();
  
  const [newOpportunity, setNewOpportunity] = useState({
    company: "",
    description: "",
    industry: "",
    contactEmail: ""
  });
  const [showNewForm, setShowNewForm] = useState(false);

  const handleContactSubmit = (id: number) => {
    if (!message || !contactDetails) {
      toast({
        title: "Missing information",
        description: "Please provide both a message and your contact details",
        variant: "destructive",
      });
      return;
    }

    setSubmitting(true);
    
    // Simulate API call
    setTimeout(() => {
      setSubmitting(false);
      setContactFormVisible(null);
      setMessage("");
      setContactDetails("");
      setContacted([...contacted, id]);
      
      toast({
        title: "Collaboration Request Sent",
        description: "Your request has been sent successfully! The company will contact you soon.",
      });
    }, 1500);
  };

  const handleNewOpportunitySubmit = () => {
    const { company, description, industry, contactEmail } = newOpportunity;
    
    if (!company || !description || !industry || !contactEmail) {
      toast({
        title: "Missing information",
        description: "Please fill in all fields to create a new collaboration opportunity",
        variant: "destructive",
      });
      return;
    }
    
    // In a real app, this would be sent to a backend
    toast({
      title: "Opportunity Created",
      description: "Your collaboration opportunity has been published!",
    });
    
    setNewOpportunity({
      company: "",
      description: "",
      industry: "",
      contactEmail: ""
    });
    setShowNewForm(false);
  };

  return (
    <div className="space-y-6">
      <Card className="shadow-md border-eco-blue-light">
        <CardHeader>
          <CardTitle className="text-xl text-eco-forest flex items-center">
            <Handshake className="mr-2 h-5 w-5 text-eco-green" />
            Business Collaborations
          </CardTitle>
          <CardDescription>
            Connect with other sustainable businesses to boost mutual growth
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="mb-4 flex justify-between items-center">
            <p className="text-sm text-muted-foreground">
              Find partners who share your sustainability goals and collaborate on projects that can create greater impact.
            </p>
            <Button
              onClick={() => setShowNewForm(!showNewForm)}
              className="bg-eco-green hover:bg-eco-green-dark text-white"
            >
              {showNewForm ? "Cancel" : "Create Opportunity"}
            </Button>
          </div>

          {showNewForm && (
            <Card className="mb-6 border-eco-green-light">
              <CardHeader>
                <CardTitle className="text-lg">Create New Collaboration Opportunity</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div>
                    <label className="text-sm font-medium mb-1 block">Company Name</label>
                    <Input 
                      value={newOpportunity.company}
                      onChange={(e) => setNewOpportunity({...newOpportunity, company: e.target.value})}
                      placeholder="Your company name"
                    />
                  </div>
                  <div>
                    <label className="text-sm font-medium mb-1 block">Industry</label>
                    <Input 
                      value={newOpportunity.industry}
                      onChange={(e) => setNewOpportunity({...newOpportunity, industry: e.target.value})}
                      placeholder="e.g. Technology, Retail, Transportation"
                    />
                  </div>
                  <div>
                    <label className="text-sm font-medium mb-1 block">Opportunity Description</label>
                    <Textarea 
                      value={newOpportunity.description}
                      onChange={(e) => setNewOpportunity({...newOpportunity, description: e.target.value})}
                      placeholder="Describe the collaboration opportunity you're offering..."
                      rows={3}
                    />
                  </div>
                  <div>
                    <label className="text-sm font-medium mb-1 block">Contact Email</label>
                    <Input 
                      value={newOpportunity.contactEmail}
                      onChange={(e) => setNewOpportunity({...newOpportunity, contactEmail: e.target.value})}
                      placeholder="Email for interested partners to contact you"
                      type="email"
                    />
                  </div>
                  <Button 
                    onClick={handleNewOpportunitySubmit}
                    className="w-full bg-eco-green hover:bg-eco-green-dark text-white"
                  >
                    Publish Opportunity
                  </Button>
                </div>
              </CardContent>
            </Card>
          )}

          <div className="grid grid-cols-1 gap-4">
            {collaborationData.map((collab) => (
              <Card key={collab.id} className="border-eco-green-light">
                <CardContent className="pt-6">
                  <div className="flex items-start gap-4">
                    <div className="rounded-full bg-eco-green/10 p-3 flex-shrink-0">
                      {collab.icon}
                    </div>
                    <div className="flex-grow">
                      <div className="flex justify-between items-start">
                        <div>
                          <h3 className="font-semibold text-eco-forest">{collab.company}</h3>
                          <p className="text-xs text-muted-foreground mb-2">Industry: {collab.industry}</p>
                        </div>
                        {contacted.includes(collab.id) ? (
                          <div className="flex items-center text-green-600 text-sm">
                            <Check className="mr-1 h-4 w-4" />
                            Request Sent
                          </div>
                        ) : (
                          <Button
                            variant="outline"
                            size="sm"
                            className="text-eco-green border-eco-green hover:bg-eco-green/10"
                            onClick={() => setContactFormVisible(collab.id)}
                            disabled={contacted.includes(collab.id)}
                          >
                            Connect
                          </Button>
                        )}
                      </div>
                      <p className="text-sm mt-2">{collab.description}</p>
                      
                      {contactFormVisible === collab.id && (
                        <div className="mt-4 p-4 bg-eco-green/5 rounded-md space-y-3">
                          <h4 className="font-medium text-sm">Send Collaboration Request</h4>
                          <div>
                            <label className="text-xs font-medium mb-1 block">Your Message</label>
                            <Textarea 
                              value={message}
                              onChange={(e) => setMessage(e.target.value)}
                              placeholder="Describe how you'd like to collaborate..."
                              rows={3}
                            />
                          </div>
                          <div>
                            <label className="text-xs font-medium mb-1 block">Your Contact Information</label>
                            <Input 
                              value={contactDetails}
                              onChange={(e) => setContactDetails(e.target.value)}
                              placeholder="Email, phone, or wallet address"
                            />
                          </div>
                          <div className="flex gap-2">
                            <Button
                              className="bg-eco-green hover:bg-eco-green-dark text-white"
                              disabled={submitting}
                              onClick={() => handleContactSubmit(collab.id)}
                            >
                              {submitting ? "Sending..." : "Send Request"}
                              <Send className="ml-2 h-4 w-4" />
                            </Button>
                            <Button
                              variant="outline"
                              onClick={() => setContactFormVisible(null)}
                            >
                              Cancel
                            </Button>
                          </div>
                        </div>
                      )}
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default Collaborations;
