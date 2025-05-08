
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";
import { Eye, EyeOff, Plus, Trash2 } from "lucide-react";
import ApiKeyCard from "@/components/ApiKeyCard";

interface ApiKey {
  id: string;
  key: string;
  name: string;
  created: Date;
  requests: number;
}

const Dashboard = () => {
  const [apiKeys, setApiKeys] = useState<ApiKey[]>([]);
  const [isVerified, setIsVerified] = useState(false);
  const [userData, setUserData] = useState({
    name: "",
    department: "",
  });
  const navigate = useNavigate();

  useEffect(() => {
    // Check if user is logged in
    const token = localStorage.getItem("auth_token");
    if (!token) {
      navigate("/login");
      return;
    }

    // In a real app, fetch user data and verification status
    // For demo, we'll simulate this with random data
    const mockUserData = {
      name: "John Smith",
      department: "Computer Engineering",
      isVerified: localStorage.getItem("is_verified") === "true",
    };

    setIsVerified(mockUserData.isVerified);
    setUserData({
      name: mockUserData.name,
      department: mockUserData.department,
    });

    // Load API keys if user is verified
    if (mockUserData.isVerified) {
      const mockApiKeys = localStorage.getItem("api_keys");
      if (mockApiKeys) {
        setApiKeys(JSON.parse(mockApiKeys));
      } else {
        // Create a sample API key for demo
        const sampleKey = {
          id: "1",
          key: "sk_" + Math.random().toString(36).substring(2, 15),
          name: "Default API Key",
          created: new Date(),
          requests: Math.floor(Math.random() * 1000),
        };
        setApiKeys([sampleKey]);
        localStorage.setItem("api_keys", JSON.stringify([sampleKey]));
      }
    }
  }, [navigate]);

  const handleNewApiKey = () => {
    if (!isVerified) {
      navigate("/get-api-key");
      return;
    }

    // Generate a new API key
    const newKey = {
      id: Date.now().toString(),
      key: "sk_" + Math.random().toString(36).substring(2, 15),
      name: `API Key ${apiKeys.length + 1}`,
      created: new Date(),
      requests: 0,
    };

    const updatedKeys = [...apiKeys, newKey];
    setApiKeys(updatedKeys);
    localStorage.setItem("api_keys", JSON.stringify(updatedKeys));
    toast.success("New API key generated!");
  };

  const deleteApiKey = (id: string) => {
    const updatedKeys = apiKeys.filter((key) => key.id !== id);
    setApiKeys(updatedKeys);
    localStorage.setItem("api_keys", JSON.stringify(updatedKeys));
    toast.success("API key deleted!");
  };

  const handleLogout = () => {
    localStorage.removeItem("auth_token");
    navigate("/login");
    toast.info("Logged out successfully");
  };

  return (
    <div className="min-h-screen bg-background p-4 md:p-8">
      <div className="container mx-auto max-w-6xl">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8 gap-4">
          <div>
            <h1 className="text-3xl font-bold tracking-tight">Dashboard</h1>
            <p className="text-muted-foreground">
              Manage your API keys and account
            </p>
          </div>
          <Button variant="outline" onClick={handleLogout}>
            Log out
          </Button>
        </div>

        {!isVerified ? (
          <Card className="mb-8 animate-fade-in">
            <CardHeader>
              <CardTitle>Verify Your Identity</CardTitle>
              <CardDescription>
                To generate API keys, you need to verify your identity first.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <Button onClick={() => navigate("/get-api-key")}>
                Verify Identity
              </Button>
            </CardContent>
          </Card>
        ) : (
          <>
            <Card className="mb-8 animate-fade-in">
              <CardHeader>
                <CardTitle>User Information</CardTitle>
                <CardDescription>Your verified account details</CardDescription>
              </CardHeader>
              <CardContent className="space-y-2">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <p className="text-sm font-medium">Name</p>
                    <p className="text-lg">{userData.name}</p>
                  </div>
                  <div>
                    <p className="text-sm font-medium">Department</p>
                    <p className="text-lg">{userData.department}</p>
                  </div>
                </div>
              </CardContent>
            </Card>

            <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-4">
              <h2 className="text-xl font-semibold">Your API Keys</h2>
              <Button onClick={handleNewApiKey} className="mt-2 md:mt-0">
                <Plus className="mr-2 h-4 w-4" />
                Generate New API Key
              </Button>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
              {apiKeys.map((apiKey) => (
                <ApiKeyCard 
                  key={apiKey.id} 
                  apiKey={apiKey} 
                  onDelete={() => deleteApiKey(apiKey.id)} 
                />
              ))}
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default Dashboard;
