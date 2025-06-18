/* Zone 1: Importaciones */
import { ImageBackground, StyleSheet, Text, View, SafeAreaView} from 'react-native';
import React from 'react';

const FondoBienvenida = () => {
  return (
    <ImageBackground
      source={require('./assets/fondo.jpg')}
      style={styles.fondo}
    >
      <View style={styles.contenido}>
        <Text style={styles.titulo}>¡Bienvenido a la App!</Text>
      </View>
    </ImageBackground>
  );
};

/* Zone 2: Main */

export default function App() {
  return (
    <SafeAreaView style={styles.container}>
      <FondoBienvenida />
    </SafeAreaView>
  );
}

/* Zone 3: Estilos */
const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  fondo: {
    flex: 1,
  },
  contenido: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0,0,0,0.4)', // para oscurecer la imagen
  },
  titulo: {
    fontSize: 28,
    color: 'white',
    fontWeight: 'bold',
  },
});
