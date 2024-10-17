import React, { useContext, useEffect, useState } from 'react'
import { Alert, StyleSheet, Button, Text, View } from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useNavigation } from "@react-navigation/native";
import { AuthContext } from "@/context/AuthContext";

import { ThemedText } from '@/components/ThemedText';

import API from "@/utils/API";

export default function Index({ navigation }) {
    const [userId, setUserId] = useState<string>('');  
    const [username, setUsername] = useState<string>('');
    const [fullName, setFullName] = useState<string>('');
    const [bio, setBio] = useState<string>('');
    const [subscriptions, setSubscriptions] = useState([]);
    const [basket, setBasket] = useState([]);
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

    return (
        <View style={styles.profileCon}>

            <View style={styles.button}>
                <Button title="Settings" onPress={() => {navigation.navigate('settings' as never)}} />
            </View>

                <View style={styles.name}>
                    <ThemedText>{username}</ThemedText>
                    <ThemedText>{fullName}</ThemedText>
                </View>

                <View style={styles.bio}>
                    <ThemedText>{bio}</ThemedText>
                </View>


                <View style={styles.bottom}>
                    <ThemedText>Following: {subscriptions.length}</ThemedText>
                    <ThemedText>Basket: {basket.length}</ThemedText>
                </View>

        </View>
    );
}

const styles = StyleSheet.create({
    profileCon: {
        justifyContent: "space-between",
        height: "100vh",
    },
    bottom: {
        flexDirection: "row",
        justifyContent: "space-between",
        marginLeft: 10,
        marginRight: 10,
    },
    name: {
        flexDirection: "column",
        gap: 20,
    },
    bio: {
        flexDirection: "row",
        justifyContent: "center",
        paddingRight: 20,
        gap: 50,
    },
    button: {
        alignItems: "center",
        marginTop: 50,
    },
    buttonCon: {
        gap: 10,
    },
})

