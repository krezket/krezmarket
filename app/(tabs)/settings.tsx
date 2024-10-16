import React, { useContext, useEffect, useState } from 'react'
import { Alert, View, Text, Button, Pressable, StyleSheet, Image, useColorScheme } from 'react-native'
import AsyncStorage from '@react-native-async-storage/async-storage'
import { Colors } from '@/constants/Colors';

import { AuthContext } from '@/context/AuthContext';

export default function Profile({ navigation })  {
    const theme = useColorScheme() ?? 'light';
    const [userId, setUserId] = useState<string>('');  
    const {logout} = useContext(AuthContext) as any;

    useEffect(() => {
        const loadId = async () => {
            const id = await AsyncStorage.getItem('id');
            setUserId(id);
            try {
                const data = await API.getProfile(id);
                setUsername(data.username);
                setFullName(data.fullName);
                setBio(data.bio);
                setSubscriptions(data.subscriptions);
                setBasket(data.basket);
            } catch (error) {
                console.log('Error loading user:', error);
            }
        };
        loadId();
    }, []);

    const logOut = async () => {  
        try { 
            await AsyncStorage.removeItem('token'); console.log('Logged out');
            logout();
        } 
        catch (error) {
            console.log('Error logging out:', error);
        }
    }
    const logOutModal = () => {
        Alert.alert(
            "Confirm",
            "Are you sure you want to log out?",
            [
                {
                    text: "No",
                    style: "cancel",
                },
                {
                    text: "Yes",
                    onPress: () => logOut(),
                },
            ]
        );
    }

    useEffect(() => {
        navigation.setOptions({ name: "bruh"}) 
    }, [])

    const dynamicStyles = StyleSheet.create({
        userInfo: {
            flexDirection: "column",
            justifyContent: "space-between",
            height: "100%",
            paddingLeft: 20,
            paddingRight: 20,
            gap: 20,
            backgroundColor: theme === 'light' ? Colors.light.background : Colors.dark.background,
        },
    });

    return (
        <View style={dynamicStyles.userInfo}>

            <View style={styles.bottom}>
                <View style={styles.button}>
                    <Button title="Log Out" onPress={() => logOutModal()} />
                </View>
            </View>

        </View>
    )
}
const styles = StyleSheet.create({
    bottom: {
        flexDirection: "column",
        justifyContent: "space-between",
        height: "30%",
    },
    names: {
        flexDirection: "column",
        paddingLeft: "20px",
        gap: 20,
    },
    info: {
        flexDirection: "column",
        justifyContent: "center",
        paddingRight: "20px",
    },
    button: {
        alignItems: "center",
    },
    buttonCon: {
        gap: 10,
    },
})


