import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import LoginScreen from './screens/LoginScreen';
import RegisterPatient from './screens/RegisterPatient';
import PatientList from './screens/PatientList';
import PatientDetails from './screens/PatientDetails';
import SyncStatus from './screens/SyncStatus';

const Stack = createNativeStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Login">
        <Stack.Screen name="Login" component={LoginScreen} />
        <Stack.Screen name="PatientList" component={PatientList} />
        <Stack.Screen name="RegisterPatient" component={RegisterPatient} />
        <Stack.Screen name="PatientDetails" component={PatientDetails} />
        <Stack.Screen name="SyncStatus" component={SyncStatus} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

