import React from "react";
import { Text, View, Image, Pressable, StatusBar, StyleSheet, useColorScheme } from "react-native";
import { useNavigation } from "@react-navigation/native";
import { Colors } from '@/constants/Colors';
import { ThemedText } from '@/components/ThemedText';

export default function Index() {
  const navigation = useNavigation();
  const theme = useColorScheme() ?? 'light';
  console.log(theme)

  const dynamicStyles = StyleSheet.create({
    text: {
        color: theme === "light" ? Colors.dark.text : Colors.light.text,
    },
    button: {
        backgroundColor: theme === "dark" ? "white" : "black",
    },
  });

    return (
        <View style={styles.mainCon}>
            <View style={styles.linkCon}>
                <Pressable onPress={() => { navigation.navigate('SignUpScreen' as never) }} style={dynamicStyles.button}>
                    <ThemedText style={dynamicStyles.text}>Sign up and get started</ThemedText>
                </Pressable>
                <ThemedText>or</ThemedText>
                <Pressable onPress={() => { navigation.navigate('LogInScreen' as never) }} style={dynamicStyles.button}>
                    <ThemedText style={dynamicStyles.text}>Log in</ThemedText>
                </Pressable>
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    mainCon: {
        flex: 1,
        justifyContent: "flex-end",
    },
    linkCon: {
        height: 200,
        alignItems: "center",
        justifyContent: "space-between",
    },
});
