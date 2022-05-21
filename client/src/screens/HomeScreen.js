import { View, Text, Alert } from 'react-native'
import React, { useEffect, useState, useContext } from 'react'

import BaseURL from '../api/BaseURL';
import GlobalStyles from "../GlobalStyles";
import AuthContext from '../context/AuthContext';


const HomeScreen = () => {

  const [state, dispatch] = useContext(AuthContext);
  console.log(state.user.username);
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
    <View style={GlobalStyles.droidSafeArea}>
      {/* {users.map((u)=>(
        <Text key={u._id}>{u.username}</Text>
      ))} */}
      <Text>home</Text>
    </View>
  )
}

export default HomeScreen