import { View, Text } from 'react-native'
import React from 'react'
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { Ionicons } from "@expo/vector-icons";
import ActiveUser from '../screens/ActiveUser';

const Tab = createBottomTabNavigator();
const AdminNavigator = () => {
  return (
    <Tab.Navigator screenOptions={{
        tabBarShowLabel: false
      }}>
        <Tab.Screen name='ActiveUser' component={ActiveUser} options={{
            title:'Xác minh người dùng',
            tabBarIcon:({color,size})=>{
                return <Ionicons name="people-outline" color={color} size={size}></Ionicons>
            }
        }}/>
        
    </Tab.Navigator>
  )
}

export default AdminNavigator