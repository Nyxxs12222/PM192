/* Zone 1: Importaciones */
import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, Button, Alert, TouchableOpacity, Image } from 'react-native';
import React, { useState } from 'react';

/* Zone 2: Main */
export default function App() {

  const [botonDesactivado, setBotonDesactivado] = useState(false);
  const [contador, setContador] = useState(0)

  return (
    <View style={styles.container}>

      <Button 
        title='Presioname!!'
        color={'#841584'}
        onPress={() => alert('Me has presionado')}
      />

      <Button
        title={botonDesactivado ? "Desactivado" : "Desactivame"}
        disabled={botonDesactivado}
        onPress={() => setBotonDesactivado(true)}
      />

      <View style={styles.botonJUstificado}>
        <Button
          title="Left button"
          color="#674323"
        />
        <Button 
          title='Right button'
          color="#097865"
        />
      </View>

      <TouchableOpacity
        style={styles.dynamicButton}
        onPress={() => setContador(contador + 1)}
      >
        <Text style={styles.dynamicText}>{contador}</Text>
      </TouchableOpacity>

      <TouchableOpacity
        onPress={() => alert("La pokebola ha sido presionada")}
      >
        <Image
          source={require('./assets/pokebola.png')}
          style={styles.Imagen}
        />
      </TouchableOpacity>

    </View>
  );
}

/* Zone 3: Estilos */
const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20
  },
  dynamicButton: {
    padding: 10,
    marginTop: 10,
    backgroundColor: '#987867',
    borderRadius: 5,
    alignItems: 'center'
  },
  dynamicText: {
    color: '#345676',
    fontSize: 19
  },
  Imagen: {
    width: 100,
    height: 100,
    marginTop: 15
  },
  botonJUstificado: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '100%',
    marginTop: 15
  }
});
