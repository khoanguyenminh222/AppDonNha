import { View, Text, SafeAreaView, ScrollView } from "react-native";
import React from "react";
import { useNavigation } from "@react-navigation/native";
import GlobalStyles from "../GlobalStyles";
import { COLORS } from "../Colors";
import PublicFolder from "../api/PublicFolder";
import AuthContext from '../context/AuthContext';
import BaseURL from '../api/BaseURL';
import Item from "../components/Item";
import { useEffect, useState, useContext } from "react";

const ActiveUser = () => {
  const navigation = useNavigation();
  //const [state, dispatch] = useContext(AuthContext);
  const [state, setState] = useContext(AuthContext);
  const [users, setUsers] = useState([]);

  const onDetailPresed = (u)=>{
    navigation.navigate("DetailUser",u);
  }

  useEffect(() => {
    const fetchUsers = async () => {
      let response = await fetch(`${BaseURL}/user/${state._id}/getAll`);
      let responseJson = await response.json();
      setUsers(responseJson);
    };
    fetchUsers();
    
  },[users]);

  return (
    <SafeAreaView style={GlobalStyles.droidSafeArea}>
      <ScrollView showsVerticalScrollIndicator={false}>
        {users.map((u) => (
           
          u.waiting ? <Item key={u._id} item={u} title={u.fullname} content={[u.email,u.dayOfBirth,u.phone,u.from]} image={PublicFolder+u.profilePicture} onPress={()=>onDetailPresed(u)}/> : undefined
        ))}
      </ScrollView>
    </SafeAreaView>
  );
};

export default ActiveUser;
