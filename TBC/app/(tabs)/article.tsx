import React, { useEffect, useState } from 'react';
import {
  SafeAreaView,
  StyleSheet,
  Text,
  View,
  FlatList,
  Platform,
  Pressable,
} from 'react-native';
import CustomHeader from '@/components/CustomHeader';
import { useColorScheme } from 'react-native';
import { useNavigation, useTheme } from '@react-navigation/native';
import { Poppins_700Bold } from '@expo-google-fonts/poppins';
import { useFonts } from 'expo-font';
import { collection, getDocs } from 'firebase/firestore';
import { db, storage } from '@/config/firebaseConfig';
import SearchBar from '@/components/searchBar';
import { getDownloadURL, ref } from 'firebase/storage';

const ArticleScreen = () => {
  const navigation = useNavigation();
  const colorScheme = useColorScheme();
  const theme = useTheme();
  const isDarkMode = colorScheme === 'dark';

  const [fontsLoaded] = useFonts({
    Poppins_700Bold,
  });

  const [articles, setArticles] = useState([]);
  const [searchResults, setSearchResults] = useState([]);

  const handleSearch = (searchTerm) => {
    const articleResults = articles.filter((item) =>
      item.title.toLowerCase().includes(searchTerm.toLowerCase())
    );
    setSearchResults(articleResults);
  };

  useEffect(() => {
    const fetchArticles = async () => {
      try {
        const articlesRef = collection(db, 'article');
        const querySnapshot = await getDocs(articlesRef);

        const fetchedArticles = await Promise.all(
          querySnapshot.docs.map(async (doc) => {
            const downloadUrl = await getDownloadURL(ref(storage, doc.data().url));
            return {
              id: doc.id,
              title: doc.data().title,
              author: doc.data().author,
              pdfUrl: downloadUrl,
            };
          })
        );

        setArticles(fetchedArticles);
      } catch (error) {
        console.error('Error fetching articles:', error);
      }
    };

    fetchArticles();
  }, []);

  const Title = (props) => (
    <Text style={styles.title}>
      {props.children}
    </Text>
  );

  const styles = StyleSheet.create({
    title: {
      fontFamily: 'Poppins_700Bold',
      fontSize: 20,
      textTransform: 'uppercase',
      color: isDarkMode ? '#fff' : '#000',
    },

  });

  const navigateToArticleReader = (pdfUrl) => {
    navigation.navigate('(details)/articleDetail', { pdfUrl });
  };

  const renderItem = ({ item }) => (
    <Pressable
      style={({ pressed }) => [
        {
          opacity: pressed ? 0.6 : 1,
        },
        cardStyles.card,
      ]}
      onPress={() => navigateToArticleReader(item.pdfUri)}
    >
      <View style={cardStyles.title}>
        <Title>{item.title}</Title>
      </View>
    </Pressable>
  );

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
      marginBottom: 20,
      shadowColor: isDarkMode ? '#fff' : '#000',
      shadowOffset: { width: 0, height: 2 },
      shadowOpacity: 0.3,
      shadowRadius: 4,
      elevation: 5,
    },
    title: {
      alignSelf: 'flex-start',
      padding: 10,
    },
  });

  return (
    <SafeAreaView>
      <CustomHeader name="Article" />
      <View
        style={{ marginTop: Platform.OS === 'ios' ? 70 : 100, marginBottom: Platform.OS === 'ios' ? 240 : 260 }}
      >
        <SearchBar onSearch={handleSearch} />
        <View style={{ marginTop: Platform.OS === 'ios' ? 10 : 10 }}>
          <FlatList
            data={searchResults.length > 0 ? searchResults : articles}
            keyExtractor={(item) => item.id}
            renderItem={renderItem}
          />
        </View>
      </View>
    </SafeAreaView>
  );
};

export default ArticleScreen;
