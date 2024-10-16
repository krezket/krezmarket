import React, { useContext, useEffect } from "react";
import { ActivityIndicator } from "react-native";
import { DarkTheme, DefaultTheme, ThemeProvider } from '@react-navigation/native';
import { useFonts } from 'expo-font';
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack"
import * as SplashScreen from 'expo-splash-screen';
import { AuthProvider, AuthContext } from "@/context/AuthContext";
import { useColorScheme } from '@/hooks/useColorScheme';

import TabLayout from "@/app/(tabs)/_layout";
import index from "@/app/index";
import Settings from "@/app/(tabs)/settings";

import LogInScreen from "./screens/LogInScreen/LogInScreen";
import SignUpScreen from "./screens/SignUpScreen/SignUpScreen";

const Stack = createNativeStackNavigator();

function RootNavigator() {
    const { isLoading, userToken } = useContext(AuthContext) as any;
    const colorScheme = useColorScheme();

    const RootStack = () => (
        <ThemeProvider value={colorScheme === 'dark' ? DarkTheme : DefaultTheme}>
            <Stack.Navigator>
                <Stack.Screen name="TabLayout" component={TabLayout} options={{ headerShown: false }} />
                <Stack.Screen name="Settings" component={Settings} options={{ headerTitle: "Settings" }} />
            </Stack.Navigator>
         </ThemeProvider>
    );

    const AuthStack = () => (
        <ThemeProvider value={colorScheme === 'dark' ? DarkTheme : DefaultTheme}>
            <Stack.Navigator>
                <Stack.Screen name="index" component={index} options={{ headerShown: false }} />
                <Stack.Screen name="SignUpScreen" component={SignUpScreen} options={{ headerShown: false }} />
                <Stack.Screen name="LogInScreen" component={LogInScreen} options={{ headerShown: false }} />
            </Stack.Navigator>
         </ThemeProvider>
    );

  if (isLoading) {
    return <ActivityIndicator size="large" color={'blue'} />;
  }

  return (
    <NavigationContainer independent={true}>
      {userToken ? <RootStack /> : <AuthStack />}
    </NavigationContainer>
  );
}

export default function RootLayout() {
  const [loaded] = useFonts({
    SpaceMono: require('../assets/fonts/SpaceMono-Regular.ttf'),
  });

  return (
    <AuthProvider>
      <RootNavigator />
    </AuthProvider>
  );
}
