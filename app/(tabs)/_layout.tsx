import React from 'react';
import { Tabs } from 'expo-router';
import { TabBarIcon } from '@/components/navigation/TabBarIcon';
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";

import { Colors } from '@/constants/Colors';
import { useColorScheme } from '@/hooks/useColorScheme';
import index from "./index";
import search from "./search";
import notifications from "./notifications";
import profile from "./profile";

Tab = createBottomTabNavigator();
export default function RootLayout() {
    const colorScheme = useColorScheme();
    return (
        <Tab.Navigator
            screenOptions={{
                tabBarActiveTintColor: Colors[colorScheme ?? 'light'].tint,
                headerShown: false,
            }}>

                <Tab.Screen
                name="index"
                component={index}
                options={{
                    title: 'Home',
                    tabBarLabel: () => null,
                    tabBarIcon: ({ color, focused }) => (
                        <TabBarIcon name={focused ? 'globe' : 'globe-outline'} color={color} />
                    ),
                }}
            />

                <Tab.Screen
                name="search"
                component={search}
                options={{
                    title: 'Search',
                    tabBarLabel: () => null,
                    tabBarIcon: ({ color, focused }) => (
                        <TabBarIcon name={focused ? 'search' : 'search-outline'} color={color} />
                    ),
                }}
            />

                <Tab.Screen
                name="notifications"
                component={notifications}
                options={{
                    title: 'Notifications',
                    tabBarLabel: () => null,
                    tabBarIcon: ({ color, focused }) => (
                        <TabBarIcon name={focused ? 'heart' : 'heart-outline'} color={color} />
                    ),
                }}
            />

                <Tab.Screen
                name="profile"
                component={profile}
                options={{
                    title: 'Profile',
                    tabBarLabel: () => null,
                    tabBarIcon: ({ color, focused }) => (
                        <TabBarIcon name={focused ? 'menu' : 'menu-outline'} color={color} />
                    ),
                }}
            />
            </Tab.Navigator>
    );
}
