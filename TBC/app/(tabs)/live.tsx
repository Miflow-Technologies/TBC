import React, { useState, useEffect } from 'react';
import { View, Text, Button, Image } from 'react-native';
import axios from 'axios';
import CustomHeader from '@/components/CustomHeader';
import Linking from 'expo-linking'; // Import Linking for opening URLs

const LiveScreen = () => {
  const [isYTLive, setIsYTLive] = useState(false);
  const [liveThumbnail, setLiveThumbnail] = useState(''); // State for live thumbnail

  const apiKey = 'YOUR_API_KEY';
  const channelId = 'YOUR_CHANNEL_ID';
  const url = `https://www.googleapis.com/youtube/v3/search?part=id,snippet&channelId=${channelId}&eventType=live&key=${apiKey}`; // Include 'snippet' part for thumbnails

  useEffect(() => {
    const fetchLiveStatus = async () => {
      try {
        const response = await axios.get(url);
        const items = response.data.items;
        const isLive = items.some(item => item.liveStreamingDetails);
        setIsYTLive(isLive);

        if (isLive) {
          const thumbnailUrl = items[0].snippet.thumbnails.medium.url;
          setLiveThumbnail(thumbnailUrl);
        } else {
          setLiveThumbnail(''); // Clear thumbnail when not live
        }
      } catch (error) {
        console.error('Error fetching live status:', error);
      }
    };

    fetchLiveStatus();
    setInterval(fetchLiveStatus, 60000);
  }, []);

  return (
    <View>
      <CustomHeader name="Live" />
      {isYTLive ? (
        <View>
          <Image source={{ uri: liveThumbnail }} style={{ width: 200, height: 150 }} /> {/* Display live thumbnail */}
          <Text>YouTube is live! Click to watch:</Text>
          <Button
            title="Watch on YouTube"
            onPress={() => Linking.openURL(`https://www.youtube.com/channel/${channelId}`)} // Use channel ID in URL
          />
        </View>
      ) : (
        <View>
          <Text>No live video at the moment.</Text>
        </View>
      )}
    </View>
  );
};

export default LiveScreen;
