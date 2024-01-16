import { View, Text, TouchableOpacity, StyleSheet, useColorScheme } from 'react-native'
import React from 'react'
import { Ionicons } from '@expo/vector-icons'
import { useNavigation, useTheme } from '@react-navigation/native'
import { Poppins_500Medium, Poppins_700Bold, useFonts } from '@expo-google-fonts/poppins';
import { NotoSerif_400Regular, NotoSerif_700Bold } from '@expo-google-fonts/noto-serif';
import Colors from '@/constants/Colors';

const Header = ({heading}) => {
    const navigation = useNavigation()


    const [fontsLoaded] = useFonts({
        Poppins_500Medium,
        Poppins_700Bold,
        NotoSerif_400Regular,
        NotoSerif_700Bold,
      });                 
  
      const colorScheme = useColorScheme();
      const theme = useTheme();
      const isDarkMode = colorScheme === 'dark';


    const styles = StyleSheet.create({
        header : {
            top: 10,
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'flex-start',
            padding: 10,
            backgroundColor: isDarkMode ? '#000' : '#fff',
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
    })
    return (
        <View style={styles.header}>
            <TouchableOpacity onPress={()=>navigation.goBack()}>
                <Ionicons name="arrow-back-outline" size={25} color={isDarkMode ? '#fff' : '#000'} style={styles.icon} />
              </TouchableOpacity>
            <Text style={styles.headerText}>{heading}</Text>
        </View>
        )
}

export default Header