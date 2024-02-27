import React, { createContext, useState, useContext, useEffect } from 'react';
import { AVPlaybackStatus, Audio } from 'expo-av';

interface Song {
  uri: string;
  imageUri: string | undefined;
  artist: string;
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
  isLoading: boolean; 
  error: string | null; 
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
  const [isLoading, setIsLoading] = useState(false); 
  const [error, setError] = useState<string | null>(null); 

  useEffect(() => {
    const loadSound = async () => {
      setIsLoading(true);
      setError(null);
      try {
        if (song) {
          const { sound: newSound } = await Audio.Sound.createAsync({ uri: song.audioUrl }, { shouldPlay: true });
          setSound(newSound);

          newSound.setOnPlaybackStatusUpdate((playbackStatus: SoundPlaybackStatus) => {
            if (playbackStatus.didJustFinish && isRepeating) {
              playNextSong();
            }
          });
        }
      } catch (error) {
        console.error('Error fetching audio:', error);
        setError(`Error fetching audio: ${error.message}`); // Provide more informative error
      } finally {
        setIsLoading(false);
      }
    };

    if (currentSong) {
      loadSound(currentSong);
    }

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
    if (songs.length > 0 && currentSongIndex > 0) { // Handle empty list
      setCurrentSongIndex(currentSongIndex - 1);
      setCurrentSong(songs[currentSongIndex - 1]);
    } else if (isRepeating) {
      setCurrentSongIndex(songs.length - 1);
      setCurrentSong(songs[songs.length - 1]);
    }
  };

  const playNextSong = () => {
    if (songs.length > 0 && currentSongIndex < songs.length - 1) { // Handle empty list
      setCurrentSongIndex(currentSongIndex + 1);
      setCurrentSong(songs[currentSongIndex + 1]);
    } else if (isRepeating) {
      setCurrentSongIndex(0); // Set index to the first song
      setCurrentSong(songs[0]); // Set current song to the first song
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
      } catch (error) {
        console.error('Error resuming playback:', error);
        setError(`Error resuming playback: ${error.message}`); // Provide informative error
      }
    }
  };

  const unloadSound = async () => {
    if (sound) {
      await sound.unloadAsync();
      setSound(null);
    }
  };

  useEffect(() => {
    return () => {
      unloadSound(); // Unload sound on cleanup
    };
  }, []); // Empty dependency array ensures cleanup on unmount

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
  };3