import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, Image, TouchableOpacity, FlatList } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useRouter } from 'expo-router';
import { Ionicons, Feather } from '@expo/vector-icons'; 
import { collection, getDocs, deleteDoc, doc, query, orderBy } from 'firebase/firestore';
import { db } from '../service/firebaseConfig';
import ItemRota from '../components/itemRota'; 

export default function Perfil() {
    const router = useRouter();
    const [nomeUsuario, setNomeUsuario] = useState('Usuário');
    const [rotas, setRotas] = useState([]);

    useEffect(() => {
      const carregarRotas = async () => {
          try {
              const rotasRef = collection(db, 'rotas');
              const q = query(rotasRef, orderBy('dataCadastro', 'desc')); 
              const querySnapshot = await getDocs(q);
  
              const items = querySnapshot.docs.map((doc: any) => ({
                  id: doc.id,
                  nomeLocal: doc.data().nomeLocal ?? 'Sem nome',
                  tipoLocal: doc.data().tipoLocal ?? 'Outro',
                  referencia: doc.data().referencia ?? '',
              }));
  
              setRotas(items);
          } catch (error) {
              console.error("Erro ao buscar rotas:", error);
          }
      };
      carregarRotas();
  }, []);

    useEffect(() => {
        const carregarNome = async () => {
            const nome = await AsyncStorage.getItem('@user_nome');
            if (nome) setNomeUsuario(nome);
        };
        carregarNome();
    }, []);

    const sairDoApp = async () => {
        await AsyncStorage.removeItem('@user');
        router.push('/');
    };

    const excluirRota = async (id: string) => {
        try {
            await deleteDoc(doc(db, "rotas", id));
            setRotas(rotas.filter(rota => rota.id !== id));
        } catch (error) {
            console.error("Erro ao excluir rota:", error);
        }
    };

    return (
        <View style={styles.container}>
            <TouchableOpacity onPress={sairDoApp} style={styles.logoutIcon}>
                <Ionicons name='log-out-outline' size={28} color='#1E90FF' />
            </TouchableOpacity>

            <View style={styles.profileSection}>
                <Ionicons name="person-circle-outline" size={100} color="#ccc" />
                <View style={styles.profileInfo}>
                    <Text style={styles.profileName}>{nomeUsuario}</Text>
                    <TouchableOpacity style={styles.editButton}>
                        <Text style={styles.editText}>Editar Perfil</Text>
                    </TouchableOpacity>
                </View>
            </View>

            <View style={{ flex: 1, marginTop: 20 }}>
                {rotas.length === 0 ? (
                    <View style={styles.centerContent}>
                        <Text style={styles.activityText}>Nenhuma rota planejada ainda.</Text>
                        <Text style={styles.activityText}>Crie suas rotas e elas aparecerão aqui!</Text>
                    </View>
                ) : (
                  <View>
                    <Text style={styles.headerRotas}>
                      Abaixo estão suas rotas definidas. Você pode consultá-las sempre que quiser:
                    </Text>
                    <FlatList
                        data={rotas}
                        keyExtractor={(item: any) => item.id}
                        renderItem={({ item: rota }) => (
                            <ItemRota
                                id={rota.id}
                                nomeLocal={rota.nomeLocal}
                                tipoLocal={rota.tipoLocal}
                                referencia={rota.referencia}
                                onEditar={() => router.push(`/editar-rota/${rota.id}`)}
                                onExcluir={() => excluirRota(rota.id)}
                            />
                        )}

                        contentContainerStyle={{ paddingBottom: 120 }} 
                    />
                  </View>
                )}
            </View>

        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#F5F5F5',
        paddingTop: 20,
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
        marginTop: 80,
        alignItems: 'center',
    },
    activityText: {
        fontSize: 16,
        color: '#666',
        textAlign: 'center',
        marginBottom: 6,
    },
    optionsContainer: {
        position: 'absolute',
        bottom: 20,
        left: 0,
        right: 0,
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
        marginLeft: 36,
    },
    headerRotas: {
      marginTop: 20,
      fontSize: 16,
      fontWeight: '600',
      color: '#333',
      marginBottom: 12,
  },

});