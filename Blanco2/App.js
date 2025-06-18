/* Zone 1: Importaciones */
import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';

/* Zone 2: Main */
export default function App() {
  return (
    <View style={styles.container}>
      <StatusBar style="auto" />
        <Texto>Hola en blanco</Texto>
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
});
