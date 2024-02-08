import { SafeAreaView, ScrollView, StyleSheet, Text, View, FlatList, Platform, TouchableOpacity, Dimensions , Image, Pressable} from 'react-native';
import React, { useEffect, useState } from 'react';
import Colors from '@/constants/Colors';
import { useColorScheme } from 'react-native';
import { useNavigation, useTheme } from '@react-navigation/native';
import { Poppins_500Medium, Poppins_700Bold, } from '@expo-google-fonts/poppins';
import { NotoSerif_400Regular, NotoSerif_700Bold, } from '@expo-google-fonts/noto-serif';
import { useFonts } from 'expo-font';
import { Video } from 'expo-av';
import { Ionicons } from '@expo/vector-icons';
import { query, collection, getDocs, where, orderBy, limit } from 'firebase/firestore'; // Import query, where, orderBy, and limit
import { getDownloadURL, ref } from 'firebase/storage';
import { db, storage } from '@/config/firebaseConfig';
import { useAudioContext } from '../context/audio';

const Sermon = () => {

    const navigation = useNavigation()

    const [audioSermons, setAudioSermons] = useState([]);
    const [sermons, setSermons] = useState([]);
    const [excerpts, setExcerpts] = useState([]);
    const [inspirationals, setInspirationals] = useState([]);
    const { setSongs } = useAudioContext(); 

    const colorScheme = useColorScheme();
    const theme = useTheme();
    const isDarkMode = colorScheme === 'dark';

    const [fontsLoaded] = useFonts({
      Poppins_500Medium,
      Poppins_700Bold,
      NotoSerif_400Regular,
      NotoSerif_700Bold,
    });
  
    useEffect(() => {    
      const fetchLatestVideos = async (collectionName, setStateFunction) => {
        try {
          const videosRef = query(collection(db, collectionName), limit(5));
          const querySnapshot = await getDocs(videosRef);

        const fetchedLatestVideos = await Promise.all(
          querySnapshot.docs.map(async (doc) => {
            const downloadUrl = await getDownloadURL(ref(storage, doc.data().url));
            return {
              id: doc.id,
              title: doc.data().title,
              preacher: doc.data().preacher,
              series: doc.data().series,
              videoUrl: downloadUrl,
              isFeatured: doc.data().isFeatured
            };
          })
        );
      
          console.log(`LOG Fetched Latest Videos for ${collectionName}:`, fetchedLatestVideos);
      
          setStateFunction(fetchedLatestVideos);
        } catch (error) {
          console.error(`Error fetching latest ${collectionName}:`, error);
        }
      };

      const fetchAudioSermons = async () => {
        try {
          const audioSermonsQuery = query(collection(db, 'audioSermon'));
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
          setSongs(fetchedAudioSermons); // Update the list of songs
          console.log('Fetched Audio Sermons:', fetchedAudioSermons);
        } catch (error) {
          console.error('Error fetching audio sermons:', error);
        }
      };
      
      
    
    
      fetchAudioSermons()
      fetchLatestVideos('sermon', setSermons);
      fetchLatestVideos('excerpt', setExcerpts);
      fetchLatestVideos('inspirationals', setInspirationals);
    }, []);
    
  
  
    const Thumbnail = ( props ) => (
      <Image
        style={styles.mage}
        source={{ uri:props.imageUrl }}
      />
)
    
    const Ithumbnail = ({ videoUrl }) => (
      <Video
        style={styles.image}
        source={{
          uri: videoUrl,
        }}
        useNativeControls
        isLooping
        resizeMode='contain'
        onFullscreenUpdate={onFullscreenUpdate}
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

const Preacher = (props) => (
  <Text style={styles.preacher}>
    {props.children}
  </Text>
);

const Duration = (props) => (
  <Text style={styles.duration}>
    {props.children}.Min
  </Text>
);

const ExDuration = (props) => (
  <Text style={styles.duration}>
    {props.children}.Sec
  </Text>
);

const Series = (props) => (
  <Text style={styles.series}>
    {props.children}
  </Text>
);

const SeeMore = (route) => (
  <TouchableOpacity style={styles.seeMore} onPress={() => navigation.navigate(route)}>
    <Text style={{color: Colors.blue, fontFamily: 'Poppins_500Medium'}}>SEE MORE</Text>
    <Ionicons name="chevron-forward" size={20} color = {Colors.blue} />
  </TouchableOpacity>
);

const onFullscreenUpdate = async () => {
  if (Dimensions.get('window').height > Dimensions.get('window').width) {
    await ScreenOrientation.lockAsync(ScreenOrientation.OrientationLock.LANDSCAPE);
  } else {
    await ScreenOrientation.lockAsync(ScreenOrientation.OrientationLock.PORTRAIT);
  }
};

const styles = StyleSheet.create({
  thumbnail: {
    borderRadius: 8,
    height: 150,
    width: 270
  },
  video: {
    borderRadius: 8,
    height: 150,
    width: 225
  },
  image: {
    height: 262,
    width: 176
  },
  mage: {
    height: 170,
    width: 200
  },
  heading: {
    color: isDarkMode ? '#fff': Colors.textGrey,
    fontSize: 20,
    fontFamily: 'Poppins_700Bold',
    paddingTop: 20,
    paddingBottom: 12,
    paddingHorizontal: 24

  },
  title: {
    fontFamily: 'Poppins_700Bold',
    fontSize: 15,
    textTransform: 'uppercase',
    color: isDarkMode ? '#fff' : '#000'
  },
  preacher: {
    fontFamily: 'NotoSerif_400Regular',
    fontSize: 12,
    color: isDarkMode ? '#fff' : Colors.textGrey
  },
  duration: {
    fontFamily: 'NotoSerif_400Regular',
    fontSize: 10,
    color: isDarkMode ? '#fff' : Colors.textGrey,
    bottom: -10
  },
  series: {
    fontFamily: 'NotoSerif_400Regular',
    fontSize: 10,
    alignSelf: 'flex-end',
    bottom: 5,
    right: 10,
    color: isDarkMode ? '#fff' : Colors.textGrey,
  },
  seeMore: {
    alignSelf: "flex-end",
    flexDirection: "row",
    justifyContent: 'center',
    alignContent: 'center',
    marginBottom: 10,
    fontFamily: 'Poppins_500Medium'
    },
});

const FeaturedCard = (props) => (
  <View style={featuredCardStyles.card}>
    <Thumbnail videoUrl={props.videoUrl} />
    <View style={featuredCardStyles.title}>
      <Title>{props.name}</Title>
      <Preacher>{props.preacher}</Preacher>
      <Duration>{props.duration}</Duration>
      <Series>{props.series}</Series>
    </View>
  </View>
);

const featuredCardStyles = StyleSheet.create({
  card: {
    backgroundColor: theme.colors.background,
    height: Platform.OS === 'ios' ? 250 : 250,
    width: Platform.OS === 'ios' ? 300 : 300,
    padding: 12,
    marginRight: 16,
    marginBottom: 10,
    shadowColor: isDarkMode ? '#fff' : '#000',
  },
  title: {
    textAlign: 'flex-start',
    paddingTop: 10
  },
});



const SermonCard = (props) => (
  <View style={sermonCardStyles.card}>
    <Thumbnail imageUrl={props.imageUrl} />
    <View style={sermonCardStyles.title}>
      <Title>{props.name}</Title>
      <Preacher>{props.preacher}</Preacher>
    </View>
  </View>
);

const ExCard = (props) => (
  <View style={sermonCardStyles.card}>
  <Ithumbnail url={props.ithumbnail} />
  <View style={sermonCardStyles.title}>
    <Title>{props.name}</Title>
    <Preacher>{props.preacher}</Preacher>
    <ExDuration>{props.duration}</ExDuration>
    <Series>{props.series}</Series>
  </View>
</View>
);

const sermonCardStyles = StyleSheet.create({
  card: {
    backgroundColor: theme.colors.background,
    height: Platform.OS === 'ios' ? 252 : 252,
    width: Platform.OS === 'ios' ? 250 : 250,
    padding: 12,
    marginRight: 16,
    marginBottom: 10,
  },
  title: {
    textAlign: 'flex-start',
    paddingTop: 8,
  },
});

const ExcerptsCardStyles = StyleSheet.create({
  card: {
    height: Platform.OS === 'ios' ? 262 : 262,
    width: Platform.OS === 'ios' ? 176 : 176,
    marginRight: 16,
    marginBottom: 10,
  },
  title: {
    textAlign: 'flex-start',
    paddingTop: 8,
  },
});

  const { playSong } = useAudioContext();

  return (
    <SafeAreaView>
    <ScrollView style={{ top: Platform.OS === 'ios' ? 50 : 50, marginBottom: Platform.OS === 'ios' ? 50 : 130 }}>

      <View style={{ justifyContent: 'space-between', flexDirection: 'row', alignItems: 'center' }}>
        <Heading>Audio Sermon</Heading>
        <SeeMore route='(details)/audioList' />
      </View>
      <FlatList horizontal style={{ paddingHorizontal: 24 }}
        data={audioSermons}
        keyExtractor={item => item.id}
        renderItem={({ item }) => (
          <Pressable onPress={() => playSong(item)}>
          <View style={sermonCardStyles.card}>
            <Thumbnail imageUrl={item.imageUrl} />
            <View style={sermonCardStyles.title}>
              <Title>{item.title}</Title>
              <Preacher>{item.preacher}</Preacher>
            </View>
          </View>
          </Pressable>
        )}
      />

      <View style={{ justifyContent: 'space-between', flexDirection: 'row', alignItems: 'center' }}>
        <Heading>Excerpts</Heading>
        <SeeMore route='(details)/excerpts' />
      </View>
      <FlatList horizontal style={{ paddingHorizontal: 24 }}
        data={excerpts}
        renderItem={({ item }) => (
          <View style={ExcerptsCardStyles.card}>
            <Ithumbnail videoUrl={item.videoUrl} />
            <View style={sermonCardStyles.title}>
              <Title>{item.title}</Title>
              <Preacher>{item.preacher}</Preacher>
              <ExDuration>{item.duration}</ExDuration>
              <Series>{item.series}</Series>
            </View>
          </View>
        )}
        keyExtractor={item => item.id.toString()}
      />
    </ScrollView>
  </SafeAreaView>
);
}

export default Sermon