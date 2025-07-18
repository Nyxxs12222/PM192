import {View, Text, StyleSheet} from 'react-native';

export default function Detalles(){
    return(
        <View style={styles.container}>
            <Text style={styles.title}>Detalles de usuario</Text>
            <Text style={styles.subtitle}>Usando Navegacion Stack</Text>
            
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        alignItems: 'center',
        justifyContent: 'center',
        padding: 20,
    },
    title: {
        fontSize: 22,
        fontWeight: 'bold',
        marginBottom: 40,
        textAlign: 'center'
    },
    subtitle: {
        fontSize: 20,
        color: 'blue',
        textAlign: 'center',
    }

});