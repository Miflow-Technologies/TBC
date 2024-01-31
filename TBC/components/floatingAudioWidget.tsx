import React, { useState, useEffect } from 'react';
import { View, Text, Image, TouchableOpacity, StyleSheet } from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';

const FloatingPlayerWidget = ({ isOpen, onOpen }) => {
  const [isAudioPlaying, setIsAudioPlaying] = useState(false); // Replace with your audio playing state
  const [currentTrack, setCurrentTrack] = useState(null); // Replace with your current track state

  useEffect(() => {
    // Example: Set isAudioPlaying and currentTrack based on your app's logic
    // For demonstration purposes, it's set to true and a dummy track
    setIsAudioPlaying(true);
    setCurrentTrack({ title: 'Song Title', artist: 'Artist Name', thumbnail: /* Thumbnail URL */ });
  }, []); // Adjust the dependency array based on your use case

  const handleWidgetPress = () => {
    if (isOpen) {
      // Close the full audio player if it's open
      // Replace with your logic to close the audio player
    } else {
      // Open the full audio player
      onOpen();
    }
  };

  if (!isAudioPlaying) {
    return null; // Hide the widget if no audio is playing
  }

  return (
    <TouchableOpacity style={styles.container} onPress={handleWidgetPress}>
      {/* Thumbnail */}
      <Image style={styles.thumbnail} source={{ uri: currentTrack?.thumbnail }} />

      {/* Song Title and Artist */}
      <View style={styles.details}>
        <Text style={styles.title}>{currentTrack?.title}</Text>
        <Text style={styles.artist}>{currentTrack?.artist}</Text>
      </View>

      {/* Pause Button */}
      <TouchableOpacity style={styles.pauseButton} onPress={/* Handle pause/play */}>
        <MaterialIcons name="pause" size={24} color="#fff" />
      </TouchableOpacity>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    backgroundColor: '#3498db', // Adjust the background color
    padding: 8,
  },
  thumbnail: {
    width: 30,
    height: 30,
    borderRadius: 4,
  },
  details: {
    flex: 1,
    marginLeft: 8,
  },
  title: {
    color: '#fff',
    fontWeight: 'bold',
  },
  artist: {
    color: '#fff',
    fontSize: 12,
  },
  pauseButton: {
    marginLeft: 8,
  },
});

export default FloatingPlayerWidget;
