import React, { useContext } from 'react';
import { View, Text, Platform, SafeAreaView, TouchableOpacity, StyleSheet, Image } from 'react-native';
import { DarkTheme, DefaultTheme, ThemeProvider, useNavigation, useTheme } from '@react-navigation/native';
import { useColorScheme } from 'react-native';
import { Poppins_500Medium, Poppins_700Bold, useFonts as usePoppinsFonts } from '@expo-google-fonts/poppins';
import { NotoSerif_400Regular, NotoSerif_700Bold, useFonts as useNotoFonts } from '@expo-google-fonts/noto-serif';
import { Ionicons } from '@expo/vector-icons';
import { Link } from 'expo-router';
import { AuthContext } from '@/app/context/Auth';


type titleProps = {
    name: string;
}

const CustomHeader = (props: titleProps) => {

    const navigation = useNavigation()

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
    const logoSource = isDarkMode ? require('@/assets/images/light-logo.png') : require('@/assets/images/dark-logo.png');

    if (!notoFontsLoaded) {
        return null
    }
    if (!poppinsFontsLoaded) {
        return null
    }

    const {isAdmin, currentUser} = useContext(AuthContext)

    const handleProfileNavigation = () => {
        if (currentUser && isAdmin) {
            navigation.navigate('admin/adminPanel');
        } else {
            navigation.navigate('utils/profile');
        }
    }

    return (
        <ThemeProvider value={isDarkMode ? DarkTheme : DefaultTheme}>
            <SafeAreaView style={[styles.safeArea, { backgroundColor: theme.colors.background }]}>
                <View style={[styles.container, { backgroundColor: theme.colors.background }]}>
                    <TouchableOpacity style={[styles.logoContainer, { shadowColor: isDarkMode ? '#fff' : '#000' }, { backgroundColor: theme.colors.background }]} onPress={() => navigation.navigate('(tabs)')}>
                        <Image style={styles.logo} source={logoSource} />
                    </TouchableOpacity>
                    <View style={styles.titleContainer}>
                        <Text style={[styles.title, { color: isDarkMode ? '#fff' : '#000' }]}>{ props.name }</Text>
                    </View>
                    <View>
                        <TouchableOpacity style={[styles.profileButton, {backgroundColor: theme.colors.background}]} onPress={() => handleProfileNavigation()}>
                            <Ionicons name="person-outline" size={25} color={theme.colors.text} />
                        </TouchableOpacity>
                    </View>
                    <Link href={'utils/settings'} asChild>
                        <TouchableOpacity style={styles.settingsButton}>
                        <Ionicons name="options-outline" size={25} color={theme.colors.text} />
                        </TouchableOpacity>
                    </Link>
                </View>
            </SafeAreaView>
        </ThemeProvider>
    );
}

const styles = StyleSheet.create({
    safeArea: {
        flex: 1,
    },
    container: {
        height: Platform.OS === 'ios' ? 60 : 70,
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
        padding:Platform.OS === 'ios' ? 3 : 2,
        borderRadius: 50,
        shadowOffset: { width: -2, height: 4 },
        shadowOpacity: 0.3,
        elevation: 3
    },
    logo: {
        width: 30,
        height: 30,
    },
    titleContainer: {
        flex: 1,
    },
    title: {
        fontSize: 35,
        fontWeight: 'bold',
        fontFamily: 'Poppins_500Medium',
    },
    profileButton: {
        padding: 5,
        borderRadius: 50,
    },
    settingsButton: {
        padding: 10,
        borderRadius: 50,
    },
});

export default CustomHeader;
