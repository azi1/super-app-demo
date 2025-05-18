import React, {useEffect, useState} from 'react';
import {
  SafeAreaView,
  ScrollView,
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  Platform,
  ToastAndroid,
  Alert,
} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';


const STORAGE_KEYS = {
  issuer: '2FA_ISSUER',
  secret: '2FA_SECRET',
  interval: '2FA_INTERVAL',
};

const Setup2FAScreen = () => {
  const [issuer, setIssuer] = useState('');
  const [secret, setSecret] = useState('');
  const [interval, setInterval] = useState('');


  const handleSave = async () => {
    try {
      await AsyncStorage.multiSet([
        [STORAGE_KEYS.issuer, issuer],
        [STORAGE_KEYS.secret, secret],
        [STORAGE_KEYS.interval, interval],
      ]);
      // Show confirmation toast or alert
      if (Platform.OS === 'android') {
        ToastAndroid.show('2FA settings saved', ToastAndroid.SHORT);
      } else {
        Alert.alert('Success', '2FA settings saved');
      }
      // Clear local input states
      setIssuer('');
      setSecret('');
      setInterval('');
    } catch (e) {
      console.error('Failed to save 2FA data', e);
      if (Platform.OS === 'android') {
        ToastAndroid.show('Error saving settings', ToastAndroid.SHORT);
      } else {
        Alert.alert('Error', 'Failed to save 2FA settings');
      }
    }
  };

  // async function show2faCode() {
  //   try {
  //     const code = await generateToken();
  //     console.log('2FA code:', code);
  //     // …update state/UI…
  //   } catch (e) {
  //     console.error('Failed to load or run generateToken:', e);
  //   }
  // }

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView contentContainerStyle={styles.content}>
        <Text style={styles.title}>2FA Mini App</Text>
        <Text style={styles.subtitle}>Setup 2FA</Text>

        <View style={styles.field}>
          <Text style={styles.label}>Issuer:</Text>
          <TextInput
            style={styles.input}
            placeholder="Enter issuer"
            value={issuer}
            onChangeText={setIssuer}
          />
        </View>

        <View style={styles.field}>
          <Text style={styles.label}>Secret:</Text>
          <TextInput
            style={styles.input}
            placeholder="Enter secret"
            value={secret}
            onChangeText={setSecret}
          />
        </View>

        <View style={styles.field}>
          <Text style={styles.label}>Interval:</Text>
          <TextInput
            style={styles.input}
            placeholder="Enter interval"
            keyboardType="numeric"
            value={interval} 
            onChangeText={setInterval}
          />
        </View>

        <TouchableOpacity style={styles.saveButton} onPress={handleSave}>
          <Text style={styles.buttonText}>Save</Text>
        </TouchableOpacity>
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  content: {
    padding: 20,
    alignItems: 'stretch',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 8,
  },
  subtitle: {
    fontSize: 18,
    textAlign: 'center',
    marginBottom: 16,
  },
  deviceLabel: {
    fontSize: 16,
    marginBottom: 12,
  },
  device: {
    fontWeight: '600',
  },
  field: {
    marginBottom: 16,
  },
  label: {
    fontSize: 16,
    marginBottom: 6,
  },
  input: {
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 6,
    paddingHorizontal: 12,
    paddingVertical: 10,
    fontSize: 16,
  },
  saveButton: {
    backgroundColor: '#007AFF',
    borderRadius: 6,
    paddingVertical: 14,
    alignItems: 'center',
    marginTop: 10,
  },
  backButton: {
    backgroundColor: '#ccc',
    borderRadius: 6,
    paddingVertical: 14,
    alignItems: 'center',
    marginTop: 12,
  },
  buttonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '600',
  },
});

export default Setup2FAScreen;
