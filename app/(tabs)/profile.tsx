import React, { useContext, useEffect, useState } from 'react'
import { Alert, StyleSheet, Button, Text, View, ActivityIndicator } from "react-native";
import { useFonts } from "expo-font";
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

    const [fontsLoaded] = useFonts({
        'TS-Block-Bold': require('../../assets/fonts/TS-Block-Bold.ttf'),
        'theboldfont': require('../../assets/fonts/theboldfont.ttf'),
    });

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

        if (!fontsLoaded) {
            return <ActivityIndicator size="large" color="#0000ff" />;
        }

    return (
        <View style={styles.profileCon}>

	<View>
	    <View style={styles.button}>
		<Button title="Settings" onPress={() => {navigation.navigate('settings' as never)}} />
	    </View>

	    <View style={styles.name}>
		<ThemedText style={styles.bold}>{username}</ThemedText>
		<ThemedText style={styles.bold}>{fullName}</ThemedText>
	    </View>

	    <View style={styles.bio}>
		<ThemedText style={styles.bold}>{bio}</ThemedText>
	    </View>
	</View>

	    <View style={styles.bottom}>
		<ThemedText style={styles.bold}>Following: {subscriptions.length}</ThemedText>
		<ThemedText style={styles.bold}>Basket: {basket.length}</ThemedText>
	    </View>

        </View>
    );
}

const styles = StyleSheet.create({
    profileCon: {
	flex: 1,
        justifyContent: "space-between",
        height: "100vh",
        marginLeft: 10,
        marginRight: 10,
    },
    bottom: {
        flexDirection: "row",
        justifyContent: "space-between",
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
        alignItems: "flex-end",
        marginTop: 50,
    },
    buttonCon: {
        gap: 10,
    },
    bold: {
	fontFamily: "theboldfont",
    }
})

