import React from 'react';
import { View, StyleSheet } from 'react-native';
import WebView from 'react-native-webview';
// You can choose a different icon library if preferred


const MapScreen = () => {
    return (
      <View style={styles.container}>
        <WebView
          source={{ uri: 'https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3956.899212785568!2d3.813047683786426!3d7.365193393861346!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x10398fa95920358b%3A0x6eb936f5446c6866!2sThe%20Beacon%20Centre!5e0!3m2!1sen!2sng!4v1706986650449!5m2!1sen!2sng' }}
        />
      </View>
    );
  };
  
  const styles = StyleSheet.create({
    container: {
      flex: 1,
    },
  });
  
  export default MapScreen;
  