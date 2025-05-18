import React, {useLayoutEffect} from 'react';
import {StyleSheet} from 'react-native';
import {
  createNativeStackNavigator,
  NativeStackNavigationProp,
} from '@react-navigation/native-stack';

import Setup2FAScreen from '../screens/Setup2FAScreen';
import {useNavigation} from '@react-navigation/native';
import {HeaderBackButton} from '@react-navigation/elements';

export type MainStackParamList = {
  Home: undefined;
  Gallery: undefined;
};

export type MainStackNavigationProp =
  NativeStackNavigationProp<MainStackParamList>;

const Main = createNativeStackNavigator<MainStackParamList>();

function Setup2FAScreenWrapper() {
  const navigation = useNavigation();

  useLayoutEffect(() => {
    navigation.setOptions({
      // Always render the back arrow…
      headerLeft:  props => (
            <HeaderBackButton
              {...props}
              labelVisible={false}
              onPress={() => navigation?.goBack()}
            />
          ),
    });
  }, [navigation]);

  return <Setup2FAScreen />;
}

const MainNavigator = () => {
  return (
    <Main.Navigator
      screenOptions={{
        headerTitle: 'MiniApp',
        headerStyle: {
          backgroundColor: '#4E6688',
        },
        headerTitleStyle: {
          color: 'rgba(255,255,255,1)',
        },
        headerTintColor: 'rgba(255,255,255,1)',
      }}>
      <Main.Screen name="Home" component={Setup2FAScreenWrapper} />
    </Main.Navigator>
  );
};

export default MainNavigator;
