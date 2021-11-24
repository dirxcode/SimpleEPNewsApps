import React from 'react';
import HomeScreen from '_screens/HomeScreen';
import DetailScreen from '_screens/DetailScreen';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

const Stack = createNativeStackNavigator();

const AppNavigator = () => {
return (    
    <NavigationContainer>
        <Stack.Navigator>
            <Stack.Screen name="HomeScreen" component={HomeScreen} options={{headerShown: false}} />
            <Stack.Screen name="DetailScreen" component={DetailScreen} options={{headerShown: false}} />
        </Stack.Navigator>
    </NavigationContainer>
);
}
 
 export default AppNavigator;
 