import { createNativeStackNavigator } from '@react-navigation/native-stack';

import SignInScreen from '../screens/SignInScreen';
import SignUpScreen from '../screens/SignUpScreen';
import ForgotPassword from '../screens/ForgotPassword';
import ConfirmEmail from '../screens/ConfirmEmail';
import Verify from '../screens/Verify';

import AdminNavigator from './AdminNavigator';
import TabNavigator from './TabNavigator';
import NewPassword from '../screens/NewPassword';
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
        <Stack.Screen
          name="SignUp"
          component={SignUpScreen}
        />
        <Stack.Screen
          name="ForgotPassword"
          component={ForgotPassword}
        />
        <Stack.Screen
          name="ConfirmEmail"
          component={ConfirmEmail}
        />
        <Stack.Screen
          name="NewPassword"
          component={NewPassword}
        />
        <Stack.Screen
          name="Verify"
          component={Verify}
        />
        <Stack.Screen name="Main" component={TabNavigator} />
        <Stack.Screen name="Admin" component={AdminNavigator}/>
      </Stack.Navigator>
    );
  };

  export default StackNavigator;