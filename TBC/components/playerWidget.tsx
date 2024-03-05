import React, { useEffect, useState } from 'react';
import { View, Text, Image, TouchableOpacity, StyleSheet, Pressable } from 'react-native';
import { AntDesign, FontAwesome, Ionicons } from '@expo/vector-icons';
import { Audio } from 'expo-av';
import { useAudioContext } from '@/app/context/audio';
import Colors from '@/constants/Colors';
import { useNavigation } from 'expo-router';

const defaultAlbumArt = require('@/assets/images/cover.jpg')

const PlayerWidget = ({style}) => {
  const navigation = useNavigation();
  
  const { currentSong, playNextSong, isRepeating, isPlaying, pausePlayback, resumePlayback, sound } = useAudioContext();
  const [duration, setDuration] = useState<number | null>(null);
  const [position, setPosition] = useState<number | null>(null);
 



  const onPlaybackStatusUpdate = (status) => {
    setDuration(status.durationMillis);
    setPosition(status.positionMillis);

    if (!isPlaying && isRepeating && status.didJustFinish) {
      playNextSong();
    }
  };

  const onPlayPausePress = async () => {
    if (!sound) {
      return;
    }
    return isPlaying ? pausePlayback() : resumePlayback();
  };


  const getProgress = () => {
    if (duration === null || position === null) {
      return 0;
    }
    return (position / duration) * 100;
  };

  const handleSeek = (x) => {
    const newPosition = x / 100 * (duration || 0);
    setPosition(newPosition);
    if (sound) {
      sound.setPositionAsync(newPosition);
    }
  };

  
 
  

  return (
    <View style={[styles.container, {bottom: style}]}>
      
      <View style={styles.section}>
      <Pressable>
        <View style={styles.section2}>
          <Image
            style={styles.albumArt}
            source={currentSong ? { uri: currentSong.imageUrl} : defaultAlbumArt}
          />

          <View style={styles.songInfo}>
            <Text style={styles.title}>{currentSong?.title || 'No Title'}</Text>
            <Text style={styles.artist}>{currentSong?.preacher || 'Unknown Artist'}</Text>
          </View>
        </View>
      </Pressable>

        <View style={styles.controls}>
          <TouchableOpacity onPress={onPlayPausePress}>
            <Ionicons name={isPlaying ? 'pause' : 'play'} size={20} color="#fff" />
          </TouchableOpacity>
        </View>
      </View>
      <View style={styles.progressBarContainer}>
          <View
            style={[styles.progressBar, { width: `${getProgress()}%` }]}
          />
          <TouchableOpacity style={styles.thumb} onPress={() => {}} onMove={(event) => handleSeek(event.nativeEvent.locationX)}>
            <View style={styles.thumbInner} />
          </TouchableOpacity>
        </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    position: 'absolute',
    height: 60,
    width: '85%',
    alignSelf: 'center',
    backgroundColor: Colors.secondary,
    borderRadius: 9,
  },
  section : {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between'
  },
  section2: {
    padding: 10,
    flexDirection: 'row',
    alignItems: 'center',
  },
  albumArt: {
    width: 40,
    height: 40,
  },
  songInfo: {
    alignItems: 'flex-start',
    paddingLeft: 10
  },
  title: {
    fontSize: 15,
    fontWeight: 'bold',
    color: '#fff'
  },
  artist: {
    color: '#fff',
    fontSize: 12,
  },
  progressBarContainer: {
    height: 5,
    backgroundColor: 'ddd',
    borderRadius: 5,
    overflow: 'hidden',
  },
  progressBar: {
    backgroundColor: '#fff',
    height: 5,
  },
  thumb: {
    position: 'absolute',
    width: 5,
    height: 5,
    backgroundColor: '#000',
    borderRadius: 50,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
    alignItems: 'center',
    justifyContent: 'center',
  },
  thumbInner: {
    width: 10,
    height: 10,
    backgroundColor: '#000',
    borderRadius: 50,
  },
  controls: {
    flexDirection: 'row',
    justifyContent: 'center',
    paddingRight: 15
  },
});

export default PlayerWidget;