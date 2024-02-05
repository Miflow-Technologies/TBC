import React, { createContext, useState, useContext, useEffect } from 'react';
import { Audio } from 'expo-av';

interface Song {
  title: string;
  audioUrl: string;
  imageUrl: string;
  preacher: string;
  series: string;
}


// Define the AudioContextProps interface
interface AudioContextProps {
  currentSong: Song | null;
  songs: Song[];
  playSong: (song: Song) => void;
  playPreviousSong: () => void;
  playNextSong: () => void;
  isRepeating: boolean;
  toggleRepeatMode: () => void;
}

// Create the AudioContext with the AudioContextProps interface
const AudioContext = createContext<AudioContextProps | undefined>(undefined);

// Create the AudioProvider component
export const AudioProvider: React.FC = ({ children }) => {
  // State variables for currentSong, sound, songs, currentSongIndex, and isRepeating
  const [currentSong, setCurrentSong] = useState<Song | null>(null);
  const [sound, setSound] = useState<Audio.Sound | null>(null);
  const [songs, setSongs] = useState<Song[]>([]); 
  const [currentSongIndex, setCurrentSongIndex] = useState(0);
  const [isRepeating, setIsRepeating] = useState(false);

  // useEffect to load sound when currentSong changes
  useEffect(() => {
    const loadSound = async () => {
      if (currentSong) {
        const { sound: newSound } = await Audio.Sound.createAsync(
          { uri: currentSong.audioUrl },
          { shouldPlay: true }
        );
        setSound(newSound);
      }
    };

    loadSound();

    // Clean up function to unload sound when component unmounts
    return () => {
      if (sound) {
        sound.unloadAsync();
      }
    };
  }, [currentSong]);

  // Function to play a specific song
  const playSong = (song: Song) => {
    setCurrentSong(song);
  };

  // Function to play the previous song
  const playPreviousSong = () => {
    if (currentSongIndex > 0) {
      setCurrentSongIndex(currentSongIndex - 1);
      playSong(songs[currentSongIndex - 1]);
    }
  };

  // Function to play the next song
  const playNextSong = () => {
    if (currentSongIndex < songs.length - 1) {
      setCurrentSongIndex(currentSongIndex + 1);
      playSong(songs[currentSongIndex + 1]);
    }
  };

  // Function to toggle repeat mode
  const toggleRepeatMode = () => {
    setIsRepeating(!isRepeating);
  };

  // Define the value to be provided by the context
  const value: AudioContextProps = {
    currentSong,
    songs,
    playSong,
    playPreviousSong,
    playNextSong,
    isRepeating,
    toggleRepeatMode,
    setSongs,
  };

  // Provide the context with the specified value to the children components
  return (
    <AudioContext.Provider value={value}>{children}</AudioContext.Provider>
  );
};

// Create a custom hook to use the audio context
export const useAudioContext = () => {
  const context = useContext(AudioContext);
  if (!context) {
    throw new Error("useAudioContext must be used within an AudioProvider");
  }
  return context;
};
