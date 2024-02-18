import React, { createContext, useState, useContext, useEffect } from 'react';
import { AVPlaybackStatus, Audio } from 'expo-av';

interface Song {
  uri: string;
  imageUri: string | undefined;
  artist: ReactNode;
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
  pausePlayback: () => void;
  resumePlayback: () => void;
  isLoading: boolean; // Add loading state
  error: string | null; // Add error state
  setSongs: (songs: Song[]) => void;
}

type SoundPlaybackStatus = AVPlaybackStatus | { didJustFinish: boolean };

const AudioContext = createContext<AudioContextProps | undefined>(undefined);

export const AudioProvider: React.FC = ({ children }) => {
  const [currentSong, setCurrentSong] = useState<Song | null>(null);
  const [sound, setSound] = useState<Audio.Sound | null>(null);
  const [songs, setSongs] = useState<Song[]>([]);
  const [currentSongIndex, setCurrentSongIndex] = useState(0);
  const [isRepeating, setIsRepeating] = useState(false);
  const [isLoading, setIsLoading] = useState(false); // Add loading state
  const [error, setError] = useState<string | null>(null); // Add error state

  useEffect(() => {
    const loadSound = async () => {
      setIsLoading(true);
      try {
        if (currentSong) {
          console.log("Loading Sound...");
          const { sound: newSound } = await Audio.Sound.createAsync(
            { uri: currentSong.audioUrl },
            { shouldPlay: true }
          );
          setSound(newSound);
          newSound.setOnPlaybackStatusUpdate((playbackStatus: SoundPlaybackStatus) => {
            if (playbackStatus.didJustFinish && isRepeating) {
              playNextSong();
            }
          });
        }
      } catch (error) {
        setError(error.toString());
      } finally {
        setIsLoading(false);
      }
    };

    loadSound();

    return () => {
      console.log("Unloading Sound...");
      if (sound) {
        sound.unloadAsync();
      }
    };
  }, [currentSong, isRepeating]);

  const playSong = (song: Song) => {
    setCurrentSong(song);
    setCurrentSongIndex(songs.indexOf(song));
  };

  const playPreviousSong = () => {
    if (currentSongIndex > 0) {
      setCurrentSongIndex(currentSongIndex - 1);
      setCurrentSong(songs[currentSongIndex - 1]);
    } else if (isRepeating) {
      setCurrentSongIndex(songs.length - 1);
      setCurrentSong(songs[songs.length - 1]);
    }
  };

  const playNextSong = () => {
    if (currentSongIndex < songs.length - 1) {
      setCurrentSongIndex(currentSongIndex + 1);
      setCurrentSong(songs[currentSongIndex + 1]);
    } else if (isRepeating) {
      setCurrentSongIndex(0);
      setCurrentSong(songs[0]);
    }
  };

  const toggleRepeatMode = () => {
    setIsRepeating(!isRepeating);
  };

  const pausePlayback = async () => {
    if (sound) {
      try {
        await sound.pauseAsync();
      } catch (error) {
        setError(error.toString());
      }
    }
  };

  const resumePlayback = async () => {
    if (sound) {
      try {
        await sound.playAsync();
      } catch (eror) {
        setError(error.toString());
      }
    }
  };

  const value: AudioContextProps = {
    currentSong,
    songs,
    playSong,
    playPreviousSong,
    playNextSong,
    isRepeating,
    toggleRepeatMode,
    pausePlayback,
    resumePlayback,
    isLoading,
    error,
    setSongs
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