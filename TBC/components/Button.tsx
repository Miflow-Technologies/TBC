import { Text, TouchableOpacity, StyleSheet } from 'react-native'
import React from 'react'
import Colors from '../constants/Colors'
import { useColorScheme } from 'react-native';
import { useTheme } from '@react-navigation/native';


const Button = (props) => {


    const colorScheme = useColorScheme();
    const theme = useTheme();
     const isDarkMode = colorScheme === 'dark';


    const filledBgColor = props.color || Colors.primary;
    const outlinedColor = '#fff';
    const bgColor = props.filled ? filledBgColor : outlinedColor;
    const textColor = props.filled ? '#fff' : Colors.primary;

    return (
        <TouchableOpacity
            style={{
                ...styles.button,
                ...{ backgroundColor: bgColor,  },
                ...props.style
            }}
            onPress={props.onPress}
        >
            <Text style={{ fontSize: 18, ... { color: textColor,} }}>{props.title}</Text>
        </TouchableOpacity>
    )
}

const styles = StyleSheet.create({
    button: {
        paddingBottom: 16,
        paddingVertical: 10,
        borderColor: Colors.primary,
        borderWidth: 2,
        borderRadius: 12,
        alignItems: 'center',
        justifyContent: 'center'
    }
})
export default Button