import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, ScrollView, StyleSheet, ActivityIndicator, Image, TouchableOpacity, Alert, Modal, FlatList } from 'react-native';

const API_KEY = '77858f77f74b4d2788d203101250707';

const WeatherApp = () => {
  const [cityInput, setCityInput] = useState('');
  const [cities, setCities] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [searchResults, setSearchResults] = useState([]);
  const [showResults, setShowResults] = useState(false);
  const [loadingStartTime, setLoadingStartTime] = useState(0);

  // Función para manejar la carga con tiempo mínimo
  const startLoading = () => {
    setLoading(true);
    setLoadingStartTime(Date.now());
  };

  const stopLoading = () => {
    const elapsed = Date.now() - loadingStartTime;
    const remainingTime = Math.max(2000 - elapsed, 0);
    
    setTimeout(() => {
      setLoading(false);
    }, remainingTime);
  };

  const searchCities = async () => {
    if (!cityInput.trim()) {
      setError('POR FAVOR INGRESA EL NOMBRE DE UNA CIUDAD');
      return;
    }
    
    startLoading();
    setError('');
    
    try {
      // Usamos el endpoint de autocompletado para obtener más resultados
      const response = await fetch(`http://api.weatherapi.com/v1/search.json?key=${API_KEY}&q=${cityInput}`);
      const data = await response.json();
      
      if (!data || data.length === 0) {
        throw new Error('NO SE ENCONTRARON CIUDADES. INTENTA CON UN NOMBRE EN INGLÉS.');
      }
      
      // Filtramos solo resultados únicos
      const uniqueResults = data.filter((item, index, self) =>
        index === self.findIndex(t => (
          t.id === item.id
        ))
      );
      
      setSearchResults(uniqueResults);
      setShowResults(true);
    } catch (err) {
      setError(err.message);
      Alert.alert('ERROR', err.message);
    } finally {
      stopLoading();
    }
  };

  const fetchWeatherData = async (city) => {
    startLoading();
    setError('');
    setShowResults(false);
    
    try {
      const response = await fetch(`http://api.weatherapi.com/v1/current.json?key=${API_KEY}&q=${city}&aqi=no`);
      const data = await response.json();
      
      if (data.error) {
        throw new Error(data.error.message);
      }
      
      const newCity = {
        name: data.location.name,
        country: data.location.country,
        temp: data.current.temp_c,
        condition: data.current.condition.text,
        icon: data.current.condition.icon,
        lastUpdated: new Date().toLocaleTimeString()
      };
      
      // Evitar duplicados
      if (!cities.some(c => c.name === newCity.name && c.country === newCity.country)) {
        setCities(prev => [...prev, newCity]);
      }
      
      setCityInput('');
    } catch (err) {
      setError(`ERROR: ${err.message}`);
      Alert.alert('ERROR', `NO SE PUDO OBTENER EL CLIMA PARA ${city}. ${err.message}`);
    } finally {
      stopLoading();
    }
  };

  const handleRemoveCity = (index) => {
    const newCities = [...cities];
    newCities.splice(index, 1);
    setCities(newCities);
  };

  const handleClearAll = () => {
    if (cities.length > 0) {
      Alert.alert(
        'CONFIRMAR',
        '¿ELIMINAR TODAS LAS CIUDADES?',
        [
          { text: 'CANCELAR', style: 'cancel' },
          { text: 'ELIMINAR', onPress: () => setCities([]) }
        ]
      );
    }
  };

  // Render condicional basado en el estado de carga
  const renderContent = () => {
    if (loading) {
      return null;
    }

    if (cities.length > 0) {
      return (
        <>
          <View style={styles.cityCountContainer}>
            <Text style={styles.cityCount}>CIUDADES: {cities.length}</Text>
            <TouchableOpacity onPress={handleClearAll}>
              <Text style={styles.clearButton}>LIMPIAR TODAS</Text>
            </TouchableOpacity>
          </View>
          
          <ScrollView style={styles.scrollView}>
            {cities.map((city, index) => (
              <View key={`${city.name}-${index}`} style={styles.cityCard}>
                <View style={styles.cityHeader}>
                  <Text style={styles.cityName}>{city.name.toUpperCase()}, {city.country.toUpperCase()}</Text>
                  <Text style={styles.lastUpdated}>ACTUALIZADO: {city.lastUpdated}</Text>
                </View>
                
                <View style={styles.weatherInfo}>
                  <Image 
                    source={{ uri: `https:${city.icon}` }} 
                    style={styles.weatherIcon} 
                  />
                  <Text style={styles.temperature}>{city.temp}°C</Text>
                </View>
                
                <Text style={styles.condition}>{city.condition.toUpperCase()}</Text>
                
                <TouchableOpacity 
                  style={styles.removeButton} 
                  onPress={() => handleRemoveCity(index)}
                >
                  <Text style={styles.removeButtonText}>ELIMINAR</Text>
                </TouchableOpacity>
              </View>
            ))}
          </ScrollView>
        </>
      );
    }

    return (
      <View style={styles.emptyState}>
        <Text style={styles.emptyText}>NO HAY CIUDADES AGREGADAS</Text>
        <Text style={styles.emptySubtext}>BUSCA UNA CIUDAD PARA VER SU CLIMA ACTUAL</Text>
        <Image 
          source={{ uri: 'https://cdn-icons-png.flaticon.com/512/414/414927.png' }} 
          style={styles.emptyImage}
        />
      </View>
    );
  };

  return (
    <View style={styles.container}>
      {/* Efecto de escaneo */}
      <View style={styles.scanLine}></View>
      
      <Text style={styles.header}>NEON WEATHER</Text>
      <Text style={styles.subheader}>SISTEMA DE MONITOREO CLIMÁTICO</Text>
      
      <View style={styles.inputContainer}>
        <TextInput
          style={styles.input}
          placeholder="BUSCAR CIUDAD (INGLÉS MEJOR)"
          placeholderTextColor="#ff00ff"
          value={cityInput}
          onChangeText={setCityInput}
          onSubmitEditing={searchCities}
          editable={!loading}
        />
        <TouchableOpacity 
          style={styles.searchButton}
          onPress={searchCities}
          disabled={loading}
        >
          <Text style={styles.searchButtonText}>BUSCAR</Text>
        </TouchableOpacity>
      </View>
      
      <View style={styles.tipContainer}>
        <Text style={styles.tipText}>CONSEJO: USA NOMBRES EN INGLÉS PARA RESULTADOS PRECISOS</Text>
      </View>
      
      {error && !loading ? <Text style={styles.error}>{error.toUpperCase()}</Text> : null}
      
      {loading && (
        <View style={styles.loadingOverlay}>
          <ActivityIndicator size="large" color="#00ffea" />
          <Text style={styles.loadingText}>ESCANEANDO BASE DE DATOS...</Text>
          <View style={styles.terminalLines}>
            <Text style={styles.terminalText}>> CONECTANDO CON SERVIDOR CLIMÁTICO...</Text>
            <Text style={styles.terminalText}>> BUSCANDO COINCIDENCIAS PARA: {cityInput.toUpperCase()}...</Text>
            <Text style={styles.terminalText}>> ANALIZANDO POSIBLES UBICACIONES...</Text>
          </View>
        </View>
      )}
      
      {/* Modal para mostrar resultados de búsqueda */}
      <Modal
        visible={showResults && !loading}
        transparent={false}
        animationType="slide"
        onRequestClose={() => setShowResults(false)}
      >
        <View style={styles.modalContainer}>
          <Text style={styles.modalTitle}>SELECCIONA UNA CIUDAD:</Text>
          <Text style={styles.modalSubtitle}>{searchResults.length} RESULTADOS ENCONTRADOS</Text>
          
          <FlatList
            data={searchResults}
            keyExtractor={(item, index) => `${item.id}-${index}`}
            renderItem={({ item }) => (
              <TouchableOpacity 
                style={styles.resultItem}
                onPress={() => fetchWeatherData(`${item.name},${item.country}`)}
                disabled={loading}
              >
                <View style={styles.resultContent}>
                  <Text style={styles.resultText}>{item.name.toUpperCase()}</Text>
                  <Text style={styles.resultDetails}>{item.region.toUpperCase()}, {item.country.toUpperCase()}</Text>
                </View>
                <Text style={styles.resultId}>ID: {item.id}</Text>
              </TouchableOpacity>
            )}
            ListEmptyComponent={
              <View style={styles.noResults}>
                <Text style={styles.noResultsText}>NO SE ENCONTRARON COINCIDENCIAS</Text>
                <Text style={styles.noResultsTip}>INTENTA CON UN NOMBRE EN INGLÉS</Text>
              </View>
            }
          />
          
          <TouchableOpacity 
            style={styles.cancelButton}
            onPress={() => setShowResults(false)}
            disabled={loading}
          >
            <Text style={styles.cancelButtonText}>CANCELAR</Text>
          </TouchableOpacity>
        </View>
      </Modal>
      
      {renderContent()}
      
      {/* Footer con estilo cyberpunk */}
      <View style={styles.footer}>
        <Text style={styles.footerText}>NEON WEATHER v2.1 | BUSQUEDA MEJORADA</Text>
        <Text style={styles.footerText}>MOSTRANDO TODAS LAS COINCIDENCIAS POSIBLES</Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#0a0a12',
    padding: 15,
    paddingTop: 40,
  },
  scanLine: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    height: 2,
    backgroundColor: '#00ffea',
    shadowColor: '#00ffea',
    shadowOffset: { width: 0, height: 0 },
    shadowOpacity: 1,
    shadowRadius: 10,
    zIndex: 100,
  },
  header: {
    fontSize: 36,
    fontWeight: 'bold',
    color: '#00ffea',
    textAlign: 'center',
    marginBottom: 5,
    textShadowColor: '#00ffea',
    textShadowOffset: { width: 0, height: 0 },
    textShadowRadius: 10,
    letterSpacing: 2,
    fontFamily: 'monospace',
  },
  subheader: {
    fontSize: 14,
    color: '#ff00ff',
    textAlign: 'center',
    marginBottom: 30,
    letterSpacing: 1,
    fontFamily: 'monospace',
  },
  inputContainer: {
    flexDirection: 'row',
    marginBottom: 15,
    alignItems: 'center',
  },
  input: {
    flex: 1,
    height: 50,
    borderColor: '#ff00ff',
    borderWidth: 2,
    borderRadius: 0,
    paddingHorizontal: 15,
    fontSize: 14,
    backgroundColor: 'rgba(0, 0, 0, 0.3)',
    color: '#00ffea',
    fontFamily: 'monospace',
    letterSpacing: 1,
  },
  searchButton: {
    backgroundColor: '#ff00ff',
    paddingVertical: 15,
    paddingHorizontal: 20,
    marginLeft: 10,
    borderWidth: 1,
    borderColor: '#ff00ff',
  },
  searchButtonText: {
    color: '#000',
    fontWeight: 'bold',
    fontSize: 14,
    fontFamily: 'monospace',
    letterSpacing: 1,
  },
  tipContainer: {
    backgroundColor: 'rgba(0, 255, 234, 0.1)',
    padding: 10,
    borderRadius: 0,
    marginBottom: 15,
    borderLeftWidth: 3,
    borderLeftColor: '#00ffea',
  },
  tipText: {
    color: '#00ffea',
    fontSize: 12,
    fontFamily: 'monospace',
    letterSpacing: 0.5,
  },
  error: {
    color: '#ff003c',
    textAlign: 'center',
    marginBottom: 15,
    fontWeight: 'bold',
    fontSize: 12,
    fontFamily: 'monospace',
    textShadowColor: '#ff003c',
    textShadowOffset: { width: 0, height: 0 },
    textShadowRadius: 5,
  },
  cityCountContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 15,
    paddingHorizontal: 5,
    borderBottomWidth: 1,
    borderBottomColor: '#ff00ff',
    paddingBottom: 10,
  },
  cityCount: {
    fontSize: 14,
    color: '#ff00ff',
    fontWeight: 'bold',
    fontFamily: 'monospace',
    letterSpacing: 1,
  },
  clearButton: {
    color: '#ff003c',
    fontWeight: 'bold',
    fontSize: 12,
    fontFamily: 'monospace',
    letterSpacing: 1,
  },
  scrollView: {
    flex: 1,
    marginBottom: 20,
  },
  cityCard: {
    backgroundColor: 'rgba(20, 20, 40, 0.8)',
    borderRadius: 0,
    padding: 20,
    marginBottom: 15,
    borderWidth: 1,
    borderColor: '#00ffea',
    shadowColor: '#00ffea',
    shadowOffset: { width: 0, height: 0 },
    shadowOpacity: 0.5,
    shadowRadius: 10,
  },
  cityHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 15,
    flexWrap: 'wrap',
  },
  cityName: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#ff00ff',
    maxWidth: '70%',
    fontFamily: 'monospace',
    letterSpacing: 1,
  },
  lastUpdated: {
    fontSize: 10,
    color: '#00ffea',
    alignSelf: 'flex-end',
    fontFamily: 'monospace',
  },
  weatherInfo: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 15,
  },
  weatherIcon: {
    width: 80,
    height: 80,
    backgroundColor: 'rgba(0, 0, 0, 0.3)',
  },
  temperature: {
    fontSize: 42,
    fontWeight: 'bold',
    color: '#00ffea',
    textShadowColor: '#00ffea',
    textShadowOffset: { width: 0, height: 0 },
    textShadowRadius: 10,
    fontFamily: 'monospace',
  },
  condition: {
    fontSize: 16,
    color: '#ff00ff',
    textAlign: 'center',
    marginBottom: 15,
    fontFamily: 'monospace',
    fontWeight: 'bold',
    letterSpacing: 1,
  },
  removeButton: {
    backgroundColor: 'rgba(255, 0, 60, 0.2)',
    padding: 10,
    borderWidth: 1,
    borderColor: '#ff003c',
    alignItems: 'center',
  },
  removeButtonText: {
    color: '#ff003c',
    fontWeight: 'bold',
    fontFamily: 'monospace',
    letterSpacing: 1,
  },
  emptyState: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
    borderWidth: 1,
    borderColor: '#ff00ff',
    marginTop: 20,
  },
  emptyText: {
    fontSize: 20,
    color: '#ff00ff',
    textAlign: 'center',
    marginBottom: 10,
    fontWeight: 'bold',
    fontFamily: 'monospace',
    letterSpacing: 1,
  },
  emptySubtext: {
    fontSize: 14,
    color: '#00ffea',
    textAlign: 'center',
    marginBottom: 20,
    fontFamily: 'monospace',
  },
  emptyImage: {
    width: 100,
    height: 100,
    opacity: 0.5,
    tintColor: '#ff00ff',
  },
  modalContainer: {
    flex: 1,
    padding: 20,
    paddingTop: 50,
    backgroundColor: '#0a0a12',
  },
  modalTitle: {
    fontSize: 22,
    fontWeight: 'bold',
    textAlign: 'center',
    color: '#00ffea',
    marginBottom: 5,
    fontFamily: 'monospace',
    letterSpacing: 1,
  },
  modalSubtitle: {
    fontSize: 14,
    textAlign: 'center',
    color: '#ff00ff',
    marginBottom: 20,
    fontFamily: 'monospace',
  },
  resultItem: {
    backgroundColor: 'rgba(20, 20, 40, 0.8)',
    padding: 15,
    marginBottom: 10,
    borderWidth: 1,
    borderColor: '#00ffea',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  resultContent: {
    flex: 1,
  },
  resultText: {
    fontSize: 16,
    color: '#ff00ff',
    fontFamily: 'monospace',
    letterSpacing: 1,
    fontWeight: 'bold',
    marginBottom: 5,
  },
  resultDetails: {
    fontSize: 12,
    color: '#00ffea',
    fontFamily: 'monospace',
  },
  resultId: {
    fontSize: 10,
    color: '#ff00ff',
    fontFamily: 'monospace',
    opacity: 0.7,
  },
  noResults: {
    padding: 20,
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#ff003c',
    marginVertical: 20,
  },
  noResultsText: {
    fontSize: 18,
    color: '#ff003c',
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 10,
    fontFamily: 'monospace',
  },
  noResultsTip: {
    fontSize: 14,
    color: '#ff00ff',
    textAlign: 'center',
    fontFamily: 'monospace',
  },
  cancelButton: {
    backgroundColor: 'rgba(255, 0, 60, 0.2)',
    padding: 15,
    borderWidth: 1,
    borderColor: '#ff003c',
    alignItems: 'center',
    marginTop: 15,
  },
  cancelButtonText: {
    color: '#ff003c',
    fontWeight: 'bold',
    fontSize: 16,
    fontFamily: 'monospace',
    letterSpacing: 1,
  },
  loadingOverlay: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: 'rgba(10, 10, 18, 0.95)',
    justifyContent: 'center',
    alignItems: 'center',
    zIndex: 1000,
    padding: 20,
  },
  loadingText: {
    marginTop: 20,
    color: '#00ffea',
    fontSize: 18,
    fontWeight: 'bold',
    fontFamily: 'monospace',
    letterSpacing: 1,
    textShadowColor: '#00ffea',
    textShadowOffset: { width: 0, height: 0 },
    textShadowRadius: 5,
  },
  terminalLines: {
    marginTop: 30,
    width: '100%',
    paddingHorizontal: 20,
  },
  terminalText: {
    color: '#39ff14',
    fontSize: 14,
    marginBottom: 10,
    fontFamily: 'monospace',
  },
  footer: {
    borderTopWidth: 1,
    borderTopColor: '#ff00ff',
    paddingVertical: 10,
    marginTop: 10,
  },
  footerText: {
    color: '#00ffea',
    fontSize: 10,
    textAlign: 'center',
    fontFamily: 'monospace',
    letterSpacing: 1,
  },
});

export default WeatherApp;