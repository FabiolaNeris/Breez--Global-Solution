import React, { useEffect, useState } from 'react'
import {View,Text,StyleSheet,Image,TouchableOpacity, Button} from 'react-native'
import AsyncStorage from '@react-native-async-storage/async-storage'
import { useRouter} from 'expo-router'
import {Ionicons, Feather} from '@expo/vector-icons'

export default function Perfil(){
    const router = useRouter()
    const [nomeUsuario, setNomeUsuario] = useState('Usuário')

    useEffect(()=>{
        const carregarNome = async () =>{
            const nome = await AsyncStorage.getItem('@user_nome')
            if(nome) setNomeUsuario(nome)
        }
        carregarNome()
    },[])

    const sairDoApp = async ()=>{
        await AsyncStorage.removeItem('@user')
        router.push('/')
    }


    return(
        <View style={styles.container}>
            <TouchableOpacity onPress={sairDoApp} style={styles.logoutIcon}>
                <Ionicons name='log-out-outline'size={28} color='#1E90FF'/>
            </TouchableOpacity>

            <View style={styles.profileSection}>
                <Ionicons name="person-circle-outline" size={100} color="#ccc" />
                <View style={styles.profileInfo}>
                    <Text style={styles.profileName}>{nomeUsuario}</Text>
                    <TouchableOpacity style={styles.editButton}>
                        <Text style={styles.editText}>Editar</Text>
                    </TouchableOpacity>
                </View>
            </View>

            <View style={styles.centerContent}>
                <Text style={styles.activityText}>Sem atividades recentes</Text>
                <Text style={styles.activityText}>Suas rotas planejadas aparecerão aqui.</Text>
            </View>


            <View style={styles.optionsContainer}>
                <TouchableOpacity style={styles.optionItem}>
                    <Ionicons name="settings-outline" size={24} color="#1E90FF" style={styles.optionIcon} />
                    <Text style={styles.optionText}>Configurações</Text>
                </TouchableOpacity>
                <View style={styles.divider} />

                <TouchableOpacity style={styles.optionItem}>
                    <Feather name="help-circle" size={24} color="#1E90FF" style={styles.optionIcon} />
                    <Text style={styles.optionText}>Ajuda</Text>
                </TouchableOpacity>
                <View style={styles.divider} />

                <TouchableOpacity style={styles.optionItem}>
                    <Ionicons name="lock-closed-outline" size={24} color="#1E90FF" style={styles.optionIcon} />
                    <Text style={styles.optionText}>Privacidade</Text>
                </TouchableOpacity>
                <View style={styles.divider} />

                <TouchableOpacity style={styles.optionItem}>
                    <Ionicons name="people-outline" size={24} color="#1E90FF" style={styles.optionIcon} />
                    <Text style={styles.optionText}>Team</Text>
                </TouchableOpacity>
                <View style={styles.divider} />
            </View>


            
        </View>
        
        
    )
}

const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: '#F5F5F5',
      paddingTop: 50,
      paddingHorizontal: 20,
    },
    logoutIcon: {
      position: 'absolute',
      top: 10,
      right: 20,
      zIndex: 1,
    },
    profileSection: {
      flexDirection: 'row',
      alignItems: 'center',
      marginTop: 30,
    },
    profileImage: {
      width: 80,
      height: 80,
      borderRadius: 40,
      backgroundColor: '#ccc',
    },
    profileInfo: {
      marginLeft: 16,
    },
    profileName: {
      fontSize: 20,
      fontWeight: 'bold',
      color: '#1E90FF',
    },
    editButton: {
      marginTop: 6,
      backgroundColor: '#1E90FF',
      paddingHorizontal: 8,
      paddingVertical: 4,
      borderRadius: 6,
    },
    editText: {
      color: '#fff',
      fontSize: 12,
      textAlign: 'center',
    },
    centerContent: {
      marginTop: 150,
      alignItems: 'center',
      marginBottom: 0,
    },
    activityText: {
      fontSize: 16,
      color: '#666',
      textAlign: 'center',
      marginBottom: 6,
    },
    footer: {
      position: 'absolute',
      bottom: 30,
      width: '100%',
      flexDirection: 'row',
      justifyContent: 'space-around',
    },
    footerItem: {
      alignItems: 'center',
    },
    footerText: {
      fontSize: 12,
      color: '#003EA6',
      marginTop: 4,
    },
    optionsContainer: {
        position: 'absolute',
        bottom:20,
        marginTop: 0,
        left:0,
        right:0,
        paddingHorizontal: 20,
      },
      optionItem: {
        flexDirection: 'row',
        alignItems: 'center',
        paddingVertical: 12,
      },
      optionIcon: {
        marginRight: 12,
      },
      optionText: {
        fontSize: 16,
        color: '#1E90FF',
      },
      divider: {
        height: 1,
        backgroundColor: '#ddd',
        marginLeft: 36, // para alinhar com o texto (depois do ícone)
      },

  })