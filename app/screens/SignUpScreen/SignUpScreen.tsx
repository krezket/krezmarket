import { Animated, View, Text, Button, TextInput, StyleSheet, ScrollView, Dimensions, useColorScheme } from 'react-native'
import React, { useContext, useRef, useState } from 'react'
import { emailCheck, passwordCheck } from '../../../utils/index';
import API from '../../../utils/API';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { AuthContext } from '@/context/AuthContext';
import { Colors } from '@/constants/Colors';

const { width: screenWidth } = Dimensions.get('window');


export default function SignUpEmail() {
    const theme = useColorScheme() ?? 'light';
    console.log(theme)
    const {login} = useContext(AuthContext) as any;

    const [email, setEmail] = useState("");
    const [fullName, setFullName] = useState("");
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

    const handleEmail = () => {
        if (email === "") {
            alert("Email is empty");
        }
        else if (!emailCheck(email)) {
            alert("Email is invalid");
        }
        else {
            moveToNext(1);
        }
    };

    const handleFullName = () => {
        if (fullName === "") {
            console.log("Full name is empty");
        } else {
            moveToNext(2);
        }
    };

    const handleUsername = () => {
        if (username === "") {
            console.log("Username is empty");
        } else {
            moveToNext(3);
        }
    };

    const handlePassword = async () => {
        if (password === "") {
            alert("Password is empty");
        } 
        else if (!passwordCheck(password)) {
            alert("Password is invalid");
        }
        else {
            try {
                const data = await
            API.signup({
                email: email,
                fullName: fullName,
                username: username,
                password: password
            })
                const id = JSON.stringify(data.user.id);
                await AsyncStorage.setItem('id', id);
                login(data.token);
            } catch (err) {
                console.log(err);
                alert("An error occurred while signing up");
            }
        }
    };

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
            color: theme === 'light' ? Colors.dark.logo : Colors.light.logo,
        },
        input: {
            borderTopColor: 'transparent',
            borderRightColor: 'transparent',
            borderLeftColor: 'transparent',
            borderBottomColor: theme === 'light' ? Colors.dark.background : Colors.light.background,
            color: theme === 'light' ? Colors.dark.background : Colors.light.background,
            height: 40,
            width: screenWidth - 100,
            margin: 12,
            borderWidth: 1,
            padding: 10,
        },
    });

    return (
        <ScrollView
            horizontal={true}
            scrollEnabled={false}
            ref={scrollViewRef}
            contentContainerStyle={dynamicStyles.container}
        >
                <Animated.View style={styles.animatedView}>
                    <View style={styles.inputContainer}>
                
                        <Text style={dynamicStyles.buttonText}>Enter your email</Text>
                        <TextInput style={dynamicStyles.input} placeholder="Email" onChangeText={(text) => setEmail(text)} />

                        <Button title="Next" onPress={handleEmail} />
                    </View>
                </Animated.View>

                <Animated.View style={styles.animatedView}>
                    <View style={styles.inputContainer}>

                        <Text style={dynamicStyles.buttonText}>Enter your full name</Text>
                        <TextInput style={dynamicStyles.input} placeholder="Full Name" onChangeText={(text) => setFullName(text)} />

                        <View style={styles.buttonContainer}>
                            <Button title="Back" onPress={() => moveToPrevious(0)} />
                            <Button title="Next" onPress={handleFullName} />
                        </View>
                    </View>
                </Animated.View>

                <Animated.View style={styles.animatedView}>
                    <View style={styles.inputContainer}>

                        <Text style={dynamicStyles.buttonText}>Create a username</Text>
                        <TextInput style={dynamicStyles.input} placeholder="Username" onChangeText={(text) => setUsername(text)} />

                        <View style={styles.buttonContainer}>
                            <Button title="Back" onPress={() => moveToPrevious(1)} />
                            <Button title="Next" onPress={handleUsername} />
                        </View>
                    </View>
                </Animated.View>

                <Animated.View style={styles.animatedView}>
                    <View style={styles.inputContainer}>

                        <Text style={dynamicStyles.buttonText}>Create a password</Text>
                        <TextInput secureTextEntry={true} style={dynamicStyles.input} placeholder="Password" onChangeText={(text) => setPassword(text)} returnKeyType='go' autoCorrect={false} />

                        <View style={styles.buttonContainer}>
                            <Button title="Back" onPress={() => moveToPrevious(2)} />
                            <Button title="Next" onPress={handlePassword} />
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
        gap: 30,
    },
});
