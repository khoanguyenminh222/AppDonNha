import { View, Text, Alert, SafeAreaView, StyleSheet, ScrollView, useWindowDimensions, RefreshControl } from 'react-native'
import React, { useEffect, useState, useContext, useCallback } from 'react'
import { useNavigation } from "@react-navigation/native";

import BaseURL from '../api/BaseURL';
import GlobalStyles from "../GlobalStyles";
import AuthContext from '../context/AuthContext';
import Header from '../components/Header';
import Item from '../components/Item';
import Banner from '../components/Banner';

import Suggestion from '../components/Suggestion';


const wait = timeout => {
  return new Promise(resolve => setTimeout(resolve, timeout));
};
const HomeScreen = () => {
  const {height} = useWindowDimensions();

  // lấy ra người dùng hiện tại
  const fetchData = async()=>{
    const res = await fetch(`${BaseURL}/user/${state._id}`)
    res.json()
    .then(user=>{
      setState(user);
    })
  }

  //tạo biến refresh trang
  const [refreshing, setRefreshing] = useState(false);

  const onRefresh = useCallback(() => {
    fetchData();

    setRefreshing(true);
    wait(2000).then(() => setRefreshing(false));
  }, []);

  //lấy ra người dùng hiện tại
  const [state, setState] = useContext(AuthContext);

  return (
    <SafeAreaView style={GlobalStyles.droidSafeArea}>
      {state.city==="" ? 
        <Header iconLeft="location-outline" isSearch={true} iconRight={true} textLeft="Vị trí" />
        :
        <Header iconLeft="location-outline" isSearch={true} iconRight={true} textLeft={state.city} />

      }
    <ScrollView showsVerticalScrollIndicator={false}
      contentContainerStyle={styles.scrollView}
      refreshControl={<RefreshControl refreshing={refreshing} onRefresh={onRefresh} />}
    >
      
        {/* {users.map((u)=>(
        <Text key={u._id}>{u.username}</Text>
      ))} */}
        <View style={styles.container}>
          
          <Banner />
          <Text style={[styles.txtheader, {fontSize:height*0.03}]}>Vị trí</Text>
          <Suggestion />
          <Text style={[styles.txtheader, {fontSize:height*0.03}]}>Danh mục</Text>
          <Suggestion />
          <Text style={[styles.txtheader, {fontSize:height*0.03}]}>Tin mới nhất</Text>
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