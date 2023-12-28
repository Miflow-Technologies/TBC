import { Image, SafeAreaView, ScrollView, StyleSheet, Text, View, FlatList, Platform, TouchableOpacity } from 'react-native';
import React from 'react'
import { Ionicons } from '@expo/vector-icons';
import Colors from '@/constants/Colors';
import { useColorScheme } from 'react-native';
import { useTheme } from '@react-navigation/native';
import { Poppins_500Medium, Poppins_700Bold, useFonts as usePoppinsFonts } from '@expo-google-fonts/poppins';
import { NotoSerif_400Regular, NotoSerif_700Bold, useFonts as useNotoFonts } from '@expo-google-fonts/noto-serif';




const Goaks = () => {

  const [poppinsFontsLoaded] = usePoppinsFonts({
    Poppins_500Medium,
    Poppins_700Bold
  });
  const [notoFontsLoaded] = useNotoFonts({
      NotoSerif_400Regular,
      NotoSerif_700Bold
  });
  const colorScheme = useColorScheme();
  const theme = useTheme();
  const isDarkMode = colorScheme === 'dark';

  if (!notoFontsLoaded) {
    return null
  }
  if (!poppinsFontsLoaded) {
    return null
  }
  
const Thumbnail = (props) => (
  <Image
    style={styles.thumbnail}
    source={{ uri: props.url }}
  />
);

const Ithumbnail = (props) => (
  <Image
    style={styles.image}
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

const SeeMore = (props) => (
  <TouchableOpacity style={styles.seeMore} onPress={props.onPress}>
    <Text style={{color: Colors.blue, fontFamily: 'Poppins_500Medium'}}>SEE MORE</Text>
    <Ionicons name="chevron-forward" size={20} color = {Colors.blue} />
  </TouchableOpacity>
);

const styles = StyleSheet.create({
  thumbnail: {
    borderRadius: 8,
    height: 150,
    width: 270
  },
  image: {
    borderRadius: 8,
    height: 150,
    width: 225
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
    <Thumbnail url={props.thumbnail} />
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
    borderColor: isDarkMode ? '#000' : '#E7E3EB',
    borderRadius: 12,
    borderWidth: 1,
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
    textAlign: 'flex-start',
    paddingTop: 10
  },
});



const SermonCard = (props) => (
  <View style={sermonCardStyles.card}>
  <Ithumbnail url={props.ithumbnail} />
  <View style={sermonCardStyles.title}>
    <Title>{props.name}</Title>
    <Preacher>{props.preacher}</Preacher>
    <Duration>{props.duration}</Duration>
    <Series>{props.series}</Series>
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
    borderColor: isDarkMode ? '#000' : '#E7E3EB',
    borderRadius: 12,
    borderWidth: 1,
    height: Platform.OS === 'ios' ? 252 : 252,
    width: Platform.OS === 'ios' ? 252 : 252,
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
    textAlign: 'flex-start',
    paddingTop: 8,
  },
});

  return (
    <SafeAreaView>
      <ScrollView style={{top: Platform.OS === 'ios' ? 50 : 50, marginBottom: Platform.OS === 'ios' ? 50 : 130}}>
        <Heading>Featured</Heading>
        <FlatList horizontal style={{paddingHorizontal: 24}}
          data={data.featured}
          renderItem={({item}) => <FeaturedCard name={item.title} thumbnail={item.thumbnail} preacher={item.preacher} duration={item.duration} series={item.series} /> }
          keyExtractor={item => item.id.toString()}
        />


        <View style={{justifyContent: 'space-between', flexDirection: 'row', alignItems: 'center'}}>
          <Heading>Sunday</Heading>
          <SeeMore />
        </View>
        <FlatList horizontal style={{paddingHorizontal: 24}}
          data={data.sermons}
          renderItem={({item}) => <SermonCard ithumbnail={item.ithumbnail} name={item.title} preacher={item.preacher} duration={item.duration} />}
          keyExtractor={item => item.id.toString()}
        />

        <View style={{justifyContent: 'space-between', flexDirection: 'row', alignItems: 'center'}}>
          <Heading>Special</Heading>
          <SeeMore />
        </View>
        <FlatList horizontal style={{paddingHorizontal: 24}}
          data={data.sermons}
          renderItem={({item}) => <ExCard ithumbnail={item.ithumbnail} name={item.title} preacher={item.preacher} duration={item.duration} />}
          keyExtractor={item => item.id.toString()}
        />

        <View style={{justifyContent: 'space-between', flexDirection: 'row', alignItems: 'center'}}>
          <Heading>Solo</Heading>
          <SeeMore />
        </View>
        <FlatList horizontal style={{paddingHorizontal: 24}}
          data={data.sermons}
          renderItem={({item}) => <ExCard ithumbnail={item.ithumbnail} name={item.title} preacher={item.preacher} duration={item.duration} />}
          keyExtractor={item => item.id.toString()}
        />
      </ScrollView>
</SafeAreaView>
);
}





const data = {
  featured: [
  {
    id: 'f-1',
    title: 'Risen King',
    duration: 48,
    preacher: 'Pastor Jimi Olopade',
    series: '',
    thumbnail: 'https://images.unsplash.com/photo-1609234680415-f10a17c1fa72?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D'
  },
  {
    id: 'f-2',
    title: 'Foreshadowing Grace',
    duration: 52,
    preacher: 'Pastor Jimi Olopade',
    series: 'LoveSeries',
    thumbnail: 'https://images.unsplash.com/photo-1587143987442-ae0cc2508c31?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D'
  },
  {
    id: 'f-3',
    title: 'Seeds of Divinty',
    duration: 30,
    preacher: 'Pastor Jimi Olopade',
    series: '',
    thumbnail: 'https://images.unsplash.com/photo-1542296120-cd8d3eb196d5?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D'
  },
],
sermons: [
  {
    id: 's-1',
    title: 'Risen King',
    duration: 48,
    preacher: 'Pastor Jimi Olopade',
    ithumbnail: 'https://images.unsplash.com/photo-1609234680415-f10a17c1fa72?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D'                                                                                                                  

  },
  {
    id: 's-2',
    title: 'Christ-like Living',
    duration: 36,
    preacher: 'Pastor Tomi Olopade',
    ithumbnail: 'https://images.unsplash.com/photo-1580974019294-f399db0e992b?q=80&w=2069&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D'

  },
  {
    id: 's-3',
    title: 'Rock of Judah',
    duration: 67,
    preacher: 'Pastor Victor Adisa',
    ithumbnail: 'https://images.unsplash.com/photo-1602025745825-28c7044dabcd?q=80&w=1932&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D'

  },
  {
    id: 's-4',
    title: 'Rise and Shine',
    duration: 33,
    preacher: 'Minister Erin Oguntoyibo',
    ithumbnail: 'https://images.unsplash.com/photo-1602026084040-78e6134b2661?q=80&w=1932&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D'
  }, 
],
  excerpts: [
    {
      id: 'e-1',
      title: 'Risen King',
      duration: 34,
      preacher: 'Pastor Jimi Olopade',
      ithumbnail: 'https://images.unsplash.com/photo-1609234680415-f10a17c1fa72?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D'                                                                                                                  
  
    },
    {
      id: 'e-2',
      title: 'Christ-like Living',
      duration: 120,
      preacher: 'Pastor Tomi Olopade',
      ithumbnail: 'https://images.unsplash.com/photo-1580974019294-f399db0e992b?q=80&w=2069&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D'
  
    },
    {
      id: 'e-3',
      title: 'Rock of Judah',
      duration: 114,
      preacher: 'Pastor Victor Adisa',
      ithumbnail: 'https://images.unsplash.com/photo-1602025745825-28c7044dabcd?q=80&w=1932&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D'
  
    },
    {
      id: 'e-4',
      title: 'Rise and Shine',
      duration: 30,
      preacher: 'Minister Erin Oguntoyibo',
      ithumbnail: 'https://images.unsplash.com/photo-1602026084040-78e6134b2661?q=80&w=1932&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D'
    }, 
  ],
    inspirational: [
      {
        id: 'i-1',
        title: 'Risen King',
        duration: 30,
        preacher: 'Pastor Jimi Olopade',
        ithumbnail: 'https://images.unsplash.com/photo-1609234680415-f10a17c1fa72?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D'                                                                                                                  
    
      },
      {
        id: 'i-2',
        title: 'Christ-like Living',
        duration: 15,
        preacher: 'Pastor Tomi Olopade',
        ithumbnail: 'https://images.unsplash.com/photo-1580974019294-f399db0e992b?q=80&w=2069&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D'
    
      },
      {
        id: 'i-3',
        title: 'Rock of Judah',
        duration: 27,
        preacher: 'Pastor Victor Adisa',
        ithumbnail: 'https://images.unsplash.com/photo-1602025745825-28c7044dabcd?q=80&w=1932&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D'
    
      },
      {
        id: 'i-4',
        title: 'Rise and Shine',
        duration: 120,
        preacher: 'Minister Erin Oguntoyibo',
        ithumbnail: 'https://images.unsplash.com/photo-1602026084040-78e6134b2661?q=80&w=1932&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D'
      },
]
}

export default Goaks