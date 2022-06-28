import { createNativeStackNavigator } from '@react-navigation/native-stack';

import SignInScreen from '../screens/SignInScreen';
import SignUpScreen from '../screens/SignUpScreen';
import ForgotPassword from '../screens/ForgotPassword';
import ConfirmEmail from '../screens/ConfirmEmail';
import Verify from '../screens/Verify';
import UpdateInforScreen from '../screens/UpdateInforScreen';
import AdminNavigator from './AdminNavigator';
import TabNavigator from './TabNavigator';
import NewPassword from '../screens/NewPassword';
import NotificationScreen from '../screens/NotificationScreen';
import DetailUser from '../screens/DetailUser';
import LocationScreen from '../screens/LocationScreen';
import IndividualPostScreen from '../screens/IndividualPostScreen';
import OrganizationPostScreen from '../screens/OrganizationPostScreen';
import ManagePostScreen from '../screens/ManagePostScreen';
import DetailPost from '../screens/DetailPost';
import PersonalScreen from '../screens/PersonalScreen'
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
        <Stack.Screen
          name="UpdateInfor"
          component={UpdateInforScreen}
        />

        <Stack.Screen
          name="DetailPost"
          component={DetailPost}
        />

        <Stack.Screen 
        name="Main" 
        component={TabNavigator} 
        />

        <Stack.Screen 
        name="Admin" 
        component={AdminNavigator}
        />
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
        <Stack.Screen
          name = "IndividualPost"
          component={IndividualPostScreen}
        />
        <Stack.Screen
          name = "OrganizationPost"
          component={OrganizationPostScreen}
        />
        <Stack.Screen
          name = "ManagePost"
          component={ManagePostScreen}
        />
        <Stack.Screen
          name = "Personal"
          component={PersonalScreen}
        />
      </Stack.Navigator>
    );
  };

  export default StackNavigator;