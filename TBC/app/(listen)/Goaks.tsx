
import Header from '@/components/Header'
import { SafeAreaView, StyleSheet, Text, View, FlatList, Platform, TouchableOpacity, Image, Pressable} from 'react-native';
import React, { useEffect, useState } from 'react';
import Colors from '@/constants/Colors';
import { useColorScheme } from 'react-native';
import { useTheme } from '@react-navigation/native';
import { Poppins_500Medium, Poppins_700Bold, } from '@expo-google-fonts/poppins';
import { NotoSerif_400Regular, NotoSerif_700Bold, } from '@expo-google-fonts/noto-serif';
import { useFonts } from 'expo-font';
import { query, collection, getDocs} from 'firebase/firestore'; 
import { getDownloadURL, ref } from 'firebase/storage';
import { db, storage } from '@/config/firebaseConfig';
import { useAudioContext } from '../context/audio';
import PlayerWidget from '@/components/playerWidget';
import SearchBar from '@/components/searchBar';


const Goaks = () => {
  const { setSongs, isPlaying, isPaused } = useAudioContext();

    const [audioSermons, setAudioSermons] = useState([]);;


    const colorScheme = useColorScheme();
    const theme = useTheme();
    const isDarkMode = colorScheme === 'dark';

    const [fontsLoaded] = useFonts({
      Poppins_500Medium,
      Poppins_700Bold,
      NotoSerif_400Regular,
      NotoSerif_700Bold,
    });

    useEffect( ()=> {
        const fetchAudioSermons = async () => {
            try {
              const audioSermonsQuery = query(collection(db, 'goaks'));
              const audioSermonsSnapshot = await getDocs(audioSermonsQuery);
          
              const fetchedAudioSermons = await Promise.all(
                audioSermonsSnapshot.docs.map(async (doc) => {
                  const audioDownloadUrl = await getDownloadURL(ref(storage, doc.data().audioUrl));
                  const imageDownloadUrl = await getDownloadURL(ref(storage, doc.data().imageUrl));
                  return {
                    id: doc.id,
                    title: doc.data().title,
                    preacher: doc.data().preacher,
                    series: doc.data().series,
                    audioUrl: audioDownloadUrl,
                    imageUrl: imageDownloadUrl,
                    isFeatured: doc.data().isFeatured,
                  };
                })
              );
          
              setAudioSermons(fetchedAudioSermons);
              setSongs(fetchedAudioSermons);
              console.log('Fetched Audio Sermons:', fetchedAudioSermons);
            } catch (error) {
              console.error('Error fetching audio sermons:', error);
            }
          };
          fetchAudioSermons()
          }, [] )

        
        const renderItem = ({ item }) => (
            <Pressable onPress={() => playSong(item)}>
                <View style={styles.queueItem}>
                    <Image style={styles.queueThumbnail} source={{ uri: item.imageUrl }} />
                    <View style={styles.queueDetails}>
                        <Text style={{color: isDarkMode ? '#fff' : '#000', fontFamily: 'Poppins_500Medium'}}>{item.title}</Text>
                        <Text style={{color: isDarkMode ? '#fff' : '#000'}}>{item.preacher}</Text>
                    </View>
                </View>
            </Pressable>
        );

  return (
    <SafeAreaView style={{flex: 1}}>
        <View style={{padding: 10}}>
            <FlatList style={{ paddingHorizontal: 24 }}
                data={audioSermons}
                keyExtractor={item => item.id}
                renderItem={renderItem}
            />
        </View>
        {isPlaying ? <PlayerWidget style={90}/> : isPaused ? <PlayerWidget style={10}/> : null}
    </SafeAreaView>
  )
}

const styles = StyleSheet.create({
    container: {
      flex: 1,
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
      width: 60,
      height: 60,
      borderRadius: 0,
    },
    queueDetails: {
      flex: 1,
      marginHorizontal: 6,
    },
  });

export default Goaks
