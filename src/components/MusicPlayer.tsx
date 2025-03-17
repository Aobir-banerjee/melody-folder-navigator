import React, { useState, useRef, useEffect } from 'react';
import { MUSIC_TRACKS, Track } from '@/lib/constants';
import { Play, Pause, SkipBack, SkipForward, Volume2, VolumeX } from 'lucide-react';

const formatTime = (seconds: number): string => {
  const mins = Math.floor(seconds / 60);
  const secs = Math.floor(seconds % 60);
  return `${mins}:${secs < 10 ? '0' : ''}${secs}`;
};

const MusicPlayer: React.FC = () => {
  const [tracks] = useState<Track[]>(MUSIC_TRACKS);
  const [currentTrackIndex, setCurrentTrackIndex] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);
  const [isMuted, setIsMuted] = useState(false);
  const [volume, setVolume] = useState(0.7);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);
  
  const audioRef = useRef<HTMLAudioElement>(null);
  const progressRef = useRef<HTMLDivElement>(null);
  
  const currentTrack = tracks[currentTrackIndex];

  useEffect(() => {
    // Reset player when track changes
    if (audioRef.current) {
      if (isPlaying) {
        audioRef.current.play().catch(e => console.error("Playback failed:", e));
      }
    }
  }, [currentTrackIndex, isPlaying]);

  // Audio event handlers
  const handleTimeUpdate = () => {
    if (audioRef.current) {
      setCurrentTime(audioRef.current.currentTime);
    }
  };

  const handleLoadedMetadata = () => {
    if (audioRef.current) {
      setDuration(audioRef.current.duration);
    }
  };

  const handleEnded = () => {
    if (currentTrackIndex < tracks.length - 1) {
      setCurrentTrackIndex(currentTrackIndex + 1);
    } else {
      setCurrentTrackIndex(0);
      setIsPlaying(false);
    }
  };

  // Player controls
  const togglePlay = () => {
    if (audioRef.current) {
      if (isPlaying) {
        audioRef.current.pause();
      } else {
        audioRef.current.play().catch(e => console.error("Playback failed:", e));
      }
      setIsPlaying(!isPlaying);
    }
  };

  const toggleMute = () => {
    if (audioRef.current) {
      audioRef.current.muted = !isMuted;
      setIsMuted(!isMuted);
    }
  };

  const handleVolumeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newVolume = parseFloat(e.target.value);
    setVolume(newVolume);
    if (audioRef.current) {
      audioRef.current.volume = newVolume;
      if (newVolume === 0) {
        setIsMuted(true);
        audioRef.current.muted = true;
      } else if (isMuted) {
        setIsMuted(false);
        audioRef.current.muted = false;
      }
    }
  };

  const handleProgressClick = (e: React.MouseEvent<HTMLDivElement>) => {
    if (progressRef.current && audioRef.current) {
      const rect = progressRef.current.getBoundingClientRect();
      const percent = (e.clientX - rect.left) / rect.width;
      const seekTime = percent * duration;
      audioRef.current.currentTime = seekTime;
      setCurrentTime(seekTime);
    }
  };

  const handlePrevious = () => {
    if (currentTime > 3) {
      // If more than 3 seconds into the song, restart it
      if (audioRef.current) {
        audioRef.current.currentTime = 0;
      }
    } else {
      // Otherwise go to previous track
      setCurrentTrackIndex(prev => (prev > 0 ? prev - 1 : tracks.length - 1));
    }
  };

  const handleNext = () => {
    setCurrentTrackIndex(prev => (prev < tracks.length - 1 ? prev + 1 : 0));
  };

  return (
    <div className="flex flex-col h-full">
      <audio
        ref={audioRef}
        src={currentTrack.audioUrl}
        onTimeUpdate={handleTimeUpdate}
        onLoadedMetadata={handleLoadedMetadata}
        onEnded={handleEnded}
        onPlay={() => setIsPlaying(true)}
        onPause={() => setIsPlaying(false)}
      />
      
      {/* Album art and info */}
      <div className="flex-1 flex flex-col items-center justify-center mb-4">
        <div className="relative w-48 h-48 rounded-lg overflow-hidden shadow-lg mb-4 hover-scale">
          <img
            src={currentTrack.coverUrl}
            alt={`${currentTrack.title} cover`}
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-black bg-opacity-20"></div>
        </div>
        
        <h2 className="text-xl font-bold">{currentTrack.title}</h2>
        <p className="text-muted-foreground">{currentTrack.artist}</p>
      </div>
      
      {/* Progress bar */}
      <div className="mb-4">
        <div 
          ref={progressRef}
          className="w-full h-2 bg-secondary rounded-full overflow-hidden cursor-pointer"
          onClick={handleProgressClick}
        >
          <div 
            className="h-full bg-primary"
            style={{ width: `${(currentTime / duration) * 100}%` }}
          ></div>
        </div>
        <div className="flex justify-between text-xs mt-1 text-muted-foreground">
          <span>{formatTime(currentTime)}</span>
          <span>{formatTime(duration)}</span>
        </div>
      </div>
      
      {/* Controls */}
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-2">
          <button 
            onClick={toggleMute}
            className="p-2 rounded-full hover:bg-secondary transition-colors"
          >
            {isMuted ? <VolumeX size={18} /> : <Volume2 size={18} />}
          </button>
          <input
            type="range"
            min="0"
            max="1"
            step="0.01"
            value={volume}
            onChange={handleVolumeChange}
            className="w-16 accent-primary"
          />
        </div>
        
        <div className="flex items-center space-x-4">
          <button 
            onClick={handlePrevious}
            className="p-2 rounded-full hover:bg-secondary transition-colors"
          >
            <SkipBack size={22} />
          </button>
          
          <button 
            onClick={togglePlay}
            className="p-3 bg-primary text-primary-foreground rounded-full hover:bg-primary/90 transition-colors"
          >
            {isPlaying ? <Pause size={24} /> : <Play size={24} />}
          </button>
          
          <button 
            onClick={handleNext}
            className="p-2 rounded-full hover:bg-secondary transition-colors"
          >
            <SkipForward size={22} />
          </button>
        </div>
        
        <div className="w-20"></div> {/* Spacer to balance the layout */}
      </div>
      
      {/* Playlist */}
      <div className="mt-6">
        <h3 className="text-sm font-semibold mb-2">Playlist</h3>
        <div className="max-h-40 overflow-y-auto">
          {tracks.map((track, index) => (
            <div
              key={track.id}
              className={`flex items-center p-2 rounded-md cursor-pointer ${
                currentTrackIndex === index 
                  ? 'bg-secondary text-foreground' 
                  : 'hover:bg-secondary/50'
              }`}
              onClick={() => {
                setCurrentTrackIndex(index);
                setIsPlaying(true);
              }}
            >
              <div className="w-8 h-8 rounded overflow-hidden mr-2">
                <img
                  src={track.coverUrl}
                  alt={track.title}
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="flex-1 min-w-0">
                <p className="font-medium truncate">{track.title}</p>
                <p className="text-xs text-muted-foreground truncate">{track.artist}</p>
              </div>
              <div className="text-xs text-muted-foreground ml-2">
                {formatTime(track.duration)}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default MusicPlayer;
