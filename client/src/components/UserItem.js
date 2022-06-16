import { View, Text, Image, StyleSheet, useWindowDimensions, TouchableOpacity, Pressable } from 'react-native'
import React, { useEffect, useState } from 'react'
import { useNavigation } from "@react-navigation/native";
import PublicFolder from "../api/PublicFolder";
import Logo from "../../assets/images/logo.png";
import { COLORS } from '../Colors';

const UserItem = ({user}) => {
    const { height } = useWindowDimensions();
    

    const navigation = useNavigation();
    const onDetailPresed = (user) => {
        navigation.navigate("DetailUser", user);
      };

  return (
    <TouchableOpacity onPress={()=>onDetailPresed(user)}>

        <View style={styles.container}>
        <Image
          source={{uri: PublicFolder+user.profilePicture}}
          style={[styles.logo, { height: height * 0.3 }]}
          resizeMode="contain"
        />
        <View style={styles.wrapperText}>
          <Text style={[styles.title,{fontSize:height*0.03}]}>Họ tên: {user.fullname}</Text>
          <Text style={[styles.content, {fontSize:height*0.02}]}>{user.email}</Text>
          <Text style={[styles.content, {fontSize:height*0.02}]}>{user.dayOfBirth}</Text>
          <Text style={[styles.content, {fontSize:height*0.02}]}>{user.phone}</Text>
          <Text style={[styles.content, {fontSize:height*0.02}]}>{user.from}</Text>
        </View>
        
      </View>

    
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-around",
    marginHorizontal: 20,
    marginBottom: 30,
  },
  wrapperText: {
    flex: 2,
    marginLeft: 20,
    justifyContent: 'center',
  },
  logo: {
    flex: 1,
    width: "28%",
    maxWidth: 80,
    maxHeight: 100,
  },
  title: {
    fontSize: 24,
    fontWeight: "400",
  },
  content: {
    fontSize: 18,
    lineHeight: 24,
  },
})

export default UserItem