import {useNavigation} from '@react-navigation/native';
import React, {useEffect} from 'react';
import {Button, StyleSheet, Text, View} from 'react-native';
import {MainStackNavigationProp} from '../navigation/MainNavigator';
import {Federated} from '@callstack/repack/client';

const HomeScreen = () => {
  const navigation = useNavigation<MainStackNavigationProp>();
  useEffect(() => {
    Federated.importModule('MiniApp', './DeviceIdentifier')
      .then(({getDeviceIdentifier}) => {
        return getDeviceIdentifier();
      })
      .then(id => {
        console.log(id, 'ID');
      })
      .catch(err => console.error('Failed to load/getDeviceIdentifier:', err));
  }, []);

  return (
    <View style={styles.container}>
      <Text style={styles.label}>Welcome to Super App</Text>
      <Button
        color="rgba(127, 103, 190, 1)"
        title="View 2FA Token"
        onPress={() => {
          navigation.navigate('View2FAScreen');
        }}
      />
      <Button
        color="rgba(127, 103, 190, 1)"
        title="Setup 2FA Token"
        onPress={() => {
          navigation.navigate('MiniApp');
        }}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  label: {
    fontSize: 20,
    fontWeight: '700',
    marginBottom: 40,
  },
});

export default HomeScreen;
