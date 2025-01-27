import { PlusCircle } from "lucide-react";
import { useState } from "react";
import { Button } from "./ui/button";
import { WalletCard } from "./WalletCard";
import { TokenLaunchpad } from "./TokenLaunchpad";

// Temporary mock data
const mockWallets = [
  {
    name: "Wallet 1",
    publicKey: "0x1234567890abcdef1234567890abcdef12345678",
    privateKey: "0xabcdef1234567890abcdef1234567890abcdef12",
  },
];

export function Dashboard() {
  const [wallets, setWallets] = useState(mockWallets);

  const createNewWallet = () => {
    const newWallet = {
      name: `Wallet ${wallets.length + 1}`,
      publicKey: `0x${Math.random().toString(16).slice(2)}`,
      privateKey: `0x${Math.random().toString(16).slice(2)}`,
    };
    setWallets([...wallets, newWallet]);
  };

  const deleteWallet = (index: number) => {
    const newWallets = wallets.filter((_, i) => i !== index);
    setWallets(newWallets);
  };

  return (
    <div className="container py-8 space-y-8 max-w-[1400px]">
      <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
        <div className="space-y-2">
          <h1 className="text-4xl font-bold tracking-tight">Web3 Wallet Dashboard</h1>
          <p className="text-lg text-muted-foreground">
            Manage your wallets and launch new tokens
          </p>
        </div>
        <Button onClick={createNewWallet} className="w-full md:w-auto">
          <PlusCircle className="mr-2 h-4 w-4" />
          Create New Wallet
        </Button>
      </div>

      <div className="flex flex-col lg:flex-row gap-8">
        <div className="flex-1 space-y-6">
          {wallets.map((wallet, index) => (
            <WalletCard
              key={index}
              {...wallet}
              onDelete={() => deleteWallet(index)}
            />
          ))}
        </div>
        
        <div className="lg:w-[400px]">
          <TokenLaunchpad />
        </div>
      </div>
    </div>
  );
}