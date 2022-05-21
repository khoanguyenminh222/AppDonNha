import React from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";

import HomeScreen from '../screens/HomeScreen'
import AboutScreen from '../screens/AboutScreen';


import { Ionicons } from "@expo/vector-icons";

const Tab = createBottomTabNavigator();

const TabNavigator = () => {
    return(
        <Tab.Navigator screenOptions={{
            headerShown: false,
            tabBarShowLabel: false
          }}>
            <Tab.Screen name='Home' component={HomeScreen} options={{
                tabBarIcon:({color,size})=>{
                    return <Ionicons name="home-outline" color={color} size={size}></Ionicons>
                }
            }}/>
            <Tab.Screen name='About' component={AboutScreen} options={{
                tabBarIcon:({color,size})=>{
                    return <Ionicons name="help-outline" color={color} size={size}></Ionicons>
                }}}/>
        </Tab.Navigator>
    )
}

export default TabNavigator;
