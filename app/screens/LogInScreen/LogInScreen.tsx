import React, { useContext, useRef, useState } from 'react'
import { Animated, View, Text, Button, TextInput, Pressable, StyleSheet, ScrollView, Dimensions, useColorScheme } from 'react-native'
import API from '../../../utils/API';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Colors } from '@/constants/Colors';

import { AuthContext } from '@/context/AuthContext';

const { width: screenWidth } = Dimensions.get('window');

export default function LogInScreen() {
    const theme = useColorScheme() ?? 'light';
    console.log(theme)
    const {login} = useContext(AuthContext) as any;

    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");

    const scrollViewRef = useRef<ScrollView>(null);
    const viewWidth = screenWidth;

    const moveToNext = (page: number) => {
        if (scrollViewRef.current) {
            scrollViewRef.current.scrollTo({ x: viewWidth * page, animated: true });
        }
    };

    const moveToPrevious = (page: number) => {
        if (scrollViewRef.current) {
            scrollViewRef.current.scrollTo({ x: screenWidth * page, animated: true });
        }
    };

    const handleUsername = () => {
        setUsername(username.replace(/\s/g, ''));
        if (username === "") {
            alert("Username is empty");
        } else {
            moveToNext(1);
        }
    };

    const handlePassword = async () => {
        if (password === "") {
            alert("Password is empty");
        } else {
            try {
                const data = await API.login({ username, password });
                if (!data.token) {
                    alert("Invalid username or password");
                    return;
                }
                const id = JSON.stringify(data.user.id);
                await AsyncStorage.setItem('id', id);
                login(data.token);
            } catch (err) {
                console.log(err);
                alert("An error occurred while logging in");
            }
        }
    };

    const handlePasswordCheck = () => {
        if (password.includes(" ")) {
            setPassword(password.replace(/\s/g, ''));
        }
    }

    const dynamicStyles = StyleSheet.create({
        container: {
            alignItems: 'flex-start',
            paddingTop: 150,
            backgroundColor: theme === 'light' ? Colors.light.background : Colors.dark.background,
        },
        button : {
            backgroundColor: theme === 'light' ? Colors.light.background : Colors.dark.background,
        },
        buttonText: {
            color: theme === 'light' ? Colors.light.text : Colors.dark.text,
        },
        logo: {
            source: theme === 'light' ? Colors.dark.logo : Colors.light.logo,
        },
        input: {
            borderTopColor: 'transparent',
            borderRightColor: 'transparent',
            borderLeftColor: 'transparent',
            borderBottomColor: theme === 'light' ? Colors.dark.background : Colors.light.background,
            backgroundColor: 'white',
            color: Colors.dark.background, 
            height: 40,
            width: screenWidth - 100,
            margin: 12,
            borderWidth: 1,
            padding: 10,
        },
    });

    return (
        <ScrollView horizontal={true} scrollEnabled={false} contentContainerStyle={dynamicStyles.container} ref={scrollViewRef} >

                <Animated.View style={styles.animatedView}>
                    <View style={styles.inputContainer}>

                        <Text style={dynamicStyles.buttonText}>Enter your username</Text>
                        <TextInput style={dynamicStyles.input} placeholder="Username" onChangeText={(text) => setUsername(text)} />

                        <View style={styles.buttonContainer}>
                            <Button title="Next" onPress={handleUsername} />
                        </View>
                    </View>
                </Animated.View>

                <Animated.View style={styles.animatedView}>
                    <View style={styles.inputContainer}>

                        <Text style={dynamicStyles.buttonText}>Enter your password</Text>
                        <TextInput secureTextEntry={true} style={dynamicStyles.input} placeholder="Password" onChangeText={(text) => setPassword(text)} returnKeyType='go' autoCorrect={false} />

                        <View style={styles.buttonContainer}>
                            <Button title="Back" onPress={() => moveToPrevious(0)} />
                            <Button title="Log In" onPress={handlePassword} />
                        </View>
                    </View>
                </Animated.View>

            </ScrollView>
    )
};

const styles = StyleSheet.create({
    animatedView: {
        width: screenWidth,
        alignItems: 'center',
    },
    inputContainer: {
        alignItems: 'flex-start',
    },
    buttonContainer: {
        flexDirection: 'row',
        gap: 200,
    },
    input: {
        borderTopColor: 'transparent',
        borderRightColor: 'transparent',
        borderLeftColor: 'transparent',
        height: 40,
        width: screenWidth - 100,
        margin: 12,
        borderWidth: 1,
        padding: 10,
    },
});
