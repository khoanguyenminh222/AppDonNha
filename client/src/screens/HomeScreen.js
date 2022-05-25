import { View, Text, Alert, SafeAreaView } from 'react-native'
import React, { useEffect, useState, useContext } from 'react'

import BaseURL from '../api/BaseURL';
import GlobalStyles from "../GlobalStyles";
import AuthContext from '../context/AuthContext';
import Header from '../components/Header';


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
    <SafeAreaView style={GlobalStyles.droidSafeArea}>
      {/* {users.map((u)=>(
        <Text key={u._id}>{u.username}</Text>
      ))} */}
      <Header/>
    </SafeAreaView>
  )
}

export default HomeScreen