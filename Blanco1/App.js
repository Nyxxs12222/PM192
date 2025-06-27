import { StatusBar } from 'expo-status-bar';
import React, { useState, useEffect } from 'react';
import { StyleSheet, Text, View, ScrollView, TextInput, TouchableOpacity } from 'react-native';

export default function App() {
  const [nombres, setNombres] = useState([
    'Polo', 'Marlen', 'Baruch', 'Gabo', 'Miguel', 'Yahir',
    'Alexis', 'Marian', 'Gael', 'Mario', 'Paola', 'Toñito',
    'Diana', 'Daniela', 'Uri'
  ]);

  const [nuevoNombre, setNuevoNombre] = useState('');

  const [scrollHeight, setScrollHeight] = useState(0);
  const [contentHeight, setContentHeight] = useState(0);
  const [scrollY, setScrollY] = useState(0);

  const handleScroll = (event) => {
    setScrollY(event.nativeEvent.contentOffset.y);
  };

  const scrollbarHeight = scrollHeight * (scrollHeight / contentHeight);
  const scrollbarPosition = scrollY * (scrollHeight / contentHeight);

  const agregarNombre = () => {
    const nombreTrim = nuevoNombre.trim();
    if (nombreTrim.length > 0) {
      setNombres([...nombres, nombreTrim]);
      setNuevoNombre('');
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.titulo}>Pase de Lista</Text>

      <View style={styles.inputRow}>
        <TextInput
          style={styles.input}
          placeholder="Agréguese a la lista"
          placeholderTextColor="#888"
          value={nuevoNombre}
          onChangeText={setNuevoNombre}
          onSubmitEditing={agregarNombre}
          returnKeyType="done"
        />
        <TouchableOpacity style={styles.btnAgregar} onPress={agregarNombre}>
          <Text style={styles.btnText}>Agregar</Text>
        </TouchableOpacity>
      </View>

      <View
        style={styles.scrollWrapper}
        onLayout={(event) => setScrollHeight(event.nativeEvent.layout.height)}
      >
        <ScrollView
          style={styles.scrollArea}
          onContentSizeChange={(w, h) => setContentHeight(h)}
          onScroll={handleScroll}
          scrollEventThrottle={16}
          showsVerticalScrollIndicator={false}
        >
          {nombres.map((nombre, index) => (
            <View key={index} style={styles.item}>
              <Text style={styles.texto}>{nombre}</Text>
            </View>
          ))}
        </ScrollView>

        {contentHeight > scrollHeight && (
          <View style={[styles.scrollBar, { height: scrollbarHeight, top: scrollbarPosition }]} />
        )}
      </View>

      <StatusBar style="light" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#e0eff1',
    paddingTop: 50,
    paddingHorizontal: 20,
  },
  titulo: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#012677',
    marginBottom: 15,
    textAlign: 'center',
  },
  inputRow: {
    flexDirection: 'row',
    marginBottom: 15,
  },
  input: {
    flex: 1,
    backgroundColor: '#ffffff',
    color: '#000000',
    borderRadius: 10,
    paddingHorizontal: 15,
    fontSize: 16,
    height: 45,
    marginRight: 10,
  },
  btnAgregar: {
    backgroundColor: '#012677',
    borderRadius: 10,
    paddingHorizontal: 15,
    justifyContent: 'center',
  },
  btnText: {
    color: '#fff',
    fontWeight: 'bold',
  },
  scrollWrapper: {
    position: 'relative',
    height: 500,
  },
  scrollArea: {
    backgroundColor: '#7db4b5',
    borderRadius: 12,
    padding: 10,
    height: 500,
    borderWidth: 1,
  },
  item: {
    marginBottom: 10,
    padding: 15,
    backgroundColor: '#ffffff',
    borderRadius: 10,
  },
  texto: {
    fontSize: 18,
    color: '#000000',
  },
  scrollBar: {
    position: 'absolute',
    width: 8,
    right: 2,
    backgroundColor: '#000000',
    borderRadius: 3,
  },
});