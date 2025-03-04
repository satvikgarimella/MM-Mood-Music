
import { useState } from "react";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import GradientButton from "@/components/ui/GradientButton";
import { Input } from "@/components/ui/input";
import { Search, Plus, Save, Music } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

type MoodType = "happy" | "sad" | "chill" | "energetic" | "focused";

interface Song {
  id: string;
  title: string;
  artist: string;
  duration: string;
  mood: MoodType;
}

const CreatePlaylist = () => {
  const [playlistName, setPlaylistName] = useState("");
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedSongs, setSelectedSongs] = useState<Song[]>([]);
  const { toast } = useToast();
  
  // Mock data for demo with properly typed moods
  const searchResults: Song[] = [
    { id: "1", title: "Happy Days", artist: "The Sunshine Band", duration: "3:24", mood: "happy" },
    { id: "2", title: "Midnight Blues", artist: "Moonlight Quartet", duration: "4:15", mood: "sad" },
    { id: "3", title: "Ocean Waves", artist: "Coastal Dreams", duration: "3:57", mood: "chill" },
    { id: "4", title: "Electric Feel", artist: "Voltage", duration: "3:12", mood: "energetic" },
    { id: "5", title: "Deep Focus", artist: "Mind Collective", duration: "5:30", mood: "focused" },
    { id: "6", title: "Summer Vibes", artist: "Beach Boys", duration: "3:45", mood: "happy" },
    { id: "7", title: "Winter Melancholy", artist: "Frost", duration: "4:22", mood: "sad" },
  ].filter(song => 
    song.title.toLowerCase().includes(searchQuery.toLowerCase()) || 
    song.artist.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const addToPlaylist = (song: Song) => {
    if (!selectedSongs.some(s => s.id === song.id)) {
      setSelectedSongs([...selectedSongs, song]);
      toast({
        title: "Added to playlist",
        description: `${song.title} by ${song.artist} added to your playlist.`
      });
    }
  };

  const removeFromPlaylist = (songId: string) => {
    setSelectedSongs(selectedSongs.filter(song => song.id !== songId));
  };

  const savePlaylist = () => {
    if (!playlistName) {
      toast({
        title: "Playlist name required",
        description: "Please enter a name for your playlist.",
        variant: "destructive"
      });
      return;
    }
    
    if (selectedSongs.length === 0) {
      toast({
        title: "Empty playlist",
        description: "Please add at least one song to your playlist.",
        variant: "destructive"
      });
      return;
    }
    
    toast({
      title: "Playlist saved",
      description: `Your playlist "${playlistName}" has been saved.`
    });
    
    // In a real app, we'd save to a database here
    console.log("Saved playlist:", { name: playlistName, songs: selectedSongs });
  };

  return (
    <div className="min-h-screen bg-background text-white">
      <Navbar />
      <main className="container mx-auto px-4 pt-24 pb-32">
        <h1 className="text-3xl font-bold mb-6">Create Playlist</h1>
        
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Left column: Search and results */}
          <div className="space-y-6">
            <div className="relative">
              <Input
                type="text"
                placeholder="Search for songs or artists..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="bg-white/5 border-white/10 pl-10 pr-4 py-3 w-full rounded-xl"
              />
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-white/50" size={18} />
            </div>
            
            <div className="backdrop-blur-xl bg-white/5 border border-white/10 rounded-xl p-4">
              <h2 className="text-xl font-semibold mb-4">Search Results</h2>
              {searchResults.length > 0 ? (
                <div className="space-y-3">
                  {searchResults.map(song => (
                    <div key={song.id} className="flex items-center justify-between p-3 hover:bg-white/10 rounded-lg transition-colors">
                      <div className="flex items-center">
                        <div className="mr-3 h-10 w-10 bg-gradient-to-br from-[#8A4FFF] to-[#21A179] rounded-md flex items-center justify-center">
                          <Music size={18} />
                        </div>
                        <div>
                          <p className="font-medium">{song.title}</p>
                          <p className="text-sm text-white/70">{song.artist}</p>
                        </div>
                      </div>
                      <div className="flex items-center gap-3">
                        <span className={`text-xs px-2 py-1 rounded-full ${
                          song.mood === 'happy' ? 'bg-mood-happy/20 text-mood-happy' :
                          song.mood === 'sad' ? 'bg-mood-sad/20 text-mood-sad' :
                          song.mood === 'chill' ? 'bg-mood-chill/20 text-mood-chill' :
                          song.mood === 'energetic' ? 'bg-mood-energetic/20 text-mood-energetic' :
                          'bg-mood-focused/20 text-mood-focused'
                        }`}>
                          {song.mood}
                        </span>
                        <button 
                          onClick={() => addToPlaylist(song)}
                          className="p-2 hover:bg-white/20 rounded-full transition-colors"
                          aria-label="Add to playlist"
                        >
                          <Plus size={16} />
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <p className="text-white/50 text-center py-8">No songs found. Try a different search term.</p>
              )}
            </div>
          </div>
          
          {/* Right column: Playlist creation */}
          <div className="backdrop-blur-xl bg-white/5 border border-white/10 rounded-xl p-6">
            <div className="mb-6">
              <label htmlFor="playlist-name" className="block text-sm font-medium mb-2">Playlist Name</label>
              <Input
                id="playlist-name"
                type="text"
                placeholder="My Awesome Playlist"
                value={playlistName}
                onChange={(e) => setPlaylistName(e.target.value)}
                className="bg-white/5 border-white/10 w-full"
              />
            </div>
            
            <div className="mb-6">
              <h2 className="text-xl font-semibold mb-4">Selected Songs ({selectedSongs.length})</h2>
              {selectedSongs.length > 0 ? (
                <div className="space-y-3 max-h-[400px] overflow-y-auto pr-2">
                  {selectedSongs.map(song => (
                    <div key={song.id} className="flex items-center justify-between p-3 bg-white/10 rounded-lg">
                      <div className="flex items-center">
                        <div className="mr-3 h-10 w-10 bg-gradient-to-br from-[#8A4FFF] to-[#21A179] rounded-md flex items-center justify-center">
                          <Music size={18} />
                        </div>
                        <div>
                          <p className="font-medium">{song.title}</p>
                          <p className="text-sm text-white/70">{song.artist}</p>
                        </div>
                      </div>
                      <div className="flex items-center gap-3">
                        <span className="text-sm text-white/70">{song.duration}</span>
                        <button 
                          onClick={() => removeFromPlaylist(song.id)}
                          className="text-white/70 hover:text-white/100 transition-colors"
                          aria-label="Remove from playlist"
                        >
                          ✕
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="text-center py-12 border border-dashed border-white/20 rounded-lg">
                  <p className="text-white/50 mb-2">Your playlist is empty</p>
                  <p className="text-sm text-white/30">Search for songs and add them to your playlist</p>
                </div>
              )}
            </div>
            
            <GradientButton 
              onClick={savePlaylist} 
              className="w-full flex items-center justify-center gap-2"
            >
              <Save size={18} />
              Save Playlist
            </GradientButton>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default CreatePlaylist;
