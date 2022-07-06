
import { StyleSheet, Text, View } from 'react-native';

import { NavigationContainer } from '@react-navigation/native';

import StackNavigator from './src/navigation/StackNavigator';
import { LogBox } from 'react-native';
import AuthProvider from './src/context/AuthProvider';

LogBox.ignoreLogs(['Warning: ...']); // Ignore log notification by message
LogBox.ignoreAllLogs();//Ignore all log notifications
export default function App() {
  
  return (
    <>
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
