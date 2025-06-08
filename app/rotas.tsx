import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TextInput,
  Button,
  Image,
  ScrollView,
} from 'react-native';
import { collection, addDoc } from 'firebase/firestore';
import { db } from '../service/firebaseConfig';
import { Picker } from '@react-native-picker/picker';

export default function Rotas() {
  const [nomeLocal, setNomeLocal] = useState('');
  const [referencia, setReferencia] = useState('');
  const [horario, setHorario] = useState('');
  const [raio, setRaio] = useState('');
  const [tipoLocal, setTipoLocal] = useState('');
  const [inputFocus, setInputFocus] = useState('');

  const handleSalvar = async () => {
    if (!nomeLocal || !referencia || !horario || !raio || !tipoLocal) {
        window.alert("Preencha todos os campos.");
        return;
      }

    try {
      await addDoc(collection(db, "rotas"), {
        nomeLocal,
        referencia,
        horario,
        raio,
        tipoLocal,
        dataCadastro: new Date()
      });
      window.alert("Rota cadastrada com sucesso!");
      setNomeLocal('');
      setReferencia('');
      setHorario('');
      setRaio('');
      setTipoLocal('');
    } catch (error) {
      console.error("Erro ao salvar rota:", error);
      window.alert("Erro ao salvar rota.");
    }
  };

  return (
      <ScrollView contentContainerStyle={styles.container} keyboardShouldPersistTaps="handled">
        <Image
          source={require('../assets/mapa-clima.png')}
          style={styles.mapa}
          resizeMode="cover"
        />

        <Text style={styles.textTitle}>Cadastre suas rotas principais</Text>

        <Text style={styles.label}>Nome do local</Text>
        <TextInput
          style={[styles.input, inputFocus === 'nome' && styles.inputFocused]}
          placeholderTextColor="#aaa"
          value={nomeLocal}
          onChangeText={setNomeLocal}
          onFocus={() => setInputFocus('nome')}
          onBlur={() => setInputFocus('')}
          placeholder="Ex: Trabalho"
        />

        <Text style={styles.label}>Referência / Endereço</Text>
        <TextInput
          style={[styles.input, inputFocus === 'ref' && styles.inputFocused]}
          placeholderTextColor="#aaa"
          value={referencia}
          onChangeText={setReferencia}
          onFocus={() => setInputFocus('ref')}
          onBlur={() => setInputFocus('')}
          placeholder="Av. Paulista, 1000"
        />

        <Text style={styles.label}>Horário que frequenta</Text>
        <TextInput
          style={[styles.input, inputFocus === 'hora' && styles.inputFocused]}
          placeholderTextColor="#aaa"
          value={horario}
          onChangeText={setHorario}
          onFocus={() => setInputFocus('hora')}
          onBlur={() => setInputFocus('')}
          placeholder="Ex: 8h às 17h"
        />

        <Text style={styles.label}>Raio de deslocamento (km)</Text>
        <TextInput
          style={[styles.input, inputFocus === 'raio' && styles.inputFocused]}
          placeholderTextColor="#aaa"
          value={raio}
          onChangeText={setRaio}
          keyboardType="numeric"
          onFocus={() => setInputFocus('raio')}
          onBlur={() => setInputFocus('')}
          placeholder="Ex: 2"
        />

        <Text style={styles.label}>Tipo de local desejado</Text>
        <View style={styles.pickerBox}>
          <Picker
            selectedValue={tipoLocal}
            onValueChange={(itemValue) => setTipoLocal(itemValue)}>
            <Picker.Item label="Selecione" value="" />
            <Picker.Item label="Parque" value="Parque" />
            <Picker.Item label="Ponto de Hidratação" value="Hidratação" />
            <Picker.Item label="Local para Trabalhar" value="Trabalho" />
            <Picker.Item label="Lazer" value="Lazer" />
          </Picker>
        </View>


        <View style={styles.buttonContainer}>
          <Button title="Salvar rota" onPress={handleSalvar} color="#1E90FF" />
        </View>

        
      </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    backgroundColor: '#F5F5F5',
    padding: 20,
  },
  mapa: {
    width: '100%',
    height: 180,
    borderRadius: 12,
    marginBottom: 20,
  },

  textTitle:{
    fontSize: 20,
    fontWeight: 'bold',
    color: '#1E90FF',
    textAlign: 'center',
    padding: 10,
    marginBottom: 20,
  },
  label: {
    fontSize: 14,
    fontWeight: '600',
    marginBottom: 6,
    color: '#1E90FF',
  },
  input: {
    backgroundColor: '#fff',
    paddingVertical: 14,
    paddingHorizontal: 18,
    borderRadius: 10,
    fontSize: 16,
    borderWidth: 2,
    borderColor: '#ccc',
    color: '#333',
    width: '100%',
    marginBottom: 16,
    elevation: 3,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
  },
  inputFocused: {
    borderColor: '#87CEFA',
    shadowColor: '#87CEFA',
    shadowOpacity: 0.2,
    elevation: 5,
  },
  pickerBox: {
    backgroundColor: '#fff',
    borderRadius: 10,
    borderWidth: 2,
    borderColor: '#ccc',
    marginBottom: 24,
    overflow: 'hidden',
  },
  buttonContainer: {
    marginTop: 10,
    marginBottom: 40,
  },
});
