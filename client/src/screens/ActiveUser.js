import { View, Text, SafeAreaView, ScrollView } from "react-native";
import React from "react";

import GlobalStyles from "../GlobalStyles";
import { COLORS } from "../Colors";
import AuthContext from '../context/AuthContext';
import BaseURL from '../api/BaseURL';
import User from "../components/User";
import { useEffect, useState, useContext } from "react";

const ActiveUser = () => {
    const [state, dispatch] = useContext(AuthContext);
  const [users, setUsers] = useState([]);

  useEffect(() => {
    const fetchUsers = async () => {
      let response = await fetch(`${BaseURL}/user/${state.user._id}/getAll`);
      let responseJson = await response.json();
      setUsers(responseJson);
      console.log(responseJson);
    };
    fetchUsers();
  }, [users._id]);

  return (
    <SafeAreaView style={GlobalStyles.droidSafeArea}>
      <ScrollView showsVerticalScrollIndicator={false}>
        {users.map((u) => (
           
          u.waiting ? <User key={u._id} user={u}/> : undefined
        ))}
      </ScrollView>
    </SafeAreaView>
  );
};

export default ActiveUser;
