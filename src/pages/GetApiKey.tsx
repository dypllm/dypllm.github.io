
import { useState, useRef, useEffect } from "react";
import { useNavigate, Link } from "react-router-dom";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { toast } from "sonner";
import { Upload } from "lucide-react";

const GetApiKey = () => {
  const [file, setFile] = useState<File | null>(null);
  const [fileName, setFileName] = useState<string>("");
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [isVerifying, setIsVerifying] = useState<boolean>(false);
  const [isLoggedIn, setIsLoggedIn] = useState<boolean>(false);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const navigate = useNavigate();

  useEffect(() => {
    // Check if the user is logged in
    const token = localStorage.getItem("auth_token");
    setIsLoggedIn(!!token);
  }, []);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const selectedFile = e.target.files[0];
      if (selectedFile.type.includes("image")) {
        setFile(selectedFile);
        setFileName(selectedFile.name);
      } else {
        toast.error("Please upload an image file");
      }
    }
  };

  const handleUploadClick = () => {
    if (fileInputRef.current) {
      fileInputRef.current.click();
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!file) {
      toast.error("Please upload your student ID");
      return;
    }

    setIsVerifying(true);
    
    try {
      // In a real app, upload to backend API for verification
      // For demo purposes, we'll simulate API call with timeout
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      setIsVerifying(false);
      setIsLoading(true);
      
      // Simulate backend verification and API key generation
      await new Promise(resolve => setTimeout(resolve, 1500));
      
      // Store verification status
      localStorage.setItem("is_verified", "true");
      
      // Sample user data that would come from backend
      const userData = {
        name: "John Smith",
        department: "Computer Engineering",
      };
      
      // Generate a demo API key
      const apiKey = {
        id: "1",
        key: "sk_" + Math.random().toString(36).substring(2, 15),
        name: "Default API Key",
        created: new Date(),
        requests: 0,
      };
      
      // Store the API key
      localStorage.setItem("api_keys", JSON.stringify([apiKey]));
      
      toast.success("Identity verified successfully!");
      navigate("/dashboard");
    } catch (error) {
      toast.error("Verification failed. Please try again.");
      setIsVerifying(false);
      setIsLoading(false);
    }
  };

  if (!isLoggedIn) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-background p-4">
        <Card className="w-full max-w-md animate-fade-in">
          <CardHeader className="space-y-1">
            <CardTitle className="text-2xl font-bold">Authentication Required</CardTitle>
            <CardDescription>
              Please log in or sign up to get your API key
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <p className="text-sm text-muted-foreground">
                You need to be authenticated to verify your identity and get an API key. 
                Please log in to your account or create a new one.
              </p>
            </div>
          </CardContent>
          <CardFooter className="flex flex-col space-y-4">
            <Link to="/login" className="w-full">
              <Button className="w-full" type="button">
                Log In
              </Button>
            </Link>
            <Link to="/signup" className="w-full">
              <Button className="w-full" variant="outline" type="button">
                Sign Up
              </Button>
            </Link>
          </CardFooter>
        </Card>
      </div>
    );
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-background p-4">
      <Card className="w-full max-w-md animate-fade-in">
        <CardHeader className="space-y-1">
          <CardTitle className="text-2xl font-bold">Identity Verification</CardTitle>
          <CardDescription>
            Upload your D.Y. Patil College of Engineering student ID to get API access
          </CardDescription>
        </CardHeader>
        <form onSubmit={handleSubmit}>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="student-id">Student ID</Label>
              <div 
                className="border-2 border-dashed rounded-md p-6 flex flex-col items-center justify-center cursor-pointer hover:border-primary/50 transition-colors"
                onClick={handleUploadClick}
              >
                <input
                  ref={fileInputRef}
                  type="file"
                  id="student-id"
                  accept="image/*"
                  onChange={handleFileChange}
                  className="hidden"
                />
                <Upload className="h-10 w-10 text-muted-foreground mb-2" />
                <p className="text-sm text-muted-foreground text-center mb-1">
                  {fileName ? fileName : "Click to upload your student ID card"}
                </p>
                <p className="text-xs text-muted-foreground text-center">
                  Supported formats: JPG, PNG, PDF
                </p>
              </div>
            </div>
            
            <div className="space-y-2">
              <p className="text-sm text-muted-foreground">
                We'll verify your student ID to ensure you're from D.Y. Patil College of Engineering.
                Your API key will be generated after successful verification.
              </p>
            </div>
          </CardContent>
          <CardFooter className="flex flex-col space-y-4">
            <Button 
              className="w-full" 
              type="submit" 
              disabled={isVerifying || isLoading || !file}
            >
              {isVerifying ? "Verifying Identity..." : 
               isLoading ? "Generating API Key..." : 
               "Verify & Generate API Key"}
            </Button>
            <div className="text-center text-sm">
              <p>
                By proceeding, you agree to our{" "}
                <a className="text-primary hover:underline">Terms of Service</a>
                {" "}and{" "}
                <a className="text-primary hover:underline">Privacy Policy</a>
              </p>
            </div>
          </CardFooter>
        </form>
      </Card>
    </div>
  );
};

export default GetApiKey;
