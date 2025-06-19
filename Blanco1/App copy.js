/* Zone 1: Importaciones */
import React, { useState } from 'react';
import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, Switch } from 'react-native';
import { SafeAreaProvider, SafeAreaView } from 'react-native-safe-area-context';

/* Zone 2: Main */
export default function App() {

  const [activarSwitch, setActivarSwitch] = useState(false);
  const [modoOscuro, setModoOscuro] = useState(false);

  return (
    <SafeAreaProvider>
      <SafeAreaView style={[styles.container, modoOscuro && styles.fondoOscuro]}>
        <StatusBar style={modoOscuro ? "light" : "dark"} />

        {/* Componentes a usar */}

        <Text style={[styles.titulo, modoOscuro && styles.textoClaro]}>
          Práctica con Switch
        </Text>

        <View style={styles.opcion}> 
          <Text style={[styles.etiqueta, modoOscuro && styles.textoClaro]}>
            Activar Switch 2
          </Text>

          <Switch 
            value={activarSwitch}
            onValueChange={setActivarSwitch}
            trackColor={{ false: '#ccc', true: '#4caf50' }}
            thumbColor={activarSwitch? '#ffffff' : '#999999'}
          />
        </View>

        <View style={styles.opcion}> 
          <Text style={[styles.etiqueta, modoOscuro && styles.textoClaro]}>
            Modo Oscuro
          </Text>

          <Switch 
            value={modoOscuro}
            onValueChange={setModoOscuro}
            disabled={activarSwitch}
            trackColor={{ false: '#ccc', true: '#4caf50' }}
            thumbColor={
              activarSwitch
                ? '#999999'
                : modoOscuro
                ? '#ffffff'
                : '#ff3b30'
            }
          />
        </View>
      </SafeAreaView>
    </SafeAreaProvider>
  );
}

/* Zone 3: Estilos */
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    paddingHorizontal: 30,
    justifyContent: 'center',
  },
  titulo: {
    fontSize: 24,
    marginBottom: 40,
    textAlign: 'center',
    fontWeight: 'bold',
  },
  fondoOscuro: {
    backgroundColor: "#1a1a1a",
  },
  textoClaro: {
    color: "#ffffff",
  },
  opcion: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 30,
    alignItems: 'center',
  },
  etiqueta: {
    fontSize: 18,
  },
});
