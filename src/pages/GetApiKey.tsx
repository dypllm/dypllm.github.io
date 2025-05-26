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
    const token = localStorage.getItem("auth_token");
    setIsLoggedIn(!!token);
  }, []);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const selectedFile = e.target.files[0];
      const allowedTypes = ['image/jpeg', 'image/png'];
      if (allowedTypes.includes(selectedFile.type)) {
        setFile(selectedFile);
        setFileName(selectedFile.name);
      } else {
        toast.error("Please upload a valid image file (JPG or PNG)");
      }
    }
  };

  const handleUploadClick = () => {
    fileInputRef.current?.click();
  };

  const generateApiKey = () => {
    const timestamp = Date.now().toString(36);
    const random = Math.random().toString(36).substring(2, 15);
    return `sk_${timestamp}${random}`;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!file) {
      toast.error("Please upload your student ID");
      return;
    }

    setIsVerifying(true);

    try {
      const formData = new FormData();
      formData.append("file", file);

      const API_URL = import.meta.env.VITE_API_URL || "http://103.246.85.252:8000";
      const response = await fetch(`${API_URL}/process-image-and-store/`, {
        method: "POST",
        body: formData,
        headers: {
          Accept: "application/json",
          Authorization: `Bearer ${localStorage.getItem("auth_token")}`,
          // ❌ DO NOT manually set Content-Type
        },
      });

      console.log("Status:", response.status);
      const result = await response.json().catch(() => null);
      console.log("Response JSON:", result);

      if (!response.ok || !result?.success) {
        throw new Error(result?.message || `HTTP error! Status: ${response.status}`);
      }

      setIsVerifying(false);
      setIsLoading(true);

      localStorage.setItem("is_verified", "true");

      const apiKey = {
        id: crypto.randomUUID(),
        key: generateApiKey(),
        name: "Default API Key",
        created: new Date(),
        requests: 0,
      };

      const existingKeys = JSON.parse(localStorage.getItem("api_keys") || "[]");
      localStorage.setItem("api_keys", JSON.stringify([...existingKeys, apiKey]));

      toast.success("Identity verified successfully!");
      navigate("/dashboard");

    } catch (error: any) {
      console.error("Verification error:", error);
      toast.error(error.message || "Failed to verify identity. Please try again.");
      setIsVerifying(false);
    } finally {
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
            <p className="text-sm text-muted-foreground">
              You need to be authenticated to verify your identity and get an API key.
              Please log in to your account or create a new one.
            </p>
          </CardContent>
          <CardFooter className="flex flex-col space-y-4">
            <Button className="w-full" type="button" asChild>
              <Link to="/login">Log In</Link>
            </Button>
            <Button className="w-full" variant="outline" type="button" asChild>
              <Link to="/signup">Sign Up</Link>
            </Button>
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
                  accept="image/jpeg,image/png"
                  onChange={handleFileChange}
                  className="hidden"
                />
                <Upload className="h-10 w-10 text-muted-foreground mb-2" />
                <p className="text-sm text-muted-foreground text-center mb-1">
                  {fileName || "Click to upload your student ID card"}
                </p>
                <p className="text-xs text-muted-foreground text-center">
                  Supported formats: JPG, PNG
                </p>
              </div>
            </div>

            <p className="text-sm text-muted-foreground">
              We'll verify your student ID to ensure you're from D.Y. Patil College of Engineering.
              Your API key will be generated after successful verification.
            </p>
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
            <p className="text-center text-sm text-muted-foreground">
              By proceeding, you agree to our{" "}
              <Link to="/terms" className="text-primary hover:underline">Terms of Service</Link>
              {" "}and{" "}
              <Link to="/privacy" className="text-primary hover:underline">Privacy Policy</Link>.
            </p>
          </CardFooter>
        </form>
      </Card>
    </div>
  );
};

export default GetApiKey;
