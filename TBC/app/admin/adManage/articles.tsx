import React, { useEffect, useState } from 'react';
import {
  SafeAreaView,
  StyleSheet,
  Text,
  View,
  FlatList,
  Platform,
  Pressable,
  Alert,
} from 'react-native';
import CustomHeader from '@/components/CustomHeader';
import { useColorScheme } from 'react-native';
import { useNavigation, useTheme } from '@react-navigation/native';
import Colors from '@/constants/Colors';
import { Poppins_700Bold } from '@expo-google-fonts/poppins';
import { useFonts } from 'expo-font';
import { collection, getDocs, deleteDoc, doc } from 'firebase/firestore';
import { db, storage } from '@/config/firebaseConfig';
import SearchBar from '@/components/searchBar';
import { getDownloadURL, ref } from 'firebase/storage';
import Header from '@/components/Header';

const ArticleManagementScreen = () => {
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
        const articlesRef = collection(db, 'articles');
        const querySnapshot = await getDocs(articlesRef);

        const fetchedArticles = await Promise.all(
          querySnapshot.docs.map(async (doc) => {
            const pdfDownloadUrl = await getDownloadURL(ref(storage, doc.data().pdfUrl));
            return {
              id: doc.id,
              title: doc.data().title,
              author: doc.data().author,
              pdfUrl: pdfDownloadUrl,
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

  const navigateToArticleReader = (pdfUrl) => {
    navigation.navigate('app/(details)/articleDetail', { pdfUrl });
  };

  const editArticle = (articleId) => {
    // Implement your logic for editing an article
    Alert.alert('Edit Article', `Editing article with ID: ${articleId}`);
  };

  const deleteArticle = async (articleId) => {
    try {
      // Ask for confirmation before deleting
      Alert.alert(
        'Confirm Deletion',
        'Are you sure you want to delete this article?',
        [
          {
            text: 'Cancel',
            style: 'cancel',
          },
          {
            text: 'Delete',
            onPress: async () => {
              await deleteDoc(doc(db, 'articles', articleId));
              // Refresh the articles list
              fetchArticles();
            },
          },
        ]
      );
    } catch (error) {
      console.error('Error deleting article:', error);
    }
  };

  const renderItem = ({ item }) => (
    <View style={cardStyles.card}>
      <Pressable
        style={({ pressed }) => [
          {
            opacity: pressed ? 0.6 : 1,
          },
          cardStyles.title,
        ]}
        onPress={() => navigateToArticleReader(item.pdfUrl)}
      >
        <Title>{item.title}</Title>
      </Pressable>
      <View style={cardStyles.actions}>
        <Pressable
          style={({ pressed }) => [
            {
              backgroundColor: pressed ? Colors.primary : theme.colors.background,
            },
            cardStyles.actionButton,
          ]}
          onPress={() => editArticle(item.id)}
        >
          <Text style={styles.actionButtonText}>Edit</Text>
        </Pressable>
        <Pressable
          style={({ pressed }) => [
            {
              backgroundColor: pressed ? Colors.error : theme.colors.background,
            },
            cardStyles.actionButton,
          ]}
          onPress={() => deleteArticle(item.id)}
        >
          <Text style={styles.actionButtonText}>Delete</Text>
        </Pressable>
      </View>
    </View>
  );

  const cardStyles = StyleSheet.create({
    card: {
      backgroundColor: theme.colors.background,
      borderColor: isDarkMode ? '#000' : '#E7E3EB',
      borderRadius: 25,
      borderWidth: 1,
      margin: 20,
      padding: 12,
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
    actions: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      marginTop: 10,
    },
    actionButton: {
      flex: 1,
      borderRadius: 8,
      paddingVertical: 8,
      margin: 5,
      alignItems: 'center',
      justifyContent: 'center',
    },
  });

  const styles = StyleSheet.create({
    title: {
      fontFamily: 'Poppins_700Bold',
      fontSize: 20,
      textTransform: 'uppercase',
      color: isDarkMode ? '#fff' : '#000',
    },
    actionButtonText: {
      color: '#fff',
    },
  });

  return (
    <SafeAreaView>
      <Header heading='Manage Articles'/>
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

export default ArticleManagementScreen;
