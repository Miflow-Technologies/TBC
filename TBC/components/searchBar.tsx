import React, { useState, useEffect } from 'react';
import { View, TextInput, StyleSheet, FlatList } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import Colors from '@/constants/Colors';
import { query, collection, where, getDocs } from 'firebase/firestore'; // Add necessary Firebase imports
import { db } from '@/config/firebaseConfig';

const SearchBar = ({ dbName, renderItem }) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [searchResults, setSearchResults] = useState([]);

  useEffect(() => {
    const handleSearch = async () => {
      if (!searchTerm) {
        setSearchResults([]); 
        return;
      }

      try {
        const q = query(collection(db, dbName), where('searchableField', '>=', searchTerm.toLowerCase()));
        const querySnapshot = await getDocs(q);
        const results = querySnapshot.docs.map(doc => ({ ...doc.data(), id: doc.id }));
        setSearchResults(results);
      } catch (error) {
        console.error("Error searching:", error);
      }
    };

    handleSearch();
  }, [searchTerm]);

  return (
    <View style={{ padding: 10 }}>
      <View style={styles.searchContainer}>
        <View style={styles.searchSection}>
          <View style={styles.searchField}>
            <Ionicons style={styles.searchIcon} name="ios-search" size={20} color={Colors.medium} />
            <TextInput
              style={styles.input}
              placeholder="Search"
              value={searchTerm}
              onChangeText={(text) => setSearchTerm(text)}
            />
          </View>
        </View>
      </View>
      <FlatList
        data={searchResults}
        renderItem={renderItem}
        keyExtractor={(item) => item.id}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  searchContainer: {
    height: 40,
    width: "100%"
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
    backgroundColor: Colors.textGrey, // Use your preferred background color
    borderRadius: 8,
    flexDirection: 'row',
    alignItems: 'center',
  },
  input: {
    flex: 1,
    padding: 10,
    color: '#fff',
  },
  searchIcon: {
    paddingLeft: 10,
  },
});

export default SearchBar;
