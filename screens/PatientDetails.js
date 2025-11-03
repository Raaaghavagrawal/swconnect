import React from 'react';
import { View, Text } from 'react-native';

export default function PatientDetails({ route }) {
  const { patient } = route.params || {};
  if (!patient) return (
    <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
      <Text>No patient selected</Text>
    </View>
  );
  return (
    <View style={{ flex: 1, padding: 16 }}>
      <Text style={{ fontSize: 20, fontWeight: '600' }}>{patient.name}</Text>
      <Text>Age: {patient.age}</Text>
      <Text>Gender: {patient.gender}</Text>
      <Text>Symptoms: {patient.symptoms}</Text>
      <Text>Vitals: {patient.vitals}</Text>
    </View>
  );
}

