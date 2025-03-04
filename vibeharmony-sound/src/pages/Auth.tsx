
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import GradientButton from "@/components/ui/GradientButton";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Input } from "@/components/ui/input";
import { useToast } from "@/hooks/use-toast";
import MoodChip from "@/components/ui/MoodChip";
import { Check, ChevronRight } from "lucide-react";

type MoodType = "happy" | "sad" | "chill" | "energetic" | "focused";
type OnboardingStep = "mood" | "genres" | "artists";

const Auth = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showOnboarding, setShowOnboarding] = useState(false);
  const [onboardingStep, setOnboardingStep] = useState<OnboardingStep>("mood");
  const [selectedMoods, setSelectedMoods] = useState<MoodType[]>([]);
  const [selectedGenres, setSelectedGenres] = useState<string[]>([]);
  const [selectedArtists, setSelectedArtists] = useState<string[]>([]);
  const { toast } = useToast();
  const navigate = useNavigate();

  const handleSubmit = (e: React.FormEvent, isLogin: boolean) => {
    e.preventDefault();
    
    if (isLogin) {
      // Login logic - in a real app, this would call an authentication service
      toast({
        title: "Logged in successfully",
        description: "Redirecting to dashboard.",
      });
      
      // Simulate redirect to dashboard
      setTimeout(() => {
        navigate("/dashboard");
      }, 1500);
    } else {
      // Signup logic
      toast({
        title: "Account created",
        description: "Please complete your profile setup.",
      });
      setShowOnboarding(true);
    }
  };

  const handleMoodSelection = (mood: MoodType) => {
    if (selectedMoods.includes(mood)) {
      setSelectedMoods(selectedMoods.filter(m => m !== mood));
    } else {
      setSelectedMoods([...selectedMoods, mood]);
    }
  };

  const handleGenreSelection = (genre: string) => {
    if (selectedGenres.includes(genre)) {
      setSelectedGenres(selectedGenres.filter(g => g !== genre));
    } else {
      setSelectedGenres([...selectedGenres, genre]);
    }
  };

  const handleArtistSelection = (artist: string) => {
    if (selectedArtists.includes(artist)) {
      setSelectedArtists(selectedArtists.filter(a => a !== artist));
    } else {
      setSelectedArtists([...selectedArtists, artist]);
    }
  };

  const handleNextStep = () => {
    if (onboardingStep === "mood") {
      if (selectedMoods.length === 0) {
        toast({
          title: "Please select at least one mood",
          variant: "destructive"
        });
        return;
      }
      setOnboardingStep("genres");
    } else if (onboardingStep === "genres") {
      if (selectedGenres.length === 0) {
        toast({
          title: "Please select at least one genre",
          variant: "destructive"
        });
        return;
      }
      setOnboardingStep("artists");
    } else {
      // Complete onboarding
      if (selectedArtists.length === 0) {
        toast({
          title: "Please select at least one artist",
          variant: "destructive"
        });
        return;
      }
      
      toast({
        title: "Profile setup complete",
        description: "Welcome to Mood Music!",
      });
      
      // Simulate saving preferences and redirect to dashboard
      setTimeout(() => {
        navigate("/dashboard");
      }, 1500);
    }
  };

  // Sample data for onboarding
  const genres = [
    "Pop", "Rock", "Hip Hop", "R&B", "Electronic", 
    "Jazz", "Classical", "Country", "Latin", "Indie"
  ];
  
  const artists = [
    "The Weeknd", "Billie Eilish", "Drake", "Dua Lipa", 
    "Taylor Swift", "BTS", "Post Malone", "Bad Bunny", 
    "Ed Sheeran", "Ariana Grande", "Harry Styles", "Adele"
  ];

  // Render onboarding content based on current step
  const renderOnboardingContent = () => {
    switch (onboardingStep) {
      case "mood":
        return (
          <div className="space-y-6">
            <h2 className="text-xl font-bold text-center">Select Your Favorite Moods</h2>
            <p className="text-center text-white/70">Choose at least one mood to help us personalize your experience</p>
            
            <div className="flex flex-wrap gap-3 justify-center">
              {(["happy", "sad", "chill", "energetic", "focused"] as MoodType[]).map((mood) => (
                <MoodChip
                  key={mood}
                  mood={mood}
                  selected={selectedMoods.includes(mood)}
                  onClick={() => handleMoodSelection(mood)}
                />
              ))}
            </div>
            
            <GradientButton onClick={handleNextStep} className="w-full mt-6">
              <span className="flex items-center justify-center">
                Continue <ChevronRight size={18} className="ml-1" />
              </span>
            </GradientButton>
          </div>
        );
        
      case "genres":
        return (
          <div className="space-y-6">
            <h2 className="text-xl font-bold text-center">Select Your Favorite Genres</h2>
            <p className="text-center text-white/70">Choose at least one genre to tailor your recommendations</p>
            
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
              {genres.map((genre) => (
                <button
                  key={genre}
                  onClick={() => handleGenreSelection(genre)}
                  className={`py-2 px-3 rounded-lg text-sm font-medium border transition-all ${
                    selectedGenres.includes(genre)
                      ? "bg-white/20 border-white text-white"
                      : "bg-white/5 border-white/10 text-white/70"
                  }`}
                >
                  {selectedGenres.includes(genre) && (
                    <Check size={14} className="inline-block mr-1" />
                  )}
                  {genre}
                </button>
              ))}
            </div>
            
            <GradientButton onClick={handleNextStep} className="w-full mt-6">
              <span className="flex items-center justify-center">
                Continue <ChevronRight size={18} className="ml-1" />
              </span>
            </GradientButton>
          </div>
        );
        
      case "artists":
        return (
          <div className="space-y-6">
            <h2 className="text-xl font-bold text-center">Select Your Favorite Artists</h2>
            <p className="text-center text-white/70">Choose at least one artist to complete your profile</p>
            
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
              {artists.map((artist) => (
                <button
                  key={artist}
                  onClick={() => handleArtistSelection(artist)}
                  className={`py-2 px-3 rounded-lg text-sm font-medium border transition-all ${
                    selectedArtists.includes(artist)
                      ? "bg-white/20 border-white text-white"
                      : "bg-white/5 border-white/10 text-white/70"
                  }`}
                >
                  {selectedArtists.includes(artist) && (
                    <Check size={14} className="inline-block mr-1" />
                  )}
                  {artist}
                </button>
              ))}
            </div>
            
            <GradientButton onClick={handleNextStep} className="w-full mt-6">
              <span className="flex items-center justify-center">
                Complete Setup <ChevronRight size={18} className="ml-1" />
              </span>
            </GradientButton>
          </div>
        );
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-black to-blue-950 text-white flex flex-col items-center justify-center p-4">
      <div className="w-full max-w-md">
        <Link to="/" className="mb-8 flex items-center justify-center">
          <div className="w-10 h-10 rounded-full bg-gradient-to-br from-[#8A4FFF] to-[#21A179] flex items-center justify-center mr-3">
            <span className="text-white text-lg font-bold">M</span>
          </div>
          <span className="text-white font-bold text-xl">Mood Music</span>
        </Link>

        {showOnboarding ? (
          <div className="backdrop-blur-xl bg-white/5 border border-white/10 rounded-2xl p-6 shadow-xl animate-fade-in">
            {renderOnboardingContent()}
          </div>
        ) : (
          <div className="backdrop-blur-xl bg-white/5 border border-white/10 rounded-2xl p-6 shadow-xl">
            <h1 className="text-2xl font-bold text-center mb-6">Welcome to Mood Music</h1>
            
            <Tabs defaultValue="login">
              <TabsList className="grid grid-cols-2 mb-6 w-full bg-black/20">
                <TabsTrigger value="login">Login</TabsTrigger>
                <TabsTrigger value="signup">Sign Up</TabsTrigger>
              </TabsList>
              
              <TabsContent value="login">
                <form onSubmit={(e) => handleSubmit(e, true)} className="space-y-4">
                  <div>
                    <label htmlFor="email" className="block text-sm mb-1">Email</label>
                    <Input 
                      id="email"
                      type="email" 
                      placeholder="your@email.com"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      required
                      className="w-full bg-black/20 border-white/10"
                    />
                  </div>
                  
                  <div>
                    <label htmlFor="password" className="block text-sm mb-1">Password</label>
                    <Input 
                      id="password"
                      type="password" 
                      placeholder="••••••••"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      required
                      className="w-full bg-black/20 border-white/10"
                    />
                  </div>
                  
                  <div className="pt-2">
                    <GradientButton type="submit" className="w-full">
                      Login
                    </GradientButton>
                  </div>
                </form>
              </TabsContent>
              
              <TabsContent value="signup">
                <form onSubmit={(e) => handleSubmit(e, false)} className="space-y-4">
                  <div>
                    <label htmlFor="signup-email" className="block text-sm mb-1">Email</label>
                    <Input 
                      id="signup-email"
                      type="email" 
                      placeholder="your@email.com"
                      required
                      className="w-full bg-black/20 border-white/10"
                    />
                  </div>
                  
                  <div>
                    <label htmlFor="signup-password" className="block text-sm mb-1">Password</label>
                    <Input 
                      id="signup-password"
                      type="password" 
                      placeholder="••••••••"
                      required
                      className="w-full bg-black/20 border-white/10"
                    />
                  </div>
                  
                  <div>
                    <label htmlFor="confirm-password" className="block text-sm mb-1">Confirm Password</label>
                    <Input 
                      id="confirm-password"
                      type="password" 
                      placeholder="••••••••"
                      required
                      className="w-full bg-black/20 border-white/10"
                    />
                  </div>
                  
                  <div className="pt-2">
                    <GradientButton type="submit" className="w-full">
                      Create Account
                    </GradientButton>
                  </div>
                </form>
              </TabsContent>
            </Tabs>
          </div>
        )}
      </div>
    </div>
  );
};

export default Auth;
