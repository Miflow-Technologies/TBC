import { View, Text, StyleSheet, ScrollView, useColorScheme, Platform } from 'react-native'
import React from 'react'
import { Poppins_500Medium, Poppins_700Bold, useFonts as usePoppinsFonts } from '@expo-google-fonts/poppins';
import { NotoSerif_400Regular, NotoSerif_700Bold, useFonts as useNotoFonts } from '@expo-google-fonts/noto-serif';
import { DarkTheme, DefaultTheme, ThemeProvider, useTheme } from '@react-navigation/native';
import { SafeAreaView } from 'react-native-safe-area-context';
import Colors from '@/constants/Colors';
import * as Haptics from 'expo-haptics';
import { Ionicons } from '@expo/vector-icons';





const Settings = () => {

    const colorScheme = useColorScheme();
    const theme = useTheme();
    const isDarkMode = colorScheme === 'dark';


    const [poppinsFontsLoaded] = usePoppinsFonts({
        Poppins_500Medium,
        Poppins_700Bold
    });
    const [notoFontsLoaded] = useNotoFonts({
        NotoSerif_400Regular,
        NotoSerif_700Bold
    });

    if (!notoFontsLoaded) {
        return null
    }
    if (!poppinsFontsLoaded) {
        return null
    }

    const Card = ({
        title,
        icon,
        screen,
    }) => {
        return (
        <View style={styles.cardContainer}>
            <View style={[styles.cards, {shadowColor: isDarkMode ? '#fff' : '#000'}]}>
                <Ionicons 
                    name={icon}
                    size={20}
                    color={isDarkMode  ? '#fff': '#000'}/>
                <Text style={styles.cardText}>{title}</Text>
            </View>
        </View>
        )
    }
  
  return (
    <ThemeProvider value={isDarkMode ? DarkTheme : DefaultTheme}>

                <ScrollView style={[{marginTop: 15, } , styles.container]}>
             

                        <Text style={styles.subtitle}>Personal Settings</Text>
                        <Card title='Dark mode' icon='moon-outline' screen='(modal)/filter'/>

                        <Text style={styles.subtitle}>About</Text>

                        <Text style={styles.subtitle}>Get in Touch</Text>

                    <View style={{alignItems: 'center', justifyContent: 'center'}}>
                        <Text style={[styles.subtitle , { color: isDarkMode ? '#fff' : Colors.textGrey}]}>VERSION 1.0.0</Text>
                    </View>
                    
                </ScrollView>
    </ThemeProvider>
  )


}
const styles = StyleSheet.create({
    container: {
        margin: Platform.OS === 'ios' ? 20 : 10
    },
    cardContainer: {
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        gap: 10,
        margin: Platform.OS === 'ios' ? 20 : 10,
      },
    cards: {
        height: 75,
        width: Platform.OS === 'ios' ? '98%' : '98%',
        borderRadius: 12,
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        shadowOffset: {width: 0 ,height: 3},
        shadowOpacity: .4,
        elevation: 3,

    },
    cardText: {
        fontSize: 17,
        fontFamily: 'Poppins_500Medium'
    },
    title: {
        fontFamily: 'NotoSerif_400Regular',
        fontSize: 15
    },
    subtitle: {
        fontFamily: 'NotoSerif_400Regular',
        fontSize: 12
    }, 
})

export default Settings

