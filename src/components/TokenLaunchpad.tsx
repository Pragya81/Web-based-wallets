import { useState } from "react";
import { Button } from "./ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "./ui/card";
import { Input } from "./ui/input";
import { Label } from "./ui/label";
import { Switch } from "./ui/switch";

export function TokenLaunchpad() {
  const [tokenName, setTokenName] = useState("");
  const [decimals, setDecimals] = useState("");
  const [freezeAuthority, setFreezeAuthority] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Token creation logic will be implemented later
    console.log({ tokenName, decimals, freezeAuthority });
  };

  return (
    <Card className="glass-card animate-fade-in sticky top-8">
      <CardHeader>
        <CardTitle>Launch New Token</CardTitle>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="tokenName">Token Name</Label>
            <Input
              id="tokenName"
              value={tokenName}
              onChange={(e) => setTokenName(e.target.value)}
              placeholder="Enter token name"
              className="rounded-lg"
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="decimals">Decimals</Label>
            <Input
              id="decimals"
              type="number"
              value={decimals}
              onChange={(e) => setDecimals(e.target.value)}
              placeholder="Enter number of decimals"
              className="rounded-lg"
            />
          </div>
          <div className="flex items-center space-x-2">
            <Switch
              id="freeze"
              checked={freezeAuthority}
              onCheckedChange={setFreezeAuthority}
            />
            <Label htmlFor="freeze">Enable Freeze Authority</Label>
          </div>
          <Button type="submit" className="w-full rounded-lg">
            Create Token
          </Button>
        </form>
      </CardContent>
    </Card>
  );
}