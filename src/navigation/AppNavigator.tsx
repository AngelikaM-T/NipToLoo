import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import  { NavigationContainer } from '@react-navigation/native';
import {LoginScreen} from '../screens/login/login.screen';
import App from '../App';
import {HomeScreen} from '../screens/home/home.screen';

const { Navigator, Screen } = createNativeStackNavigator();

const AppNavigator = () => (


    <NavigationContainer>
        <Navigator screenOptions={{ headerShown: false }} initialRouteName="Login">
            <Screen name="Login" component={LoginScreen}></Screen>
            <Screen name="App" component={HomeScreen}></Screen>
        </Navigator>
    </NavigationContainer>
)

export default AppNavigator;