// PlayerWidget.js
import React, { useEffect, useState } from 'react';
import { View, Text, Image, TouchableOpacity, StyleSheet,} from 'react-native';
import { AntDesign, FontAwesome } from '@expo/vector-icons';
import { Audio } from 'expo-av';
import { useAudioContext } from '@/app/context/audio';
import { Slider } from 'react-native-awesome-slider';



const PlayerWidget = () => {
  const { currentSong, playSong } = useAudioContext();
  const [sound, setSound] = useState<Audio.Sound | null>(null);
  const [isPlaying, setIsPlaying] = useState<boolean>(false);
  const [duration, setDuration] = useState<number | null>(null);
  const [position, setPosition] = useState<number | null>(null);

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

  return (
    <View style={styles.container}>
      <Image style={styles.albumArt} source={{ uri: currentSong ? currentSong.imageUri : '' }} />

      <View style={styles.songInfo}>
        <Text style={styles.title}>{currentSong ? currentSong.title : ''}</Text>
        <Text style={styles.artist}>{currentSong ? currentSong.artist : ''}</Text>
      </View>

      <Slider
        style={styles.progressBar}
        progress={getProgress()} // Use the getProgress function for value
        minimumValue={0}
        maximumValue={duration || 1}
        minimumTrackTintColor="#3498db"
        thumbTintColor="#3498db"
        onValueChange={handlePositionChange}
      />


      <View style={styles.controls}>
        <TouchableOpacity onPress={onPlayPausePress}>
          <FontAwesome name={isPlaying ? 'pause' : 'play'} size={30} color="#000" />
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#fff',
    padding: 16,
    borderRadius: 10,
    elevation: 5,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
  },
  albumArt: {
    width: '100%',
    height: 200,
    borderRadius: 8,
    marginBottom: 16,
  },
  songInfo: {
    marginBottom: 16,
  },
  title: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  artist: {
    color: '#888',
  },
  progressBar: {
    marginBottom: 16,
  },
  controls: {
    flexDirection: 'row',
    justifyContent: 'center',
  },
});

export default PlayerWidget;
