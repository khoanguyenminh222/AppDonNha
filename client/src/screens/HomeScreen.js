import { View, Text, Alert, SafeAreaView, StyleSheet, ScrollView } from 'react-native'
import React, { useEffect, useState, useContext } from 'react'

import BaseURL from '../api/BaseURL';
import GlobalStyles from "../GlobalStyles";
import AuthContext from '../context/AuthContext';
import Header from '../components/Header';
import Post from '../components/Post';
import Banner from '../components/Banner';
import Item from '../components/Item';


const HomeScreen = () => {

  const [state, dispatch] = useContext(AuthContext);
  console.log(state.user.fullname);
  const [user, setUser] = useState([]);
  
  // useEffect(()=>{
  //   const fetchUser = async()=>{
  //     let response = await fetch(`${BaseURL}/auth/users`);
  //     let responseJson = await response.json();
  //     setUsers(responseJson);
  //   }
  //   fetchUser();
  // },[users])


  return (
    <ScrollView showsVerticalScrollIndicator={false}>
    <SafeAreaView style={GlobalStyles.droidSafeArea}>
      {/* {users.map((u)=>(
        <Text key={u._id}>{u.username}</Text>
      ))} */}
      <Header/>
      <Banner/>
      <Text style={styles.txtheader}>Vị trí</Text>
      <Item/>
      <Text style={styles.txtheader}>Danh mục</Text>
      <Item/>
      <Text style={styles.txtheader}>Tin mới nhất</Text>
      <Post/>
      <Post/>
      <Post/>
      
    </SafeAreaView>
    </ScrollView>
  )
}

const styles = StyleSheet.create({
  txtheader:{
    paddingVertical: 20,
    paddingHorizontal: 20,
    fontSize: 24,
    fontStyle: 'bold',
  }
})

export default HomeScreen