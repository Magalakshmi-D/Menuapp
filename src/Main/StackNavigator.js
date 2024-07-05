import React, { useState, useContext } from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import { NavigationContainer } from '@react-navigation/native';
import { useLogin } from './LoginProvider';
import { MainDrawerScreen } from './DrawerScreen';
import {
    Login,
    Splash,
    Forgot,
    SignUp,
} from '../screens';
const Stack = createStackNavigator();

const StackNavigator = () => {
    const forFade = ({ current }) => ({
        cardStyle: {
            opacity: current.progress,
        },
    });
    return (
        <NavigationContainer >
            <Stack.Navigator
                initialRouteName="Forgot"
            >
                {/* <Stack.Screen
                    component={Splash}
                    name='Splash'
                    options={{ headerShown: false }}
                /> */}
                <Stack.Screen
                    component={Login}
                    name='Login'
                    options={{ headerShown: false }}
                />
                <Stack.Screen component={Forgot} name='Forgot'
                    options={{
                        title: 'Goback Login',
                        headerShown: false
                    }}
                />
                <Stack.Screen component={SignUp} name='SignUp'
                    options={{
                        title: 'Goback Login',
                        headerShown: false
                    }}
                />


            </Stack.Navigator>
        </NavigationContainer>
    )
}
export const MainNavigator = () => {
    const { isLoggedIn, setIsLoggedIn } = useLogin()
    return isLoggedIn ? <MainDrawerScreen /> : <StackNavigator />
}