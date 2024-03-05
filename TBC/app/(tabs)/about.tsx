import { View, Text, SafeAreaView, Platform, StyleSheet, useColorScheme, Pressable, Dimensions } from 'react-native'
import React from 'react'
import CustomHeader from '@/components/CustomHeader'
import { useNavigation, useTheme } from '@react-navigation/native'
import Colors from '@/constants/Colors'
import { Poppins_700Bold} from '@expo-google-fonts/poppins';
import { NotoSerif_400Regular, NotoSerif_700Bold } from '@expo-google-fonts/noto-serif';
import { useFonts } from 'expo-font'
import { Ionicons } from '@expo/vector-icons'
import { Video } from 'expo-av'
import { useAudioContext } from '../context/audio'
import PlayerWidget from '@/components/playerWidget'

const AboutScreen = () => {

  const navigation = useNavigation();
  const colorScheme = useColorScheme();
  const theme = useTheme();
  const isDarkMode = colorScheme === 'dark';
  const { isPlaying, isPaused } = useAudioContext();

  const [fontsLoaded] = useFonts({
    Poppins_700Bold,
    NotoSerif_400Regular,
    NotoSerif_700Bold
  });

  const onFullscreenUpdate = async () => {
    if (Dimensions.get('window').height > Dimensions.get('window').width) {
      await ScreenOrientation.lockAsync(ScreenOrientation.OrientationLock.LANDSCAPE);
    } else {
      await ScreenOrientation.lockAsync(ScreenOrientation.OrientationLock.PORTRAIT);
    }
  };

  const videoUrl = require('@/assets/videos/creed.mp4');

  if (fontsLoaded) {
    return (
    <SafeAreaView>
      <CustomHeader name='About'/>
      <View style={{marginTop: Platform.OS === 'ios' ? 10: 80, marginBottom: Platform.OS === 'ios' ? 50 : 50}}>
      <View style={styles.container}>
          <Text style={[styles.subtitle, {fontFamily: 'NotoSerif_400Regular',  color: isDarkMode ? '#fff' : Colors.textGrey }]}>WELCOME,</Text>
          <Text style={[styles.title, {fontFamily: 'Poppins_700Bold',  color: isDarkMode ? Colors.primary : '#000' }]}>Shining Lights</Text>

          <Text style={[styles.subtitle, {fontFamily: 'Poppins_700Bold',  color: isDarkMode ? Colors.primary : '#000', }]}>Who are we?</Text>
          <Text style={[styles.content, {fontFamily: 'NotoSerif_400Regular',  color: isDarkMode ? '#fff' : Colors.textGrey, marginBottom: 10 }]}>We are a Christian Community of Godly World
Changers</Text>
          <Text style={[styles.subtitle, {fontFamily: 'Poppins_700Bold',  color: isDarkMode ? Colors.primary : '#000', marginTop: 10 }]}>What is our Mission?</Text>
          <Text style={[styles.content, {fontFamily: 'NotoSerif_400Regular',  color: isDarkMode ? '#fff' : Colors.textGrey, marginBottom: 10 }]}>Raising Shining Lights....</Text>

          <Text style={[styles.subtitle, {fontFamily: 'Poppins_700Bold',  color: isDarkMode ? Colors.primary : '#000', marginTop: 10 }]}>Our Creed</Text>
          <Video
            style={{width: '90%', height: 150, marginVertical: 10}}
            source={videoUrl}
            useNativeControls
            isLooping
            resizeMode='contain'
            onFullscreenUpdate={onFullscreenUpdate}
            onError={(error) => console.error('Video Error:', error)}/>

          <Text style={[styles.subtitle, {fontFamily: 'Poppins_700Bold',  color: isDarkMode ? Colors.primary : '#000', marginTop: 20 }]}>Come Worship with Us</Text>
          <Text style={[styles.subtitle, {fontFamily: 'NotoSerif_700Bold',  color: isDarkMode ? Colors.primary : '#000' }]}>Sunday</Text>
          <Text style={[styles.content, {fontFamily: 'NotoSerif_400Regular',  color: isDarkMode ? '#fff' : Colors.textGrey }]}>Impart Service | 9AM</Text>
          <Text style={[styles.subtitle, {fontFamily: 'NotoSerif_700Bold',  color: isDarkMode ? Colors.primary : '#000', marginTop: 10 }]}>Wednesday</Text>
          <Text style={[styles.content, {fontFamily: 'NotoSerif_400Regular',  color: isDarkMode ? '#fff' : Colors.textGrey }]}>Refuel Service | 6PM</Text>
          <View>
          <Text style={[styles.content, {fontFamily: 'NotoSerif_400Regular',  color: isDarkMode ? '#fff' : Colors.textGrey, marginTop: 20 }]}>For directions to our location click on the floating</Text>
          <Ionicons
                    name='map-outline'
                    size={13}
                    color= {Colors.yellow}
                  />
                  <Text style={[styles.content, {fontFamily: 'NotoSerif_400Regular',  color: isDarkMode ? '#fff' : Colors.textGrey }]}>icon</Text>

          </View>
        </View>
      </View>
      <View style={[styles.float, {zIndex: 1, backgroundColor: theme.colors.background, shadowColor: isDarkMode ? '#fff' : Colors.textGrey,}]}><Pressable onPress={() => navigation.navigate('(modals)/maps')}>
        <Ionicons
                    name='map-outline'
                    size={25}
                    color= {Colors.yellow}
                  /></Pressable>

      </View>
      {isPlaying ? <PlayerWidget style={90}/> : isPaused ? <PlayerWidget style={90}/> : null}
    </SafeAreaView>
    )
  } else {
    console.log("Fonts are still loading...");
  }
}
const styles = StyleSheet.create ({
  container: {
    marginTop: Platform.OS === 'ios' ? 10 : 40,
    paddingHorizontal: Platform.OS === 'ios' ? 20 : 25
  },
  title: {
    fontSize: 30
  },
  subtitle: {
    fontSize: 17
  },
  content: {
    fontSize: 15
  },
  float: {
    position: 'absolute',
    right: Dimensions.get('window').width / 8 - 40,
    bottom: Dimensions.get('window').height / 5 - 40,
    alignItems: 'center',
    justifyContent: 'center',
    width: 70,
    height: 70,
    borderRadius: 50,
    elevation: Platform.OS === 'android' ? 6 : 0,
    shadowOpacity: 0.3,
    shadowOffset: { width: 0, height: 5 },
  },

})
export default AboutScreen