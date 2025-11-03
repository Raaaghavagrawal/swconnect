import React, { useState } from 'react';
import { View, Text, TextInput, Button, StyleSheet, Alert } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';

const QUEUE_KEY = 'offlineQueue';

async function enqueue(item) {
  const current = JSON.parse((await AsyncStorage.getItem(QUEUE_KEY)) || '[]');
  current.push(item);
  await AsyncStorage.setItem(QUEUE_KEY, JSON.stringify(current));
}

export default function RegisterPatient({ navigation }) {
  const [name, setName] = useState('');
  const [age, setAge] = useState('');
  const [gender, setGender] = useState('');
  const [symptoms, setSymptoms] = useState('');
  const [vitals, setVitals] = useState('');

  const saveOffline = async () => {
    const payload = {
      type: 'CREATE_PATIENT',
      data: { name, age: Number(age), gender, symptoms, vitals },
      createdAt: Date.now(),
    };
    await enqueue(payload);
    Alert.alert('Saved offline', 'Will sync when online.');
    navigation.goBack();
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Register Patient</Text>
      <TextInput placeholder="Name" value={name} onChangeText={setName} style={styles.input} />
      <TextInput placeholder="Age" value={age} onChangeText={setAge} keyboardType="numeric" style={styles.input} />
      <TextInput placeholder="Gender" value={gender} onChangeText={setGender} style={styles.input} />
      <TextInput placeholder="Symptoms" value={symptoms} onChangeText={setSymptoms} style={styles.input} />
      <TextInput placeholder="Vitals" value={vitals} onChangeText={setVitals} style={styles.input} />
      <Button title="Save Offline" onPress={saveOffline} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 16 },
  title: { fontSize: 20, marginBottom: 16 },
  input: { borderWidth: 1, borderColor: '#ccc', padding: 12, borderRadius: 8, marginBottom: 12 },
});

