import { View, Text, StyleSheet, ScrollView, useColorScheme, Platform } from 'react-native'
import React from 'react'
import { Poppins_500Medium, Poppins_700Bold, useFonts as usePoppinsFonts } from '@expo-google-fonts/poppins';
import { NotoSerif_400Regular, NotoSerif_700Bold, useFonts as useNotoFonts } from '@expo-google-fonts/noto-serif';
import { DarkTheme, DefaultTheme, ThemeProvider, useTheme } from '@react-navigation/native';
import { SafeAreaView } from 'react-native-safe-area-context';
import Colors from '@/constants/Colors';
import * as Haptics from 'expo-haptics';





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
  
  return (
    <ThemeProvider value={isDarkMode ? DarkTheme : DefaultTheme}>

                <ScrollView style={{marginTop: 10,}}>
                    <View style={styles.container}>

                        <Text style={styles.subtitle}>Personal Settings</Text>
                        <View style={styles.cardContainer}>
                            <View style={styles.cards}></View>
                            <View style={styles.cards}></View>
                            <View style={styles.cards}></View>
                        </View>

                        <Text style={styles.subtitle}>About</Text>

                        <View style={styles.cardContainer}>
                            <View style={styles.cards}></View>
                            <View style={styles.cards}></View>
                            <View style={styles.cards}></View>
                            <View style={styles.cards}></View>
                        </View>

                        <Text style={styles.subtitle}>Get in Touch</Text>
                        <View style={styles.cardContainer}>
                            <View style={styles.cards}></View>
                            <View style={styles.cards}></View>
                        </View>
                    </View>
                    <View style={{alignItems: 'center', justifyContent: 'center'}}>
                        <Text style={[styles.subtitle , { color: isDarkMode ? '#fff' : Colors.textGrey}]}>VERSION 1.0.0</Text>
                    </View>
                    
                </ScrollView>
    </ThemeProvider>
  )
}
const styles = StyleSheet.create({
    container: {
        padding: Platform.OS === 'ios' ? 20 : 10
    },
    cardContainer: {
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "space-between",
        padding: Platform.OS === 'ios' ? 20 : 10
    },
    cards: {
        height: 75,
        gap: 10,
        width: Platform.OS === 'ios' ? '98%' : '98%',
        borderRadius: 25,
        flexDirection: 'row',
        justifyContent: 'space-around',
        alignItems: 'center',
        shadowOffset: { width: -2, height: 4 },
        shadowOpacity: 0.3,
        elevation: 5,
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

