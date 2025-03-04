
import { toast } from "@/hooks/use-toast";

// Define types for Spotify API responses
interface SpotifyArtist {
  id: string;
  name: string;
}

interface SpotifyTrack {
  id: string;
  name: string;
  artists: SpotifyArtist[];
  duration_ms: number;
  album: {
    name: string;
    images: { url: string; height: number; width: number }[];
  };
}

interface SpotifySearchResponse {
  tracks: {
    items: SpotifyTrack[];
  };
}

type MoodType = "happy" | "sad" | "chill" | "energetic" | "focused";

export interface Song {
  id: string;
  title: string;
  artist: string;
  duration: string;
  mood: MoodType;
  albumArt?: string;
}

// Spotify API credentials - in a real app, use environment variables
// For frontend only apps, you would have users authenticate via Spotify OAuth
// This is a client-side implementation for demo purposes only
const SPOTIFY_API_KEY = "YOUR_SPOTIFY_API_KEY";
const SPOTIFY_BASE_URL = "https://api.spotify.com/v1";

// Helper to format milliseconds as mm:ss
const formatDuration = (ms: number): string => {
  const minutes = Math.floor(ms / 60000);
  const seconds = ((ms % 60000) / 1000).toFixed(0);
  return `${minutes}:${parseInt(seconds) < 10 ? '0' : ''}${seconds}`;
};

// Helper to determine mood based on Spotify audio features
// In a real implementation, you would use the audio-features endpoint
// This is a simplified version for the demo
const determineMood = (trackName: string): MoodType => {
  const trackNameLower = trackName.toLowerCase();
  
  if (trackNameLower.includes("happy") || 
      trackNameLower.includes("joy") || 
      trackNameLower.includes("sunny")) {
    return "happy";
  } else if (trackNameLower.includes("sad") || 
           trackNameLower.includes("blue") || 
           trackNameLower.includes("melancholy")) {
    return "sad";
  } else if (trackNameLower.includes("chill") || 
           trackNameLower.includes("relax") || 
           trackNameLower.includes("calm")) {
    return "chill";
  } else if (trackNameLower.includes("energy") || 
           trackNameLower.includes("pump") || 
           trackNameLower.includes("dance")) {
    return "energetic";
  } else {
    return "focused";
  }
};

// Search tracks through Spotify API
export const searchTracks = async (query: string): Promise<Song[]> => {
  if (!query) return [];
  
  try {
    const response = await fetch(
      `${SPOTIFY_BASE_URL}/search?q=${encodeURIComponent(query)}&type=track&limit=20`,
      {
        headers: {
          'Authorization': `Bearer ${SPOTIFY_API_KEY}`,
        },
      }
    );
    
    if (!response.ok) {
      throw new Error(`Spotify API error: ${response.status}`);
    }
    
    const data: SpotifySearchResponse = await response.json();
    
    return data.tracks.items.map(track => ({
      id: track.id,
      title: track.name,
      artist: track.artists.map(artist => artist.name).join(", "),
      duration: formatDuration(track.duration_ms),
      mood: determineMood(track.name),
      albumArt: track.album.images[0]?.url,
    }));
  } catch (error) {
    console.error('Error searching Spotify tracks:', error);
    return [];
  }
};

// Get track recommendations based on mood
export const getRecommendationsByMood = async (mood: MoodType): Promise<Song[]> => {
  // Map moods to seed genres that match the mood
  const moodGenreMap: Record<MoodType, string[]> = {
    happy: ["pop", "happy", "dance"],
    sad: ["sad", "singer-songwriter", "blues"],
    chill: ["chill", "ambient", "study"],
    energetic: ["edm", "workout", "rock"],
    focused: ["focus", "classical", "instrumental"]
  };
  
  const seedGenres = moodGenreMap[mood].join(",");
  
  try {
    const response = await fetch(
      `${SPOTIFY_BASE_URL}/recommendations?seed_genres=${seedGenres}&limit=20`,
      {
        headers: {
          'Authorization': `Bearer ${SPOTIFY_API_KEY}`,
        },
      }
    );
    
    if (!response.ok) {
      throw new Error(`Spotify API error: ${response.status}`);
    }
    
    const data = await response.json();
    
    return data.tracks.map((track: SpotifyTrack) => ({
      id: track.id,
      title: track.name,
      artist: track.artists.map((artist: SpotifyArtist) => artist.name).join(", "),
      duration: formatDuration(track.duration_ms),
      mood: mood, // We already know the mood since we requested it
      albumArt: track.album.images[0]?.url,
    }));
  } catch (error) {
    console.error('Error getting recommendations:', error);
    return [];
  }
};

// Initialize Spotify API with your API key
export const initializeSpotifyAPI = (apiKey: string) => {
  // In a real app, you'd store this securely, but for demo purposes, we're setting it directly
  // Normally, you'd use Spotify's OAuth flow instead of an API key directly
  if (apiKey) {
    (window as any).SPOTIFY_API_KEY = apiKey;
    localStorage.setItem('spotify_api_key', apiKey);
    toast({
      title: "Spotify API Connected",
      description: "Your Spotify API key has been saved. You can now access Spotify's music library."
    });
    return true;
  }
  return false;
};

// Get the stored API key
export const getStoredApiKey = (): string => {
  return localStorage.getItem('spotify_api_key') || '';
};
