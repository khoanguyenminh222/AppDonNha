import { View, Text, SafeAreaView, ScrollView, RefreshControl } from 'react-native'
import React, { useCallback, useContext, useEffect, useState } from 'react'
import GlobalStyles from '../GlobalStyles'
import Item from '../components/Item'
import AuthContext from '../context/AuthContext';
import baseURL from '../api/BaseURL';
import { useNavigation } from '@react-navigation/native';

const wait = timeout => {
    return new Promise(resolve => setTimeout(resolve, timeout));
  };

const ActivePost = () => {
    const navigation = useNavigation();
  const [state, setState] = useContext(AuthContext);
  const [posts, setPosts] = useState([]);

  const fetchPosts = async () => {
    let response = await fetch(`${baseURL}/postUser/${state._id}/getPostWaiting`)
    .then(res=>res.json())
    .then(resJson=>{
        setPosts(resJson);
    })
  };

  //hiển thị người dùng lần đầu
  useEffect(()=>{
    fetchPosts();
  },[])

  // gọi sau khi navigate trang
  useEffect(()=>{
    fetchPosts();
    const willFocusSubscription = navigation.addListener('focus',()=>{
        fetchPosts();
    });
    return willFocusSubscription;
  }, [])

  //tạo biến refresh trang
  const [refreshing, setRefreshing] = useState(false);

  const onRefresh = useCallback( async() => {
    fetchPosts();

    setRefreshing(true);
    wait(1000).then(() => setRefreshing(false));
  }, []);

  return (
    <SafeAreaView style={GlobalStyles.droidSafeArea}>
      <ScrollView showsVerticalScrollIndicator={false}
        refreshControl={<RefreshControl refreshing={refreshing} onRefresh={onRefresh} />}
      >
        {posts &&
          posts.map((post) =>
            (
              <Item
                key={post._id}
                post={post}
              />
            )
          )}
      </ScrollView>
    </SafeAreaView>
  )
}

export default ActivePost