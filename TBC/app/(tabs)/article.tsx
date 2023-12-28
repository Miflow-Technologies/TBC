import CustomHeader from '@/components/CustomHeader'
import * as Haptics from 'expo-haptics';
import { Image, SafeAreaView, ScrollView, StyleSheet, Text, View, FlatList, Platform, TouchableOpacity, TextInput } from 'react-native';
import React from 'react'
import { Ionicons } from '@expo/vector-icons';
import Colors from '@/constants/Colors';
import { useColorScheme } from 'react-native';
import { Link, useTheme } from '@react-navigation/native';
import { Poppins_500Medium, Poppins_700Bold, useFonts as usePoppinsFonts } from '@expo-google-fonts/poppins';

const ArticleScreen = () => {
  
  const [poppinsFontsLoaded] = usePoppinsFonts({
    Poppins_500Medium,
    Poppins_700Bold
  });
  const colorScheme = useColorScheme();
  const theme = useTheme();
  const isDarkMode = colorScheme === 'dark';
  if (!poppinsFontsLoaded) {
    return null
  }

  const Title = (props) => (
    <Text style={styles.title}>
      {props.children}
    </Text>
  );
  const Card = (props) => (
    <View style={cardStyles.card}>
      <View style={cardStyles.title}>
        <Title>{props.name}</Title>
      </View>
    </View>
  );

  const styles = StyleSheet.create({
    title: {
      fontFamily: 'Poppins_700Bold',
      fontSize: 20,
      textTransform: 'uppercase',
      color: isDarkMode ? '#fff' : '#000'
    },
    searchContainer: {
      height: 60,
    },
    searchSection: {
      flexDirection: 'row',
      gap: 10,
      flex: 1,
      paddingHorizontal: 20,
      alignItems: 'center',
    },
    searchField: {
      flex: 1,
      backgroundColor: isDarkMode ? Colors.textGrey : "#EEEBEB",
      borderRadius: 8,
      flexDirection: 'row',
      alignItems: 'center',
    },
    input: {
      padding: 10,
      color: isDarkMode  ? "#fff" : "#000" ,
    },
    searchIcon: {
      paddingLeft: 10,
    },
  })

  const cardStyles = StyleSheet.create({
    card: {
      backgroundColor: theme.colors.background,
      borderColor: isDarkMode ? '#000' : '#E7E3EB',
      borderRadius: 25,
      borderWidth: 1,
      height: Platform.OS === 'ios' ? 75 : 75,
      width: Platform.OS === 'ios' ? '90%' : '90%',
      padding: 12,
      marginHorizontal: 20,
      marginBottom: 10,
      shadowColor: isDarkMode ? '#fff' : '#000',
      shadowOffset: { width: 0, height: 2 },
      shadowOpacity: 0.3,
      shadowRadius: 4,  
      elevation: 5
    },
    title: {
      alignSelf: 'flex-start',
      padding: 10
    },
  });

  const SearchBar = () => (
    <View style={styles.searchContainer}>
      <View style={styles.searchSection}>
        <View style={styles.searchField}>
          <Ionicons style={styles.searchIcon} name="ios-search" size={20} color={Colors.medium} />
          <TextInput style={styles.input} placeholder="Search Article" />
        </View>
      </View>
    </View>
  );
  
  
  
  return (
    <SafeAreaView>
      <CustomHeader name='Article'/>
      <View style={{marginTop: Platform.OS === 'ios' ? 70: 100, marginBottom: Platform.OS === 'ios' ? 240 : 260}}>
        <SearchBar />
      
      <View style={{marginTop: Platform.OS === 'ios' ? 10 : 10,  }}>
          <FlatList 
              data={data.articles}
              renderItem={({item}) => <Card name={item.title} /> }
              keyExtractor={item => item.id.toString()}
            />
      </View>
      </View>
      
    </SafeAreaView>
  )
}


const data = {
  articles: [
    {
      id: "1",
      title: "Purposeful Boarding",
    },
    {
      id: "2",
      title: "Rise Up Israel",
    },
    {
      id: "4",
      title: "Shining Lights",
    },
    {
      id: "5",
      title: "A family of God",
    },
    {
      id: "6",
      title: "Hopeful Living",
    },
    {
      id: "7",
      title: "Overflow",
    },
    {
      id: "8",
      title:"Separation from the world",
    },
    {
      id: "9",
      title: "This is a sample article.",
    },
  ]
}
export default ArticleScreen