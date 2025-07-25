import React, { useState } from 'react';
import { Modal, View, Text, Button, TextInput, StyleSheet } from 'react-native';

export default function App() {
  const [modalVisible, setModalVisible] = useState(false);
  const [confirmacionVisible, setConfirmacionVisible] = useState(false);
  const [errorVisible, setErrorVisible] = useState(false);
  const [mensajeError, setMensajeError] = useState('');

  const [nombre, setNombre] = useState('');
  const [correo, setCorreo] = useState('');

  const guardarDatos = () => {
    if (nombre.trim() === '' && correo.trim() === '') {
      setMensajeError('Faltan el nombre y el correo');
      setErrorVisible(true);
    } else if (nombre.trim() === '') {
      setMensajeError('Falta el nombre');
      setErrorVisible(true);
    } else if (correo.trim() === '') {
      setMensajeError('Falta el correo');
      setErrorVisible(true);
    } else {
      setModalVisible(false);
      setConfirmacionVisible(true);
      setNombre('');
      setCorreo('');
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Formulario en Modal</Text>
      <Button title="Abrir Formulario" onPress={() => setModalVisible(true)} />

      {/* Modal del Formulario */}
      <Modal
        visible={modalVisible}
        animationType="slide"
        transparent={true}
        onRequestClose={() => setModalVisible(false)}
      >
        <View style={styles.modalBackground}>
          <View style={styles.modalBox}>
            <Text style={styles.modalTitle}>Ingresa tus datos</Text>
            <TextInput
              placeholder="Nombre"
              style={styles.input}
              value={nombre}
              onChangeText={setNombre}
            />
            <TextInput
              placeholder="Correo"
              style={styles.input}
              keyboardType="email-address"
              value={correo}
              onChangeText={setCorreo}
            />
            <View style={styles.buttonRow}>
              <Button title="GUARDAR" onPress={guardarDatos} />
              <Button title="CANCELAR" onPress={() => setModalVisible(false)} />
            </View>
          </View>
        </View>
      </Modal>

      {/* Modal de Confirmación */}
      <Modal
        visible={confirmacionVisible}
        transparent={true}
        animationType="fade"
        onRequestClose={() => setConfirmacionVisible(false)}
      >
        <View style={styles.modalBackground}>
          <View style={styles.modalBox}>
            <Text style={styles.modalTitle}>✅ ¡Datos guardados correctamente!</Text>
            <Button title="CERRAR" onPress={() => setConfirmacionVisible(false)} />
          </View>
        </View>
      </Modal>

      {/* Modal de Error */}
      <Modal
        visible={errorVisible}
        transparent={true}
        animationType="fade"
        onRequestClose={() => setErrorVisible(false)}
      >
        <View style={styles.modalBackground}>
          <View style={styles.errorBox}>
            <Text style={styles.errorTitle}>⚠️ Error</Text>
            <Text style={styles.errorMessage}>{mensajeError}</Text>
            <Button title="OK" onPress={() => setErrorVisible(false)} />
          </View>
        </View>
      </Modal>
    </View>
  );
}

// Estilos
const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#E0F2FE'
  },
  title: {
    fontSize: 24,
    marginBottom: 20,
    fontWeight: 'bold',
    color: '#1D4ED8'
  },
  modalBackground: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.5)',
    justifyContent: 'center',
    alignItems: 'center'
  },
  modalBox: {
    backgroundColor: 'white',
    padding: 25,
    borderRadius: 20,
    width: '75%',
    maxWidth: 400,
    elevation: 10,
    shadowColor: '#000',
    shadowOpacity: 0.25,
    shadowRadius: 10,
    shadowOffset: { width: 0, height: 4 }
  },
  modalTitle: {
    fontSize: 20,
    marginBottom: 15,
    textAlign: 'center',
    fontWeight: 'bold',
    color: '#1E3A8A'
  },
  input: {
    borderColor: '#CBD5E1',
    borderWidth: 1,
    borderRadius: 10,
    marginBottom: 12,
    paddingHorizontal: 12,
    height: 45,
    fontSize: 16,
    backgroundColor: '#F8FAFC'
  },
  buttonRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 10
  },
  errorBox: {
    backgroundColor: '#FEE2E2',
    borderColor: '#DC2626',
    borderWidth: 2,
    padding: 25,
    borderRadius: 20,
    width: '75%',
    maxWidth: 400,
    elevation: 10,
    shadowColor: '#000',
    shadowOpacity: 0.25,
    shadowRadius: 10,
    shadowOffset: { width: 0, height: 4 }
  },
  errorTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#B91C1C',
    textAlign: 'center',
    marginBottom: 10
  },
  errorMessage: {
    fontSize: 16,
    color: '#7F1D1D',
    textAlign: 'center',
    marginBottom: 15
  }
});