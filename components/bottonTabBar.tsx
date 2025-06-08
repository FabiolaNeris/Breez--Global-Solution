import React from 'react'
import {View, TouchableOpacity, Text, StyleSheet} from 'react-native'
import {useRouter, usePathname} from 'expo-router'
import {Ionicons} from '@expo/vector-icons'

export default function BottomTabBar(){
    const router = useRouter()
    const pathname = usePathname()

    const tabs = [
        { label: 'Home', icon: 'home-outline', route: '/home' },
        { label: 'Rotas', icon: 'map-outline', route: '/rotas' },
        { label: 'Perfil', icon: 'person-outline', route: '/perfil' },
    ]

    return (
        <View style={styles.container}>
            {tabs.map((tab) => {
                const isActive = pathname === tab.route;
                const color = isActive ? '#1E90FF' : '#888';

                return (
                <TouchableOpacity
                    key={tab.route}
                    style={styles.tabButton}
                    onPress={() => router.push(tab.route)}
                >
                    <Ionicons name={tab.icon as any} size={24} color={color} />
                    <Text style={[styles.label, { color }]}>{tab.label}</Text>
                </TouchableOpacity>
                );
            })}
        </View>
      );

}

const styles = StyleSheet.create({
    container: {
      height: 60,
      backgroundColor: '#fff',
      flexDirection: 'row',
      borderTopWidth: 1,
      borderColor: '#ccc',
      justifyContent: 'space-around',
      alignItems: 'center',
      position: 'absolute',
      bottom: 0,
      width: '100%',
      zIndex: 10,
    },
    tabButton: {
      alignItems: 'center',
      justifyContent: 'center',
    },
    label: {
      fontSize: 12,
    },
  });