import { View, Text, Platform, SafeAreaView, TouchableOpacity, StyleSheet, Image } from 'react-native'
import React from 'react';
import { Poppins_500Medium, Poppins_700Bold, useFonts as usePoppinsFonts } from '@expo-google-fonts/poppins';
import { NotoSerif_400Regular, NotoSerif_700Bold, useFonts as useNotoFonts } from '@expo-google-fonts/noto-serif';



type titleProps = {
    name: string;
}

const CustomHeader = (props: titleProps) => {
    const [poppinsFontsLoaded] = usePoppinsFonts({
        Poppins_500Medium,
        Poppins_700Bold
    })
    const [notoFontsLoaded] = useNotoFonts({
        NotoSerif_400Regular,
        NotoSerif_700Bold
    })
  return (
    <SafeAreaView style={styles.safeArea}>
        <View style={styles.container}>
            <TouchableOpacity style={styles.logoContainer}>
                <Image style={styles.logo} source={require('@/assets/images/logo.png')} />
            </TouchableOpacity>
            <View style={styles.titleContainer}>
            <Text style={styles.title}>TBC</Text>
            </View>
            
            <TouchableOpacity></TouchableOpacity>
        </View>
    </SafeAreaView>
  )
}

const styles = StyleSheet.create({
    safeArea: {
        flex: 1,
    },
    container: {
        height: 60,
        backgroundColor: '#fff',
        gap: 10,
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        paddingHorizontal: 20,
        ...Platform.select({
            android: {
                marginTop: 40,
            }
        })
    },
    logoContainer: {
        backgroundColor: '#fff',
        padding: 5,
        borderRadius: 50,
        shadowColor: '#000',
        shadowOffset: {width: -2, height: 4},
        shadowOpacity: 0.3,
    },
    logo: {
        width: 30,
        height: 30,
    },
    titleContainer: {
        flex: 1,
    },
    title: {
        fontSize: 40,
        color: '#000',
        fontWeight: 'bold',
        fontFamily: 'Poppins_500Medium'
    },
    settingsButton: {
        backgroundColor: '#d3d3d3',
        padding: 10,
        borderRadius: 50,
    },
})

export default CustomHeader