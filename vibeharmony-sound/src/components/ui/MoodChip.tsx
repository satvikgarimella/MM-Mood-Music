
import { cn } from "@/lib/utils";

type MoodType = "happy" | "sad" | "chill" | "energetic" | "focused";

interface MoodChipProps {
  mood: MoodType;
  selected?: boolean;
  onClick?: () => void;
  className?: string;
}

const moodColors = {
  happy: "bg-mood-happy/10 border-mood-happy/30 text-mood-happy",
  sad: "bg-mood-sad/10 border-mood-sad/30 text-mood-sad",
  chill: "bg-mood-chill/10 border-mood-chill/30 text-mood-chill",
  energetic: "bg-mood-energetic/10 border-mood-energetic/30 text-mood-energetic",
  focused: "bg-mood-focused/10 border-mood-focused/30 text-mood-focused"
};

const selectedMoodColors = {
  happy: "bg-mood-happy/20 border-mood-happy text-mood-happy",
  sad: "bg-mood-sad/20 border-mood-sad text-mood-sad",
  chill: "bg-mood-chill/20 border-mood-chill text-mood-chill",
  energetic: "bg-mood-energetic/20 border-mood-energetic text-mood-energetic",
  focused: "bg-mood-focused/20 border-mood-focused text-mood-focused"
};

const moodEmojis = {
  happy: "😊",
  sad: "😢",
  chill: "😌",
  energetic: "⚡",
  focused: "🧠"
};

const MoodChip = ({ mood, selected = false, onClick, className }: MoodChipProps) => {
  return (
    <button
      type="button"
      onClick={onClick}
      className={cn(
        "py-1.5 px-4 rounded-full text-sm font-medium border transition-all duration-300",
        selected ? selectedMoodColors[mood] : moodColors[mood],
        onClick && "cursor-pointer hover:scale-105",
        !onClick && "cursor-default",
        className
      )}
    >
      <span className="mr-1.5">{moodEmojis[mood]}</span>
      {mood.charAt(0).toUpperCase() + mood.slice(1)}
    </button>
  );
};

export default MoodChip;
