import React from 'react';
import {createStackNavigator} from '@react-navigation/stack';
import LoginPage from '../LoginPage';
import SignUpPage from '../SignUpPage';

const Stack = createStackNavigator();

export default () => {
  return (
    <Stack.Navigator
      initialRouteName="Home"
      screenOptions={{gestureEnabled: false, headerShown: false}}>
      <Stack.Screen name="loginPage" component={LoginPage} />
      <Stack.Screen name="signupPage" component={SignUpPage} />
    </Stack.Navigator>
  );
}
