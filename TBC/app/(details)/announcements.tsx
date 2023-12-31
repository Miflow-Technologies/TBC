import { View, Text, StyleSheet, Platform, ScrollView, TouchableOpacity, Image, FlatList } from 'react-native'
import React from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'
import { Ionicons } from '@expo/vector-icons'
import Colors from '@/constants/Colors';
import { Poppins_500Medium, Poppins_700Bold } from '@expo-google-fonts/poppins';
import { NotoSerif_400Regular, NotoSerif_700Bold } from '@expo-google-fonts/noto-serif';
import { useFonts } from 'expo-font';
import { useColorScheme } from 'react-native';
import { useTheme } from '@react-navigation/native';
import { Link } from 'expo-router';
import { useNavigation } from '@react-navigation/native';

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


    const Header = () => {
        return (
            <View style={styles.header}>

                <Link href={'/(tabs)'}>
                    <Ionicons name="arrow-back-outline" size={25} color={isDarkMode ? '#fff' : '#000'} style={styles.icon} />
                </Link>
                <Text style={styles.headerText}>ANNOUNCEMENT</Text>
            </View>
            )
    }
    const Thumbnail = (props) => (
        <Image
          style={styles.thumbnail}
          source={{ uri: props.url }}
        />
      );
      
      const Heading = (props) => (
        <Text style={styles.heading}>
          {props.children}
        </Text>
      );
      
      const Title = (props) => (
        <Text style={styles.title}>
          {props.children}
        </Text>
      );

    const styles = StyleSheet.create({
        container:{
            flex:1,
            backgroundColor: theme.colors.background,
            justifyContent:"flex-start"
        },
        containerText: {
            fontFamily: 'NotoSerif_400Regular',
            fontSize: 15,
            padding: 10,
            color: isDarkMode ? "#fff" : Colors.textGrey
        },
        header : {
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
    })

    const AnnouncementCard = (props) => (
        <View style={[announceCardStyles.card]}>
          <Thumbnail url={props.thumbnail} />
          <View style={styles.overlay} />
          <View style={announceCardStyles.title}>
            <Title>{props.name}</Title>
          </View>
        </View>
      );

      const announceCardStyles = StyleSheet.create({
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
      });

      const AnnouncementPost = (props) => (
        <>
        <View style={announcePostStyles.layout}>
          <View style={announcePostStyles.content}>
            <Text style={announcePostStyles.description} numberOfLines={2}>{props.description}</Text>
            <Text style={announcePostStyles.timpestamp}>{props.timestamp}</Text>
          </View>
          <Image source={{ uri: props.image}} style={announcePostStyles.image} />
        </View>
        <View style={{ width: '80%', height: 1, backgroundColor: 'black', alignSelf: 'center', marginVertical: 10 }} /></>
      );

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
  return (
    <SafeAreaView style={styles.container}>
      <Header/>
      <FlatList horizontal style={{paddingHorizontal: 24}}
      data={data.cards}
      renderItem={({item}) => <AnnouncementCard name={item.name} thumbnail={item.thumbnail} /> }
      keyExtractor={item => item.id.toString()}

    />
    
    <Heading>Latest News</Heading>

    <FlatList
    style={{}}
      data={data.posts}
      renderItem={({item}) => <AnnouncementPost image={item.image}  description={item.description} timestamp={item.timestamp} />}
      keyExtractor={item => item.id.toString()}

    />

    </SafeAreaView>
  )
}

const data = {
    cards: [
      {
        id: 'woof-1', 
        name: 'Rex', 
        thumbnail: 'https://images.unsplash.com/photo-1558788353-f76d92427f16?auto=format&fit=crop&w=648&q=80',
        caretaker: 'Victor Grabarczyk',
        source: 'https://unsplash.com/photos/x5oPmHmY3kQ'
      },
      {
        id: 'woof-2', 
        name: 'Ball', 
        thumbnail: 'https://images.unsplash.com/photo-1585584114963-503344a119b0?auto=format&fit=crop&h=64&q=80',
        caretaker: 'Tatiana Rodriguez',
        source: 'https://unsplash.com/photos/J40C1k6Fut0',

      },
      {
        id: 'woof-3', 
        name: 'Happy', 
        thumbnail: 'https://images.unsplash.com/photo-1543466835-00a7907e9de1?auto=format&fit=crop&h=64&q=80',
        caretaker: 'Marliese Streefland',
        source: 'https://unsplash.com/photos/2l0CWTpcChI',
      },
      {
        id: 'woof-4',
        name: 'Fluffy',
        thumbnail: 'https://images.unsplash.com/photo-1554956615-1ba6dc39921b?auto=format&fit=crop&h=64&q=80',
        caretaker: 'Nick Fewings',
        source: 'https://unsplash.com/photos/rMKXLAIa2OY',
      },
      {
        id: 'woof-5',
        name: 'Spirit',
        thumbnail: 'https://images.unsplash.com/photo-1514984879728-be0aff75a6e8?auto=format&fit=crop&h=64&q=80',
        caretaker: 'Jamie Street',
        source: 'https://unsplash.com/photos/uNNCs5kL70Q',
      },
    ],
    posts: [
      {
        id: 'post-1',
        image: 'https://images.unsplash.com/photo-1544568100-847a948585b9?auto=format&fit=crop&w=967&q=80',
        title: 'Happy Woofs',
        description: 'How to keep your woof health and happy. We\'ve asked some of the best experts out there.',
        caretaker: 'Jamie Street',
        source: 'https://unsplash.com/photos/UtrE5DcgEyg',
        timestamp: '2m ago'
      },
      {
        id: 'post-2',
        image: 'https://images.unsplash.com/photo-1450778869180-41d0601e046e?auto=format&fit=crop&w=850&q=80',
        title: 'Woofs & friends',
        description: 'Best friends are important for humans, but also for dogs.',
        caretaker: 'Krista Mangulsone',
        source: 'https://unsplash.com/photos/9gz3wfHr65U',
        timestamp: '2m ago'
      },
      {
        id: 'post-3',
        image: 'https://images.unsplash.com/photo-1558947530-cbcf6e9aeeae?auto=format&fit=crop&w=634&q=80',
        title: 'Good Woofs',
        description: 'A good woof is a woof that brings joy. Here are a few tips to let your woof behave.',
        caretaker: 'Olia Nayda',
        source: 'https://unsplash.com/photos/f6v_Q0WXEK8',
        timestamp: '2m ago'
      },
      {
        id: 'post-4',
        image: 'https://images.unsplash.com/photo-1444212477490-ca407925329e?auto=format&fit=crop&w=1100&q=80',
        title: 'Wild Woofs',
        description: 'In some parts of the world, wild woofs are very common. Learn how to interact in a nice way.',
        caretaker: 'Anoir Chafik',
        source: 'https://unsplash.com/photos/2_3c4dIFYFU',
        timestamp: '2m ago'
      },
      {
        id: 'post-5',
        image: 'https://images.unsplash.com/photo-1567014543648-e4391c989aab?auto=format&fit=crop&w=1050&q=80',
        title: 'Sleepy Woofs',
        description: 'Sleeping is just as important for woofs as it is for humans. What are the main things your woof dreams about.',
        caretaker: 'Max Singh',
        source: 'https://unsplash.com/photos/2637Pic9xMw',
        timestamp: '2m ago'
      },
      {
        id: 'post-6',
        image: 'https://images.unsplash.com/photo-1524511751214-b0a384dd9afe?auto=format&fit=crop&w=967&q=80',
        title: 'Exploring Woofs',
        description: 'Just sitting in one place is boring for most woofs. How do woofs explore the world?',
        caretaker: 'Jamie Street',
        source: 'https://unsplash.com/photos/wcO2PWLuQ3U',
        timestamp: '2m ago'
      },
    ],
  };

export default announcements