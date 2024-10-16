import React, { useContext, useEffect, useState } from 'react'
import { Alert, StyleSheet, Button, Text, View } from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useNavigation } from "@react-navigation/native";
import { AuthContext } from "@/context/AuthContext";

import { ThemedText } from '@/components/ThemedText';

import API from "@/utils/API";

export default function Index() {
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
        <View >
            <View >
                <View >
                    <Text >{username}</Text>
                    <Button title="settings" onPress={() => {navigation.navigate('settings' as never)}} />
                </View>

                <View >
                
                    <View style={styles.info}>
                        <Text >Following: {subscriptions.length}</Text>
                        <Text >Basket: {basket.length}</Text>
                    </View>

                </View>

                <View style={styles.names}>
                    <Text >{fullName}</Text>
                    <Text >{bio}</Text>
                </View>
            </View>

                <View style={styles.bottom}>
                </View>

            </View>
    );
}

const styles = StyleSheet.create({
    bottom: {
        flexDirection: "column",
        justifyContent: "space-between",
        height: "30%",
    },
    names: {
        flexDirection: "column",
        gap: 20,
    },
    info: {
        flexDirection: "row",
        justifyContent: "center",
        paddingRight: 20,
        gap: 50,
    },
    button: {
        alignItems: "center",
    },
    buttonCon: {
        gap: 10,
    },
})

