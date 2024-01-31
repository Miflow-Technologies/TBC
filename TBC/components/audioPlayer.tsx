import React from 'react';
import { View, Text, Image, TouchableOpacity, StyleSheet, Slider } from 'react-native';
import { AntDesign, FontAwesome, MaterialCommunityIcons } from '@expo/vector-icons';

const MusicPlayerScreen = () => {
  return (
    <View style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity onPress={() => /* Handle close bottom sheet */}>
          <AntDesign name="down" size={24} color="#000" />
        </TouchableOpacity>
        <Text style={styles.seriesName}>{/* Series Name */}</Text>
        <TouchableOpacity onPress={() => /* Handle menu options */}>
          <MaterialCommunityIcons name="dots-vertical" size={24} color="#000" />
        </TouchableOpacity>
      </View>

      {/* Album Art */}
      <Image style={styles.albumArt} source={{ uri: /* Album Art URL */ }} />

      {/* Song Details */}
      <Text style={styles.title}>{/* Song Title */}</Text>
      <Text style={styles.artist}>{/* Artist */}</Text>

      {/* Progress Bar */}
      <Slider
        style={styles.progressBar}
        minimumValue={0}
        maximumValue={100}
        value={50}
        minimumTrackTintColor="#3498db"
        thumbTintColor="#3498db"
      />

      {/* Controls */}
      <View style={styles.controls}>
        <TouchableOpacity onPress={() => /* Handle shuffle */}>
          <FontAwesome name="random" size={24} color="#000" />
        </TouchableOpacity>
        {/* Add other controls like back, pause/play, forward, repeat */}
      </View>

      {/* Share and Queue */}
      <View style={styles.bottomActions}>
        <TouchableOpacity onPress={() => /* Handle share */}>
          <AntDesign name="sharealt" size={24} color="#000" />
        </TouchableOpacity>
        <TouchableOpacity onPress={() => /* Handle open queue */}>
          <MaterialCommunityIcons name="playlist-music" size={24} color="#000" />
        </TouchableOpacity>
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
    height: 80,
    marginTop: 16,
    borderRadius: 8,
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
  bottomActions: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    position: 'absolute',
    bottom: 16,
    left: 16,
    right: 16,
  },
});

export default MusicPlayerScreen;
