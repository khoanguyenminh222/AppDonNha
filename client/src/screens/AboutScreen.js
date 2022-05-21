import { View, Text } from 'react-native'
import React, { useContext } from 'react'


import AuthContext from '../context/AuthContext';

const AboutScreen = () => {
  const [state, dispatch] = useContext(AuthContext);
  console.log(state.user.username);
  return (
    <View>
      <Text>{state.user.email}</Text>
    </View>
  )
}

export default AboutScreen