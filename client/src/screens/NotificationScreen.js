import { View, Text, SafeAreaView, ScrollView, StyleSheet } from 'react-native'
import React, { useContext, useEffect, useState } from 'react'
import AuthContext from "../context/AuthContext";
import GlobalStyles from "../GlobalStyles";
import { useNavigation } from "@react-navigation/native";
import { COLORS } from "../Colors";
import BaseURL from "../api/BaseURL";

import Header from '../components/Header';
import Item from '../components/Item';
import Notify from '../components/Notify';
const NotificationScreen = () => {
  const [state, setState] = useContext(AuthContext);
  const [notifies,setNotifies] = useState([]);

  const navigation = useNavigation();
  const handleBackScreen = () =>{
    navigation.goBack();
  }
  useEffect(()=>{
    const fetchNotifies = async () => {
      let response = await fetch(`${BaseURL}/notify/user/${state._id}`);
      let responseJson = await response.json();
      setNotifies(responseJson);
    };
    fetchNotifies();
  },[notifies])
  return (
    <SafeAreaView style={GlobalStyles.droidSafeArea}>
        <Header iconLeft="chevron-back-outline" onPressLeft={handleBackScreen} textCenter="Hộp thư"/>
        <ScrollView showsVerticalScrollIndicator={false}>
          <View style={styles.container}>
            {notifies.map((n)=>(<Notify key={n._id} n={n}/>))}
          </View>
      </ScrollView>
    </SafeAreaView>
  )
}

const styles = StyleSheet.create({
  container:{
    height:'100%',
    justifyContent: 'center',
    alignItems: 'center',
    paddingBottom: 20,
  }
})

export default NotificationScreen