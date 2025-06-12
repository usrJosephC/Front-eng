import { useState, useEffect } from "react";
import { Button } from "../components/ui/button";
import { useNavigate } from "react-router-dom";
import { Circle, SkipBack, SkipForward, CirclePause, CirclePlay } from "lucide-react";

const MusicPlayer = () => {
  const [currentYear, setCurrentYear] = useState(1990);
  const [isPlaying, setIsPlaying] = useState(false);
  const [progress, setProgress] = useState(0);
  const [duration] = useState(180); // 3 minutes
  const navigate = useNavigate();

  // Mock song data
  const currentSong = {
    title: "Nothing Compares 2 U",
    artist: "Sinéad O'Connor",
    album: "I Do Not Want What I Haven't Got",
    image: "/placeholder.svg",
    year: currentYear
  };

  useEffect(() => {
    const birthYear = localStorage.getItem("birthYear");
    if (birthYear) {
      setCurrentYear(parseInt(birthYear));
    }
  }, []);

  useEffect(() => {
    let interval;
    if (isPlaying) {
      interval = setInterval(() => {
        setProgress(prev => {
          if (prev >= duration) {
            setCurrentYear(prevYear => prevYear + 1);
            return 0;
          }
          return prev + 1;
        });
      }, 1000);
    }
    return () => clearInterval(interval);
  }, [isPlaying, duration]);

  const formatTime = (seconds) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  };

  const handleFinishJourney = () => {
    navigate("/song-selection");
  };

  return (
    <div className="h-screen bg-gradient-to-br from-purple-900 via-blue-900 to-purple-800 text-white relative overflow-hidden">
      {/* Animated background */}
      <div 
        className="absolute inset-0 animate-pulse" 
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg width='40' height='40' viewBox='0 0 40 40' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='%23ffffff' fill-opacity='0.02'%3E%3Ccircle cx='20' cy='20' r='1'/%3E%3C/g%3E%3C/svg%3E")`
        }}
      ></div>
      
      <div className="flex flex-col items-center justify-center min-h-screen p-8 relative z-10">
        {/* Year display */}
        <div className="text-6xl font-bold mb-8 text-yellow-400 tracking-wider animate-pulse" style={{ fontFamily: '"Retro Boldy", cursive' }}>
          {currentYear}
        </div>
        
        {/* Album artwork */}
        <div className="mb-8 relative">
          <div className="w-80 h-80 bg-gradient-to-br from-purple-600 to-cyan-400 rounded-lg shadow-2xl flex items-center justify-center">
            <Circle className="w-32 h-32 text-white/80" />
          </div>
          <div className="absolute -bottom-4 -right-4 w-16 h-16 bg-yellow-500 rounded-full flex items-center justify-center shadow-lg">
            <span className="text-black font-bold text-sm">{currentYear}</span>
          </div>
        </div>
        
        {/* Song info */}
        <div className="text-center mb-8 max-w-md">
          <h2 className="text-2xl font-bold mb-2">{currentSong.title}</h2>
          <p className="text-lg text-gray-300 mb-1">{currentSong.artist}</p>
          <p className="text-sm text-gray-400">{currentSong.album}</p>
        </div>
        
        {/* Progress bar */}
        <div className="w-full max-w-md mb-6">
          <div className="flex justify-between text-sm text-gray-400 mb-2">
            <span>{formatTime(progress)}</span>
            <span>{formatTime(duration)}</span>
          </div>
          <div className="w-full bg-gray-700 rounded-full h-2">
            <div 
              className="bg-yellow-500 h-2 rounded-full transition-all duration-1000"
              style={{ width: `${(progress / duration) * 100}%` }}
            ></div>
          </div>
        </div>
        
        {/* Controls */}
        <div className="flex items-center space-x-6 mb-12">
          <Button
            variant="ghost"
            size="icon"
            className="text-white hover:text-yellow-400 transition-colors"
            onClick={() => setCurrentYear(prev => Math.max(1950, prev - 1))}
          >
            <SkipBack className="w-8 h-8" />
          </Button>
          
          <Button
            variant="ghost"
            size="icon"
            className="text-white hover:text-yellow-400 transition-colors p-3"
            onClick={() => setIsPlaying(!isPlaying)}
          >
            {isPlaying ? (
              <CirclePause className="w-12 h-12" />
            ) : (
              <CirclePlay className="w-12 h-12" />
            )}
          </Button>
          
          <Button
            variant="ghost"
            size="icon"
            className="text-white hover:text-yellow-400 transition-colors"
            onClick={() => setCurrentYear(prev => prev + 1)}
          >
            <SkipForward className="w-8 h-8" />
          </Button>
        </div>
        
        {/* Finish journey button */}
        <Button
          onClick={handleFinishJourney}
          className="bg-cyan-500 hover:bg-cyan-600 text-white px-8 py-3 rounded-full font-semibold shadow-xl transition-all duration-300 hover:scale-105"
        >
          Finish My Journey
        </Button>
      </div>
    </div>
  );
};

export default MusicPlayer;
