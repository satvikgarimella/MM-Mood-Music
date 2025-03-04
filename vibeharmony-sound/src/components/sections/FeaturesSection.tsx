
import { BarChart3, Headphones, Users, LineChart, Sparkles, Music } from "lucide-react";

const features = [
  {
    icon: <Sparkles className="w-6 h-6 text-[#8A4FFF]" />,
    title: "AI Mood Analysis",
    description:
      "Our AI technology analyzes your music choices to understand your emotional state and preferences.",
  },
  {
    icon: <Music className="w-6 h-6 text-[#4F74FF]" />,
    title: "Smart Recommendations",
    description:
      "Get personalized recommendations that adapt in real-time based on your mood and listening habits.",
  },
  {
    icon: <LineChart className="w-6 h-6 text-[#21A179]" />,
    title: "Mood Tracking",
    description:
      "Visualize your emotional journey through interactive charts that reveal patterns in your music choices.",
  },
  {
    icon: <Users className="w-6 h-6 text-[#FF5E5B]" />,
    title: "Social Sharing",
    description:
      "Connect with friends and share your mood-based playlists to discover how others are feeling.",
  },
  {
    icon: <Headphones className="w-6 h-6 text-[#FFD166]" />,
    title: "Seamless Listening",
    description:
      "Enjoy an uninterrupted experience with our integrated music player optimized for mood-based listening.",
  },
  {
    icon: <BarChart3 className="w-6 h-6 text-[#6C91C2]" />,
    title: "Emotional Insights",
    description:
      "Gain deep insights into how music affects your mood and emotional well-being over time.",
  },
];

const FeaturesSection = () => {
  return (
    <section className="py-24 px-4 relative overflow-hidden">
      <div className="container mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            <span className="text-gradient">Experience Music Through Emotions</span>
          </h2>
          <p className="text-white/70 text-lg max-w-2xl mx-auto">
            Our platform combines advanced AI with your personal taste to create
            a completely new way to discover and experience music.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {features.map((feature, index) => (
            <div
              key={index}
              className="glass-card-hover p-6 flex flex-col items-start text-left animate-fade-in"
              style={{ animationDelay: `${index * 0.1}s` }}
            >
              <div className="mb-5 p-3 rounded-lg bg-white/5">
                {feature.icon}
              </div>
              <h3 className="text-xl font-semibold text-white mb-3">
                {feature.title}
              </h3>
              <p className="text-white/70">{feature.description}</p>
            </div>
          ))}
        </div>

        <div className="mt-24 glass-card p-8 md:p-12 text-left relative">
          <div className="absolute -top-5 -left-5 w-20 h-20 blur-3xl bg-[#8A4FFF] opacity-30 rounded-full"></div>
          <div className="absolute -bottom-5 -right-5 w-20 h-20 blur-3xl bg-[#21A179] opacity-30 rounded-full"></div>
          
          <div className="flex flex-col md:flex-row gap-12 items-center">
            <div className="flex-1">
              <h2 className="text-3xl font-bold mb-6">
                How Mood Music Works
              </h2>
              <div className="space-y-6">
                <div className="flex items-start gap-4">
                  <div className="flex-shrink-0 w-8 h-8 rounded-full bg-white/10 flex items-center justify-center">
                    <span className="text-white font-medium">1</span>
                  </div>
                  <div>
                    <h3 className="text-xl font-medium mb-2">Select Your Mood</h3>
                    <p className="text-white/70">
                      Choose your current emotional state or let our AI detect it based on your previous listening habits.
                    </p>
                  </div>
                </div>
                
                <div className="flex items-start gap-4">
                  <div className="flex-shrink-0 w-8 h-8 rounded-full bg-white/10 flex items-center justify-center">
                    <span className="text-white font-medium">2</span>
                  </div>
                  <div>
                    <h3 className="text-xl font-medium mb-2">AI Generates Your Playlist</h3>
                    <p className="text-white/70">
                      Our algorithm creates a personalized playlist that matches your emotional state and musical preferences.
                    </p>
                  </div>
                </div>
                
                <div className="flex items-start gap-4">
                  <div className="flex-shrink-0 w-8 h-8 rounded-full bg-white/10 flex items-center justify-center">
                    <span className="text-white font-medium">3</span>
                  </div>
                  <div>
                    <h3 className="text-xl font-medium mb-2">Track & Discover</h3>
                    <p className="text-white/70">
                      Explore your emotional journey through music and discover new artists that resonate with your feelings.
                    </p>
                  </div>
                </div>
              </div>
            </div>
            
            <div className="flex-shrink-0 w-full md:w-96 h-80 glass-card overflow-hidden rounded-xl relative">
              <div className="absolute inset-0 bg-gradient-to-br from-[#8A4FFF]/20 to-[#21A179]/20"></div>
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="w-16 h-16 rounded-full bg-white/10 flex items-center justify-center backdrop-blur-md">
                  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-white"><polygon points="5 3 19 12 5 21 5 3"></polygon></svg>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default FeaturesSection;
