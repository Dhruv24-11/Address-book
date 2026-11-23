import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { RootStackParamList } from './types';
import LoginScreen from '../screens/LoginScreen';
import AddressListScreen from '../screens/AddressListScreen';
import AddressFormScreen from '../screens/AddressFormScreen';

const Stack = createNativeStackNavigator<RootStackParamList>();

export default function AppNavigator() {
  return (
    <Stack.Navigator
      initialRouteName="Login"
      screenOptions={{
        headerStyle: {
          backgroundColor: '#FFFFFF',
        },
        headerTitleStyle: {
          fontWeight: '800',
          fontSize: 18,
          color: '#111827',
        },
        headerTintColor: '#E1306C', // Instagram pink back/tint color
        headerShadowVisible: true,
        animation: 'slide_from_right',
      }}
    >
      <Stack.Screen
        name="Login"
        component={LoginScreen}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="AddressList"
        component={AddressListScreen}
        options={{
          title: 'Addresses',
          headerBackVisible: false,
        }}
      />
      <Stack.Screen
        name="AddressForm"
        component={AddressFormScreen}
        options={{
          title: 'New Address',
        }}
      />
    </Stack.Navigator>
  );
}
