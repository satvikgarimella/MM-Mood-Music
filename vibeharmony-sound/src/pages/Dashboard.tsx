
import { useState } from "react";
import { Play, Clock, ChevronRight, BarChart2 } from "lucide-react";
import Navbar from "@/components/layout/Navbar";
import MusicPlayer from "@/components/layout/MusicPlayer";
import MoodChip from "@/components/ui/MoodChip";
import GradientButton from "@/components/ui/GradientButton";

type MoodType = "happy" | "sad" | "chill" | "energetic" | "focused";

// Sample data
const playlists = [
  {
    id: 1,
    title: "Morning Energy Boost",
    description: "Start your day with uplifting beats",
    mood: "energetic",
    coverColor: "from-[#FF5E5B] to-[#FFD166]",
    songs: 14,
    duration: "58 min"
  },
  {
    id: 2,
    title: "Calm Focus",
    description: "Concentration-enhancing instrumental tracks",
    mood: "focused",
    coverColor: "from-[#8A4FFF] to-[#4F74FF]",
    songs: 18,
    duration: "1h 12min"
  },
  {
    id: 3,
    title: "Afternoon Chill",
    description: "Relaxing beats for your afternoon break",
    mood: "chill",
    coverColor: "from-[#21A179] to-[#4F74FF]",
    songs: 12,
    duration: "47 min"
  },
  {
    id: 4,
    title: "Happy Vibes",
    description: "Feel-good tracks to boost your mood",
    mood: "happy",
    coverColor: "from-[#FFD166] to-[#FF5E5B]",
    songs: 15,
    duration: "52 min"
  }
];

// Recently played tracks
const recentTracks = [
  {
    title: "Mind Elevation",
    artist: "Cosmic Dreams",
    mood: "focused",
    duration: "3:42"
  },
  {
    title: "Ocean Flow",
    artist: "Wave Collective",
    mood: "chill",
    duration: "4:18"
  },
  {
    title: "Sunrise Rhythm",
    artist: "Morning Beats",
    mood: "energetic",
    duration: "3:24"
  },
  {
    title: "Gentle Rain",
    artist: "Nature Sounds",
    mood: "chill",
    duration: "5:17"
  },
  {
    title: "Positive Energy",
    artist: "Good Vibes",
    mood: "happy",
    duration: "3:55"
  }
];

const Dashboard = () => {
  const [selectedMood, setSelectedMood] = useState<MoodType>("energetic");
  const [smartShuffle, setSmartShuffle] = useState(true);
  
  return (
    <div className="min-h-screen bg-background text-white pb-24">
      <Navbar />
      
      <main className="pt-24 px-4">
        <div className="container mx-auto">
          <div className="flex flex-col lg:flex-row gap-8">
            {/* Main Content */}
            <div className="flex-1">
              <h1 className="text-3xl font-bold mb-2">Good afternoon, User</h1>
              <p className="text-white/70 mb-8">Here's what we've prepared for your current mood</p>
              
              {/* Mood Selector */}
              <div className="glass-card p-6 mb-10">
                <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 mb-6">
                  <div>
                    <h2 className="text-xl font-semibold mb-1">Select Your Mood</h2>
                    <p className="text-white/70 text-sm">How are you feeling right now?</p>
                  </div>
                  
                  <div className="flex items-center gap-3">
                    <span className="text-white/70 text-sm">Smart Shuffle</span>
                    <button
                      onClick={() => setSmartShuffle(!smartShuffle)}
                      className={`relative w-12 h-6 rounded-full transition-colors ${
                        smartShuffle ? "bg-primary" : "bg-white/10"
                      }`}
                    >
                      <span
                        className={`absolute top-1 w-4 h-4 rounded-full bg-white transition-transform ${
                          smartShuffle ? "left-7" : "left-1"
                        }`}
                      ></span>
                    </button>
                  </div>
                </div>
                
                <div className="flex flex-wrap gap-3">
                  {(["happy", "sad", "chill", "energetic", "focused"] as MoodType[]).map((mood) => (
                    <MoodChip
                      key={mood}
                      mood={mood}
                      selected={selectedMood === mood}
                      onClick={() => setSelectedMood(mood)}
                    />
                  ))}
                </div>
              </div>
              
              {/* Recommended Playlists */}
              <h2 className="text-xl font-semibold mb-4">Recommended for You</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-1 xl:grid-cols-2 gap-6 mb-12">
                {playlists.map((playlist) => (
                  <div key={playlist.id} className="glass-card-hover overflow-hidden">
                    <div className={`h-40 bg-gradient-to-r ${playlist.coverColor} relative`}>
                      <div className="absolute bottom-4 right-4">
                        <button className="w-10 h-10 rounded-full bg-white flex items-center justify-center text-black hover:scale-105 transition-transform">
                          <Play size={20} />
                        </button>
                      </div>
                    </div>
                    <div className="p-5">
                      <div className="flex justify-between items-start mb-3">
                        <h3 className="text-lg font-medium">{playlist.title}</h3>
                        <MoodChip mood={playlist.mood as MoodType} />
                      </div>
                      <p className="text-white/70 text-sm mb-3">{playlist.description}</p>
                      <div className="flex items-center text-white/50 text-sm">
                        <span>{playlist.songs} songs</span>
                        <span className="mx-2">•</span>
                        <Clock size={14} className="mr-1" />
                        <span>{playlist.duration}</span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
              
              {/* Recently Played */}
              <div className="flex items-center justify-between mb-4">
                <h2 className="text-xl font-semibold">Recently Played</h2>
                <a href="#" className="text-primary flex items-center hover:underline">
                  View All <ChevronRight size={16} />
                </a>
              </div>
              
              <div className="glass-card overflow-hidden">
                <div className="overflow-x-auto">
                  <table className="w-full min-w-[600px]">
                    <thead>
                      <tr className="border-b border-white/10">
                        <th className="py-4 px-6 text-left font-medium text-white/70">#</th>
                        <th className="py-4 px-6 text-left font-medium text-white/70">Title</th>
                        <th className="py-4 px-6 text-left font-medium text-white/70">Artist</th>
                        <th className="py-4 px-6 text-left font-medium text-white/70">Mood</th>
                        <th className="py-4 px-6 text-right font-medium text-white/70">Duration</th>
                      </tr>
                    </thead>
                    <tbody>
                      {recentTracks.map((track, index) => (
                        <tr key={index} className="border-b border-white/5 hover:bg-white/5 transition-colors cursor-pointer">
                          <td className="py-3 px-6 text-white/70">{index + 1}</td>
                          <td className="py-3 px-6 font-medium">{track.title}</td>
                          <td className="py-3 px-6 text-white/70">{track.artist}</td>
                          <td className="py-3 px-6">
                            <MoodChip mood={track.mood as MoodType} />
                          </td>
                          <td className="py-3 px-6 text-right text-white/70">{track.duration}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
            
            {/* Sidebar */}
            <div className="lg:w-80 xl:w-96">
              {/* Now Playing */}
              <div className="glass-card p-6 mb-6">
                <h2 className="text-xl font-semibold mb-4">Now Playing</h2>
                <div className="flex flex-col items-center text-center">
                  <div className="w-full aspect-square bg-gradient-to-br from-[#4F74FF] to-[#8A4FFF] rounded-xl mb-4 relative">
                    <div className="absolute inset-0 flex items-center justify-center">
                      <div className="w-14 h-14 rounded-full bg-white/20 flex items-center justify-center backdrop-blur-md">
                        <Play size={28} className="text-white ml-1" />
                      </div>
                    </div>
                  </div>
                  
                  <h3 className="text-lg font-medium mb-1">Dreamy Reflection</h3>
                  <p className="text-white/70 mb-3">Ambient Dreams</p>
                  <MoodChip mood="chill" className="mb-5" />
                  
                  <div className="w-full h-1 bg-white/10 rounded-full overflow-hidden mb-2">
                    <div className="h-full bg-white w-1/3"></div>
                  </div>
                  <div className="w-full flex justify-between text-white/50 text-xs">
                    <span>1:18</span>
                    <span>3:42</span>
                  </div>
                </div>
              </div>
              
              {/* Mood Insights */}
              <div className="glass-card p-6">
                <div className="flex items-center justify-between mb-4">
                  <h2 className="text-xl font-semibold">Mood Insights</h2>
                  <a href="/history" className="text-primary flex items-center hover:underline">
                    Details <ChevronRight size={16} />
                  </a>
                </div>
                
                <div className="mb-6">
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-white/70">This Week</span>
                    <span className="text-white font-medium">+12% Energetic</span>
                  </div>
                  <div className="w-full h-4 bg-white/5 rounded-full overflow-hidden flex">
                    <div className="h-full bg-mood-happy w-[25%]"></div>
                    <div className="h-full bg-mood-energetic w-[35%]"></div>
                    <div className="h-full bg-mood-chill w-[15%]"></div>
                    <div className="h-full bg-mood-focused w-[20%]"></div>
                    <div className="h-full bg-mood-sad w-[5%]"></div>
                  </div>
                </div>
                
                <div className="space-y-3 mb-6">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center">
                      <div className="w-3 h-3 rounded-full bg-mood-energetic mr-2"></div>
                      <span>Energetic</span>
                    </div>
                    <span>35%</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center">
                      <div className="w-3 h-3 rounded-full bg-mood-happy mr-2"></div>
                      <span>Happy</span>
                    </div>
                    <span>25%</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center">
                      <div className="w-3 h-3 rounded-full bg-mood-focused mr-2"></div>
                      <span>Focused</span>
                    </div>
                    <span>20%</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center">
                      <div className="w-3 h-3 rounded-full bg-mood-chill mr-2"></div>
                      <span>Chill</span>
                    </div>
                    <span>15%</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center">
                      <div className="w-3 h-3 rounded-full bg-mood-sad mr-2"></div>
                      <span>Sad</span>
                    </div>
                    <span>5%</span>
                  </div>
                </div>
                
                <a href="/history">
                  <GradientButton variant="muted" className="w-full">
                    <span className="flex items-center justify-center">
                      <BarChart2 size={18} className="mr-2" />
                      View Detailed Analysis
                    </span>
                  </GradientButton>
                </a>
              </div>
            </div>
          </div>
        </div>
      </main>
      
      <MusicPlayer />
    </div>
  );
};

export default Dashboard;
