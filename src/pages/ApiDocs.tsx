
import { useState } from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { ArrowRight, Check } from "lucide-react";

const ApiDocs = () => {
  const [activeTab, setActiveTab] = useState("authentication");

  const tabs = [
    { id: "authentication", label: "Authentication" },
    { id: "endpoints", label: "Endpoints" },
    { id: "examples", label: "Examples" },
    { id: "rate-limits", label: "Rate Limits" },
  ];

  return (
    <div className="min-h-screen bg-background">
      <div className="container mx-auto px-4 py-12">
        <div className="flex flex-col items-center text-center mb-12">
          <h1 className="text-4xl font-bold mb-4">API Documentation</h1>
          <p className="text-lg text-muted-foreground max-w-2xl mb-8">
            Learn how to integrate with our LLaMA 3.2 API and build amazing applications
          </p>
          <div className="w-full max-w-md">
            <Link to="/get-api-key">
              <Button className="w-full">
                Get Your API Key
                <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
            </Link>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          <div className="lg:col-span-1 space-y-2">
            {tabs.map((tab) => (
              <Button
                key={tab.id}
                variant={activeTab === tab.id ? "default" : "outline"}
                className="w-full justify-start"
                onClick={() => setActiveTab(tab.id)}
              >
                {tab.label}
              </Button>
            ))}
          </div>

          <div className="lg:col-span-3">
            {activeTab === "authentication" && (
              <Card>
                <CardHeader>
                  <CardTitle>Authentication</CardTitle>
                  <CardDescription>
                    How to authenticate with our API
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <p>
                    Our API uses API keys for authentication. All API requests require an API key
                    to be included in the header of each request.
                  </p>
                  <div className="bg-muted p-4 rounded-md overflow-x-auto">
                    <code className="text-sm">
                      curl -X POST \<br />
                      &nbsp;&nbsp;https://api.example.com/v1/chat/completions \<br />
                      &nbsp;&nbsp;-H "Content-Type: application/json" \<br />
                      &nbsp;&nbsp;-H "Authorization: Bearer YOUR_API_KEY" \<br />
                      &nbsp;&nbsp;-d '&#123;"prompt": "Hello, how can you help me today?"&#125;'
                    </code>
                  </div>
                  <div className="mt-4">
                    <h3 className="text-lg font-medium mb-2">Generate an API Key</h3>
                    <ol className="list-decimal ml-4 space-y-2">
                      <li>Create an account and log in</li>
                      <li>Verify your identity by uploading your student ID</li> 
                      <li>Go to your Dashboard to generate API keys</li>
                      <li>Keep your API keys secure and don't share them</li>
                    </ol>
                  </div>
                </CardContent>
              </Card>
            )}

            {activeTab === "endpoints" && (
              <Card>
                <CardHeader>
                  <CardTitle>API Endpoints</CardTitle>
                  <CardDescription>
                    Available endpoints and their parameters
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div>
                    <h3 className="text-lg font-medium mb-2">POST /v1/chat/completions</h3>
                    <p className="mb-2">Generate a response from the LLaMA 3.2 model.</p>
                    <div className="bg-muted p-4 rounded-md overflow-x-auto mb-2">
                      <code className="text-sm">
                        POST https://api.example.com/v1/chat/completions
                      </code>
                    </div>
                    <h4 className="font-medium mt-4 mb-2">Parameters:</h4>
                    <ul className="list-disc ml-4 space-y-2">
                      <li><code className="text-sm">prompt</code> (required) - The prompt to send to the model</li>
                      <li><code className="text-sm">max_tokens</code> (optional) - Maximum number of tokens to generate</li>
                      <li><code className="text-sm">temperature</code> (optional) - Controls randomness (0-1)</li>
                      <li><code className="text-sm">stream</code> (optional) - Whether to stream responses</li>
                    </ul>
                  </div>

                  <div>
                    <h3 className="text-lg font-medium mb-2">GET /v1/models</h3>
                    <p className="mb-2">List available models and their capabilities.</p>
                    <div className="bg-muted p-4 rounded-md overflow-x-auto">
                      <code className="text-sm">
                        GET https://api.example.com/v1/models
                      </code>
                    </div>
                  </div>
                </CardContent>
              </Card>
            )}

            {activeTab === "examples" && (
              <Card>
                <CardHeader>
                  <CardTitle>Code Examples</CardTitle>
                  <CardDescription>
                    How to use our API with different programming languages
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div>
                    <h3 className="text-lg font-medium mb-2">JavaScript/Node.js</h3>
                    <div className="bg-muted p-4 rounded-md overflow-x-auto">
                      <code className="text-sm whitespace-pre">
{`const response = await fetch('https://api.example.com/v1/chat/completions', {
  method: 'POST',
  headers: {
    'Content-Type': 'application/json',
    'Authorization': 'Bearer YOUR_API_KEY'
  },
  body: JSON.stringify({
    prompt: 'Write a short poem about technology',
    max_tokens: 100
  })
});

const data = await response.json();
console.log(data.completion);`}
                      </code>
                    </div>
                  </div>

                  <div>
                    <h3 className="text-lg font-medium mb-2">Python</h3>
                    <div className="bg-muted p-4 rounded-md overflow-x-auto">
                      <code className="text-sm whitespace-pre">
{`import requests

response = requests.post(
  'https://api.example.com/v1/chat/completions',
  headers={
    'Content-Type': 'application/json',
    'Authorization': 'Bearer YOUR_API_KEY'
  },
  json={
    'prompt': 'Write a short poem about technology',
    'max_tokens': 100
  }
)

data = response.json()
print(data['completion'])`}
                      </code>
                    </div>
                  </div>
                </CardContent>
              </Card>
            )}

            {activeTab === "rate-limits" && (
              <Card>
                <CardHeader>
                  <CardTitle>Rate Limits</CardTitle>
                  <CardDescription>
                    Usage limits and quotas for API requests
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <p>
                    We implement rate limiting to ensure fair usage of our API for all users.
                    Rate limits are applied on a per-API key basis.
                  </p>
                  
                  <div className="mt-4 space-y-4">
                    <div className="flex items-start gap-2">
                      <Check className="h-5 w-5 text-green-500 mt-0.5" />
                      <div>
                        <h3 className="font-medium">Standard Plan (Free)</h3>
                        <p className="text-muted-foreground">100 requests per day</p>
                      </div>
                    </div>
                    
                    <div className="flex items-start gap-2">
                      <Check className="h-5 w-5 text-green-500 mt-0.5" />
                      <div>
                        <h3 className="font-medium">Premium Plan</h3>
                        <p className="text-muted-foreground">10,000 requests per day</p>
                      </div>
                    </div>
                    
                    <div className="flex items-start gap-2">
                      <Check className="h-5 w-5 text-green-500 mt-0.5" />
                      <div>
                        <h3 className="font-medium">Enterprise Plan</h3>
                        <p className="text-muted-foreground">Custom limits based on needs</p>
                      </div>
                    </div>
                  </div>
                  
                  <div className="mt-6">
                    <h3 className="text-lg font-medium mb-2">Rate Limit Headers</h3>
                    <p className="mb-2">
                      Each API response includes headers to help you track your rate limits:
                    </p>
                    <ul className="list-disc ml-4 space-y-1">
                      <li><code className="text-sm">X-RateLimit-Limit</code>: Total requests allowed in the period</li>
                      <li><code className="text-sm">X-RateLimit-Remaining</code>: Requests remaining in the period</li>
                      <li><code className="text-sm">X-RateLimit-Reset</code>: Seconds until the limit resets</li>
                    </ul>
                  </div>
                </CardContent>
              </Card>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ApiDocs;
