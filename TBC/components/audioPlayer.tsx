// MusicPlayerScreen.js
import React, { useEffect, useState } from 'react';
import { View, Text, Image, TouchableOpacity, StyleSheet} from 'react-native';
import { AntDesign, FontAwesome, MaterialCommunityIcons } from '@expo/vector-icons';
import { useAudioContext } from '@/app/context/audio';
import { Audio } from 'expo-av';
import { Slider } from 'react-native-awesome-slider';
import Animated, {
  useSharedValue,
  withSpring,
  useAnimatedStyle,
} from 'react-native-reanimated';

const MusicPlayerScreen = () => {
  const { currentSong, songs, playPreviousSong, playNextSong } = useAudioContext();
  const [sound, setSound] = useState<Audio.Sound | null>(null);
  const [isPlaying, setIsPlaying] = useState<boolean>(false);
  const [duration, setDuration] = useState<number | null>(null);
  const [position, setPosition] = useState<number | null>(null);
  const [currentSongIndex, setCurrentSongIndex] = useState(0);
  const [totalSongs, setTotalSongs] = useState(songs.length);
  const [isRepeating, setIsRepeating] = useState(false);

  const progress = useSharedValue(0);
  const min = useSharedValue(0);
  const max = useSharedValue(100);


  useEffect(() => {
    const loadSound = async () => {
      if (currentSong && !sound) {
        const { sound: newSound } = await Audio.Sound.createAsync(
          { uri: currentSong.uri },
          { shouldPlay: true },
          onPlaybackStatusUpdate
        );
        setSound(newSound);
      }
    };

    loadSound();

    return () => {
      if (sound) {
        sound.unloadAsync();
      }
    };
  }, [currentSong]);

  const onPlaybackStatusUpdate = (status) => {
    setIsPlaying(status.isPlaying);
    setDuration(status.durationMillis);
    setPosition(status.positionMillis);
    progress.value = status.positionMillis || 0;
  };

  const onPlayPausePress = async () => {
    if (!sound) {
      return;
    }

    if (isPlaying) {
      await sound.pauseAsync();
    } else {
      await sound.playAsync();
    }
  };

  const getProgress = () => {
    if (sound === null || duration === null || position === null) {
      return 0;
    }

    return (position / duration) * 100;
  };

  const handlePositionChange = (value) => {
    setPosition(value);

    // Update the audio playback to match the new position:
    if (sound) {
      sound.setPositionAsync(value);
    }
  };

  const animatedStyle = useAnimatedStyle(() => {
    return {
      progress: withSpring(progress.value),
    };
  });

  const handleBackPress = async () => {
    if (currentSongIndex > 0) {
      setCurrentSongIndex(currentSongIndex - 1);
      playPreviousSong();
    }
  };

  const handleForwardPress = async () => {
    if (currentSongIndex < totalSongs - 1) {
      setCurrentSongIndex(currentSongIndex + 1);
      playNextSong();
    }
  };

  const handleRepeatPress = () => {
    setIsRepeating(!isRepeating);
    if (isRepeating) {
      enableRepeatMode();
    } else {
      disableRepeatMode();
    }
  };

  const enableRepeatMode = () => {
    setIsRepeating(true);
    // Implement logic to enable repeat mode
  };

  const disableRepeatMode = () => {
    setIsRepeating(false);
    // Implement logic to disable repeat mode
  };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => /* Handle close audio player */}>
          <AntDesign name="down" size={24} color="#000" />
        </TouchableOpacity>
        <Text style={styles.seriesName}>{/* Series Name */}</Text>
        <TouchableOpacity onPress={() => /* Handle menu options */}>
          <MaterialCommunityIcons name="dots-vertical" size={24} color="#000" />
        </TouchableOpacity>
      </View>

      <Image style={styles.albumArt} source={{ uri: currentSong ? currentSong.imageUri : '' }} />

      <Text style={styles.title}>{currentSong ? currentSong.title : ''}</Text>
      <Text style={styles.artist}>{currentSong ? currentSong.artist : ''}</Text>

      <Slider
        style={styles.progressBar}
        progress={animatedStyle.progress}
        minimumValue={min.value}
        maximumValue={max.value}
        minimumTrackTintColor="#3498db"
        thumbTintColor="#3498db"
        onValueChange={handlePositionChange}
      />

      <View style={styles.controls}>
        <TouchableOpacity onPress={onPlayPausePress}>
          <FontAwesome name={isPlaying ? 'pause' : 'play'} size={30} color="#000" />
        </TouchableOpacity>
        <View style={styles.controls}>
          <TouchableOpacity onPress={handleBackPress}>
            <AntDesign name="rewind" size={30} color="#000" />
          </TouchableOpacity>
          <TouchableOpacity onPress={handleRepeatPress}>
            <AntDesign name={isRepeating ? 'repeat' : 'repeat1'} size={30} color="#000" />
          </TouchableOpacity>
          <TouchableOpacity onPress={handleForwardPress}>
            <AntDesign name="forward" size={30} color="#000" />
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  seriesName: {
    fontWeight: 'bold',
    fontSize: 18,
  },
  albumArt: {
    width: '100%',
    height: 200,
    borderRadius: 8,
    marginBottom: 16,
  },
  title: {
    fontWeight: 'bold',
    fontSize: 18,
    marginTop: 16,
  },
  artist: {
    textAlign: 'right',
    marginTop: 4,
    color: '#888',
  },
  progressBar: {
    marginTop: 16,
  },
  controls: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginTop: 16,
  },
});

export default MusicPlayerScreen;
