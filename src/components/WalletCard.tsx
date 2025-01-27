import { Copy, Eye, EyeOff, Trash2 } from "lucide-react";
import { useState } from "react";
import { toast } from "sonner";
import { Button } from "./ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "./ui/card";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "./ui/alert-dialog";

interface WalletCardProps {
  name: string;
  publicKey: string;
  privateKey: string;
  onDelete: () => void;
}

export function WalletCard({ name, publicKey, privateKey, onDelete }: WalletCardProps) {
  const [showPrivateKey, setShowPrivateKey] = useState(false);
  let hideTimeout: number;

  const copyToClipboard = (text: string, type: string) => {
    navigator.clipboard.writeText(text);
    toast.success(`${type} copied to clipboard`);
  };

  const handleShowPrivateKey = () => {
    setShowPrivateKey(true);
    // Clear any existing timeout
    if (hideTimeout) window.clearTimeout(hideTimeout);
    // Set new timeout to hide after 5 seconds
    hideTimeout = window.setTimeout(() => {
      setShowPrivateKey(false);
    }, 5000);
  };

  return (
    <Card className="glass-card animate-fade-in group hover:scale-[1.02] transition-transform duration-200">
      <CardHeader className="flex flex-row items-center justify-between">
        <CardTitle className="text-xl font-bold">{name}</CardTitle>
        <AlertDialog>
          <AlertDialogTrigger asChild>
            <Button
              variant="ghost"
              size="icon"
              className="opacity-0 group-hover:opacity-100 transition-opacity"
            >
              <Trash2 className="h-4 w-4 text-destructive hover:text-destructive/80" />
            </Button>
          </AlertDialogTrigger>
          <AlertDialogContent>
            <AlertDialogHeader>
              <AlertDialogTitle>Delete Wallet</AlertDialogTitle>
              <AlertDialogDescription>
                Are you sure you want to delete this wallet? This action cannot be undone.
              </AlertDialogDescription>
            </AlertDialogHeader>
            <AlertDialogFooter>
              <AlertDialogCancel>Cancel</AlertDialogCancel>
              <AlertDialogAction onClick={onDelete} className="bg-destructive hover:bg-destructive/90">
                Delete
              </AlertDialogAction>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialog>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="space-y-2">
          <div className="flex items-center justify-between">
            <span className="text-sm text-muted-foreground">Public Key</span>
            <Button
              variant="ghost"
              size="sm"
              onClick={() => copyToClipboard(publicKey, "Public key")}
              className="opacity-50 hover:opacity-100 transition-opacity"
            >
              <Copy className="h-4 w-4" />
            </Button>
          </div>
          <p className="text-xs bg-secondary/50 p-2 rounded-md break-all">
            {publicKey}
          </p>
        </div>
        <div className="space-y-2">
          <div className="flex items-center justify-between">
            <span className="text-sm text-muted-foreground">Private Key</span>
            <div className="flex gap-2">
              <Button
                variant="ghost"
                size="sm"
                onClick={() => setShowPrivateKey(!showPrivateKey)}
                className="opacity-50 hover:opacity-100 transition-opacity"
              >
                {showPrivateKey ? (
                  <EyeOff className="h-4 w-4" />
                ) : (
                  <Eye className="h-4 w-4" />
                )}
              </Button>
              <Button
                variant="ghost"
                size="sm"
                onClick={() => copyToClipboard(privateKey, "Private key")}
                className="opacity-50 hover:opacity-100 transition-opacity"
              >
                <Copy className="h-4 w-4" />
              </Button>
            </div>
          </div>
          <p className="text-xs bg-secondary/50 p-2 rounded-md break-all font-mono">
            {showPrivateKey ? privateKey : "••••••••••••••••••••••••••••••••"}
          </p>
        </div>
      </CardContent>
    </Card>
  );
}