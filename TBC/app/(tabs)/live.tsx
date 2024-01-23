import React, { useState, useEffect } from 'react';
import { View, Text, Button } from 'react-native';
import axios from 'axios'; // Assuming you have axios installed
import CustomHeader from '@/components/CustomHeader';

const LiveScreen = () => {
  const [isYTLive, setIsYTLive] = useState(false);
  const [isIGLive, setIsIGLive] = useState(false);

  const apiKey = 'YOUR_API_KEY'; // Replace with your YouTube API key
  const channelId = 'YOUR_CHANNEL_ID'; // Replace with your YouTube channel ID
  const url = `https://www.googleapis.com/youtube/v3/search?part=id&channelId=${channelId}&eventType=live&key=${apiKey}`;

  useEffect(() => {
    const fetchLiveStatus = async () => {
      try {
        // Check YouTube live status
        const ytLive = await checkYTLiveStatus();
        setIsYTLive(ytLive);

        // Check Instagram live status (implementation pending)
        // const igLive = await checkIGLiveStatus();
        // setIsIGLive(igLive);
      } catch (error) {
        console.error('Error fetching live status:', error);
      }
    };

    fetchLiveStatus();
    setInterval(fetchLiveStatus, 60000); // Check every 60 seconds
  }, []);

  const checkYTLiveStatus = async () => {
    try {
      const response = await axios.get(url);
      const items = response.data.items;
      return items.some(item => item.liveStreamingDetails);
    } catch (error) {
      console.error('Error fetching YouTube live status:', error);
      return false;
    }
  };

  // Implement checkIGLiveStatus function for Instagram live status

  return (
    <View>
      <CustomHeader name={'Live'}/>
      {isYTLive && (
        <View>
          <Text>YouTube is live! Click to watch:</Text>
          <Button title="Watch on YouTube" onPress={() => Linking.openURL('https://www.youtube.com/your-channel')}
          />
        </View> 
      )}
      {/*{isIGLive && (
        <View>
          <Text>Instagram is live! Click to watch:</Text>
          <Button title="Watch on Instagram" onPress={() => Linking.openURL('https://www.instagram.com/your-profile')} />
        </View>
      )}*/}
      {<View>
        <Text>Live will be updated when On AIR</Text>
      </View>}
    </View>
  );
};

export default LiveScreen;
