
import { useState } from "react";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { ArrowRight, Bot } from "lucide-react";
import { toast } from "sonner";

const LlamaChat = () => {
  const [message, setMessage] = useState("");
  const [response, setResponse] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!message.trim()) {
      toast.error("Please enter a message");
      return;
    }

    setIsLoading(true);
    setResponse("");

    try {
      // Simulate API call (replace with actual LLaMA API integration)
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      // Sample responses to demonstrate the interface
      const responses = [
        "As LLaMA 3.2, I can help you with a variety of tasks including analysis, writing, and problem-solving. How can I assist you today?",
        "Based on your query, I'd recommend approaching this step-by-step. First, let's break down the main components...",
        "That's an interesting question. Let me provide a detailed explanation based on my training data...",
        "I understand what you're asking. Let me help you with that by providing a clear and concise solution..."
      ];
      
      const randomResponse = responses[Math.floor(Math.random() * responses.length)];
      setResponse(randomResponse);
    } catch (error) {
      toast.error("Failed to get response from LLaMA 3.2");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Card className="w-full max-w-2xl">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Bot className="h-6 w-6" />
          LLaMA 3.2 Demo
        </CardTitle>
        <CardDescription>
          Experience the power of LLaMA 3.2 with this interactive demo
        </CardDescription>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="flex gap-2">
          <Input
            placeholder="Ask LLaMA something..."
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            className="flex-1"
            disabled={isLoading}
          />
          <Button type="submit" disabled={isLoading}>
            <ArrowRight className="h-4 w-4" />
          </Button>
        </form>
        
        {isLoading && (
          <div className="mt-4 h-20 flex items-center justify-center">
            <div className="animate-pulse text-muted-foreground">
              LLaMA is thinking...
            </div>
          </div>
        )}
        
        {response && !isLoading && (
          <div className="mt-4 p-4 bg-muted rounded-lg">
            <p className="text-sm">{response}</p>
          </div>
        )}
      </CardContent>
      <CardFooter className="text-xs text-muted-foreground">
        This is a demo version. Get your API key to access the full capabilities.
      </CardFooter>
    </Card>
  );
};

export default LlamaChat;
