import { NavigationContainer, getFocusedRouteNameFromRoute } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Ionicons } from '@expo/vector-icons';

import Home from './screens/home';
import Profile from './screens/profile';
import Settings from './screens/settings';

const Tab = createBottomTabNavigator();

export default function App() {
    return (
        <NavigationContainer>
            <Tab.Navigator
                initialRouteName="Home"
                screenOptions={({ route }) => ({
                    headerShown: false,
                    tabBarIcon: ({ color, size }) => {
                        let iconName;

                        if (route.name === 'Home') iconName = 'home';
                        else if (route.name === 'Profile') iconName = 'person';
                        else if (route.name === 'Settings') iconName = 'settings';

                        return <Ionicons name={iconName} size={size} color={color} />;
                    },
                    tabBarActiveTintColor: '#007BFF',
                    tabBarInactiveTintColor: 'gray',
                })}
            >
                <Tab.Screen name="Home" component={Home} />
                <Tab.Screen
                    name="Profile"
                    component={Profile}
                    options={({ route }) => {
                        const routeName = getFocusedRouteNameFromRoute(route) ?? '';
                        return {
                            headerShown: false,
                            tabBarStyle: routeName === 'Detalles'
                                ? { display: 'none' }
                                : {
                                      paddingBottom: 5,
                                      height: 68,
                                  },
                        };
                    }}
                />
                <Tab.Screen name="Settings" component={Settings} />
            </Tab.Navigator>
        </NavigationContainer>
    );
}