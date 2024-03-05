import React, { createContext, useState, useContext, useEffect, ReactNode } from 'react';
import { AVPlaybackStatus, Audio } from 'expo-av';
import { useDebounce } from 'react-use';

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
  isPlaying: boolean
  sound: Audio.Sound
  isPaused: boolean
}

interface AudioProviderProps {
  children: ReactNode;
}

type SoundPlaybackStatus = AVPlaybackStatus | { didJustFinish: boolean };

const AudioContext = createContext<AudioContextProps | undefined>(undefined);

export const AudioProvider: React.FC<AudioProviderProps> = ({ children }) => {
  const [currentSong, setCurrentSong] = useState<Song | null>(null);
  const [sound, setSound] = useState<Audio.Sound | null>(null);
  const [songs, setSongs] = useState<Song[]>([]);
  const [currentSongIndex, setCurrentSongIndex] = useState(0);
  const [isRepeating, setIsRepeating] = useState(false);
  const [isLoading, setIsLoading] = useState(false); 
  const [error, setError] = useState<string | null>(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [isPaused, setIsPaused] = useState(false);

  useEffect(() => {
    const loadSound = async (currentSong) => {
      console.log('loadingSound')
      setIsLoading(true);
      console.log('isLoading set to true')
      setError(null);
      console.log('Error set to null')

      try {
        if (currentSong) {
          console.log('currentsong', currentSong.title)
          const { sound: newSound } = await Audio.Sound.createAsync({ uri: currentSong.audioUrl }, { shouldPlay: true });
          setSound(newSound);
          console.log('new sound set')
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
        console.log('isLoading set to false')
      }
    };

    if (currentSong) {
      loadSound(currentSong);
    }

    return () => {
      console.log("Unloading Sound...");
      if (sound) {
        sound.unloadAsync();
        console.log('sound unloaded')
      }

    };
  }, [currentSong, isRepeating]);




    
  const playSong = async (song: Song) => {
    console.log(song)
      setCurrentSong(song);
      console.log(currentSong)
      setCurrentSongIndex(songs.indexOf(song));
      console.log(songs.indexOf(song))
      setIsPlaying(true)
  
   
      if (sound) {
        console.log(sound)
        sound.stopAsync().then(async () => {
          console.log(sound)
          try {
            const { sound: newSound } = await Audio.Sound.createAsync({ uri: currentSong.audioUrl }, { shouldPlay: true });
            setSound(newSound);
          } catch (error) {
            console.error('Error creating/playing sound:', error);
          }
        });
      } else {
        try {
          const { sound: newSound } = await Audio.Sound.createAsync({ uri: currentSong.audioUrl }, { shouldPlay: true });
          setSound(newSound);
          console.log(newSound)
        } catch (error) {
          console.error('Error creating/playing sound:', error);
        }
      }
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
        setIsPaused(true)
        setIsPlaying(false)
      } catch (error) {
        setError(error.toString());
      }
    }
  };

  const resumePlayback = async () => {
    if (sound) {
      try {
        await sound.playAsync();
        setIsPaused(false)
        setIsPlaying(true)
      } catch (error) {
        console.error('Error resuming playback:', error);
        setError(`Error resuming playback: ${error.message}`);
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
      unloadSound();
    };
  }, []);

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
    isPlaying,
    sound,
    isPaused
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


