/* Zone 1: Importaciones */
import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, Button } from 'react-native';
import React, {useState} from 'react';

const Texto = ({style}) => {
  const [contenido, setContenido] = useState('Hola mundo');
  const actualizarTexto = () => setContenido('Estado actualizado');

  return (
    <Text style={[styles.text, style]} onPress={actualizarTexto}>
      {contenido}
    </Text>
  );
};

/* Zone 2: Main */
export default function App() {
  return (
    <View style={styles.container}>
      <StatusBar style="auto" />

      <Texto ></Texto>
      
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
    flexDirection: 'column',
  },
  text: {
    color: 'black',
    fontSize: 25,
    height: 120,
  },
  red: { backgroundColor: 'red' },
  green: {  backgroundColor: 'green' },
  blue: { backgroundColor: 'blue' },
});
