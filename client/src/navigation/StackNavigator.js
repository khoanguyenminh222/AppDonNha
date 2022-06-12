import { createNativeStackNavigator } from '@react-navigation/native-stack';

import SignInScreen from '../screens/SignInScreen';
import SignUpScreen from '../screens/SignUpScreen';
import ForgotPassword from '../screens/ForgotPassword';
import ConfirmEmail from '../screens/ConfirmEmail';
import Verify from '../screens/Verify';

import AdminNavigator from './AdminNavigator';
import TabNavigator from './TabNavigator';
import NewPassword from '../screens/NewPassword';
import NotificationScreen from '../screens/NotificationScreen';

import DetailUser from '../screens/DetailUser';
import LocationScreen from '../screens/LocationScreen';
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
        <Stack.Screen
          name="DetailUser"
          component={DetailUser}
        />
        <Stack.Screen
          name="Notification"
          component={NotificationScreen}
        />
        <Stack.Screen
          name="Location"
          component={LocationScreen}
        />
      </Stack.Navigator>
    );
  };

  export default StackNavigator;