import React from 'react';
import {createStackNavigator} from '@react-navigation/stack';

import {percentToVal} from '../../styles/CommonStyles';

import DashBaord from '../DashBoard';
import AddFriend from '../AddFriend';
import EditProfile from '../EditProfile';

const Stack = createStackNavigator();

export default () => {
  return (
    <Stack.Navigator
      initialRouteName="Home"
      screenOptions={{
        gestureEnabled: false,
        headerShown: true,
        headerBackTitleVisible: false,
      }}>
      <Stack.Screen
        name="dashboard"
        component={DashBaord}
        options={{
          title: 'Chatty',
          headerStyle: {backgroundColor: '#60B2FF', height: percentToVal(8)},
          headerTitleStyle: {fontWeight: 'bold', fontSize: percentToVal(4)},
          headerTitleAlign: 'left',
          headerTintColor: '#121212',
          headerBackTitle: '',
        }}
      />
      <Stack.Screen
        name="addFriend"
        component={AddFriend}
        options={{
          title: 'Add Friend',
          headerStyle: {backgroundColor: '#60B2FF', height: percentToVal(8)},
          headerTitleStyle: {fontWeight: 'bold', fontSize: percentToVal(4)},
          headerTitleAlign: 'center',
          headerTintColor: '#121212',
          headerBackTitle: '',
        }}
      />
      <Stack.Screen
        name="editProfile"
        component={EditProfile}
        options={{
          title: 'Edit Profile',
          headerStyle: {backgroundColor: '#60B2FF', height: percentToVal(8)},
          headerTitleStyle: {fontWeight: 'bold', fontSize: percentToVal(4)},
          headerTitleAlign: 'center',
          headerTintColor: '#121212',
          headerBackTitle: '',
        }}
      />
    </Stack.Navigator>
  );
};
