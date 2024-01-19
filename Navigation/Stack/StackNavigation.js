
import * as React from 'react';
import { View, Text } from 'react-native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import SplashScreen from '../../Component/LoginScreens/SplashScreen';
import LoginScreen from '../../Component/LoginScreens/LoginScreen';
import SignupScreen from '../../Component/LoginScreens/SignupScreen';
import HomePageScreen from '../../Component/HomeScreens/HomePageScreen';

const StackNavigation= ()=> {

const Stack = createNativeStackNavigator();
  return (
      <Stack.Navigator initialRouteName='Splash'>
        <Stack.Screen name="Splash" component={SplashScreen} options={{headerShown:false}}/>
        <Stack.Screen name="Login" component={LoginScreen} options={{headerShown:false}}/>
        <Stack.Screen name="Signup" component={SignupScreen} options={{headerShown:false}}/>
        <Stack.Screen name="Home" component={HomePageScreen} options={{headerShown:false}}/>
      </Stack.Navigator>
   
  );
}

export default StackNavigation;