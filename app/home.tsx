import React from 'react'
import {View, Text, StyleSheet, Image, ScrollView} from 'react-native'
import { useState, useEffect} from 'react'
import {useRouter} from 'expo-router'
import * as Location from 'expo-location'

const API_KEY = "0cad12f276c6eddbb6d0cfca4864323b"

export default function ScreenHome(){
    const router = useRouter()
    const [loading,setLoading] = useState(false)
    const [weatherData, setWeatherData] = useState(null)
    const [errorMessage,setErrorMessage] = useState('')

    async function fetchWeatherByCoords(lat,lon){
      setLoading(true);
      try{
        const res = await fetch(`https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${API_KEY}&units=metric`)

        const result = await res.json()

        if(result?.cod === "404"){
          setErrorMessage("Localização não encontrada")
          setWeatherData(null)
        } else{
          setWeatherData(result)
        }
      }catch(error){
        setErrorMessage("Erro ao buscar temperatura")
      } finally{
        setLoading(false)
      }

    }

    async function getLocationAndFetchWeather() {
      setLoading(true);
      let {status} = await Location.requestForegroundPermissionsAsync()
      console.log("Status da permissão", status)

      if(status !== 'granted'){
        setErrorMessage('Permissão de localização negada')
        setLoading(false)
        return
      }

      const location = await Location.getCurrentPositionAsync({})
      const {latitude, longitude} = location.coords
      await fetchWeatherByCoords(latitude,longitude)
    }


    useEffect(() => {
      getLocationAndFetchWeather()
    },[])


    return (
      <ScrollView contentContainerStyle={styles.container}>
      
      <View style={styles.tempBox}>
        <Text style={styles.tempText}>
          {weatherData ? `${Math.round(weatherData.main.temp)}°C` : '--°C'}
        </Text>
        <Text style={styles.cityText}>{weatherData?.name || 'Localização'}</Text>
      </View>

      <Text style={styles.logoText}>BREEZ</Text>

      <Text style={styles.missao}>
        Combata os efeitos extremos do calor com informação, alerta e ação.
      </Text>

      <View style={styles.featureBox}>
        <Text style={styles.featureTitle}>🔥 Alerta Personalizado</Text>
        <Text style={styles.featureText}>
          Notificações em tempo real quando sua região atingir calor extremo.
        </Text>
      </View>

      <View style={styles.featureBox}>
        <Text style={styles.featureTitle}>🗺️ Refúgio Urbano</Text>
        <Text style={styles.featureText}>
          Encontre áreas frescas com rotas seguras e baixa lotação.
        </Text>
      </View>

      <View style={styles.featureBox}>
        <Text style={styles.featureTitle}>💧 Cuidados Essenciais</Text>
        <Text style={styles.featureText}>
          Recomendações personalizadas: hidratação, horários seguros e mais.
        </Text>
      </View>

      <Text style={styles.rodape}>
        Junte-se à rede BREEZ e transforme calor em cuidado.
      </Text>
    </ScrollView>
      );

}

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#F5F5F5',
    paddingTop: 50,
    paddingHorizontal: 20,
    paddingBottom: 30,
  },
  tempBox: {
    width: '100%',
    backgroundColor: '#1E90FF',
    borderRadius: 16,
    paddingVertical: 20,
    paddingHorizontal: 20,
    marginBottom: 20,
    shadowColor: '#000',
    shadowOpacity: 0.2,
    shadowRadius: 6,
    elevation: 5,
    alignSelf: 'center',
  },
  tempText: {
    color: '#fff',
    fontSize: 36,
    fontWeight: 'bold',
    marginBottom: 4,
  },
  cityText: {
    color: '#fff',
    fontSize: 16,
    marginTop: 4,
  },
  logoText: {
    fontSize: 36,
    fontWeight: 'bold',
    color: '#1E90FF',
    alignSelf: 'center',
    marginTop: 20,
    marginBottom: 20,
  },
  missao: {
    fontSize: 16,
    textAlign: 'center',
    color: '#333',
    marginBottom: 30,
  },
  featureBox: {
    backgroundColor: '#fff',
    borderRadius: 12,
    padding: 20,
    marginBottom: 16,
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  featureTitle: {
    fontSize: 18,
    fontWeight: '600',
    marginBottom: 6,
    color: '#003EAA',
  },
  featureText: {
    fontSize: 14,
    color: '#444',
  },
  rodape: {
    marginTop: 30,
    textAlign: 'center',
    fontSize: 14,
    color: '#666',
  },
  });
