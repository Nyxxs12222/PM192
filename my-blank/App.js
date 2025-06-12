/* Zone 1: Importaciones */
import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, Button } from 'react-native';
import React, {useState} from 'react';

const Texto = () => {
  const [contenido, setContenido] = useState('Hola mundo React Native');
  const actualizarTexto = () => setContenido('Estado actualizado');

  return (
    <Text onPress={actualizarTexto}>
      {contenido}
    </Text>
  );
};

/* Zone 2: Main */
export default function App() {
  return (
    <View style={styles.container}>
      <StatusBar style="auto" />

      <Texto />
      <Texto />
      <Texto />
      
        <Button title="Press me!" onPress={() => alert('Botón presionado')} />
    </View>
  );
}

/* Zone 3: Estilos */
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
