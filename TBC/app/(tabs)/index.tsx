import React, { useEffect, useState } from 'react';
import { View, Text, SafeAreaView, StyleSheet, Platform, ScrollView, useColorScheme } from 'react-native';
import Colors from '@/constants/Colors';
import { Poppins_700Bold} from '@expo-google-fonts/poppins';
import { NotoSerif_400Regular } from '@expo-google-fonts/noto-serif';
import CollapsibleContainer from '@/components/CollapsibleContainer';
import CustomHeader from '@/components/CustomHeader';
import { useFonts } from 'expo-font';
import { collection, getDocs } from 'firebase/firestore';
import { db } from '@/config/firebaseConfig';
import PlayerWidget from '@/components/playerWidget';
import { useAudioContext } from '../context/audio';

const Tbc = () => {
  const colorScheme = useColorScheme();
  const isDarkMode = colorScheme === 'dark';

  const [fontsLoaded] = useFonts({
    Poppins_700Bold,
    NotoSerif_400Regular,
  });

  const { isPlaying, isPaused } = useAudioContext();
  const [devotionalDetails, setDevotionalDetails] = useState({
    title: '',
    subtitle: '',
    author: '',
  });

  useEffect(() => {
    const fetchDevotionalDetails = async () => {
      try {
        const devotionalRef = collection(db, 'devotional');
        const querySnapshot = await getDocs(devotionalRef);

        if (querySnapshot.docs.length > 0) {
          const firstDevotional = querySnapshot.docs[0].data();
          setDevotionalDetails({
            title: firstDevotional.title || '',
            subtitle: firstDevotional.passage || '',
            author: firstDevotional.author || '',
          });
        }
      } catch (error) {
        console.error('Error fetching devotional details:', error);
      }
    };

    fetchDevotionalDetails();
  }, []);

    if (fontsLoaded) {
      return (
      <SafeAreaView>
      <CustomHeader name='TBC'/>
      <ScrollView style={{marginTop: Platform.OS === 'ios' ? 70: 100, marginBottom: Platform.OS === 'ios' ? 70 : 100}}>
        <View style={styles.container}>
          <Text style={[styles.subtitle, {fontFamily: 'NotoSerif_400Regular',  color: isDarkMode ? '#fff' : Colors.textGrey }]}>WELCOME,</Text>
          <Text style={[styles.title, {fontFamily: 'Poppins_700Bold',  color: isDarkMode ? Colors.primary : '#000' }]}>Shining Lights</Text>
        </View>
        <View style={styles.cardContainer}> 
          <CollapsibleContainer
            title="Daily Quotes"
            subtitle="Today's Quote from:"
            author="TBC"
            buttonText="READ"
            backgroundColor="#41BBAC"
            screen="(details)/dailyQuote"
          />
          <CollapsibleContainer
            title='Devotionals'
            subtitle={devotionalDetails.subtitle}
            author={devotionalDetails.author}
            buttonText="READ"
            backgroundColor="#1CB4EE"
            screen="(details)/devotional"
          />
          <CollapsibleContainer
            title="Announcements"
            subtitle="Weekly Announcements from:"
            author="TBC"
            buttonText="READ"
            backgroundColor="#CB3CA0"
            screen='(details)/announcements'
          />
        </View>
        </ScrollView>
    </SafeAreaView>)
   
    } else {
  
      console.log("Fonts are still loading...");
    }
    
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
    fontSize: 15
  },
  cardContainer: {
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
    gap: 20,
    margin: Platform.OS === 'ios' ? 20 : 10,

  },
  cards: {
    height: 75,
    gap: 10,
    width: Platform.OS === 'ios' ? '98%' : '98%',
    borderRadius: 25,
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
    shadowOffset: { width: -2, height: 4 },
    shadowOpacity: 0.3,
    elevation: 5,
  },
  cardExpanded: {
    height: 235,
    gap: 10,
    width: Platform.OS === 'ios' ? '98%' : '90%',
    borderRadius: 25,
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
    shadowOffset: { width: 0, height: 3 },
    shadowOpacity: 0.2,
    elevation: 5,
  },
})

export default Tbc