
import { useState } from "react";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import MusicPlayer from "@/components/layout/MusicPlayer";
import MoodChip from "@/components/ui/MoodChip";
import { Avatar } from "@/components/ui/avatar";
import { Input } from "@/components/ui/input";
import { Search, Share2, Users, Heart, MessageCircle, Plus } from "lucide-react";
import GradientButton from "@/components/ui/GradientButton";

type MoodType = "happy" | "sad" | "chill" | "energetic" | "focused";

// Mock data for friends
const friends = [
  {
    id: 1,
    name: "Alex Johnson",
    avatar: "/placeholder.svg",
    currentSong: "Ocean Waves",
    artist: "Coastal Dreams",
    mood: "chill" as MoodType,
    online: true
  },
  {
    id: 2,
    name: "Taylor Smith",
    avatar: "/placeholder.svg",
    currentSong: "Electric Feel",
    artist: "Voltage",
    mood: "energetic" as MoodType,
    online: true
  },
  {
    id: 3,
    name: "Jordan Lee",
    avatar: "/placeholder.svg",
    currentSong: "Midnight Blues",
    artist: "Moonlight Quartet",
    mood: "sad" as MoodType,
    online: false
  },
  {
    id: 4,
    name: "Casey Wilson",
    avatar: "/placeholder.svg",
    currentSong: "Happy Days",
    artist: "The Sunshine Band",
    mood: "happy" as MoodType,
    online: true
  }
];

// Mock data for mood feed posts
const feedPosts = [
  {
    id: 1,
    user: {
      name: "Alex Johnson",
      avatar: "/placeholder.svg"
    },
    content: "Just discovered this amazing playlist for studying! Perfect focus vibes.",
    playlist: {
      title: "Deep Focus",
      songs: 18,
      mood: "focused" as MoodType,
      coverColor: "from-[#8A4FFF] to-[#4F74FF]"
    },
    likes: 24,
    comments: 5,
    timeAgo: "2 hours ago"
  },
  {
    id: 2,
    user: {
      name: "Taylor Smith",
      avatar: "/placeholder.svg"
    },
    content: "Feeling the energy today! Who wants to collaborate on a workout playlist?",
    playlist: {
      title: "Workout Intensity",
      songs: 15,
      mood: "energetic" as MoodType,
      coverColor: "from-[#FF5E5B] to-[#FFD166]"
    },
    likes: 18,
    comments: 7,
    timeAgo: "4 hours ago"
  },
  {
    id: 3,
    user: {
      name: "Jordan Lee",
      avatar: "/placeholder.svg"
    },
    content: "Rainy day calls for some chill beats. Here's what I'm listening to right now.",
    playlist: {
      title: "Rainy Day Vibes",
      songs: 22,
      mood: "chill" as MoodType, 
      coverColor: "from-[#21A179] to-[#4F74FF]"
    },
    likes: 32,
    comments: 9,
    timeAgo: "6 hours ago"
  }
];

// Mock mood match data
const moodMatches = [
  {
    id: 1,
    name: "Riley Morgan",
    avatar: "/placeholder.svg",
    matchPercentage: 94,
    topMood: "chill" as MoodType,
    mutualGenres: ["Indie", "Lo-fi", "Ambient"]
  },
  {
    id: 2,
    name: "Jamie Parker",
    avatar: "/placeholder.svg",
    matchPercentage: 88,
    topMood: "energetic" as MoodType,
    mutualGenres: ["Electronic", "Dance", "House"]
  },
  {
    id: 3,
    name: "Quinn Davis",
    avatar: "/placeholder.svg",
    matchPercentage: 82,
    topMood: "happy" as MoodType,
    mutualGenres: ["Pop", "R&B", "Indie Pop"]
  }
];

const Social = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [activeTab, setActiveTab] = useState<"feed" | "friends" | "matches">("feed");
  const [likedPosts, setLikedPosts] = useState<number[]>([]);

  const toggleLike = (postId: number) => {
    if (likedPosts.includes(postId)) {
      setLikedPosts(likedPosts.filter(id => id !== postId));
    } else {
      setLikedPosts([...likedPosts, postId]);
    }
  };

  return (
    <div className="min-h-screen bg-background text-white pb-24">
      <Navbar />
      
      <main className="container mx-auto px-4 pt-24 pb-32">
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-3xl font-bold">Social</h1>
          <div className="relative w-full max-w-xs">
            <Input
              type="text"
              placeholder="Search friends..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="bg-white/5 border-white/10 pl-10 pr-4 py-2 w-full rounded-xl"
            />
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-white/50" size={16} />
          </div>
        </div>
        
        {/* Tabs Navigation */}
        <div className="flex space-x-2 mb-8 overflow-x-auto pb-2">
          <button
            onClick={() => setActiveTab("feed")}
            className={`px-4 py-2 rounded-lg font-medium transition-colors ${
              activeTab === "feed" 
                ? "bg-white/10 text-white" 
                : "text-white/60 hover:text-white hover:bg-white/5"
            }`}
          >
            <Share2 size={18} className="inline mr-2" />
            Mood Feed
          </button>
          <button
            onClick={() => setActiveTab("friends")}
            className={`px-4 py-2 rounded-lg font-medium transition-colors ${
              activeTab === "friends" 
                ? "bg-white/10 text-white" 
                : "text-white/60 hover:text-white hover:bg-white/5"
            }`}
          >
            <Users size={18} className="inline mr-2" />
            Friends
          </button>
          <button
            onClick={() => setActiveTab("matches")}
            className={`px-4 py-2 rounded-lg font-medium transition-colors ${
              activeTab === "matches" 
                ? "bg-white/10 text-white" 
                : "text-white/60 hover:text-white hover:bg-white/5"
            }`}
          >
            <Heart size={18} className="inline mr-2" />
            Mood Matches
          </button>
        </div>
        
        {/* Content based on active tab */}
        <div className="animate-fade-in">
          {activeTab === "feed" && (
            <div className="space-y-6">
              {/* Create post area */}
              <div className="glass-card p-4">
                <div className="flex items-center gap-3 mb-3">
                  <Avatar className="w-10 h-10">
                    <div className="w-full h-full rounded-full bg-gradient-to-br from-[#8A4FFF] to-[#21A179]"></div>
                  </Avatar>
                  <div className="flex-1">
                    <Input
                      placeholder="Share what you're listening to..."
                      className="bg-white/5 border-white/10 w-full"
                    />
                  </div>
                </div>
                <div className="flex justify-end">
                  <GradientButton size="sm">Share</GradientButton>
                </div>
              </div>
              
              {/* Feed posts */}
              {feedPosts.map(post => (
                <div key={post.id} className="glass-card overflow-hidden">
                  <div className="p-4">
                    <div className="flex items-center gap-3 mb-3">
                      <Avatar className="w-10 h-10">
                        <div className="w-full h-full rounded-full bg-black/20"></div>
                      </Avatar>
                      <div>
                        <h3 className="font-medium">{post.user.name}</h3>
                        <p className="text-xs text-white/60">{post.timeAgo}</p>
                      </div>
                    </div>
                    <p className="mb-4">{post.content}</p>
                  </div>
                  
                  {/* Playlist preview */}
                  <div className={`h-24 bg-gradient-to-r ${post.playlist.coverColor} p-4 flex justify-between items-center`}>
                    <div>
                      <h3 className="font-bold text-lg">{post.playlist.title}</h3>
                      <div className="flex items-center gap-2">
                        <span className="text-sm text-white/80">{post.playlist.songs} songs</span>
                        <MoodChip mood={post.playlist.mood} />
                      </div>
                    </div>
                    <button className="w-10 h-10 rounded-full bg-white flex items-center justify-center text-black hover:scale-105 transition-transform">
                      <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polygon points="5 3 19 12 5 21 5 3"></polygon></svg>
                    </button>
                  </div>
                  
                  {/* Actions */}
                  <div className="p-3 flex items-center justify-between border-t border-white/10">
                    <div className="flex items-center gap-4">
                      <button 
                        className="flex items-center gap-1 text-white/70 hover:text-white transition-colors"
                        onClick={() => toggleLike(post.id)}
                      >
                        <Heart 
                          size={18} 
                          className={likedPosts.includes(post.id) ? "fill-mood-energetic text-mood-energetic" : ""} 
                        />
                        <span>{likedPosts.includes(post.id) ? post.likes + 1 : post.likes}</span>
                      </button>
                      <button className="flex items-center gap-1 text-white/70 hover:text-white transition-colors">
                        <MessageCircle size={18} />
                        <span>{post.comments}</span>
                      </button>
                    </div>
                    <button className="text-white/70 hover:text-white transition-colors">
                      <Share2 size={18} />
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}
          
          {activeTab === "friends" && (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {friends.map(friend => (
                <div key={friend.id} className="glass-card p-4">
                  <div className="flex items-center gap-3 mb-3">
                    <div className="relative">
                      <Avatar className="w-12 h-12">
                        <div className="w-full h-full rounded-full bg-black/20"></div>
                      </Avatar>
                      {friend.online && (
                        <span className="absolute bottom-0 right-0 w-3 h-3 bg-green-500 rounded-full border-2 border-background"></span>
                      )}
                    </div>
                    <div>
                      <h3 className="font-medium">{friend.name}</h3>
                      <p className="text-xs text-white/60">{friend.online ? "Online now" : "Offline"}</p>
                    </div>
                  </div>
                  
                  {friend.online && (
                    <div className="bg-white/5 rounded-lg p-3 mb-3">
                      <p className="text-xs text-white/60 mb-1">Currently listening to</p>
                      <p className="font-medium">{friend.currentSong}</p>
                      <p className="text-sm text-white/80">{friend.artist}</p>
                      <div className="mt-2">
                        <MoodChip mood={friend.mood} />
                      </div>
                    </div>
                  )}
                  
                  <div className="flex gap-2">
                    <GradientButton variant="muted" size="sm" className="flex-1">Message</GradientButton>
                    <GradientButton size="sm" className="flex-1">View Profile</GradientButton>
                  </div>
                </div>
              ))}
              
              <div className="glass-card p-4 flex flex-col items-center justify-center text-center h-[200px]">
                <div className="w-12 h-12 rounded-full bg-white/10 flex items-center justify-center mb-3">
                  <Plus size={20} className="text-white/70" />
                </div>
                <h3 className="font-medium mb-1">Add Friends</h3>
                <p className="text-sm text-white/60 mb-3">Connect with more music lovers</p>
                <GradientButton size="sm">Find Friends</GradientButton>
              </div>
            </div>
          )}
          
          {activeTab === "matches" && (
            <div className="space-y-6">
              <div className="glass-card p-6 text-center mb-6">
                <h2 className="text-xl font-semibold mb-2">Mood Match</h2>
                <p className="text-white/70 mb-4">Find people with similar music tastes and mood preferences</p>
                <GradientButton>Find New Matches</GradientButton>
              </div>
              
              <h3 className="text-lg font-medium mb-3">Your Top Matches</h3>
              
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {moodMatches.map(match => (
                  <div key={match.id} className="glass-card p-4">
                    <div className="flex items-center gap-3 mb-4">
                      <Avatar className="w-12 h-12">
                        <div className="w-full h-full rounded-full bg-black/20"></div>
                      </Avatar>
                      <div>
                        <h3 className="font-medium">{match.name}</h3>
                        <div className="flex items-center mt-1">
                          <div className="w-full bg-white/10 h-1.5 rounded-full overflow-hidden">
                            <div 
                              className="h-full bg-primary"
                              style={{ width: `${match.matchPercentage}%` }}
                            ></div>
                          </div>
                          <span className="ml-2 text-xs font-medium">{match.matchPercentage}%</span>
                        </div>
                      </div>
                    </div>
                    
                    <div className="mb-3">
                      <div className="text-sm text-white/70 mb-1">Top mood</div>
                      <MoodChip mood={match.topMood} />
                    </div>
                    
                    <div className="mb-4">
                      <div className="text-sm text-white/70 mb-1">Mutual genres</div>
                      <div className="flex flex-wrap gap-2">
                        {match.mutualGenres.map((genre, i) => (
                          <span key={i} className="text-xs px-2 py-1 bg-white/10 rounded-full">
                            {genre}
                          </span>
                        ))}
                      </div>
                    </div>
                    
                    <div className="flex gap-2">
                      <GradientButton variant="muted" size="sm" className="flex-1">View Profile</GradientButton>
                      <GradientButton size="sm" className="flex-1">Connect</GradientButton>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </main>
      
      <MusicPlayer />
    </div>
  );
};

export default Social;
