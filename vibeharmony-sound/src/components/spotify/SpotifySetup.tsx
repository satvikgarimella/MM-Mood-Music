
import { useState } from "react";
import { initializeSpotifyAPI, getStoredApiKey } from "@/services/spotifyService";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import GradientButton from "@/components/ui/GradientButton";
import { Music } from "lucide-react";

const SpotifySetup = () => {
  const [apiKey, setApiKey] = useState(getStoredApiKey());
  const [open, setOpen] = useState(false);
  
  const handleSaveApiKey = () => {
    if (initializeSpotifyAPI(apiKey)) {
      setOpen(false);
    }
  };
  
  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <button className="flex items-center space-x-2 p-2 rounded-full bg-white/10 hover:bg-white/20 transition-colors">
          <Music size={18} />
          <span className="text-sm">Connect Spotify</span>
        </button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-md bg-black/70 backdrop-blur-xl border border-white/10 text-white">
        <DialogHeader>
          <DialogTitle>Connect to Spotify</DialogTitle>
        </DialogHeader>
        <div className="space-y-4 pt-4">
          <p className="text-sm text-white/70">
            Enter your Spotify API key to enable music search and recommendations.
            You can obtain a key from the <a href="https://developer.spotify.com/dashboard/" target="_blank" rel="noopener noreferrer" className="text-blue-400 hover:underline">Spotify Developer Dashboard</a>.
          </p>
          <div className="space-y-2">
            <label htmlFor="api-key" className="text-sm font-medium">Spotify API Key</label>
            <Input
              id="api-key"
              value={apiKey}
              onChange={(e) => setApiKey(e.target.value)}
              placeholder="Enter your Spotify API key"
              className="bg-white/5 border-white/10"
            />
          </div>
          <div className="flex justify-end">
            <GradientButton onClick={handleSaveApiKey} disabled={!apiKey}>
              Connect
            </GradientButton>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default SpotifySetup;
