import React, { createContext, useState, useContext, useEffect } from 'react';
import { Audio } from 'expo-av';

interface Song {
  title: string;
  audioUrl: string;
  imageUrl: string;
  preacher: string;
  series: string;
}



interface AudioContextProps {
  currentSong: Song | null;
  songs: Song[];
  playSong: (song: Song) => void;
  playPreviousSong: () => void;
  playNextSong: () => void;
  isRepeating: boolean;
  toggleRepeatMode: () => void;
}


const AudioContext = createContext<AudioContextProps | undefined>(undefined);


export const AudioProvider: React.FC = ({ children }) => {
  const [currentSong, setCurrentSong] = useState<Song | null>(null);
  const [sound, setSound] = useState<Audio.Sound | null>(null);
  const [songs, setSongs] = useState<Song[]>([]); 
  const [currentSongIndex, setCurrentSongIndex] = useState(0);
  const [isRepeating, setIsRepeating] = useState(false);


  useEffect(() => {
    console.log("Current Song:", currentSong);
    const loadSound = async () => {
      if (currentSong) {
        console.log("Loading Sound...");
        const { sound: newSound } = await Audio.Sound.createAsync(
          { uri: currentSong.audioUrl },
          { shouldPlay: true }
        );
        setSound(newSound);
      }
    };

    loadSound();

    return () => {
      console.log("Unloading Sound...");
      if (sound) {
        sound.unloadAsync();
      }
    };
  }, [currentSong]);


  const playSong = (song: Song) => {
    setCurrentSong(song);
  };


  const playPreviousSong = () => {
    if (currentSongIndex > 0) {
      setCurrentSongIndex(currentSongIndex - 1);
      playSong(songs[currentSongIndex - 1]);
    }
  };


  const playNextSong = () => {
    if (currentSongIndex < songs.length - 1) {
      setCurrentSongIndex(currentSongIndex + 1);
      playSong(songs[currentSongIndex + 1]);
    }
  };


  const toggleRepeatMode = () => {
    setIsRepeating(!isRepeating);
  };

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


  return (
    <AudioContext.Provider value={value}>{children}</AudioContext.Provider>
  );
};


export const useAudioContext = () => {
  const context = useContext(AudioContext);
  if (!context) {
    throw new Error("useAudioContext must be used within an AudioProvider");
  }
  return context;
};
