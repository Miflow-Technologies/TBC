import React, { useState, useEffect } from 'react';
import { View, Text, Button, Image, StyleSheet } from 'react-native';
import axios from 'axios';
import CustomHeader from '@/components/CustomHeader';
import Linking from 'expo-linking'; // Import Linking for opening URLs
import YouTube from 'react-native-youtube';

const LiveScreen = () => {
  const [isYTLive, setIsYTLive] = useState(false);
  const [liveThumbnail, setLiveThumbnail] = useState(''); // State for live thumbnail

  const apiKey = 'AIzaSyC0u0Ela7osHgofViypz4jGbM1iBUqKBAQ';
  const channelId = 'UCkQOKzc2rrzMqfLhC6M93gA';
  const url = `https://www.googleapis.com/youtube/v3/search?part=id,snippet&channelId=${channelId}&eventType=live&key=${apiKey}`;



    const [videoId, setVideoId] = useState(null);
    const [errorMessage, setErrorMessage] = useState(null);
  
    useEffect(() => {
      const fetchLiveStreamId = async () => {
        try {
          // This code snippet retrieves the channel's uploaded videos playlist using the Youtube Data API v3
          const response = await fetch(
            `https://www.googleapis.com/youtube/v3/channels?part=contentDetails&key=${apiKey}&id=${channelId}`
          );
          const data = await response.json();
  
          if (data.items && data.items[0].contentDetails) {
            const playlistId = data.items[0].contentDetails.relatedPlaylists.uploads;
            // Assuming the first video in the uploads playlist is the live stream
            const playlistResponse = await fetch(
              `https://www.googleapis.com/youtube/v3/playlistItems?part=snippet&key=${apiKey}&playlistId=${playlistId}&maxResults=1`
            );
            const playlistData = await playlistResponse.json();
            if (playlistData.items && playlistData.items[0].snippet.resourceId.videoId) {
              setVideoId(playlistData.items[0].snippet.resourceId.videoId);
            } else {
              setErrorMessage('No live stream found on this channel');
            }
          } else {
            setErrorMessage('Failed to retrieve channel information');
          }
        } catch (error) {
          console.error(error);
          setErrorMessage('Error fetching live stream information');
        }
      };
  
      fetchLiveStreamId();
    }, []);
  
    return (
      <View style={styles.container}>
        {videoId ? (
          <YouTube
            apiKey={apiKey}
            videoId={videoId}
            controls={1} // Enable controls for the Youtube player
            onError={(e) => console.error(e)}
            style={styles.youtubePlayer}
          />
        ) : errorMessage ? (
          <Text style={styles.errorText}>{errorMessage}</Text>
        ) : (
          <Text style={styles.loadingText}>Loading live stream...</Text>
        )}
      </View>
    );
  };
  
  const styles = StyleSheet.create({
    container: {
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
    },
    youtubePlayer: {
      height: 300,
    },
    errorText: {
      fontSize: 18,
      color: 'red',
    },
    loadingText: {
      fontSize: 18,
    },
  });
  
  export default LiveScreen;
  