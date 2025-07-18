import { View, Text, StyleSheet, Pressable } from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import Detalles from './detalles';

const Stack = createNativeStackNavigator();

function ProfileMain({ navigation }) {
    return (
        <View style={styles.container}>
            <View style={styles.iconRow}>
                <Ionicons name="person-outline" size={28} color="green" />
                <Text style={styles.title}>Perfil de usuario</Text>

                <Pressable
                    style={[styles.button, styles.buttonDetalle]}
                    onPress={() => navigation.navigate('Detalles')}
                >
                    <Text style={styles.buttonText}>Detalles de Perfil</Text>
                </Pressable>
            </View>
        </View>
    );
}

export default function Profile() {
    return (
        <Stack.Navigator>
            <Stack.Screen
                name="ProfileMain"
                component={ProfileMain}
                options={{ headerShown: false }}
            />
            <Stack.Screen
                name="Detalles"
                component={Detalles}
                options={{
                    headerShown: true,
                    presentation: 'card',
                }}
            />
        </Stack.Navigator>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        justifyContent: 'center',
        alignItems: 'center',
        padding: 20
    },
    iconRow: {
        flexDirection: 'column',
        alignItems: 'center'
    },
    title: {
        fontSize: 22,
        fontWeight: 'bold',
        marginLeft: 10,
        color: 'green'
    },
    button: {
        paddingVertical: 12,
        paddingHorizontal: 30,
        borderRadius: 8,
        marginBottom: 20,
        width: '80%',
        alignItems: 'center',
    },
    buttonDetalle: {
        backgroundColor: '#007BFF'
    },
    buttonText: {
        color: '#fff',
        fontSize: 16,
        fontWeight: '600'
    }
});