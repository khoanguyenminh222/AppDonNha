import { View, Text, StyleSheet, Pressable } from 'react-native'
import { useNavigation } from "@react-navigation/native";
import React from 'react'
import { COLORS } from '../Colors';

import { Ionicons } from "@expo/vector-icons";

const BackButton = () => {
    const navigation = useNavigation();
    const btnBack = ()=>{
        navigation.goBack();
    }
  return (
    <View style={styles.container}>
        <Ionicons
        style={styles.icon}
          name="chevron-back-outline"
          size={50}
          color={COLORS.black}
          onPress={btnBack}
        ></Ionicons>
    </View>
  );
}

const styles = StyleSheet.create({
    container:{
        height: 60,
        backgroundColor: COLORS.backgroundColor,
        paddingHorizontal: 10,
        paddingVertical: 5,
        justifyContent: 'center'
    },
    icon:{
        width:50,
    }
})

export default BackButton