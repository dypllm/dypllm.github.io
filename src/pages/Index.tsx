
import { useState } from "react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { ArrowRight } from "lucide-react";
import { toast } from "sonner";
import ApiQueryBox from "@/components/ApiQueryBox";
import Footer from "@/components/Footer";

const Index = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useState(() => {
    const token = localStorage.getItem("auth_token");
    if (token) {
      setIsLoggedIn(true);
    }
  });

  return (
    <div className="min-h-screen bg-white text-gray-900">
      <section className="w-full py-16 md:py-24 lg:py-32 xl:py-40">
        <div className="container px-4 md:px-6">
          <div className="grid gap-8 lg:grid-cols-[1fr_400px] lg:gap-12 xl:grid-cols-[1fr_600px]">
            <div className="flex flex-col justify-center space-y-6 animate-fade-in">
              <div className="space-y-4">
                <h1 className="text-4xl font-bold tracking-tight sm:text-5xl md:text-6xl">
                  <span className="bg-gradient-to-r from-gray-700 via-gray-800 to-black bg-clip-text text-transparent">
                    D.Y. Patil Salokhenagar API Nexus
                  </span>
                </h1>
                <p className="max-w-[600px] text-xl text-gray-700 animate-slide-in-right">
                  Secure API key management for D.Y. Patil College of Engineering, Salokhenagar students. 
                  Verify your identity and access powerful APIs with precision and ease.
                </p>
              </div>
              <div className="flex flex-col gap-4 min-[400px]:flex-row">
                <Link to={isLoggedIn ? "/dashboard" : "/login"}>
                  <Button className="w-full sm:w-auto bg-gray-800 text-white hover:bg-gray-700 transition-all duration-300 shadow-lg hover:shadow-xl">
                    {isLoggedIn ? "Go to Dashboard" : "Get Started"}
                    <ArrowRight className="ml-2 h-4 w-4" />
                  </Button>
                </Link>
                <Link to="/api-docs">
                  <Button variant="outline" className="w-full sm:w-auto border-gray-700 text-gray-800 hover:bg-gray-100 transition-colors duration-300">
                    API Documentation
                  </Button>
                </Link>
              </div>
            </div>
            <div className="flex items-center justify-center animate-slide-in-right">
              <Card className="w-full max-w-md shadow-xl border border-gray-200 bg-white hover:shadow-2xl transition-shadow duration-300">
                <CardHeader>
                  <CardTitle className="text-gray-900">Try Our API</CardTitle>
                  <CardDescription className="text-gray-600">
                    Experience the power of our API with this live demo
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <ApiQueryBox />
                </CardContent>
                <CardFooter className="flex justify-between">
                  <Button 
                    variant="outline" 
                    onClick={() => toast.info("Get your API key to unlock full capabilities!")}
                    className="text-gray-800 border-gray-300 hover:bg-gray-100"
                  >
                    Learn More
                  </Button>
                  <Link to={isLoggedIn ? "/get-api-key" : "/login"}>
                    <Button className="bg-gray-800 text-white hover:bg-gray-700">
                      {isLoggedIn ? "Get API Key" : "Sign Up to Access"}
                    </Button>
                  </Link>
                </CardFooter>
              </Card>
            </div>
          </div>
        </div>
      </section>

      <section className="w-full py-16 md:py-24 lg:py-32 bg-gray-50">
        <div className="container px-4 md:px-6">
          <div className="flex flex-col items-center justify-center space-y-6 text-center animate-fade-in">
            <div className="space-y-4">
              <h2 className="text-3xl font-bold tracking-tight sm:text-4xl text-gray-900">
                <span className="bg-gradient-to-r from-gray-700 via-gray-800 to-black bg-clip-text text-transparent">
                  Features
                </span>
              </h2>
              <p className="max-w-[900px] text-xl text-gray-700">
                Our platform provides secure API key management with identity verification
              </p>
            </div>
          </div>
          <div className="mx-auto grid max-w-5xl grid-cols-1 gap-6 py-12 md:grid-cols-3 lg:gap-8">
            {[
              {
                title: "Identity Verification",
                description: "Verify your identity using your student ID to access our APIs",
                gradient: "from-gray-100 to-white",
                textColor: "text-gray-800",
                delay: "0.2s"
              },
              {
                title: "API Key Management",
                description: "Generate and manage multiple API keys for different projects",
                gradient: "from-gray-100 to-white",
                textColor: "text-gray-800",
                delay: "0.4s"
              },
              {
                title: "Usage Analytics",
                description: "Track API usage and monitor requests per key on your dashboard",
                gradient: "from-gray-100 to-white",
                textColor: "text-gray-800",
                delay: "0.6s"
              }
            ].map((feature, index) => (
              <div 
                key={feature.title}
                className={`group relative overflow-hidden rounded-xl p-6 bg-gradient-to-b ${feature.gradient} shadow-lg transition-all duration-500 hover:shadow-xl hover:scale-105 border border-gray-200 animate-slide-in-right opacity-0`}
                style={{ animationDelay: feature.delay, animationFillMode: "forwards" }}
              >
                <h3 className={`text-lg font-bold ${feature.textColor} group-hover:translate-x-1 transition-transform duration-300`}>
                  {feature.title}
                </h3>
                <p className="text-sm text-gray-600 group-hover:translate-x-1 transition-transform duration-300">
                  {feature.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default Index;
