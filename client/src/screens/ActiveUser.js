import { View, Text, SafeAreaView, ScrollView, RefreshControl } from "react-native";
import React, { useCallback } from "react";
import { useNavigation } from "@react-navigation/native";
import GlobalStyles from "../GlobalStyles";
import { COLORS } from "../Colors";

import AuthContext from "../context/AuthContext";
import BaseURL from "../api/BaseURL";
import Item from "../components/Item";
import { useEffect, useState, useContext } from "react";
import UserItem from "../components/UserItem";


const wait = timeout => {
  return new Promise(resolve => setTimeout(resolve, timeout));
};
const ActiveUser = () => {
  const navigation = useNavigation();
  //const [state, dispatch] = useContext(AuthContext);
  const [state, setState] = useContext(AuthContext);
  const [users, setUsers] = useState([]);

  const fetchUsers = async () => {
    let response = await fetch(`${BaseURL}/user/${state._id}/getAll`);
    let responseJson = await response.json();
    
    setUsers(responseJson);
  };

  //hiển thị người dùng lần đầu
  useEffect(()=>{
    fetchUsers();
  },[])

  // gọi sau khi navigate trang
  useEffect(()=>{
    fetchUsers();
    const willFocusSubscription = navigation.addListener('focus',()=>{
      fetchUsers();
    });
    return willFocusSubscription;
  }, [])

  //tạo biến refresh trang
  const [refreshing, setRefreshing] = useState(false);

  const onRefresh = useCallback( async() => {
    fetchUsers();

    setRefreshing(true);
    wait(1000).then(() => setRefreshing(false));
  }, []);


  return (
    <SafeAreaView style={GlobalStyles.droidSafeArea}>
      <ScrollView showsVerticalScrollIndicator={false}
        refreshControl={<RefreshControl refreshing={refreshing} onRefresh={onRefresh} />}
      >
        {users &&
          users.map((u) =>
            u.waiting ? (
              <UserItem
                key={u._id}
                user={u}
              />
            ) : undefined
          )}
      </ScrollView>
    </SafeAreaView>
  );
};

export default ActiveUser;
