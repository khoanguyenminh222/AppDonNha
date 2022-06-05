import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';

import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import StackNavigator from './src/navigation/StackNavigator';

import AuthProvider from './src/context/AuthProvider';
import SignUpScreen from './src/screens/SignUpScreen';
import ConfirmEmail from './src/screens/ConfirmEmail';
import ForgotPassword from './src/screens/ForgotPassword';
import NewPassword from './src/screens/NewPassword';
import { SafeAreaProvider, SafeAreaView } from 'react-native-safe-area-context';
const Stack = createNativeStackNavigator();
export default function App() {
  
  return (
    <>
      <AuthProvider>
        <NavigationContainer>
          <StackNavigator />
        </NavigationContainer>
      </AuthProvider>
      {/* <SignUpScreen/> */}
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
