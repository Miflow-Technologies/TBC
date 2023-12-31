import {
    View,
    Text,
    Platform,
    StyleSheet,
    SafeAreaView,
    ScrollView,
    ViewComponent,
  } from "react-native";
  import React from "react";
  import { Ionicons } from "@expo/vector-icons";
  import { Link } from "expo-router";
  import Colors from "@/constants/Colors";
  import { Poppins_500Medium, Poppins_700Bold } from "@expo-google-fonts/poppins";
  import {
    NotoSerif_400Regular,
    NotoSerif_700Bold,
  } from "@expo-google-fonts/noto-serif";
  import { useFonts } from "expo-font";
  import { useColorScheme } from "react-native";
  import { useTheme } from "@react-navigation/native";

const articleDetail = () => {
    const [fontsLoaded] = useFonts({
        Poppins_500Medium,
        Poppins_700Bold,
        NotoSerif_400Regular,
        NotoSerif_700Bold,
      });
    
      const colorScheme = useColorScheme();
      const theme = useTheme();
      const isDarkMode = colorScheme === "dark";
    
      const styles = StyleSheet.create({
        container: {
          backgroundColor: theme.colors.background,
          justifyContent: "center",
          top: 1,
          bottom: 20
        },
        content: {
          width: '90%',
          alignSelf:'center',
        },
        containerText: {
          fontSize: 15,
          padding: 5,
          color: isDarkMode ? "#fff" : Colors.textGrey,
          textAlign: 'justify',
          lineHeight: Platform.OS === 'ios' ? 30 : 40
          },
        header: {
          display: "flex",
          justifyContent: "center",
          alignItems: "flex-start",
          paddingTop: 50,
          paddingLeft: 10,
          backgroundColor: theme.colors.background,
          shadowOffset: { width: 0, height: 2 },
          shadowOpacity: 0.1,
          shadowColor: isDarkMode ? "#fff" : "#000",
          elevation: 3,
        },
        icon: {
          marginRight: 10,
        },
        headerText: {
          alignSelf: "center",
          fontSize: 15,
          fontFamily: "NotoSerif_400Regular",
          color: isDarkMode ? "#fff" : Colors.textGrey,
          bottom: 22,
        },
      });
    
      const Header = ({ passage }) => {
        return (
          <View style={styles.header}>
            <Link href={"/(tabs)"}>
              <Ionicons
                name="arrow-back-outline"
                size={25}
                color={isDarkMode ? "#fff" : "#000"}
                style={styles.icon}
              />
            </Link>
            <Text style={styles.headerText}>{passage}</Text>
          </View>
        );
      };
      const Content = ({ title, content }) => {
        return (
          <View style={styles.content }>
            <ScrollView style={{top: 10, marginBottom: 250}}>
            <Text style={{textAlign: 'center',fontFamily: 'Poppins_500Medium', fontSize: 17, paddingVertical: 20}}>{title}</Text>
              <Text style={styles.containerText}>{content}</Text>
            </ScrollView>
          </View>
        );
      }
  return (
    <View>
      <Header passage="Luke 4:12" />
      <View style={styles.container}>
      <Content
        title="Walking with God"
        content="Lorem ipsum dolor sit, amet consectetur adipisicing elit. Eius laudantium neque rem autem quas facere ratione distinctio tempora adipisci vitae suscipit, natus beatae nam tenetur recusandae voluptate quaerat dolore quasi hic nesciunt optio praesentium! 
        Architecto, blanditiis laboriosam, nihil magni adipisci nostrum quidem amet corrupti ratione voluptates similique impedit nesciunt sequi, numquam labore quaerat incidunt voluptas eos. 
        Iure explicabo nam corporis at iusto mollitia perspiciatis necessitatibus ipsam quisquam sit, labore vitae doloribus. Eveniet voluptas atque explicabo hic iure officiis quibusdam dignissimos pariatur consequatur, nam earum distinctio eius voluptate similique. 
        
        Alias nemo, doloribus itaque voluptatibus praesentium accusamus ratione libero consequuntur nisi quasi minus ullam officiis enim assumenda impedit nihil? Ex assumenda provident dolor omnis dicta beatae animi alias ea eligendi amet aspernatur ipsum optio voluptatum autem dignissimos, iure adipisci, vel odit. 
        Veniam nobis molestiae soluta eligendi! Alias, perferendis consequuntur dicta odio facilis dolorum ducimus quam sed optio neque praesentium nisi cupiditate libero ratione repellendus maxime obcaecati temporibus nihil vitae iusto molestias fuga nesciunt vel. Eum expedita quos minima doloribus dicta ipsam tempore ea autem labore. Deleniti adipisci nobis consectetur. Quis voluptate voluptas quas, placeat iusto quam libero tenetur nulla sed dolores numquam est optio reprehenderit iste reiciendis eligendi? Recusandae sapiente quo quia?"
      />
      <View style={{top: 20}}></View>
      </View>
    </View>
  )
}

export default articleDetail