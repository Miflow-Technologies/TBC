import React, { useState } from 'react';
import { View, TextInput, StyleSheet } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import Colors from '@/constants/Colors';

const SearchBar = ({ onSearch }) => {
  const [searchTerm, setSearchTerm] = useState('');

  const handleSearch = () => {
    // Call the onSearch prop with the search term
    onSearch(searchTerm);
  };

  return (
    <View style={styles.searchContainer}>
      <View style={styles.searchSection}>
        <View style={styles.searchField}>
          <Ionicons style={styles.searchIcon} name="ios-search" size={20} color={Colors.medium} />
          <TextInput
            style={styles.input}
            placeholder="Search"
            value={searchTerm}
            onChangeText={(text) => setSearchTerm(text)}
            onSubmitEditing={handleSearch}
          />
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
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
    backgroundColor: Colors.textGrey, // Use your preferred background color
    borderRadius: 8,
    flexDirection: 'row',
    alignItems: 'center',
  },
  input: {
    flex: 1,
    padding: 10,
    color: '#fff', // Adjust text color according to your theme
  },
  searchIcon: {
    paddingLeft: 10,
  },
});

export default SearchBar;
