import { View, Text, SafeAreaView, Platform, StyleSheet, useColorScheme, Pressable, Dimensions } from 'react-native'
import React from 'react'
import CustomHeader from '@/components/CustomHeader'
import { ScrollView } from 'react-native-gesture-handler'
import { useNavigation, useTheme } from '@react-navigation/native'
import Colors from '@/constants/Colors'
import { Poppins_700Bold} from '@expo-google-fonts/poppins';
import { NotoSerif_400Regular, NotoSerif_700Bold } from '@expo-google-fonts/noto-serif';
import { useFonts } from 'expo-font'
import { Ionicons } from '@expo/vector-icons'
import { Video } from 'expo-av'

const AboutScreen = () => {

  const navigation = useNavigation();
  const colorScheme = useColorScheme();
  const theme = useTheme();
  const isDarkMode = colorScheme === 'dark';

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

  return (
    <SafeAreaView>
      <CustomHeader name='About'/>
      <ScrollView style={{marginTop: Platform.OS === 'ios' ? 70: 100, marginBottom: Platform.OS === 'ios' ? 70 : 100}}>
      <View style={styles.container}>
          <Text style={[styles.subtitle, {fontFamily: 'NotoSerif_400Regular',  color: isDarkMode ? '#fff' : Colors.textGrey }]}>WELCOME,</Text>
          <Text style={[styles.title, {fontFamily: 'Poppins_700Bold',  color: isDarkMode ? Colors.primary : '#000' }]}>Shining Lights</Text>

          <Text style={[styles.subtitle, {fontFamily: 'Poppins_700Bold',  color: isDarkMode ? Colors.primary : '#000' }]}>Who are we?</Text>
          <Text style={[styles.content, {fontFamily: 'NotoSerif_400Regular',  color: isDarkMode ? '#fff' : Colors.textGrey }]}>We are a Christian Community of Godly World
Changers</Text>
          <Text style={[styles.subtitle, {fontFamily: 'Poppins_700Bold',  color: isDarkMode ? Colors.primary : '#000' }]}>What is our Mission?</Text>
          <Text style={[styles.content, {fontFamily: 'NotoSerif_400Regular',  color: isDarkMode ? '#fff' : Colors.textGrey }]}>Raising Shining Lights....</Text>

          <Text style={[styles.subtitle, {fontFamily: 'Poppins_700Bold',  color: isDarkMode ? Colors.primary : '#000' }]}>Our Creed</Text>
          <Video
            style={{width: '90%', height: 150, marginVertical: 10}}
            source={{
              uri: videoUrl,
            }}
            useNativeControls
            isLooping
            resizeMode='contain'
            onFullscreenUpdate={onFullscreenUpdate}
            onError={(error) => console.error('Video Error:', error)}/>

          <Text style={[styles.subtitle, {fontFamily: 'Poppins_700Bold',  color: isDarkMode ? Colors.primary : '#000' }]}>Come Worship with Us</Text>
          <Text style={[styles.subtitle, {fontFamily: 'NotoSerif_700Bold',  color: isDarkMode ? Colors.primary : '#000' }]}>Sunday</Text>
          <Text style={[styles.content, {fontFamily: 'NotoSerif_400Regular',  color: isDarkMode ? '#fff' : Colors.textGrey }]}>Impart Service | 9AM</Text>
          <Text style={[styles.subtitle, {fontFamily: 'NotoSerif_700Bold',  color: isDarkMode ? Colors.primary : '#000' }]}>Wednesday</Text>
          <Text style={[styles.content, {fontFamily: 'NotoSerif_400Regular',  color: isDarkMode ? '#fff' : Colors.textGrey }]}>Refuel Service | 6PM</Text>
          <View>
          <Text style={[styles.content, {fontFamily: 'NotoSerif_400Regular',  color: isDarkMode ? '#fff' : Colors.textGrey }]}>For direction to our location click on the floating</Text>
          <Ionicons
                    name='map-outline'
                    size={13}
                    color= {Colors.yellow}
                  />
                  <Text style={[styles.content, {fontFamily: 'NotoSerif_400Regular',  color: isDarkMode ? '#fff' : Colors.textGrey }]}>icon</Text>

          </View>
        </View>
      </ScrollView>
      <View style={[styles.float, {zIndex: 1, backgroundColor: theme.colors.background, shadowColor: isDarkMode ? '#fff' : Colors.textGrey,}]}><Pressable onPress={() => navigation.navigate('(modals)/maps')}>
        <Ionicons
                    name='map-outline'
                    size={25}
                    color= {Colors.yellow}
                  /></Pressable>
      </View>
    </SafeAreaView>
  )
}
const styles = StyleSheet.create ({
  container: {
    marginTop: Platform.OS === 'ios' ? 10 : 35,
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
    right: Dimensions.get('window').width / 8 - 40, // Adjust as needed
    bottom: Dimensions.get('window').height / 10 - 40, // Adjust as needed
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