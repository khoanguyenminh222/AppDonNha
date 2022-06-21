import React from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";

import HomeScreen from '../screens/HomeScreen'
import AboutScreen from '../screens/AboutScreen';
import PostScreen from '../screens/PostScreen';
import ManagePostScreen from '../screens/ManagePostScreen';


import { Ionicons } from "@expo/vector-icons";

const Tab = createBottomTabNavigator();

const TabNavigator = () => {
    return(
        <Tab.Navigator screenOptions={{
            headerShown: false,

          }}>
            <Tab.Screen name='Home' component={HomeScreen} options={{
                title: "Trang chủ",
                tabBarIcon:({color,size})=>{
                    return <Ionicons name="home-outline" color={color} size={size}></Ionicons>
                }
            }}/>
            <Tab.Screen name='Post' component={PostScreen} options={{
                 title: "Đăng tin",
                tabBarIcon:({color,size})=>{
                    return <Ionicons name="create-outline" color={color} size={size}></Ionicons>
                }}}/>
            <Tab.Screen name='ManagePost' component={ManagePostScreen} options={{
                 title: "Quản lý tin",
                tabBarIcon:({color,size})=>{
                    return <Ionicons name="reader-outline" color={color} size={size}></Ionicons>
                }}}/>
            <Tab.Screen name='About' component={AboutScreen} options={{
                 title: "Thông tin",
                tabBarIcon:({color,size})=>{
                    return <Ionicons name="help-outline" color={color} size={size}></Ionicons>
                }}}/>
            
        </Tab.Navigator>
    )
}

export default TabNavigator;
