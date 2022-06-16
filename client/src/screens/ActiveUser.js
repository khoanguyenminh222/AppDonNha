import { View, Text, SafeAreaView, ScrollView } from "react-native";
import React from "react";
import { useNavigation } from "@react-navigation/native";
import GlobalStyles from "../GlobalStyles";
import { COLORS } from "../Colors";

import AuthContext from "../context/AuthContext";
import BaseURL from "../api/BaseURL";
import Item from "../components/Item";
import { useEffect, useState, useContext } from "react";
import UserItem from "../components/UserItem";

const ActiveUser = () => {
  
  //const [state, dispatch] = useContext(AuthContext);
  const [state, setState] = useContext(AuthContext);
  const [users, setUsers] = useState([]);

  const fetchUsers = async () => {
    let response = await fetch(`${BaseURL}/user/${state._id}/getAllVerify`);
    let responseJson = await response.json();
    
    setUsers(responseJson);
  };
  useEffect(()=>{
    console.log(users)
    fetchUsers();
  },[])


  return (
    <SafeAreaView style={GlobalStyles.droidSafeArea}>
      <ScrollView showsVerticalScrollIndicator={false}>
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
