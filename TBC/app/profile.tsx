import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  Image,
  Pressable,
  Alert,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import Checkbox from 'expo-checkbox';
import { useColorScheme } from 'react-native';
import { CommonActions, useTheme } from '@react-navigation/native';
import {  EmailAuthProvider, browserLocalPersistence, browserSessionPersistence, createUserWithEmailAndPassword, initializeAuth, updatePassword } from 'firebase/auth';
import { app, auth, db } from '@/config/firebaseConfig';  
import {  doc, setDoc } from 'firebase/firestore'; // Add this line for Firestore
import { useContext, useState } from 'react';
import Colors from '@/constants/Colors';
import { useNavigation } from '@react-navigation/native';
import Header from '@/components/Header'
import { FontAwesome5, Ionicons } from '@expo/vector-icons'
import Button from '@/components/Button'
import { AuthContext } from './auth/Auth';



const profile = () => {
    const navigation = useNavigation();
    const { isAuthenticated, setAuthenticated } = useContext(AuthContext)

    const [isPasswordShown, setIsPasswordShown] = useState(false);
    const [isChecked, setIsChecked] = useState(false);
  
    const colorScheme = useColorScheme();
    const theme = useTheme();
    const isDarkMode = colorScheme === 'dark';
  
    const [email, setEmail] = useState('');
    const [oldPassword, setOldPassword] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [valid, setValid] = useState(true);

    const checkField = (value: string) => {
        setValid(value.trim() !== '');
      };
  

    const handleLogout = () => {
        setAuthenticated(false);
        navigation.navigate('(tabs)'); // Replace with your login screen route
      };

      const handleChangePassword = async () => {
        try {
          // Assuming you have the user's new password stored in the 'newPassword' variable
          const newPassword = "user's new password";
      
          // Re-authenticate the user if needed (e.g., if their session has expired)
          // You may need to obtain the user's current password or use another re-authentication method
          // Uncomment the following lines and replace them with your re-authentication logic
          // const credentials = EmailAuthProvider.credential(email, oldPassword);
          // await auth.currentUser.reauthenticateWithCredential(credentials);
      
          // Update the user's password
          await updatePassword(auth.currentUser, newPassword);
      
          // Handle success
          console.log('Password changed successfully!');
          
          navigation.navigate('auth/login'); // Replace with your login screen route
        } catch (error) {
          // Handle errors
          console.error('Failed to change password', error.message);
          Alert.alert('Password Change Failed', error.message);
        }
      };

    const renderAuthenticatedContent = () => (
    <View>
      <Header heading='Profile'/>
      <View style={{padding: 12}}>
        <View style={{alignItems: 'center', gap: 20}}>
          <FontAwesome5 name="user-circle" size={70} color={isDarkMode ? '#fff' : '2e2e2e'} />
          <Text style={{marginBottom: 10, color: isDarkMode ? '#fff' : Colors.textGrey}}>{email}</Text>
        </View>

        <View style={{ marginBottom: 12 }}>
                    <Text style={{
                        fontSize: 16,
                        fontWeight: 400,
                        marginVertical: 8,
                        color: isDarkMode ? '#fff' : '#000'
                    }}>Old Password</Text>

                    <View style={{
                        width: "100%",
                        height: 48,
                        borderColor: valid  ? (isDarkMode ? '#fff' :'#000') : 'red',
                        borderWidth: 1,
                        borderRadius: 8,
                        alignItems: "center",
                        justifyContent: "center",
                        paddingLeft: 22
                    }}>
                        <TextInput
                            placeholder='Enter your old Password'
                            onBlur={() => checkField(password)}
                            onChangeText = {text => setOldPassword(text)}
                            placeholderTextColor={isDarkMode ? '#fff' : Colors.textGrey}
                            secureTextEntry={isPasswordShown}
                            style={{
                                width: "100%",
                                color: isDarkMode ? '#fff' : '#000'
                            }}/>
                            
                            <TouchableOpacity
                            onPress={() => setIsPasswordShown(!isPasswordShown)}
                            style={{
                                position: "absolute", 
                                right: 12
                            }}
                        >
                            {
                                isPasswordShown == true ? (
                                    <Ionicons name="eye-off" size={24} color={isDarkMode ? '#fff' : '#000'} />
                                ) : (
                                    <Ionicons name="eye" size={24} color={isDarkMode ? '#fff' : '#000'} />
                                )
                            }

                        </TouchableOpacity>
                    </View>
                </View>

                <View style={{ marginBottom: 12 }}>
                    <Text style={{
                        fontSize: 16,
                        fontWeight: 400,
                        marginVertical: 8,
                        color: isDarkMode ? '#fff' : '#000'
                    }}>New Password</Text>

                    <View style={{
                        width: "100%",
                        height: 48,
                        borderColor: valid  ? (isDarkMode ? '#fff' :'#000') : 'red',
                        borderWidth: 1,
                        borderRadius: 8,
                        alignItems: "center",
                        justifyContent: "center",
                        paddingLeft: 22
                    }}>
                        <TextInput
                            placeholder='Enter your new password'
                            onBlur={() => checkField(password)}
                            onChangeText = {text => setPassword(text)}
                            placeholderTextColor={isDarkMode ? '#fff' : Colors.textGrey}
                            secureTextEntry={isPasswordShown}
                            style={{
                                width: "100%",
                                color: isDarkMode ? '#fff' : '#000'
                            }}/>
                            
                            <TouchableOpacity
                            onPress={() => setIsPasswordShown(!isPasswordShown)}
                            style={{
                                position: "absolute", 
                                right: 12
                            }}
                        >
                            {
                                isPasswordShown == true ? (
                                    <Ionicons name="eye-off" size={24} color={isDarkMode ? '#fff' : '#000'} />
                                ) : (
                                    <Ionicons name="eye" size={24} color={isDarkMode ? '#fff' : '#000'} />
                                )
                            }

                        </TouchableOpacity>
                    </View>
                </View>

                <View style={{ marginBottom: 12 }}>
                    <Text style={{
                        fontSize: 16,
                        fontWeight: 400,
                        marginVertical: 8,
                        color: isDarkMode ? '#fff' : '#000'
                    }}>Confirm New Password</Text>

                    <View style={{
                        width: "100%",
                        height: 48,
                        borderColor: valid  ? (isDarkMode ? '#fff' :'#000') : 'red',
                        borderWidth: 1,
                        borderRadius: 8,
                        alignItems: "center",
                        justifyContent: "center",
                        paddingLeft: 22
                    }}>
                        <TextInput
                            placeholder='Confirm your new password'
                            onBlur={() => checkField(password)}
                            onChangeText = {text => setConfirmPassword(text)}
                            placeholderTextColor={isDarkMode ? '#fff' : Colors.textGrey}
                            secureTextEntry={isPasswordShown}
                            style={{
                                width: "100%",
                                color: isDarkMode ? '#fff' : '#000'
                            }}/>
                            
                            <TouchableOpacity
                            onPress={() => setIsPasswordShown(!isPasswordShown)}
                            style={{
                                position: "absolute", 
                                right: 12
                            }}
                        >
                            {
                                isPasswordShown == true ? (
                                    <Ionicons name="eye-off" size={24} color={isDarkMode ? '#fff' : '#000'} />
                                ) : (
                                    <Ionicons name="eye" size={24} color={isDarkMode ? '#fff' : '#000'} />
                                )
                            }

                        </TouchableOpacity>
                    </View>
                </View>

                <Button
                    title="Change Password"
                    style={{
                        marginTop: 18,
                        marginBottom: 4,
                    }}
                  onPress={() => handleChangePassword()}
                />

                <Button
                    title="LOGOUT"
                    filled
                    style={{
                        marginTop: 100,
                        marginBottom: 4,
                    }}
                  onPress={() => handleLogout()}
                />
      </View>
    </View>
      );

      const renderUnauthenticatedContent = () => (
        // Render the content that should be displayed when not authenticated
        <View>
          <Header heading="Profile" />
          <View style={{ padding: 12 }}>
          <View style={{ alignItems: 'center', gap: 20 }}>
            <FontAwesome5 name="user-circle" size={70} color={isDarkMode ? '#fff' : '2e2e2e'} />
            <Text style={{ marginBottom: 10, color: isDarkMode ? '#fff' : Colors.textGrey }}>{email}</Text>
          </View>
    
          <Button
            title="LOGIN"
            filled
            onPress={() => navigation.navigate('auth/login')} // Replace with your login screen route
            style={{
              marginTop: 18,
              marginBottom: 4,
            }}
          />
          </View>
        </View>
      );
   
      return (
        <View>
          {isAuthenticated ? renderAuthenticatedContent() : renderUnauthenticatedContent()}
        </View>
      );
    };

export default profile