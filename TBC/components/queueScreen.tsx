import React from 'react';
import { View, Text, Image, TouchableOpacity, FlatList, StyleSheet } from 'react-native';
import { AntDesign, MaterialCommunityIcons } from '@expo/vector-icons';

const QueueScreen = ({ onClose }) => {


  const renderItem = ({ item }) => (
    <View style={styles.queueItem}>
      <Image style={styles.queueThumbnail} source={{ uri: /* Thumbnail URL */ }} />
      <View style={styles.queueDetails}>
        <Text>{item.title}</Text>
        <Text style={styles.queueArtist}>{item.artist}</Text>
      </View>
      <TouchableOpacity onPress={() => /* Handle options */}>
        <MaterialCommunityIcons name="dots-vertical" size={24} color="#000" />
      </TouchableOpacity>
    </View>
  );

  return (
    <View style={styles.container}>
      {/* Close button */}
      <TouchableOpacity onPress={onClose} style={styles.closeButton}>
        <AntDesign name="close" size={24} color="#000" />
      </TouchableOpacity>

      {/* Queue list */}
      <FlatList
        data={queueData}
        keyExtractor={(item) => item.id}
        renderItem={renderItem}
        contentContainerStyle={styles.queueList}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  closeButton: {
    position: 'absolute',
    top: 16,
    right: 16,
  },
  queueList: {
    padding: 16,
  },
  queueItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 16,
  },
  queueThumbnail: {
    width: 40,
    height: 40,
    borderRadius: 4,
  },
  queueDetails: {
    flex: 1,
    marginHorizontal: 16,
  },
  queueArtist: {
    color: '#888',
  },
});

export default QueueScreen;
