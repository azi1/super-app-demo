import React, {useEffect, useState} from 'react';
import {
  SafeAreaView,
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
} from 'react-native';
import {Federated} from '@callstack/repack/client';
import {useNavigation} from '@react-navigation/native';

export default function View2FAScreen() {
  const [code, setCode] = useState<string | null>(null);
  const navigation = useNavigation();

  async function show2faCode() {
    try {
      const {generateToken} = await Federated.importModule(
        'MiniApp',
        './GenerateToken',
      );
      const newCode = await generateToken();
      console.log('2FA code:', newCode);
      setCode(newCode);
    } catch (e) {
      console.error('Failed to load or run generateToken:', e);
    }
  }

  useEffect(() => {
    show2faCode();
  }, []);

  return (
    <SafeAreaView style={styles.container}>

      {/* Main content */}
      <View style={styles.content}>
        <Text style={styles.subtitle}>Your 2FA code is</Text>

        <View style={styles.codeBox}>
          <Text style={styles.codeText}>{code ?? '••••••'}</Text>
        </View>

        <TouchableOpacity style={styles.button} onPress={show2faCode}>
          <Text style={styles.buttonText}>Refresh</Text>
        </TouchableOpacity>
      </View>

      {/* Footer */}
      <View style={styles.footer}>
        <TouchableOpacity
          style={styles.backButton}
          onPress={() => navigation.goBack()}>
          <Text style={styles.backButtonText}>{'< '}Back</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  header: {
    paddingVertical: 20,
    alignItems: 'center',
  },
  title: {
    fontSize: 20,
    fontWeight: '600',
  },
  content: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 32,
  },
  subtitle: {
    fontSize: 16,
    marginBottom: 16,
  },
  codeBox: {
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 8,
    paddingVertical: 12,
    paddingHorizontal: 24,
    marginBottom: 24,
  },
  codeText: {
    fontSize: 24,
    fontWeight: '700',
    letterSpacing: 4,
  },
  button: {
    borderWidth: 1,
    borderColor: '#007AFF',
    borderRadius: 8,
    paddingVertical: 10,
    paddingHorizontal: 32,
  },
  buttonText: {
    fontSize: 16,
    color: '#007AFF',
  },
  footer: {
    padding: 16,
    alignItems: 'center',
  },
  backButton: {
    borderWidth: 1,
    borderColor: '#888',
    borderRadius: 8,
    paddingVertical: 8,
    paddingHorizontal: 20,
  },
  backButtonText: {
    fontSize: 14,
    color: '#444',
  },
});
