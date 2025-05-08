
import { useState } from "react";
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Eye, EyeOff, Copy, Trash2 } from "lucide-react";
import { toast } from "sonner";

interface ApiKey {
  id: string;
  key: string;
  name: string;
  created: Date;
  requests: number;
}

interface ApiKeyCardProps {
  apiKey: ApiKey;
  onDelete: () => void;
}

const ApiKeyCard = ({ apiKey, onDelete }: ApiKeyCardProps) => {
  const [showKey, setShowKey] = useState(false);
  
  const toggleShowKey = () => {
    setShowKey(!showKey);
  };
  
  const copyToClipboard = () => {
    navigator.clipboard.writeText(apiKey.key);
    toast.success("API key copied to clipboard");
  };
  
  const formatDate = (date: Date) => {
    if (!(date instanceof Date)) {
      date = new Date(date);
    }
    return date.toLocaleDateString('en-US', { 
      month: 'short', 
      day: 'numeric', 
      year: 'numeric' 
    });
  };

  return (
    <Card className="animate-fade-in">
      <CardContent className="p-6">
        <div className="flex justify-between items-start mb-4">
          <div>
            <h3 className="font-medium">{apiKey.name}</h3>
            <p className="text-xs text-muted-foreground">
              Created on {formatDate(apiKey.created)}
            </p>
          </div>
          <div className="text-right">
            <p className="text-sm font-medium">Requests</p>
            <p className="text-lg">{apiKey.requests.toLocaleString()}</p>
          </div>
        </div>
        
        <div className="flex items-center space-x-2 bg-muted rounded-md p-2 mb-2">
          <code className="text-xs font-mono flex-1 overflow-x-auto whitespace-nowrap">
            {showKey ? apiKey.key : "••••••••••••••••••••••••••"}
          </code>
          <Button variant="outline" size="icon" onClick={toggleShowKey}>
            {showKey ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
          </Button>
          <Button variant="outline" size="icon" onClick={copyToClipboard}>
            <Copy className="h-4 w-4" />
          </Button>
        </div>
      </CardContent>
      
      <CardFooter className="px-6 py-4 border-t">
        <Button variant="destructive" size="sm" onClick={onDelete} className="ml-auto">
          <Trash2 className="h-4 w-4 mr-2" />
          Delete Key
        </Button>
      </CardFooter>
    </Card>
  );
};

export default ApiKeyCard;
