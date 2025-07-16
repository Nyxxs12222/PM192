import {View, Text, Pressable, StyleSheet} from 'react-native';

export default function Settings({navigation}){
    return(
        <View style={styles.container}>
            <Text style={styles.title}>Pantalla de Configuracion</Text>

            <Pressable style={[styles.button, styles.buttonProfile]} onPress={()=> navigation.navigate('Profile')}>
                <Text style={styles.buttonText}>Ir a Perfil</Text>
            </Pressable>
            
            <Pressable style={[styles.button, styles.buttonHome]} onPress={()=> navigation.navigate('Home')}>
                <Text style={styles.buttonText}>Ir a Home</Text>
            </Pressable>
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
    button: {
        paddingVertical: 12,
        paddingHorizontal: 30,
        borderRadius: 8,
        marginBottom: 20,
        width: '80%',
        alignItems: 'center',
    },
    buttonProfile: {
        backgroundColor: '#007BFF'
    },
    buttonHome: {
        backgroundColor: '#26ff00ff'
    },
    buttonText: {
        color: '#fff',
        fontSize: 16,
        fontWeight: '600'
    }

});