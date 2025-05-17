
import React from 'react';
import { StyleSheet, Text, View} from 'react-native';

const HomeScreen = () => {

  return (
    <View style={styles.container}>
      <Text style={styles.label}>MiniApp HomeScreen</Text>
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
