import { View, Text, TouchableOpacity, StyleSheet, TextInput, useWindowDimensions } from 'react-native'
import React from 'react'
import { Ionicons } from "@expo/vector-icons";
import { COLORS } from '../Colors';
import { useNavigation } from '@react-navigation/native';

const Search = () => {
    const {width} = useWindowDimensions();
    const navigation = useNavigation();
    const handleBackScreen = ()=>{
        navigation.goBack();
    }
  return (
    <View style={styles.container}>
      <TouchableOpacity onPress={handleBackScreen} style={styles.leftWrapper}>
          <Ionicons
            style={styles.iconLocation}
            size={width*0.05}
            color={COLORS.primary}
            name="chevron-back-outline"
          ></Ionicons>
          <Text style={styles.txtLocation}>Trở lại</Text>
        </TouchableOpacity>
        <View style={styles.centerWrapper}>
            <Ionicons
                style={styles.iconSearch}
                size={width*0.05}
                color={COLORS.gray}
                name="search-outline"
            ></Ionicons>
          <TextInput
            style={styles.search}
            placeholder="Tìm kiếm ..."
          ></TextInput>
        </View>
        <TouchableOpacity style={styles.rightWrapper}>
            <Ionicons
                size={width*0.05}
                color={COLORS.primary} name="send-outline"></Ionicons>
        </TouchableOpacity>
    </View>
  )
}

const styles = StyleSheet.create({
    container:{
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginVertical: 10,
        position: 'relative',
        height: 40,
        width: '100%',
        backgroundColor: COLORS.backgroundColor,
    },
    leftWrapper: {
        flex: 1,
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
        position: 'relative',
        flex: 3,
        flexDirection: "row",
        justifyContent: "center",
        alignItems: "center",
        borderColor: COLORS.gray,
        borderWidth:1,
        borderRadius: 50,
      },
      iconSearch:{
        position: 'absolute',
        left:10,
      },
      rightWrapper:{
        flex: 0.5,
        justifyContent: "center",
        alignItems: "center",
      },
      search: {
        width: "100%",
        textAlign: "center",
      },
})

export default Search