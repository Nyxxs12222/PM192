/* Zone 1: Importaciones */
import { StyleSheet, Text, View, Button, Alert, TextInput } from 'react-native';
import React, { useState } from 'react';

/* Zone 2: Main */
export default function App() {
  const [nombre, setNombre] = useState('');

  const mostrarAlerta = () => {
    if (nombre.trim() === '') {
      Alert.alert('Error', 'Por favor escribe algo');
      alert('Escribe algo');
    } else {
      Alert.alert('Bienvenido', `Hola ${nombre}, bienvenido a nuestra app`);
      alert('Hola ' + nombre + ', bienvenido');
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.text}>Ingresa tu nombre</Text>

      <TextInput 
        style={styles.input}
        placeholder='Escribe tu nombre'
        onChangeText={setNombre}
        value={nombre}
      />

      <Button title='Enviar' onPress={mostrarAlerta} />
    </View>
  );
}

/* Zone 3: Estilos */
const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    paddingHorizontal: 20,
    backgroundColor: '#fff'
  },
  text: {
    fontSize: 18,
    marginBottom: 10,
    color: '#000'
  },
  input: {
    borderWidth: 1,
    borderColor: '#000',
    padding: 10,
    marginBottom: 20,
    borderRadius: 5,
    backgroundColor: '#f9f9f9',
    color: '#000'
  }
});
