
import { useState } from "react";
import { Calendar, BarChart2, PieChart, Filter } from "lucide-react";
import Navbar from "@/components/layout/Navbar";
import MusicPlayer from "@/components/layout/MusicPlayer";
import MoodChip from "@/components/ui/MoodChip";
import GradientButton from "@/components/ui/GradientButton";

// Sample data for mood history
const moodData = [
  { date: "Mon", happy: 15, sad: 5, chill: 40, energetic: 30, focused: 10 },
  { date: "Tue", happy: 25, sad: 10, chill: 20, energetic: 25, focused: 20 },
  { date: "Wed", happy: 20, sad: 5, chill: 15, energetic: 40, focused: 20 },
  { date: "Thu", happy: 10, sad: 15, chill: 30, energetic: 20, focused: 25 },
  { date: "Fri", happy: 30, sad: 5, chill: 15, energetic: 35, focused: 15 },
  { date: "Sat", happy: 35, sad: 0, chill: 25, energetic: 25, focused: 15 },
  { date: "Sun", happy: 20, sad: 0, chill: 45, energetic: 15, focused: 20 },
];

// Sample top tracks for each mood
const moodTracks = {
  happy: [
    { title: "Sunny Day", artist: "Bright Lights", plays: 12 },
    { title: "Good Vibes", artist: "Happy Collective", plays: 10 },
    { title: "Uplift", artist: "Sky High", plays: 8 },
  ],
  sad: [
    { title: "Rainy Night", artist: "Melancholy Dreams", plays: 7 },
    { title: "Missing You", artist: "Lost Soul", plays: 5 },
    { title: "Empty Room", artist: "Echo Chamber", plays: 4 },
  ],
  chill: [
    { title: "Gentle Waves", artist: "Ocean Sounds", plays: 15 },
    { title: "Evening Breeze", artist: "Calm Collective", plays: 13 },
    { title: "Sunset Lounge", artist: "Relaxation", plays: 11 },
  ],
  energetic: [
    { title: "Power Up", artist: "Energy Boost", plays: 14 },
    { title: "Morning Rush", artist: "Fast Lane", plays: 11 },
    { title: "Workout Peak", artist: "Fitness Beats", plays: 9 },
  ],
  focused: [
    { title: "Deep Focus", artist: "Brain Waves", plays: 18 },
    { title: "Concentration", artist: "Mind Flow", plays: 14 },
    { title: "Work Mode", artist: "Productivity", plays: 12 },
  ],
};

const History = () => {
  const [timeframe, setTimeframe] = useState<"week" | "month" | "year">("week");
  
  return (
    <div className="min-h-screen bg-background text-white pb-24">
      <Navbar />
      
      <main className="pt-24 px-4">
        <div className="container mx-auto">
          <div className="flex flex-col md:flex-row items-start justify-between mb-8">
            <div>
              <h1 className="text-3xl font-bold mb-2">Mood History & Trends</h1>
              <p className="text-white/70">Track your emotional journey through music</p>
            </div>
            
            <div className="flex space-x-3 mt-4 md:mt-0">
              <button
                onClick={() => setTimeframe("week")}
                className={`px-4 py-2 rounded-lg border ${
                  timeframe === "week" 
                    ? "bg-white/10 border-white/20" 
                    : "border-white/5 hover:bg-white/5"
                } transition-colors`}
              >
                Week
              </button>
              <button
                onClick={() => setTimeframe("month")}
                className={`px-4 py-2 rounded-lg border ${
                  timeframe === "month" 
                    ? "bg-white/10 border-white/20" 
                    : "border-white/5 hover:bg-white/5"
                } transition-colors`}
              >
                Month
              </button>
              <button
                onClick={() => setTimeframe("year")}
                className={`px-4 py-2 rounded-lg border ${
                  timeframe === "year" 
                    ? "bg-white/10 border-white/20" 
                    : "border-white/5 hover:bg-white/5"
                } transition-colors`}
              >
                Year
              </button>
            </div>
          </div>
          
          {/* Mood Timeline Chart */}
          <div className="glass-card p-6 mb-8">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-xl font-semibold">Mood Timeline</h2>
              <button className="flex items-center text-white/70 hover:text-white transition-colors">
                <Filter size={16} className="mr-1" />
                Filter
              </button>
            </div>
            
            <div className="w-full h-64 px-2">
              {/* Simplified chart visualization */}
              <div className="w-full h-full flex items-end justify-between">
                {moodData.map((day, index) => (
                  <div key={index} className="flex-1 flex flex-col items-center">
                    <div className="w-full flex flex-col-reverse h-[200px]">
                      <div className="w-full bg-mood-happy" style={{ height: `${day.happy}%` }}></div>
                      <div className="w-full bg-mood-sad" style={{ height: `${day.sad}%` }}></div>
                      <div className="w-full bg-mood-chill" style={{ height: `${day.chill}%` }}></div>
                      <div className="w-full bg-mood-energetic" style={{ height: `${day.energetic}%` }}></div>
                      <div className="w-full bg-mood-focused" style={{ height: `${day.focused}%` }}></div>
                    </div>
                    <div className="mt-2 text-white/70 text-sm">{day.date}</div>
                  </div>
                ))}
              </div>
            </div>
            
            <div className="flex flex-wrap items-center justify-center gap-4 mt-6">
              <div className="flex items-center">
                <div className="w-3 h-3 rounded-full bg-mood-happy mr-2"></div>
                <span className="text-sm">Happy</span>
              </div>
              <div className="flex items-center">
                <div className="w-3 h-3 rounded-full bg-mood-sad mr-2"></div>
                <span className="text-sm">Sad</span>
              </div>
              <div className="flex items-center">
                <div className="w-3 h-3 rounded-full bg-mood-chill mr-2"></div>
                <span className="text-sm">Chill</span>
              </div>
              <div className="flex items-center">
                <div className="w-3 h-3 rounded-full bg-mood-energetic mr-2"></div>
                <span className="text-sm">Energetic</span>
              </div>
              <div className="flex items-center">
                <div className="w-3 h-3 rounded-full bg-mood-focused mr-2"></div>
                <span className="text-sm">Focused</span>
              </div>
            </div>
          </div>
          
          {/* Mood Stats and Top Tracks */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-8">
            {/* Overall Stats */}
            <div className="glass-card p-6">
              <h2 className="text-xl font-semibold mb-4">Overall Stats</h2>
              
              <div className="flex items-center justify-center mb-6">
                <div className="w-32 h-32 rounded-full flex items-center justify-center relative">
                  <div className="absolute inset-0 rounded-full border-4 border-mood-chill opacity-25"></div>
                  <div className="absolute inset-0 rounded-full border-4 border-transparent border-t-mood-chill animate-spin" style={{ animationDuration: '3s' }}></div>
                  <div className="text-center">
                    <div className="text-2xl font-bold">Chill</div>
                    <div className="text-white/70">Dominant Mood</div>
                  </div>
                </div>
              </div>
              
              <div className="space-y-4">
                <div className="flex justify-between items-center">
                  <span className="text-white/70">Listening Time</span>
                  <span className="font-medium">23h 14min</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-white/70">Tracks Played</span>
                  <span className="font-medium">187</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-white/70">Mood Changes</span>
                  <span className="font-medium">27</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-white/70">Peak Listening</span>
                  <span className="font-medium">Evenings</span>
                </div>
              </div>
            </div>
            
            {/* Top Moods */}
            <div className="glass-card p-6">
              <h2 className="text-xl font-semibold mb-4">Top Moods</h2>
              
              <div className="space-y-4">
                <div className="flex items-center">
                  <MoodChip mood="chill" className="mr-3" />
                  <div className="flex-1">
                    <div className="w-full h-2 bg-white/10 rounded-full overflow-hidden">
                      <div className="h-full bg-mood-chill" style={{ width: "32%" }}></div>
                    </div>
                  </div>
                  <span className="ml-3 font-medium">32%</span>
                </div>
                <div className="flex items-center">
                  <MoodChip mood="energetic" className="mr-3" />
                  <div className="flex-1">
                    <div className="w-full h-2 bg-white/10 rounded-full overflow-hidden">
                      <div className="h-full bg-mood-energetic" style={{ width: "27%" }}></div>
                    </div>
                  </div>
                  <span className="ml-3 font-medium">27%</span>
                </div>
                <div className="flex items-center">
                  <MoodChip mood="happy" className="mr-3" />
                  <div className="flex-1">
                    <div className="w-full h-2 bg-white/10 rounded-full overflow-hidden">
                      <div className="h-full bg-mood-happy" style={{ width: "22%" }}></div>
                    </div>
                  </div>
                  <span className="ml-3 font-medium">22%</span>
                </div>
                <div className="flex items-center">
                  <MoodChip mood="focused" className="mr-3" />
                  <div className="flex-1">
                    <div className="w-full h-2 bg-white/10 rounded-full overflow-hidden">
                      <div className="h-full bg-mood-focused" style={{ width: "15%" }}></div>
                    </div>
                  </div>
                  <span className="ml-3 font-medium">15%</span>
                </div>
                <div className="flex items-center">
                  <MoodChip mood="sad" className="mr-3" />
                  <div className="flex-1">
                    <div className="w-full h-2 bg-white/10 rounded-full overflow-hidden">
                      <div className="h-full bg-mood-sad" style={{ width: "4%" }}></div>
                    </div>
                  </div>
                  <span className="ml-3 font-medium">4%</span>
                </div>
              </div>
            </div>
            
            {/* Genre Breakdown */}
            <div className="glass-card p-6">
              <h2 className="text-xl font-semibold mb-4">Genre Breakdown</h2>
              
              <div className="relative w-full aspect-square flex items-center justify-center mb-4">
                {/* Simplified pie chart representation */}
                <div className="absolute inset-0 rounded-full border-[16px] border-[#8A4FFF] opacity-20"></div>
                <div className="absolute inset-0 rounded-full border-[16px] border-transparent border-t-[#8A4FFF] border-r-[#8A4FFF] border-b-[#8A4FFF]" style={{ transform: 'rotate(45deg)' }}></div>
                <div className="absolute inset-[16px] rounded-full border-[16px] border-[#4F74FF] opacity-20"></div>
                <div className="absolute inset-[16px] rounded-full border-[16px] border-transparent border-t-[#4F74FF] border-r-[#4F74FF]" style={{ transform: 'rotate(135deg)' }}></div>
                <div className="absolute inset-[32px] rounded-full border-[16px] border-[#21A179] opacity-20"></div>
                <div className="absolute inset-[32px] rounded-full border-[16px] border-transparent border-t-[#21A179] border-r-[#21A179]" style={{ transform: 'rotate(225deg)' }}></div>
                <div className="absolute inset-[48px] rounded-full border-[16px] border-[#FF5E5B] opacity-20"></div>
                <div className="absolute inset-[48px] rounded-full border-[16px] border-transparent border-t-[#FF5E5B]" style={{ transform: 'rotate(315deg)' }}></div>
                <div className="absolute inset-[64px] rounded-full bg-background"></div>
              </div>
              
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <div className="flex items-center">
                    <div className="w-3 h-3 rounded-full bg-[#8A4FFF] mr-2"></div>
                    <span>Electronic</span>
                  </div>
                  <span>35%</span>
                </div>
                <div className="flex items-center justify-between">
                  <div className="flex items-center">
                    <div className="w-3 h-3 rounded-full bg-[#4F74FF] mr-2"></div>
                    <span>Ambient</span>
                  </div>
                  <span>30%</span>
                </div>
                <div className="flex items-center justify-between">
                  <div className="flex items-center">
                    <div className="w-3 h-3 rounded-full bg-[#21A179] mr-2"></div>
                    <span>Pop</span>
                  </div>
                  <span>25%</span>
                </div>
                <div className="flex items-center justify-between">
                  <div className="flex items-center">
                    <div className="w-3 h-3 rounded-full bg-[#FF5E5B] mr-2"></div>
                    <span>Rock</span>
                  </div>
                  <span>10%</span>
                </div>
              </div>
            </div>
          </div>
          
          {/* Top Tracks by Mood */}
          <h2 className="text-2xl font-bold mb-6">Top Tracks by Mood</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {(["chill", "energetic", "happy"] as const).map((mood) => (
              <div key={mood} className="glass-card p-6">
                <div className="flex items-center justify-between mb-4">
                  <MoodChip mood={mood} />
                  <button className="text-white/70 hover:text-white transition-colors">
                    See All
                  </button>
                </div>
                
                <div className="space-y-4">
                  {moodTracks[mood].map((track, index) => (
                    <div key={index} className="flex items-center p-2 hover:bg-white/5 rounded-lg transition-colors">
                      <div className="w-8 h-8 rounded bg-white/10 flex items-center justify-center mr-3">
                        <span className="text-white/70">{index + 1}</span>
                      </div>
                      <div className="flex-1">
                        <h4 className="font-medium text-white">{track.title}</h4>
                        <p className="text-white/70 text-sm">{track.artist}</p>
                      </div>
                      <div className="text-white/50 text-sm">{track.plays} plays</div>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </main>
      
      <MusicPlayer />
    </div>
  );
};

export default History;
