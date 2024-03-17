import React, { useEffect, useRef, useState } from 'react';
import { View, Text, Image, TouchableOpacity, PermissionsAndroid, StyleSheet, Platform } from 'react-native';
import { captureRef } from 'react-native-view-shot';
import { Share } from 'react-native';
import { Link } from 'expo-router';
import Colors from '@/constants/Colors';
import { Poppins_500Medium, Poppins_700Bold } from '@expo-google-fonts/poppins';
import { NotoSerif_400Regular, NotoSerif_700Bold } from '@expo-google-fonts/noto-serif';
import { useFonts } from 'expo-font';
import { useNavigation } from '@react-navigation/native';
import { collection, getDocs, limit, orderBy, query, } from 'firebase/firestore';
import { db } from '@/config/firebaseConfig';

const DailyQuote = () => {

  const navigation = useNavigation()
  const [fontsLoaded] = useFonts({
    Poppins_500Medium,
    Poppins_700Bold,
    NotoSerif_400Regular,
    NotoSerif_700Bold,
  });

  const styles = StyleSheet.create({
    container: {
      flex: 1,
      alignItems: 'center',
    },
    backgroundImage: {
      width: '100%',
      height: '100%',
      position: 'absolute',
    },
    overlay: {
      ...StyleSheet.absoluteFillObject,
      backgroundColor: 'rgba(0, 0, 0, 0.5)',
    },
    image: {
        height: Platform.OS === 'ios' ? 201.1 : 202,
        width: Platform.OS === 'ios' ? 195.5 : 197,
        top: Platform.OS === 'ios' ? 50 : 50,
    },
    card: {
      backgroundColor: '#292929',
      borderColor: '#292929',
      borderRadius: 12,
      borderWidth: 1,
      height: Platform.OS === 'ios' ? 70 : 70,
      width: Platform.OS === 'ios' ? '80%' : '80%',
      alignItems: 'center',
      justifyContent: 'center',
      marginTop: Platform.OS === 'ios' ? 240: 250,
      marginBottom: Platform.OS === 'ios' ? 20 : 20,
      alignSelf: 'center'
    },
    textContainer: {
        width: 300,
        height: 250,
        alignSelf: 'center',
        justifyContent: 'center',
        top: 70,
    },
    quoteText: {
      color: '#fff',
      fontSize: 18,
      textAlign: 'center',
      fontFamily: 'NotoSerif_400Regular',
      paddingBottom: 30,
      paddingVertical: 20
    },
    quoteAuthor: {
      color: '#fff',
      fontSize: 16,
      fontFamily: 'Poppins_700Bold',
      textAlign: 'center'
    }
  });

  const [isSharing, setIsSharing] = useState(false);
  const [dailyQuote, setDailyQuote] = useState(null);
  const captureViewRef = useRef(null);

  useEffect(() => {
    const fetchLatestDailyQuote = async () => {
      const dailyQuoteRef = collection(db, 'dailyQuote');
      const querySnapshot = await getDocs(dailyQuoteRef);
      const dailyQuoteData = querySnapshot.docs.find(
        (doc) => doc.data().isSet === "1"
      )

      if (dailyQuoteData) {
        setDailyQuote(dailyQuoteData.data());
      }
    };

    fetchLatestDailyQuote();
    
  }, []);

  const handleShare = async () => {
    setIsSharing(true);

    if (Platform.OS === 'android' && Platform.Version >= 23) {
      const granted = await PermissionsAndroid.request(
        PermissionsAndroid.PERMISSIONS.WRITE_EXTERNAL_STORAGE,
        {
          title: 'Storage Permission',
          message: 'This app needs access to your device storage to save screenshots.',
          buttonNeutral: 'Ask Me Later',
          buttonNegative: 'Cancel',
          buttonPositive: 'OK',
        }
      );
      if (granted !== PermissionsAndroid.RESULTS.GRANTED) {
        setIsSharing(false);
        console.log('Storage permission denied.');
        return;
      }
    }

    try {
      setIsSharing(true);
      const screenshotURI = await captureRef(captureViewRef, {
        format: 'jpg',
        quality: 1,
      });

      try {
        await Share.share({
          message: '',
          url: `file://${screenshotURI}`, 
        });
      } catch (error) {
        console.error('Error sharing screenshot:', error);
      }

      console.log('Screenshot captured:', screenshotURI);
    } catch (error) {
      console.error('Error capturing screenshot:', error);
    } finally {
      setIsSharing(false);
    }
  };

  return (
    <View style={styles.container} ref={captureViewRef}>
      {dailyQuote && (
        <>
          <Image source={{ uri: dailyQuote.url }} style={styles.backgroundImage} />
          <View style={styles.overlay} />
          <Image style={styles.image} source={require('@/assets/images/wlogo.png')} />
          <View style={styles.textContainer}>
            <Text style={styles.quoteText}>{dailyQuote.content}</Text>
            <Text style={styles.quoteAuthor}>{dailyQuote.author}</Text>
          </View>
        </>
      )}

      {!isSharing && (
        <TouchableOpacity activeOpacity={0.9} style={styles.card} onPress={handleShare}>
          <Text style={{ color: '#fff', fontFamily: 'Poppins_700Bold', fontSize: 15 }}>SHARE QUOTE</Text>
        </TouchableOpacity>
      )}

      {!isSharing && (
        <TouchableOpacity activeOpacity={0.9} style={{ alignSelf: 'center', marginBottom: 40 }} onPress={() => navigation.goBack()}>
          <Text style={{ color: Colors.textGrey, fontFamily: 'Poppins_500Medium', fontSize: 15 }}>TAP HERE TO GO BACK</Text>
        </TouchableOpacity>
      )}
    </View>
  );
};

export default DailyQuote;