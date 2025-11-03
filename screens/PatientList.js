import React, { useEffect, useState } from 'react';
import { View, Text, FlatList, Button, TouchableOpacity } from 'react-native';

export default function PatientList({ navigation }) {
  const [patients, setPatients] = useState([]);

  useEffect(() => {
    // Initial demo state; in real app fetch from API / Firestore
    setPatients([]);
  }, []);

  return (
    <View style={{ flex: 1, padding: 16 }}>
      <View style={{ flexDirection: 'row', justifyContent: 'space-between', marginBottom: 12 }}>
        <Text style={{ fontSize: 18 }}>Patients</Text>
        <Button title="Add" onPress={() => navigation.navigate('RegisterPatient')} />
      </View>
      <FlatList
        ListEmptyComponent={<Text>No patients yet. Add some offline.</Text>}
        data={patients}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <TouchableOpacity onPress={() => navigation.navigate('PatientDetails', { patient: item })}>
            <View style={{ padding: 12, borderBottomWidth: 1, borderBottomColor: '#eee' }}>
              <Text style={{ fontWeight: '600' }}>{item.name}</Text>
              <Text>{item.symptoms}</Text>
            </View>
          </TouchableOpacity>
        )}
      />
      <View style={{ marginTop: 12 }}>
        <Button title="Sync Status" onPress={() => navigation.navigate('SyncStatus')} />
      </View>
    </View>
  );
}

