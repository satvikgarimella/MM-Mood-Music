
import { useState, useEffect } from "react";
import { Play, Pause, SkipBack, SkipForward, Volume2, Heart, Shuffle, Repeat } from "lucide-react";
import MoodChip from "../ui/MoodChip";

const MusicPlayer = () => {
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(180); // Example: 3 minutes
  const [isMobile, setIsMobile] = useState(window.innerWidth < 768);
  
  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 768);
    };
    
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);
  
  // Simulate playing progress
  useEffect(() => {
    let interval: ReturnType<typeof setInterval>;
    
    if (isPlaying) {
      interval = setInterval(() => {
        setCurrentTime((prev) => {
          if (prev >= duration) {
            setIsPlaying(false);
            return 0;
          }
          return prev + 1;
        });
      }, 1000);
    }
    
    return () => clearInterval(interval);
  }, [isPlaying, duration]);
  
  const togglePlay = () => {
    setIsPlaying(!isPlaying);
  };
  
  const formatTime = (seconds: number) => {
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = Math.floor(seconds % 60);
    return `${minutes}:${remainingSeconds.toString().padStart(2, '0')}`;
  };
  
  // Function to render the waveform visualization bars
  const renderWaveform = () => {
    // Only show waveform on desktop
    if (isMobile) return null;
    
    return (
      <div className="wave-animation hidden md:flex items-center justify-center gap-1 w-full max-w-xs mx-auto my-2">
        {Array.from({ length: 16 }).map((_, index) => (
          <div 
            key={index}
            className={`wave h-8 w-1 bg-white/40 rounded-full transition-all duration-300 ${
              isPlaying ? 'opacity-100' : 'opacity-50'
            }`}
            style={{ 
              height: `${Math.random() * 24 + 8}px`,
              opacity: currentTime / duration > index / 16 ? 1 : 0.3
            }}
          />
        ))}
      </div>
    );
  };
  
  return (
    <div className="fixed bottom-0 left-0 right-0 bg-black/40 backdrop-blur-2xl border-t border-white/10 py-3 px-4 z-40">
      <div className="container mx-auto">
        <div className="flex items-center justify-between">
          {/* Song Info */}
          <div className="flex items-center">
            <div className="w-12 h-12 rounded-md bg-gradient-to-br from-[#4F74FF] to-[#8A4FFF] flex-shrink-0 mr-3"></div>
            <div className="text-left mr-4">
              <h4 className="text-white font-medium text-sm md:text-base truncate">Dreamy Reflection</h4>
              <p className="text-white/60 text-xs md:text-sm truncate">Ambient Dreams</p>
            </div>
            <MoodChip mood="chill" className="hidden sm:flex" />
          </div>
          
          {/* Player Controls */}
          <div className="flex-1 max-w-md mx-4 hidden md:block">
            <div className="flex items-center justify-center space-x-6">
              <button className="text-white/70 hover:text-white transition-colors">
                <Shuffle size={18} />
              </button>
              <button className="text-white/70 hover:text-white transition-colors">
                <SkipBack size={22} />
              </button>
              <button 
                onClick={togglePlay}
                className="w-10 h-10 rounded-full bg-white flex items-center justify-center text-black hover:opacity-90 transition-opacity"
              >
                {isPlaying ? <Pause size={20} /> : <Play size={20} />}
              </button>
              <button className="text-white/70 hover:text-white transition-colors">
                <SkipForward size={22} />
              </button>
              <button className="text-white/70 hover:text-white transition-colors">
                <Repeat size={18} />
              </button>
            </div>
            
            {/* Progress Bar */}
            <div className="w-full mt-2">
              <div className="flex items-center justify-between text-xs text-white/60 mb-1">
                <span>{formatTime(currentTime)}</span>
                <span>{formatTime(duration)}</span>
              </div>
              <div className="h-1 w-full bg-white/10 rounded-full overflow-hidden">
                <div 
                  className="h-full bg-white transition-all duration-300"
                  style={{ width: `${(currentTime / duration) * 100}%` }}
                ></div>
              </div>
            </div>

            {renderWaveform()}
          </div>
          
          {/* Mobile Play Controls */}
          <div className="md:hidden flex items-center">
            <button 
              onClick={togglePlay}
              className="w-10 h-10 rounded-full bg-white flex items-center justify-center text-black mr-2"
            >
              {isPlaying ? <Pause size={18} /> : <Play size={18} />}
            </button>
          </div>
          
          {/* Volume and Like */}
          <div className="flex items-center">
            <button className="text-white/70 hover:text-white transition-colors p-2">
              <Heart size={20} className="text-white/70 hover:text-mood-energetic transition-colors" />
            </button>
            <div className="hidden md:flex items-center ml-3">
              <Volume2 size={18} className="text-white/70 mr-2" />
              <div className="w-24 h-1 bg-white/10 rounded-full overflow-hidden">
                <div className="h-full bg-white w-3/4"></div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MusicPlayer;
