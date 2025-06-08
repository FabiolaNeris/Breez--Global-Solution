import React, { useEffect, useState } from 'react';
import { View, Text, TextInput, StyleSheet, TouchableOpacity, Alert } from 'react-native';
import { useRouter, useLocalSearchParams } from 'expo-router';
import { doc, getDoc, updateDoc } from 'firebase/firestore';
import { db } from '../../service/firebaseConfig';

export default function EditarRota() {
  const { id } = useLocalSearchParams();
  const router = useRouter();

  const [nomeLocal, setNomeLocal] = useState('');
  const [tipoLocal, setTipoLocal] = useState('');
  const [referencia, setReferencia] = useState('');

  useEffect(() => {
    const carregarRota = async () => {
      try {
        const docRef = doc(db, 'rotas', String(id));
        const docSnap = await getDoc(docRef);
        if (docSnap.exists()) {
          const data = docSnap.data();
          setNomeLocal(data.nomeLocal ?? '');
          setTipoLocal(data.tipoLocal ?? '');
          setReferencia(data.referencia ?? '');
        } else {
          Alert.alert("Rota não encontrada");
        }
      } catch (error) {
        console.error("Erro ao carregar rota:", error);
      }
    };

    carregarRota();
  }, [id]);

  const salvarEdicao = async () => {
    try {
      const docRef = doc(db, 'rotas', String(id));
      await updateDoc(docRef, {
        nomeLocal,
        tipoLocal,
        referencia,
      });
      Alert.alert("Rota atualizada com sucesso");
      router.back(); // Volta para tela anterior
    } catch (error) {
      console.error("Erro ao salvar edição:", error);
      Alert.alert("Erro ao salvar", "Tente novamente mais tarde.");
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.label}>Nome do Local</Text>
      <TextInput style={styles.input} value={nomeLocal} onChangeText={setNomeLocal} />

      <Text style={styles.label}>Tipo do Local</Text>
      <TextInput style={styles.input} value={tipoLocal} onChangeText={setTipoLocal} />

      <Text style={styles.label}>Referência</Text>
      <TextInput style={styles.input} value={referencia} onChangeText={setReferencia} />

      <TouchableOpacity style={styles.button} onPress={salvarEdicao}>
        <Text style={styles.buttonText}>Salvar Alterações</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#fff', padding: 20 },
  label: { fontSize: 16, fontWeight: 'bold', marginTop: 12 },
  input: { borderWidth: 1, borderColor: '#ccc', padding: 10, borderRadius: 8, marginTop: 4 },
  button: {
    marginTop: 24,
    backgroundColor: '#1E90FF',
    padding: 14,
    borderRadius: 8,
    alignItems: 'center'
  },
  buttonText: { color: '#fff', fontWeight: 'bold', fontSize: 16 }
});
