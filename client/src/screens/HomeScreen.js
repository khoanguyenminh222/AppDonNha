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

import imageBanner1 from "../../assets/images/banner1.png"
import imageBanner2 from "../../assets/images/banner2.png"

import imageHCM from "../../assets/images/HCM.jpg";
import imageDN from "../../assets/images/DN.jpg";
import imageHN from "../../assets/images/HN.jpg";
import imagePhongTro from "../../assets/images/phong-tro.jpg";
import imageCanHo from "../../assets/images/can-ho.jpg";
import imageNhaO from "../../assets/images/nha-o.jpg";
import imageVanPhong from "../../assets/images/van-phong.jpg";
import PublicFolder from '../api/PublicFolder';


const wait = timeout => {
  return new Promise(resolve => setTimeout(resolve, timeout));
};
const HomeScreen = () => {
  const navigation = useNavigation();
  const {height} = useWindowDimensions();

  //lấy ra người dùng hiện tại
  const [state, setState] = useContext(AuthContext);
  
  //lưu tin đăng
  const [posts, setPosts] = useState([]);

  // lấy ra người dùng hiện tại
  const fetchData = async()=>{
    const res = await fetch(`${BaseURL}/user/${state._id}`)
    res.json()
    .then(user=>{
      setState(user);
      fetchPost(user);
    })
  }

  // lấy ra các tin vị trí gần nhất
  const fetchPost = async(user) => {
    const respond = await fetch(`${BaseURL}/postUser?lng=${user.coordinates[0]}&lat=${user.coordinates[1]}`)
    respond.json()
    .then(p=>{
      setPosts(p);
      console.log(p)
    })
  }

  // gọi sau khi navigate trang
  useEffect(()=>{
    fetchData();
    const willFocusSubscription = navigation.addListener('focus',()=>{
      fetchData();
    });
    return willFocusSubscription;
  }, [])

  //tạo biến refresh trang
  const [refreshing, setRefreshing] = useState(false);

  const onRefresh = useCallback(() => {
    fetchData();
    setRefreshing(true);
    wait(2000).then(() => setRefreshing(false));
  }, []);

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
          <ScrollView style={styles.containBanner} horizontal={true} showsHorizontalScrollIndicator={false}>
            <Banner source={imageBanner1}/>
            <Banner source={imageBanner2}/>
          </ScrollView>
          
          <Text style={[styles.txtheader, {fontSize:height*0.03}]}>Vị trí</Text>
          <ScrollView style={styles.containSuggestion}
            horizontal={true}>
            <Suggestion content="TP.Hồ Chí Minh" source={imageHCM}/>
            <Suggestion content="TP.Đà nẵng" source={imageDN}/>
            <Suggestion content="Hà Nội" source={imageHN}/>
          </ScrollView>
          
          <Text style={[styles.txtheader, {fontSize:height*0.03}]}>Danh mục</Text>
          <ScrollView style={styles.containSuggestion}
            horizontal={true}
            showsHorizontalScrollIndicator={false}>
          
            <Suggestion content="Phòng trọ" source={imagePhongTro}/>
            <Suggestion content="Căn hộ" source={imageCanHo}/>
            <Suggestion content="Nhà ở" source={imageNhaO}/>
            <Suggestion content="Văn phòng" source={imageVanPhong}/>
          </ScrollView>
          <Text style={[styles.txtheader, {fontSize:height*0.03}]}>Tin mới nhất</Text>
          
          {posts && posts.map((post)=>(
            post.isWaiting==false && post.isCancel==false ? 
            <Item key={post._id} post={post}/>
            :
            undefined
          ))}
          
          
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
  containBanner:{
    flexDirection: "row",
    width: '100%',    
    maxheight: 500,
  },
  txtheader:{
    paddingVertical: 5,
    paddingHorizontal: 20,
    fontSize: 24,
    fontWeight: '500',
  },
  containSuggestion:{
    paddingHorizontal: 10,
    flexDirection: "row",
    width: '100%',    
    flex: 1,
    height: 100,
    overflow: 'hidden',

  }
})

export default HomeScreen