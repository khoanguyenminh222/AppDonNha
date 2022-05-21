import { createNativeStackNavigator } from '@react-navigation/native-stack';

import SignInScreen from '../screens/SignInScreen'
import TabNavigator from './TabNavigator';
const Stack = createNativeStackNavigator();

const StackNavigator = () => {
    return (
      <Stack.Navigator
        screenOptions={{
          headerShown: false,
          tabBarShowLabel: false,
        }}
      >
        <Stack.Screen
          name="SignIn"
          component={SignInScreen}
          
        />
        <Stack.Screen name="Main" component={TabNavigator} />
      </Stack.Navigator>
    );
  };

  export default StackNavigator;