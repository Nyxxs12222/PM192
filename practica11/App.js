import { StatusBar } from 'expo-status-bar';
import { useState, useEffect } from 'react';
import { StyleSheet, Text, View, TextInput, Alert, Button, Switch, ImageBackground, SafeAreaView, Image } from 'react-native';

export default function App() {
  const [nombre, setNombre] = useState('');
  const [correo, setCorreo] = useState('');
  const [aceptar, setAceptar] = useState(false);
  const [mostrarSplash, setMostrarSplash] = useState(true); 

  useEffect(() => {
    const timer = setTimeout(() => {
      setMostrarSplash(false);
    }, 2000); 

    return () => clearTimeout(timer); 
  }, []);

  const showAlert = () => {
    if (nombre.trim() === '' || correo.trim() === '') {
      Alert.alert('Error', 'Por favor completa todos los campos');
    } else if (!aceptar) { 
      Alert.alert('Términos no aceptados', 'Debes aceptar los términos y condiciones');
    } else {
      Alert.alert('Registro exitoso', `Nombre: ${nombre},\nEmail: ${correo}`);
    }
  };

  if (mostrarSplash) {
    return (
      <View style={{ flex: 1 }}>
        <Image
          source={require('./assets/sm_oscuro.jpg')}
          style={{ flex: 1, resizeMode: 'cover', width: '100%' }}
        />
      </View>
    );
  }

  return (
    <ImageBackground 
      source={require('./assets/fondo.jpg')}
      style={styles.background}
      resizeMode="cover"
    >
      <SafeAreaView style={{ flex: 1 }}>
        <View style={styles.container}>
          <View style={styles.registerC}>
            <Text style={styles.t1}>Registro de Usuario</Text>

            <TextInput
              style={styles.input}
              placeholder='Nombre Completo'
              onChangeText={setNombre}
              value={nombre}
            />
            
            <TextInput
              style={styles.input}
              placeholder='Correo Electrónico'
              onChangeText={setCorreo}
              value={correo}
            />

            <Switch
              value={aceptar}
              onValueChange={setAceptar}
              trackColor={{ false: '#ccc', true: '#4caf50' }}
            />

            <Button title='Registrarse' onPress={showAlert} />
          </View>
        </View>
      </SafeAreaView>
    </ImageBackground>
  );
}

const styles = StyleSheet.create({
  background: {
    flex: 1,
  },
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
});
