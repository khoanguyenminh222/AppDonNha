import { View, Text, Alert, SafeAreaView, StyleSheet, ScrollView, useWindowDimensions } from 'react-native'
import React, { useEffect, useState, useContext } from 'react'
import { useNavigation } from "@react-navigation/native";

import BaseURL from '../api/BaseURL';
import GlobalStyles from "../GlobalStyles";
import AuthContext from '../context/AuthContext';
import Header from '../components/Header';
import Item from '../components/Item';
import Banner from '../components/Banner';

import Suggestion from '../components/Suggestion';



const HomeScreen = () => {
  const {height} = useWindowDimensions();
  const navigation = useNavigation();
  //const [state, dispatch] = useContext(AuthContext);

  const [state, setState] = useContext(AuthContext);
  // useEffect(()=>{
  //   const fetchUser = async()=>{
  //     let response = await fetch(`${BaseURL}/auth/users`);
  //     let responseJson = await response.json();
  //     setUsers(responseJson);
  //   }
  //   fetchUser();
  // },[users])
  const changeScreenLocation = () =>{
    navigation.navigate("Location");
  }

  const changeScreenNotify = ()=>{
    navigation.navigate("Notification");
  }

  return (
    <SafeAreaView style={GlobalStyles.droidSafeArea}>
      <Header iconLeft="location-outline" isSearch={true} iconRight={true} textLeft="Vị trí" onPressLeft={changeScreenLocation} onPressRight={changeScreenNotify}/>
    <ScrollView showsVerticalScrollIndicator={false}>
      
        {/* {users.map((u)=>(
        <Text key={u._id}>{u.username}</Text>
      ))} */}
        <View style={styles.container}>
          
          <Banner />
          <Text style={[styles.txtheader, {fontSize:height*0.04}]}>Vị trí</Text>
          <Suggestion />
          <Text style={[styles.txtheader, {fontSize:height*0.04}]}>Danh mục</Text>
          <Suggestion />
          <Text style={[styles.txtheader, {fontSize:height*0.04}]}>Tin mới nhất</Text>
          <Item title="tieu de" content={['mo ta']}/>
          
        </View>
      
    </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container:{
    flex: 1,
    position: 'relative',
  },
  txtheader:{
    paddingVertical: 5,
    paddingHorizontal: 20,
    fontSize: 24,
    fontWeight: '500',
  }
})

export default HomeScreen