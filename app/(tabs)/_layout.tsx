import React from 'react';
import { Tabs } from 'expo-router';
import { TabBarIcon } from '@/components/navigation/TabBarIcon';

import { Colors } from '@/constants/Colors';
import { useColorScheme } from '@/hooks/useColorScheme';

export default function RootLayout() {
    const colorScheme = useColorScheme();
    return (
        <Tabs
            screenOptions={{
                tabBarActiveTintColor: Colors[colorScheme ?? 'light'].tint,
                headerShown: false,
            }}>

                <Tabs.Screen
                name="index"
                options={{
                    title: 'Home',
                    tabBarLabel: () => null,
                    tabBarIcon: ({ color, focused }) => (
                        <TabBarIcon name={focused ? 'globe' : 'globe-outline'} color={color} />
                    ),
                }}
            />

                <Tabs.Screen
                name="search"
                options={{
                    title: 'Search',
                    tabBarLabel: () => null,
                    tabBarIcon: ({ color, focused }) => (
                        <TabBarIcon name={focused ? 'search' : 'search-outline'} color={color} />
                    ),
                }}
            />

                <Tabs.Screen
                name="notifications"
                options={{
                    title: 'Notifications',
                    tabBarLabel: () => null,
                    tabBarIcon: ({ color, focused }) => (
                        <TabBarIcon name={focused ? 'heart' : 'heart-outline'} color={color} />
                    ),
                }}
            />

                <Tabs.Screen
                name="profile"
                options={{
                    title: 'Profile',
                    tabBarLabel: () => null,
                    tabBarIcon: ({ color, focused }) => (
                        <TabBarIcon name={focused ? 'menu' : 'menu-outline'} color={color} />
                    ),
                }}
            />
            </Tabs>
    );
}
