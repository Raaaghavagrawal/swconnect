import React, { useEffect, useState } from 'react';
import { View, Text, Button, FlatList } from 'react-native';
import NetInfo from '@react-native-community/netinfo';
import AsyncStorage from '@react-native-async-storage/async-storage';

const QUEUE_KEY = 'offlineQueue';

async function dequeueAll() {
  const current = JSON.parse((await AsyncStorage.getItem(QUEUE_KEY)) || '[]');
  await AsyncStorage.setItem(QUEUE_KEY, JSON.stringify([]));
  return current;
}

async function getQueue() {
  return JSON.parse((await AsyncStorage.getItem(QUEUE_KEY)) || '[]');
}

export default function SyncStatus() {
  const [isOnline, setIsOnline] = useState(false);
  const [queue, setQueue] = useState([]);
  const [lastSync, setLastSync] = useState(null);

  useEffect(() => {
    const sub = NetInfo.addEventListener((state) => {
      setIsOnline(Boolean(state.isConnected));
    });
    (async () => setQueue(await getQueue()))();
    return () => sub && sub();
  }, []);

  const runSync = async () => {
    const items = await dequeueAll();
    if (items.length === 0) return;
    for (const item of items) {
      if (item.type === 'CREATE_PATIENT') {
        try {
          await fetch(`${process.env.EXPO_PUBLIC_API_BASE_URL || 'http://localhost:4000'}/api/patients`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(item.data),
          });
        } catch (e) {
          // put back to queue if failed
          const remaining = JSON.parse((await AsyncStorage.getItem(QUEUE_KEY)) || '[]');
          remaining.push(item);
          await AsyncStorage.setItem(QUEUE_KEY, JSON.stringify(remaining));
        }
      }
    }
    setLastSync(new Date().toLocaleString());
    setQueue(await getQueue());
  };

  return (
    <View style={{ flex: 1, padding: 16 }}>
      <Text style={{ marginBottom: 8 }}>Network: {isOnline ? 'Online' : 'Offline'}</Text>
      <Text style={{ marginBottom: 8 }}>Queued items: {queue.length}</Text>
      {lastSync && <Text style={{ marginBottom: 8 }}>Last sync: {lastSync}</Text>}
      <Button title="Sync Now" onPress={runSync} />
      <FlatList
        style={{ marginTop: 16 }}
        data={queue}
        keyExtractor={(_, idx) => String(idx)}
        renderItem={({ item }) => (
          <View style={{ paddingVertical: 8 }}>
            <Text>{item.type}</Text>
          </View>
        )}
      />
    </View>
  );
}

