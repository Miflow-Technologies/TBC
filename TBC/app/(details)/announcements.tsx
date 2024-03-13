import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, Platform, ScrollView, TouchableOpacity, Image, FlatList, Pressable } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';
import Colors from '@/constants/Colors';
import { Poppins_500Medium, Poppins_700Bold } from '@expo-google-fonts/poppins';
import { NotoSerif_400Regular, NotoSerif_700Bold } from '@expo-google-fonts/noto-serif';
import { useFonts } from 'expo-font';
import { useColorScheme } from 'react-native';
import { useTheme } from '@react-navigation/native';
import { Link } from 'expo-router';
import { useNavigation } from '@react-navigation/native';
import { collection, getDocs, query } from 'firebase/firestore';
import { db, storage } from '@/config/firebaseConfig';
import { getDownloadURL, ref } from 'firebase/storage';

const announcements = () => {
  const navigation = useNavigation();
  const [fontsLoaded] = useFonts({
    Poppins_500Medium,
    Poppins_700Bold,
    NotoSerif_400Regular,
    NotoSerif_700Bold,
  });

  const colorScheme = useColorScheme();
  const theme = useTheme();
  const isDarkMode = colorScheme === 'dark';

  const [announcementPosts, setAnnouncementPosts] = useState([]);


  useEffect(() => {
    const fetchAnnouncements = async () => {
      try {
        const announcementsQuery = query(collection(db, 'announcement'))
        const announcementsSnapshot = await getDocs(announcementsQuery);

        const fetchedAnnouncements = await Promise.all(
          announcementsSnapshot.docs.map(async (doc) => {
            const imageDownloadUrl = await getDownloadURL(ref(storage, doc.data().url));
            return { 
              id: doc.id,
              title: doc.data().title,
              description: doc.data().description,
              url: imageDownloadUrl,
              createdAt: doc.data().createdAt
          }
        })
        )
        setAnnouncementPosts(fetchedAnnouncements);
        console.log('Fetched Announcements 432:', fetchedAnnouncements);
      } catch (error) {
        console.log('Error getting documents: ', error);
      }
    };
    fetchAnnouncements()
  }, []);

  const Header = () => {
    return (
      <View style={styles.header}>
        <Link href={'/(tabs)'}>
          <Ionicons name="arrow-back-outline" size={25} color={isDarkMode ? '#fff' : '#000'} style={styles.icon} />
        </Link>
        <Text style={styles.headerText}>ANNOUNCEMENT</Text>
      </View>
    );
  };


  const Heading = (props) => (
    <Text style={styles.heading}>
      {props.children}
    </Text>
  );

  {/*const Title = (props) => (
    <Text style={styles.title}>
      {props.children}
    </Text>
  );

  const Thumbnail = (props) => (
    <Image style={styles.thumbnail} source={{ uri: props.url }} />
  );*/}

  const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: theme.colors.background,
      justifyContent: "flex-start"
    },
    containerText: {
      fontFamily: 'NotoSerif_400Regular',
      fontSize: 15,
      padding: 10,
      color: isDarkMode ? "#fff" : Colors.textGrey
    },
    header: {
      top: 10,
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'flex-start',
      padding: 10,
      backgroundColor: theme.colors.background,
    },
    overlay: {
      ...StyleSheet.absoluteFillObject,
      borderRadius: 12,
      height: Platform.OS === 'ios' ? 250 : 250,
      width: Platform.OS === 'ios' ? 300 : 300,
      backgroundColor: 'linear-gradient(to top, rgba(0, 0, 0, 0.6) 0%, rgba(0, 0, 0, 0.2) 100%)',
    },
    icon: {
      marginRight: 10,
    },
    headerText: {
      alignSelf: 'center',
      fontSize: 15,
      fontFamily: 'NotoSerif_400Regular',
      color: isDarkMode ? "#fff" : Colors.textGrey,
      bottom: 22
    },
    thumbnail: {
      borderRadius: 12,
      height: Platform.OS === 'ios' ? 250 : 250,
      width: Platform.OS === 'ios' ? 300 : 300,
      padding: 12,
      marginRight: 16,
      marginBottom: 10,
      position: 'absolute',
    },
    heading: {
      color: isDarkMode ? '#fff' : Colors.secondary,
      fontSize: 20,
      fontWeight: '600',
      paddingTop: 20,
      paddingBottom: 12,
      paddingHorizontal: 24
    },
    title: {
      color: '#280D5F',
      fontSize: 12,
      fontWeight: '600',
      textTransform: 'uppercase'
    },
  });
  
  {/*const announceCardStyles = StyleSheet.create({
    card: {
      backgroundColor: theme.colors.background,
      borderColor: isDarkMode ? '#000' : '#E7E3EB',
      borderRadius: 12,
      height: Platform.OS === 'ios' ? 250 : 250,
      width: Platform.OS === 'ios' ? 300 : 300,
      padding: 12,
      marginRight: 16,
      marginBottom: 10,
      shadowColor: isDarkMode ? '#fff' : '#000',
      shadowOffset: { width: 0, height: 2 },
      shadowOpacity: 0.3,
      shadowRadius: 4,
      elevation: 5
    },
    title: {
      textAlign: 'center',
      paddingTop: 8
    },
  });*/}
  
  const announcePostStyles = StyleSheet.create({
    layout: {
      flexDirection: 'row',
      marginHorizontal: 24,
      marginVertical: 8,
    },
    image: {
      borderRadius: 12,
      flex: 1,
    },
    content: {
      flex: 2,
      padding: 12,
    },
    description: {
      color: isDarkMode ? "#fff" : '#000',
      fontSize: 15,
      paddingRight: 4,
      paddingVertical: 4,
      fontFamily: 'Poppins_500Medium'
    },
    timpestamp: {
      color: isDarkMode ? '#fff' : Colors.textGrey,
      fontSize: 10,
      fontFamily: 'NotoSerif_400Regular',
      bottom: -20
    }
  });


  const renderItem = ({ item }) => (
    <Pressable>
      <View style={announcePostStyles.layout}>
        <View style={announcePostStyles.content}>
          <Text style={announcePostStyles.description} numberOfLines={2}>{item.description}</Text>
          <Text style={announcePostStyles.timpestamp}>{item.createdAt}</Text>
        </View>
        <Image style={announcePostStyles.image} source={{uri: item.url}} />
      </View>
      <View style={{ width: '80%', height: 1, backgroundColor: 'black', alignSelf: 'center', marginVertical: 10 }} />
    </Pressable>
  )

  return (
    <SafeAreaView style={styles.container}>
      <Header />
      <Heading>Latest News</Heading>
      <FlatList
        style={{}}
        data={announcementPosts}
        keyExtractor={(item) => item.id}
        renderItem={renderItem}
      />
    </SafeAreaView>
  );
};



export default announcements;
