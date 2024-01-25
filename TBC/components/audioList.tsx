import React, {useContext} from 'react';
import {Text, Image, View, TouchableWithoutFeedback, TouchableOpacity} from 'react-native';
import { StyleSheet} from "react-native";

const AudioList = (imageUri, title, artist) => {
  
  return (
    <TouchableOpacity onPress={onPlay}>
      <View style={styles.container}>
        <Image source={{ uri: imageUri }} style={styles.image} />
        <View style={styles.rightContainer}>
          <Text style={styles.title}>{title}</Text>
          <Text style={styles.artist}>{artist}</Text>
        </View>
      </View>
    </TouchableOpacity>
  )
}
const styles = StyleSheet.create({
    container: {
      flexDirection: 'row',
      margin: 15,
    },
    image: {
      width: 75,
      height: 75,
    },
    rightContainer: {
      justifyContent: 'space-around',
      marginLeft: 15,
    },
    title: {
      color: 'white',
      fontSize: 24,
    },
    artist: {
      color: 'lightgray',
      fontSize: 20,
    }
  })

export default AudioList;