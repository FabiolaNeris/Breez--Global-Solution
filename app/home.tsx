import React from 'react'
import {View,Button, Text, StyleSheet, TouchableOpacity, Image} from 'react-native'
import AsyncStorage from '@react-native-async-storage/async-storage'
import {useRouter} from 'expo-router'
import MapView from 'react-native-maps'


export default function ScreenHome(){
    const router = useRouter()
    return (
        <View style={styles.container}>
          
          <MapView style={styles.map} />
          
        </View>
      );

}

const styles = StyleSheet.create({
    container: {
      flex: 1,
       
    },

    map:{
        width: '100%',
        height: '100%'
    }
    
  });
