import { View, Text, SafeAreaView , StyleSheet, Platform , TouchableWithoutFeedback, LayoutChangeEvent } from 'react-native'
import React from 'react'
import CustomHeader from '@/components/CustomHeader'
import { useColorScheme } from 'react-native';
import { Poppins_500Medium, Poppins_700Bold, useFonts as usePoppinsFonts } from '@expo-google-fonts/poppins';
import { NotoSerif_400Regular, NotoSerif_700Bold, useFonts as useNotoFonts } from '@expo-google-fonts/noto-serif';
import { useTheme } from '@react-navigation/native';
import Colors from '@/constants/Colors';
import { ScrollView } from 'react-native-gesture-handler';


const Tbc = () => {
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

  if (!notoFontsLoaded) {
    return null
  }
  if (!poppinsFontsLoaded) {
    return null
  }

  return (
    <SafeAreaView>
      <CustomHeader name='TBC'/>
  
      <ScrollView style={{marginTop: 70,}}>
        <View style={styles.container}>
          <Text style={[styles.subtitle, {fontFamily: 'NotoSerif_400Regular',  color: isDarkMode ? '#fff' : Colors.textGrey }]}>WELCOME,</Text>
          <Text style={[styles.title, {fontFamily: 'Poppins_700Bold',  color: isDarkMode ? Colors.primary : '#000' }]}>Shining Lights</Text>
        </View>
        <View style={styles.cardContainer}>
          <View style ={[styles.cardExpanded, {backgroundColor: theme.colors.background, shadowColor: isDarkMode ? '#fff' : '#000'}]}>
            <View></View>
            <View></View>
          </View>
        </View>
        </ScrollView>
    </SafeAreaView>
    )
}

const styles = StyleSheet.create ({
  container: {
    marginTop: Platform.OS === 'ios' ? 10 : 35,
    paddingHorizontal: Platform.OS === 'ios' ? 20 : 25
  },
  title: {
    fontSize: 30
  },
  subtitle: {
    fontSize: 15
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
  cardExpanded: {
    height: 235,
    gap: 10,
    width: Platform.OS === 'ios' ? '98%' : '90%',
    borderRadius: 25,
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
    shadowOffset: { width: 0, height: 3 },
    shadowOpacity: 0.2,
    elevation: 5,
  },
})

export default Tbc