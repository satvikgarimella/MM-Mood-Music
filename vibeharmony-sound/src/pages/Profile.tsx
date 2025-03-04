
import { useState } from "react";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import MusicPlayer from "@/components/layout/MusicPlayer";
import MoodChip from "@/components/ui/MoodChip";
import { Avatar } from "@/components/ui/avatar";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";
import GradientButton from "@/components/ui/GradientButton";
import { BarChart2, Headphones, Settings, Bell, UserCog, ShieldCheck, 
  Mail, Music, ListMusic, User, Edit2 } from "lucide-react";

type MoodType = "happy" | "sad" | "chill" | "energetic" | "focused";

// Mock user data
const userData = {
  name: "Alex Johnson",
  email: "alex@example.com",
  joined: "January 2023",
  preferredMoods: ["chill", "energetic", "focused"] as MoodType[],
  favoriteGenres: ["Electronic", "Indie", "Hip-Hop", "Jazz"],
  totalListened: 1243,
  totalPlaylists: 18,
  profileImage: null
};

// Mock playlist data
const userPlaylists = [
  {
    id: 1,
    title: "Morning Boost",
    songs: 14,
    mood: "energetic" as MoodType,
    coverColor: "from-[#FF5E5B] to-[#FFD166]",
    listens: 87
  },
  {
    id: 2,
    title: "Study Session",
    songs: 24,
    mood: "focused" as MoodType,
    coverColor: "from-[#8A4FFF] to-[#4F74FF]",
    listens: 156
  },
  {
    id: 3,
    title: "Evening Relaxation",
    songs: 18,
    mood: "chill" as MoodType,
    coverColor: "from-[#21A179] to-[#4F74FF]",
    listens: 63
  },
  {
    id: 4,
    title: "Weekend Vibes",
    songs: 22,
    mood: "happy" as MoodType,
    coverColor: "from-[#FFD166] to-[#FF5E5B]",
    listens: 112
  }
];

// Mock top songs
const topSongs = [
  {
    title: "Electric Dreams",
    artist: "Synth Collective",
    mood: "energetic" as MoodType,
    plays: 32
  },
  {
    title: "Deep Thought",
    artist: "Mindwave",
    mood: "focused" as MoodType,
    plays: 28
  },
  {
    title: "Coastal Breeze",
    artist: "Ocean Sounds",
    mood: "chill" as MoodType,
    plays: 24
  },
  {
    title: "Summer Days",
    artist: "Sunshine Beat",
    mood: "happy" as MoodType,
    plays: 21
  },
  {
    title: "Rainy Night",
    artist: "Ambient Dreams",
    mood: "sad" as MoodType,
    plays: 19
  }
];

const Profile = () => {
  const [notificationsEnabled, setNotificationsEnabled] = useState(true);
  const [newsletterEnabled, setNewsletterEnabled] = useState(true);
  const [privacyEnabled, setPrivacyEnabled] = useState(false);
  const [dataCollectionEnabled, setDataCollectionEnabled] = useState(true);
  const [editingMoods, setEditingMoods] = useState(false);
  const [selectedMoods, setSelectedMoods] = useState<MoodType[]>(userData.preferredMoods);

  const toggleMood = (mood: MoodType) => {
    if (selectedMoods.includes(mood)) {
      setSelectedMoods(selectedMoods.filter(m => m !== mood));
    } else {
      setSelectedMoods([...selectedMoods, mood]);
    }
  };

  const saveMoodPreferences = () => {
    // In a real app, this would save to an API
    setEditingMoods(false);
    // Update userData with new selected moods
    userData.preferredMoods = selectedMoods;
  };

  return (
    <div className="min-h-screen bg-background text-white pb-24">
      <Navbar />
      
      <main className="container mx-auto px-4 pt-24 pb-32">
        {/* Profile Header */}
        <div className="flex flex-col md:flex-row items-center md:items-start gap-6 mb-10">
          <div className="relative">
            <Avatar className="w-24 h-24 md:w-32 md:h-32">
              <div className="w-full h-full rounded-full bg-gradient-to-br from-[#8A4FFF] to-[#21A179] flex items-center justify-center">
                <User size={40} className="text-white/70" />
              </div>
            </Avatar>
            <button className="absolute bottom-0 right-0 w-8 h-8 rounded-full bg-white/10 flex items-center justify-center backdrop-blur-md hover:bg-white/20 transition-colors">
              <Edit2 size={14} />
            </button>
          </div>
          
          <div className="text-center md:text-left flex-1">
            <h1 className="text-3xl font-bold mb-1">{userData.name}</h1>
            <p className="text-white/70 mb-3">Joined {userData.joined}</p>
            
            <div className="flex flex-wrap gap-2 justify-center md:justify-start mb-4">
              {userData.preferredMoods.map(mood => (
                <MoodChip key={mood} mood={mood} />
              ))}
            </div>
            
            <div className="flex flex-wrap gap-4 justify-center md:justify-start text-sm text-white/70">
              <div className="flex items-center">
                <Headphones size={16} className="mr-1" />
                <span>{userData.totalListened} songs listened</span>
              </div>
              <div className="flex items-center">
                <ListMusic size={16} className="mr-1" />
                <span>{userData.totalPlaylists} playlists created</span>
              </div>
            </div>
          </div>
          
          <div>
            <GradientButton size="sm">
              Edit Profile
            </GradientButton>
          </div>
        </div>
        
        {/* Tabs for different profile sections */}
        <Tabs defaultValue="playlists" className="w-full">
          <TabsList className="grid grid-cols-3 w-full max-w-md mx-auto mb-8">
            <TabsTrigger value="playlists">
              <ListMusic size={16} className="mr-2" />
              Playlists
            </TabsTrigger>
            <TabsTrigger value="insights">
              <BarChart2 size={16} className="mr-2" />
              Insights
            </TabsTrigger>
            <TabsTrigger value="settings">
              <Settings size={16} className="mr-2" />
              Settings
            </TabsTrigger>
          </TabsList>
          
          {/* Playlists Tab */}
          <TabsContent value="playlists" className="animate-fade-in">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              {userPlaylists.map(playlist => (
                <div key={playlist.id} className="glass-card-hover overflow-hidden">
                  <div className={`h-40 bg-gradient-to-r ${playlist.coverColor} relative`}>
                    <div className="absolute bottom-4 right-4">
                      <button className="w-10 h-10 rounded-full bg-white flex items-center justify-center text-black hover:scale-105 transition-transform">
                        <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polygon points="5 3 19 12 5 21 5 3"></polygon></svg>
                      </button>
                    </div>
                  </div>
                  <div className="p-4">
                    <div className="flex justify-between items-start mb-2">
                      <h3 className="text-lg font-medium">{playlist.title}</h3>
                      <MoodChip mood={playlist.mood} />
                    </div>
                    <div className="flex items-center text-white/50 text-sm justify-between">
                      <span>{playlist.songs} songs</span>
                      <span>{playlist.listens} listens</span>
                    </div>
                  </div>
                </div>
              ))}
              
              {/* Create new playlist card */}
              <a href="/create-playlist" className="glass-card h-[200px] flex flex-col items-center justify-center p-6 hover:bg-white/10 transition-colors">
                <div className="w-16 h-16 rounded-full bg-white/5 flex items-center justify-center mb-4">
                  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="12" y1="5" x2="12" y2="19"></line><line x1="5" y1="12" x2="19" y2="12"></line></svg>
                </div>
                <h3 className="text-lg font-medium mb-1">Create New Playlist</h3>
                <p className="text-white/70 text-sm text-center">Express your mood with a new collection</p>
              </a>
            </div>
            
            {/* Top Songs Section */}
            <div className="mt-12">
              <h2 className="text-2xl font-bold mb-6">Your Top Songs</h2>
              <div className="glass-card overflow-hidden">
                <div className="overflow-x-auto">
                  <table className="w-full min-w-[600px]">
                    <thead>
                      <tr className="border-b border-white/10">
                        <th className="py-4 px-6 text-left font-medium text-white/70">#</th>
                        <th className="py-4 px-6 text-left font-medium text-white/70">Title</th>
                        <th className="py-4 px-6 text-left font-medium text-white/70">Artist</th>
                        <th className="py-4 px-6 text-left font-medium text-white/70">Mood</th>
                        <th className="py-4 px-6 text-right font-medium text-white/70">Plays</th>
                      </tr>
                    </thead>
                    <tbody>
                      {topSongs.map((song, index) => (
                        <tr key={index} className="border-b border-white/5 hover:bg-white/5 transition-colors cursor-pointer">
                          <td className="py-3 px-6 text-white/70">{index + 1}</td>
                          <td className="py-3 px-6 font-medium">{song.title}</td>
                          <td className="py-3 px-6 text-white/70">{song.artist}</td>
                          <td className="py-3 px-6">
                            <MoodChip mood={song.mood} />
                          </td>
                          <td className="py-3 px-6 text-right text-white/70">{song.plays}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          </TabsContent>
          
          {/* Insights Tab */}
          <TabsContent value="insights" className="animate-fade-in">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              {/* Listening Trends */}
              <div className="glass-card p-6">
                <h2 className="text-xl font-semibold mb-4">Listening Trends</h2>
                <div className="space-y-6">
                  <div>
                    <h3 className="text-white/70 mb-2">Mood Distribution</h3>
                    <div className="w-full h-4 bg-white/5 rounded-full overflow-hidden flex">
                      <div className="h-full bg-mood-chill w-[35%]"></div>
                      <div className="h-full bg-mood-energetic w-[25%]"></div>
                      <div className="h-full bg-mood-focused w-[20%]"></div>
                      <div className="h-full bg-mood-happy w-[15%]"></div>
                      <div className="h-full bg-mood-sad w-[5%]"></div>
                    </div>
                    <div className="flex flex-wrap gap-4 mt-3 text-sm">
                      <div className="flex items-center">
                        <div className="w-3 h-3 rounded-full bg-mood-chill mr-2"></div>
                        <span>Chill (35%)</span>
                      </div>
                      <div className="flex items-center">
                        <div className="w-3 h-3 rounded-full bg-mood-energetic mr-2"></div>
                        <span>Energetic (25%)</span>
                      </div>
                      <div className="flex items-center">
                        <div className="w-3 h-3 rounded-full bg-mood-focused mr-2"></div>
                        <span>Focused (20%)</span>
                      </div>
                      <div className="flex items-center">
                        <div className="w-3 h-3 rounded-full bg-mood-happy mr-2"></div>
                        <span>Happy (15%)</span>
                      </div>
                      <div className="flex items-center">
                        <div className="w-3 h-3 rounded-full bg-mood-sad mr-2"></div>
                        <span>Sad (5%)</span>
                      </div>
                    </div>
                  </div>
                  
                  <div>
                    <h3 className="text-white/70 mb-2">Genre Distribution</h3>
                    <div className="grid grid-cols-2 gap-2">
                      {userData.favoriteGenres.map((genre, i) => (
                        <div key={i} className="bg-white/5 rounded-lg p-3 flex justify-between items-center">
                          <span>{genre}</span>
                          <span className="text-sm text-white/70">{25 - i * 5}%</span>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
                
                <div className="mt-6">
                  <GradientButton variant="muted" className="w-full">
                    <span className="flex items-center justify-center">
                      View Detailed Analysis
                    </span>
                  </GradientButton>
                </div>
              </div>
              
              {/* Mood Preferences */}
              <div className="glass-card p-6">
                <div className="flex justify-between items-center mb-4">
                  <h2 className="text-xl font-semibold">Mood Preferences</h2>
                  {editingMoods ? (
                    <div className="flex gap-2">
                      <GradientButton variant="muted" size="sm" onClick={() => setEditingMoods(false)}>
                        Cancel
                      </GradientButton>
                      <GradientButton size="sm" onClick={saveMoodPreferences}>
                        Save
                      </GradientButton>
                    </div>
                  ) : (
                    <GradientButton variant="muted" size="sm" onClick={() => setEditingMoods(true)}>
                      Edit
                    </GradientButton>
                  )}
                </div>
                
                {editingMoods ? (
                  <div className="space-y-4">
                    <p className="text-white/70 text-sm">Select your preferred moods:</p>
                    <div className="flex flex-wrap gap-3">
                      {(["happy", "sad", "chill", "energetic", "focused"] as MoodType[]).map((mood) => (
                        <MoodChip
                          key={mood}
                          mood={mood}
                          selected={selectedMoods.includes(mood)}
                          onClick={() => toggleMood(mood)}
                        />
                      ))}
                    </div>
                  </div>
                ) : (
                  <div className="space-y-4">
                    <p className="text-white/70 text-sm">Your current mood preferences:</p>
                    <div className="flex flex-wrap gap-3">
                      {userData.preferredMoods.map((mood) => (
                        <MoodChip key={mood} mood={mood} />
                      ))}
                    </div>
                  </div>
                )}
                
                <div className="mt-8">
                  <h3 className="text-lg font-medium mb-4">Smart Recommendations</h3>
                  <p className="text-white/70 text-sm mb-4">Mood Music uses your preferences to create personalized recommendations. The more you listen, the better we understand your taste.</p>
                  
                  <div className="bg-white/5 rounded-lg p-4">
                    <div className="flex items-center justify-between mb-2">
                      <span>Recommendation Accuracy</span>
                      <span className="text-primary font-medium">78%</span>
                    </div>
                    <div className="w-full h-2 bg-white/10 rounded-full overflow-hidden">
                      <div className="h-full bg-primary w-[78%]"></div>
                    </div>
                    <p className="text-white/50 text-xs mt-2">Based on your listening habits</p>
                  </div>
                </div>
              </div>
            </div>
          </TabsContent>
          
          {/* Settings Tab */}
          <TabsContent value="settings" className="animate-fade-in">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              {/* Account Settings */}
              <div className="glass-card p-6">
                <div className="flex items-center mb-4">
                  <UserCog size={20} className="mr-2 text-white/70" />
                  <h2 className="text-xl font-semibold">Account Settings</h2>
                </div>
                
                <div className="space-y-6">
                  <div>
                    <h3 className="text-lg font-medium mb-3">Personal Information</h3>
                    <div className="space-y-4">
                      <div>
                        <Label htmlFor="name" className="text-sm text-white/70">Name</Label>
                        <div className="mt-1 flex">
                          <input 
                            type="text" 
                            id="name" 
                            value={userData.name} 
                            className="bg-white/5 border border-white/10 rounded-lg px-3 py-2 w-full text-white"
                            readOnly
                          />
                          <button className="ml-2 p-2 bg-white/5 rounded-lg hover:bg-white/10 transition-colors">
                            <Edit2 size={16} />
                          </button>
                        </div>
                      </div>
                      
                      <div>
                        <Label htmlFor="email" className="text-sm text-white/70">Email</Label>
                        <div className="mt-1 flex">
                          <input 
                            type="email" 
                            id="email" 
                            value={userData.email} 
                            className="bg-white/5 border border-white/10 rounded-lg px-3 py-2 w-full text-white"
                            readOnly
                          />
                          <button className="ml-2 p-2 bg-white/5 rounded-lg hover:bg-white/10 transition-colors">
                            <Edit2 size={16} />
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                  
                  <div>
                    <h3 className="text-lg font-medium mb-3">Password</h3>
                    <GradientButton variant="muted" size="sm">Change Password</GradientButton>
                  </div>
                  
                  <div>
                    <h3 className="text-lg font-medium mb-3">Connected Accounts</h3>
                    <div className="space-y-3">
                      <div className="flex items-center justify-between p-3 bg-white/5 rounded-lg">
                        <div className="flex items-center">
                          <div className="w-8 h-8 rounded-full bg-[#1DB954] flex items-center justify-center mr-3">
                            <Music size={16} className="text-white" />
                          </div>
                          <span>Spotify</span>
                        </div>
                        <GradientButton size="sm">Connect</GradientButton>
                      </div>
                      
                      <div className="flex items-center justify-between p-3 bg-white/5 rounded-lg">
                        <div className="flex items-center">
                          <div className="w-8 h-8 rounded-full bg-[#FF0000] flex items-center justify-center mr-3">
                            <Music size={16} className="text-white" />
                          </div>
                          <span>YouTube Music</span>
                        </div>
                        <GradientButton size="sm">Connect</GradientButton>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              
              {/* Notifications and Privacy */}
              <div className="glass-card p-6">
                <div className="space-y-8">
                  {/* Notifications */}
                  <div>
                    <div className="flex items-center mb-4">
                      <Bell size={20} className="mr-2 text-white/70" />
                      <h2 className="text-xl font-semibold">Notifications</h2>
                    </div>
                    
                    <div className="space-y-4">
                      <div className="flex items-center justify-between">
                        <div>
                          <h3 className="font-medium">Push Notifications</h3>
                          <p className="text-sm text-white/70">Receive notifications about new music and features</p>
                        </div>
                        <Switch 
                          checked={notificationsEnabled}
                          onCheckedChange={setNotificationsEnabled}
                        />
                      </div>
                      
                      <div className="flex items-center justify-between">
                        <div>
                          <h3 className="font-medium">Email Newsletter</h3>
                          <p className="text-sm text-white/70">Receive weekly updates and personalized recommendations</p>
                        </div>
                        <Switch 
                          checked={newsletterEnabled}
                          onCheckedChange={setNewsletterEnabled}
                        />
                      </div>
                    </div>
                  </div>
                  
                  {/* Privacy */}
                  <div>
                    <div className="flex items-center mb-4">
                      <ShieldCheck size={20} className="mr-2 text-white/70" />
                      <h2 className="text-xl font-semibold">Privacy</h2>
                    </div>
                    
                    <div className="space-y-4">
                      <div className="flex items-center justify-between">
                        <div>
                          <h3 className="font-medium">Private Profile</h3>
                          <p className="text-sm text-white/70">Only friends can see your listening activity</p>
                        </div>
                        <Switch 
                          checked={privacyEnabled}
                          onCheckedChange={setPrivacyEnabled}
                        />
                      </div>
                      
                      <div className="flex items-center justify-between">
                        <div>
                          <h3 className="font-medium">Data Collection</h3>
                          <p className="text-sm text-white/70">Allow us to use your data to improve recommendations</p>
                        </div>
                        <Switch 
                          checked={dataCollectionEnabled}
                          onCheckedChange={setDataCollectionEnabled}
                        />
                      </div>
                    </div>
                  </div>
                </div>
                
                <div className="mt-8 pt-6 border-t border-white/10">
                  <h3 className="text-lg font-medium mb-4">Data & Privacy</h3>
                  <div className="flex gap-3">
                    <GradientButton variant="muted" size="sm">Download Your Data</GradientButton>
                    <GradientButton variant="muted" size="sm" className="text-red-400 hover:text-red-300">Delete Account</GradientButton>
                  </div>
                </div>
              </div>
            </div>
          </TabsContent>
        </Tabs>
      </main>
      
      <MusicPlayer />
    </div>
  );
};

export default Profile;
