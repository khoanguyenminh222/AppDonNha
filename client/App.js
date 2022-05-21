import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';

import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import StackNavigator from './src/navigation/StackNavigator';

import AuthProvider from './src/context/AuthProvider';

const Stack = createNativeStackNavigator();
export default function App() {
  const login = false;
  
  return (
    <>
      {/* {login ? 
      <NavigationContainer>
        <StackNavigator/>
      </NavigationContainer>
      : 
      <SignInScreen/>} */}
      <AuthProvider>
        <NavigationContainer>
          <StackNavigator />
        </NavigationContainer>
      </AuthProvider>
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
