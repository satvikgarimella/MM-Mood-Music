
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import GradientButton from "../ui/GradientButton";
import MoodChip from "../ui/MoodChip";

const HeroSection = () => {
  const [currentMood, setCurrentMood] = useState<number>(0);
  const moods = ["happy", "energetic", "chill", "focused", "sad"];
  
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentMood((prev) => (prev + 1) % moods.length);
    }, 2000);
    
    return () => clearInterval(interval);
  }, []);
  
  return (
    <section className="min-h-screen flex flex-col items-center justify-center pt-20 pb-16 px-4 relative overflow-hidden">
      {/* Animated background */}
      <div className="absolute inset-0 bg-background animate-gradient-shift -z-10">
        <div className="absolute top-0 left-0 right-0 h-full bg-hero-gradient opacity-30 -z-10"></div>
      </div>
      
      {/* Floating elements */}
      <div className="absolute inset-0 overflow-hidden -z-5">
        {Array.from({ length: 5 }).map((_, i) => (
          <div
            key={i}
            className="absolute glass-card w-32 h-32 opacity-20 animate-float"
            style={{
              top: `${Math.random() * 80 + 10}%`,
              left: `${Math.random() * 80 + 10}%`,
              animationDelay: `${i * 0.7}s`,
              animationDuration: `${6 + Math.random() * 4}s`,
              transform: `rotate(${Math.random() * 30}deg)`,
            }}
          ></div>
        ))}
      </div>
      
      <div className="container mx-auto text-center relative z-10 mt-10">
        {/* Floating Mood Chips */}
        <div className="flex flex-wrap justify-center gap-3 mb-10">
          {moods.map((mood, index) => (
            <MoodChip
              key={mood}
              mood={mood as any}
              selected={index === currentMood}
              className={`transform transition-all duration-500 ${
                index === currentMood 
                  ? "scale-110 opacity-100" 
                  : "opacity-60 scale-90"
              }`}
            />
          ))}
        </div>
        
        <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6 leading-tight">
          <span className="text-gradient">AI-powered music recommendations</span>
          <br />
          <span className="text-white">based on your mood</span>
        </h1>
        
        <p className="text-white/70 text-lg md:text-xl max-w-2xl mx-auto mb-10">
          Discover music that perfectly matches how you feel. Our AI analyzes your mood and curates
          the perfect playlist — just for you, just for now.
        </p>
        
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
          <Link to="/auth">
            <GradientButton size="lg">
              Get Started
            </GradientButton>
          </Link>
          <GradientButton variant="muted" size="lg">
            Learn More
          </GradientButton>
        </div>
        
        {/* Visual element */}
        <div className="mt-16 md:mt-20 max-w-3xl mx-auto glass-card p-4 sm:p-6 relative overflow-hidden">
          <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-[#8A4FFF] via-[#4F74FF] to-[#21A179]"></div>
          
          <div className="bg-black/50 rounded-xl p-6">
            <div className="flex flex-col md:flex-row items-center md:items-start text-left gap-6">
              <div className="w-40 h-40 rounded-lg bg-gradient-to-br from-[#4F74FF] to-[#8A4FFF] flex-shrink-0"></div>
              
              <div className="flex-1">
                <div className="flex flex-wrap gap-2 mb-3">
                  <MoodChip mood="energetic" />
                  <div className="py-1.5 px-4 rounded-full text-sm font-medium border text-white/70 border-white/20 bg-white/5">
                    Recommended
                  </div>
                </div>
                
                <h3 className="text-xl font-bold text-white mb-1">Energetic Morning Mix</h3>
                <p className="text-white/70 mb-4">A curated playlist based on your current mood and listening habits</p>
                
                <div className="space-y-2">
                  {[
                    { title: "Higher Power", artist: "Cosmic Waves" },
                    { title: "Morning Light", artist: "Daybreak" },
                    { title: "Limitless", artist: "Sky Walker" }
                  ].map((track, i) => (
                    <div key={i} className="flex items-center justify-between p-2 rounded-lg hover:bg-white/5 transition-colors">
                      <div>
                        <p className="text-white font-medium">{track.title}</p>
                        <p className="text-white/60 text-sm">{track.artist}</p>
                      </div>
                      <button className="w-8 h-8 rounded-full bg-white/10 flex items-center justify-center hover:bg-white/20 transition-colors">
                        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-white"><polygon points="5 3 19 12 5 21 5 3"></polygon></svg>
                      </button>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
