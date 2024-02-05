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
import { Ionicons } from '@expo/vector-icons';
import Checkbox from 'expo-checkbox';
import { useColorScheme } from 'react-native';
import { CommonActions, useTheme } from '@react-navigation/native';
import {  browserLocalPersistence, browserSessionPersistence, createUserWithEmailAndPassword, initializeAuth } from 'firebase/auth';
import { app, auth, db } from '@/config/firebaseConfig';  
import {  doc, setDoc } from 'firebase/firestore'; // Add this line for Firestore
import { useContext, useState } from 'react';
import Colors from '@/constants/Colors';
import Button from '@/components/Button';
import { useNavigation } from '@react-navigation/native';
import { Link } from 'expo-router';
import { AuthContext } from '../context/Auth';
  
  
  const Signup = () => {
    const navigation = useNavigation();
    const { isAuthenticated, setAuthenticated } = useContext(AuthContext);

  
    const [isPasswordShown, setIsPasswordShown] = useState(false);
    const [isChecked, setIsChecked] = useState(false);
  
    const colorScheme = useColorScheme();
    const theme = useTheme();
    const isDarkMode = colorScheme === 'dark';
  
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [valid, setValid] = useState(true);
    const { currentUser } = useContext(AuthContext);
  
    const handleRegister = async () => {
        if (valid && isChecked && password === confirmPassword) {
          try {
            const { user } = await createUserWithEmailAndPassword(auth, email, password);
    
            const userInfo = {
              UserEmail: email,
              isUser: '1',
            };
    
            await setDoc(doc(db, 'Users', user.uid), userInfo);
    
            setAuthenticated(true);
            Alert.alert('Account Created');
    
            navigation.navigate('(tabs)');
        
          } catch (error) {
            console.error(error);
            Alert.alert('Failed to create account');
          }
        } else {
          Alert.alert('Passwords do not match');
        }
      };
  
    const checkField = (value: string) => {
      setValid(value.trim() !== '');
    };

    
    
    return (
        <SafeAreaView style={{ flex: 1, backgroundColor: isDarkMode ? '#000' : '#fff' }}>
            <View style={{ flex: 1, marginHorizontal: 22 }}>
                <View style={{ marginVertical: 22 }}>
                    <Text style={{
                        fontSize: 22,
                        fontWeight: 'bold',
                        marginVertical: 12,
                        color: isDarkMode ? '#fff' : '#000'
                    }}>
                        Create Account
                    </Text>

                    <Text style={{
                        fontSize: 16,
                        color: isDarkMode ? '#fff' : '#000'
                    }}>Worship with Us</Text>
                </View>

                <View style={{ marginBottom: 12 }}>
                    <Text style={{
                        fontSize: 16,
                        fontWeight: 400,
                        marginVertical: 8,
                        color: isDarkMode ? '#fff' : '#000'
                    }}>Email address</Text>

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
                            placeholder='Enter your email address'
                            onBlur={() => checkField(email)}
                            onChangeText = {text => setEmail(text)}
                            placeholderTextColor={isDarkMode ? '#fff' : Colors.textGrey}
                            keyboardType='email-address'
                            style={{
                                width: "100%",
                                color: isDarkMode ? '#fff' : '#000'
                            }}
                        />
                    </View>
                </View>

                <View style={{ marginBottom: 12 }}>
                    <Text style={{
                        fontSize: 16,
                        fontWeight: 400,
                        marginVertical: 8,
                        color: isDarkMode ? '#fff' : '#000'
                    }}>Password</Text>

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
                            placeholder='Enter your password'
                            onBlur={() => checkField(password)}
                            onChangeText = {text => setPassword(text)}
                            placeholderTextColor={isDarkMode ? '#fff' : Colors.textGrey}
                            secureTextEntry={isPasswordShown}
                            style={{
                                width: "100%",
                                color: isDarkMode ? '#fff' : '#000'
                            }}
                        />

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
                    }}>Confirm Password</Text>

                    <View style={{
                        width: "100%",
                        height: 48,
                        borderColor: valid && password == confirmPassword ? (isDarkMode ? '#fff' :'#000') : 'red',
                        borderWidth: 1,
                        borderRadius: 8,
                        alignItems: "center",
                        justifyContent: "center",
                        paddingLeft: 22
                    }}>
                        <TextInput
                            placeholder='Confirm your password'
                            onBlur={() => checkField(confirmPassword)}
                            onChangeText = {text => setConfirmPassword(text)}
                            placeholderTextColor={isDarkMode ? '#fff' : Colors.textGrey}
                            secureTextEntry={isPasswordShown}
                            style={{
                                width: "100%"
                            }}
                        />

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

                <View style={{
                    flexDirection: 'row',
                    marginVertical: 6
                }}>
                    <Checkbox
                        style={{ marginRight: 8 }}
                        value={isChecked}
                        onValueChange={setIsChecked}
                        color={isChecked ? Colors.primary : undefined}
                    />
                    <Text style={{color: isDarkMode ? '#fff' : '#000'}}>I agree to the <Link href=''>terms and conditions</Link></Text>
                </View>

                <Button
                    title="Sign Up"
                    filled
                    style={{
                        marginTop: 18,
                        marginBottom: 4,
                    }}
                    onPress = {() => handleRegister()}
                />

                <View style={{ flexDirection: 'row', alignItems: 'center', marginVertical: 20 }}>
                    <View
                        style={{
                            flex: 1,
                            height: 1,
                            backgroundColor: isDarkMode ? '#fff' : Colors.textGrey,
                            marginHorizontal: 10
                        }}
                    />
                    <Text style={{ fontSize: 14 }}>Or Sign up with</Text>
                    <View
                        style={{
                            flex: 1,
                            height: 1,
                            backgroundColor: isDarkMode ? '#fff' : Colors.textGrey,
                            marginHorizontal: 10
                        }}
                    />
                </View>

                <View style={{
                    flexDirection: 'row',
                    justifyContent: 'center'
                }}>
                    <TouchableOpacity
                        onPress={() => console.log("Pressed")}
                        style={{
                            flex: 1,
                            alignItems: 'center',
                            justifyContent: 'center',
                            flexDirection: 'row',
                            height: 52,
                            borderWidth: 1,
                            borderColor: isDarkMode ? '#fff' : Colors.textGrey,
                            marginRight: 4,
                            borderRadius: 10
                        }}
                    >
                        <Image
                            source={require("@/assets/images/facebook.png")}
                            style={{
                                height: 36,
                                width: 36,
                                marginRight: 8
                            }}
                            resizeMode='contain'
                        />

                        <Text style={{color: isDarkMode ? '#fff' : '#000'}}>Facebook</Text>
                    </TouchableOpacity>

                    <TouchableOpacity
                        onPress={() => console.log("Pressed")}
                        style={{
                            flex: 1,
                            alignItems: 'center',
                            justifyContent: 'center',
                            flexDirection: 'row',
                            height: 52,
                            borderWidth: 1,
                            borderColor: isDarkMode ? '#fff' : Colors.textGrey,
                            marginRight: 4,
                            borderRadius: 10
                        }}
                    >
                        <Image
                            source={require("@/assets/images/google.png")}
                            style={{
                                height: 36,
                                width: 36,
                                marginRight: 8
                            }}
                            resizeMode='contain'
                        />

                        <Text style={{color: isDarkMode ? '#fff' : '#000'}}>Google</Text>
                    </TouchableOpacity>
                </View>

                <View style={{
                    flexDirection: "row",
                    justifyContent: "center",
                    marginVertical: 22
                }}>
                    <Text style={{ fontSize: 16, color: isDarkMode ? '#fff' : '#000' }}>Already have an account</Text>
                    <Pressable
                        onPress={() => navigation.navigate("auth/login")}
                    >
                        <Text style={{
                            fontSize: 16,
                            color: Colors.primary,
                            fontWeight: "bold",
                            marginLeft: 6
                        }}>Login</Text>
                    </Pressable>
                </View>
            </View>
        </SafeAreaView>
    )
}

export default Signup