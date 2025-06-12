/* Zone 1: Importaciones */
import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, Button } from 'react-native';

/*Creamos un componente en base al componente base*/
const Texto=(props)=>{
  const {contenido}=props
  return (
    <Text>{contenido}</Text>
  )
}

/* Zone 2: Main */
export default function App() {
  return (
    <View style={styles.container}>
      <StatusBar style="auto" />
      <Buttom title="Press me!"></Buttom>

      <Texto contenido="Hola"></Texto>
      <Texto contenido="Adios"></Texto>
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
