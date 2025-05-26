
import { useState } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";
import { toast } from "sonner";

const ApiQueryBox = () => {
  const [query, setQuery] = useState("");
  const [response, setResponse] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!query.trim()) {
      toast.error("Please enter a query");
      return;
    }
    
    setLoading(true);
    setResponse("");
    
    // Simulate API call
    try {
      // In a real app, this would be an actual API call
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      // Simulate response
      const responses = [
        "I'm an AI language model trained to assist with various tasks including answering questions, generating content, and having conversations. How can I help you today?",
        "Based on my training, I can provide information on a wide range of topics, though my knowledge has a cutoff date. I can assist with writing, coding, educational topics, and more.",
        "I'm designed to be helpful, harmless, and honest in my interactions. I can't browse the internet or access new information beyond my training data.",
        "I can provide explanations about complex topics, help with creative writing, assist with coding questions, and engage in thoughtful conversations on various subjects."
      ];
      
      const randomResponse = responses[Math.floor(Math.random() * responses.length)];
      setResponse(randomResponse);
    } catch (error) {
      toast.error("Failed to get response");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="space-y-4">
      <form onSubmit={handleSubmit} className="flex items-center space-x-2">
        <Input
          placeholder="Ask something..."
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          className="flex-1"
          disabled={loading}
        />
        <Button type="submit" size="icon" disabled={loading}>
          <ArrowRight className="h-4 w-4" />
        </Button>
      </form>
      
      {loading && (
        <div className="h-20 flex items-center justify-center">
          <div className="animate-pulse text-muted-foreground">
            Generating response...
          </div>
        </div>
      )}
      
      {response && !loading && (
        <div className="bg-muted p-3 rounded-md text-sm animate-fade-in">
          {response}
        </div>
      )}
    </div>
  );
};

export default ApiQueryBox;
