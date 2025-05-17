import React, { useLayoutEffect } from 'react';
import {StyleSheet} from 'react-native';
import {
  createNativeStackNavigator,
  NativeStackNavigationProp,
} from '@react-navigation/native-stack';

import HomeScreen from '../screens/HomeScreen';
import { useNavigation } from '@react-navigation/native';
import { HeaderBackButton } from '@react-navigation/elements';

export type MainStackParamList = {
  Home: undefined;
  Gallery: undefined;
};

export type MainStackNavigationProp =
  NativeStackNavigationProp<MainStackParamList>;

const Main = createNativeStackNavigator<MainStackParamList>();

function MiniHomeWrapper() {
  const navigation = useNavigation();

  useLayoutEffect(() => {
    navigation.setOptions({
      // Always render the back arrow…
      headerLeft: props => (
        <HeaderBackButton
          {...props}
          labelVisible={false} 
          onPress={() => navigation?.goBack()}
          
        />
      ),
    });
  }, [navigation]);

  return <HomeScreen />;
};


const MainNavigator = () => {
  return (
    <Main.Navigator
      screenOptions={{
        headerTitle: 'MiniApp',
        headerBackTitleVisible: false,
        headerStyle: styles.header,
        headerTitleStyle: styles.headerTitle,
        headerTintColor: 'rgba(255,255,255,1)',
        headerBackVisible: true,
        headerBackTitle:''
      }}>
      <Main.Screen name="Home" component={MiniHomeWrapper} />
    </Main.Navigator>
  );
};

const styles = StyleSheet.create({
  header: {
    backgroundColor: 'rgba(79, 55, 139, 1)',
  },
  headerTitle: {
    color: 'rgba(255,255,255,1)',
  },
});

export default MainNavigator;
