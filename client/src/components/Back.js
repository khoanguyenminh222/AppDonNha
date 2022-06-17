import { View, Text, StyleSheet, TouchableOpacity } from 'react-native'
import React from 'react'
import { COLORS } from '../Colors'
import { Ionicons } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";

const Back = ({textCenter}) => {
    const navigation = useNavigation();
    const handleBackScreen = ()=>{
        navigation.goBack();
    }
  return (
    <View style={styles.container}>
      <TouchableOpacity onPress={handleBackScreen} style={styles.leftWrapper}>
          <Ionicons
            style={styles.iconLocation}
            size={24}
            color={COLORS.primary}
            name="chevron-back-outline"
          ></Ionicons>
          <Text style={styles.txtLocation}>Trở lại</Text>
        </TouchableOpacity>
        <View style={styles.centerWrapper}>
          <Text style={styles.txtCenter}>{textCenter}</Text>
        </View>
    </View>
  )
}

const styles = StyleSheet.create({
    container:{
        marginVertical: 10,
        position: 'relative',
        height: 40,
        width: '100%',
        backgroundColor: COLORS.backgroundColor,
    },
    leftWrapper: {
        flex: 1,
        position: "absolute",
        left: 0,
        flexDirection: "row",
        justifyContent: "center",
        alignItems: "center",
      },
    
      iconLocation: {
        marginRight: 5,
      },
      txtLocation: {
        fontSize: 16,
        fontWeight: "500",
      },
    
      centerWrapper: {
        flex: 1,
        position: "absolute",
        right: 0,
        left: 0,
        flexDirection: "row",
        justifyContent: "center",
        alignItems: "center",
      },
      txtCenter: {
        fontSize: 18,
        fontWeight: "500",
      },
})

export default Back