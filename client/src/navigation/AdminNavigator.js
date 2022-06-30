import { View, Text } from 'react-native'
import React from 'react'
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { Ionicons } from "@expo/vector-icons";
import ActiveUser from '../screens/ActiveUser';
import ActivePost from '../screens/ActivePost';

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
        <Tab.Screen name='ActivePost' component={ActivePost} options={{
            title:'Xác minh tin đăng',
            tabBarIcon:({color,size})=>{
                return <Ionicons name="briefcase-outline" color={color} size={size}></Ionicons>
            }
        }}/>
    </Tab.Navigator>
  )
}

export default AdminNavigator