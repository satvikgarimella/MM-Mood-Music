
import { useState, useEffect } from "react";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import { Input } from "@/components/ui/input";
import { Search as SearchIcon, Music, Plus } from "lucide-react";
import { searchTracks, getRecommendationsByMood, Song, getStoredApiKey } from "@/services/spotifyService";
import MoodChip from "@/components/ui/MoodChip";
import SpotifySetup from "@/components/spotify/SpotifySetup";
import { useToast } from "@/hooks/use-toast";

type MoodType = "happy" | "sad" | "chill" | "energetic" | "focused";

const Search = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [searchResults, setSearchResults] = useState<Song[]>([]);
  const [selectedMood, setSelectedMood] = useState<MoodType | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [hasApiKey, setHasApiKey] = useState(false);
  const { toast } = useToast();

  // Check if Spotify API key is available
  useEffect(() => {
    const apiKey = getStoredApiKey();
    setHasApiKey(!!apiKey);
  }, []);

  // Perform search when query changes
  useEffect(() => {
    const delayDebounceFn = setTimeout(async () => {
      if (searchQuery && hasApiKey) {
        setIsLoading(true);
        const results = await searchTracks(searchQuery);
        
        // Apply mood filter if selected
        const filteredResults = selectedMood 
          ? results.filter(song => song.mood === selectedMood)
          : results;
          
        setSearchResults(filteredResults);
        setIsLoading(false);
      } else if (!searchQuery) {
        setSearchResults([]);
      }
    }, 500);

    return () => clearTimeout(delayDebounceFn);
  }, [searchQuery, selectedMood, hasApiKey]);

  // Get recommendations when mood changes
  useEffect(() => {
    const fetchRecommendations = async () => {
      if (selectedMood && !searchQuery && hasApiKey) {
        setIsLoading(true);
        const recommendations = await getRecommendationsByMood(selectedMood);
        setSearchResults(recommendations);
        setIsLoading(false);
      }
    };

    fetchRecommendations();
  }, [selectedMood, hasApiKey]);

  const handleMoodSelect = (mood: MoodType) => {
    setSelectedMood(selectedMood === mood ? null : mood);
  };

  const addToPlaylist = (song: Song) => {
    // In a real app, this would add to a playlist in state or database
    toast({
      title: "Added to Playlist",
      description: `${song.title} by ${song.artist} added to your playlist.`
    });
  };

  return (
    <div className="min-h-screen bg-background text-white">
      <Navbar />
      <main className="container mx-auto px-4 pt-24 pb-32">
        <div className="flex items-center justify-between mb-8">
          <h1 className="text-3xl font-bold">Search Music</h1>
          {!hasApiKey && <SpotifySetup />}
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Left column: Search and filters */}
          <div className="lg:col-span-1 space-y-6">
            <div className="relative">
              <Input
                type="text"
                placeholder="Search for songs or artists..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="bg-white/5 border-white/10 pl-10 pr-4 py-3 w-full rounded-xl"
                disabled={!hasApiKey}
              />
              <SearchIcon className="absolute left-3 top-1/2 transform -translate-y-1/2 text-white/50" size={18} />
            </div>
            
            <div className="backdrop-blur-xl bg-white/5 border border-white/10 rounded-xl p-6">
              <h2 className="text-lg font-semibold mb-4">Filter by Mood</h2>
              <div className="flex flex-wrap gap-3">
                {(["happy", "sad", "chill", "energetic", "focused"] as MoodType[]).map((mood) => (
                  <MoodChip
                    key={mood}
                    mood={mood}
                    selected={selectedMood === mood}
                    onClick={() => handleMoodSelect(mood)}
                  />
                ))}
              </div>
            </div>
          </div>
          
          {/* Right column: Results */}
          <div className="lg:col-span-2">
            <div className="backdrop-blur-xl bg-white/5 border border-white/10 rounded-xl p-6">
              <h2 className="text-xl font-semibold mb-4">
                {selectedMood && !searchQuery 
                  ? `${selectedMood.charAt(0).toUpperCase() + selectedMood.slice(1)} Music Recommendations` 
                  : "Search Results"}
              </h2>
              
              {isLoading ? (
                <div className="py-12 text-center">
                  <div className="inline-block animate-spin rounded-full h-8 w-8 border-t-2 border-white border-r-2 border-white/20"></div>
                  <p className="mt-4 text-white/70">Searching for music...</p>
                </div>
              ) : !hasApiKey ? (
                <div className="text-center py-12 border border-dashed border-white/20 rounded-lg">
                  <Music size={48} className="mx-auto text-white/30 mb-4" />
                  <p className="text-white/70 mb-2">Connect to Spotify to search for music</p>
                  <p className="text-sm text-white/50 mb-6">Use the "Connect Spotify" button above to get started</p>
                  <SpotifySetup />
                </div>
              ) : searchResults.length > 0 ? (
                <div className="space-y-3 max-h-[600px] overflow-y-auto pr-2">
                  {searchResults.map(song => (
                    <div key={song.id} className="flex items-center justify-between p-3 hover:bg-white/10 rounded-lg transition-colors">
                      <div className="flex items-center">
                        <div className="mr-3 h-12 w-12 rounded-md flex items-center justify-center overflow-hidden">
                          {song.albumArt ? (
                            <img src={song.albumArt} alt={song.title} className="w-full h-full object-cover" />
                          ) : (
                            <div className="h-full w-full bg-gradient-to-br from-[#8A4FFF] to-[#21A179] flex items-center justify-center">
                              <Music size={18} />
                            </div>
                          )}
                        </div>
                        <div>
                          <p className="font-medium">{song.title}</p>
                          <p className="text-sm text-white/70">{song.artist}</p>
                        </div>
                      </div>
                      <div className="flex items-center gap-3">
                        <MoodChip mood={song.mood} className="text-xs py-1 px-2" />
                        <span className="text-sm text-white/70">{song.duration}</span>
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
              ) : searchQuery ? (
                <div className="text-center py-12 border border-dashed border-white/20 rounded-lg">
                  <p className="text-white/50">No results found for "{searchQuery}"</p>
                  <p className="text-sm text-white/30 mt-2">Try a different search term or filter</p>
                </div>
              ) : (
                <div className="text-center py-12 border border-dashed border-white/20 rounded-lg">
                  <p className="text-white/50">Search for songs or select a mood to get recommendations</p>
                </div>
              )}
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default Search;
