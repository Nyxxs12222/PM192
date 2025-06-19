/* Zone 1: Importaciones */
import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, Button, Alert, TouchableOpacity } from 'react-native';
import React, { useState } from 'react';

/* Zone 2: Main */
export default function App() {
  return (
    <View style={styles.container}>
      <Button 
        title='Press Me!!'
        onPress={()=>alert('Me has presionado')}
      >

      </Button>
    </View>
  );
}

/* Zone 3: Estilos */
const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  Button: {
    marginTop: 10, 
    alignItems: 'center',
    backgroundColor: '#234354',
  },
  textBotton: {
    color: '#12354',
    fontSize: 18,
  },
  Image: {
    width: 100,
    height: 100,
  }
});
