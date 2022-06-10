import { View, Text, StyleSheet, TextInput, Image } from "react-native";
import React from "react";
import { Ionicons } from "@expo/vector-icons";
import Logo from "../../assets/images/logo.png";
import { COLORS } from "../Colors";

const Header = () => {
  return (
    <View style={styles.container}>
      <View style={styles.wrapper}>
        <Ionicons
          style={styles.icon}
          name="search-outline"
          size={20}
          color={COLORS.gray}
        ></Ionicons>
        <TextInput
          style={styles.search}
          placeholder="Tìm kiếm dịch vụ"
        ></TextInput>
      </View>
      <Image
        source={Logo}
        style={styles.logo}
        resizeMethod= 'resize'
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    height: 60,
    backgroundColor: COLORS.yellow,
    paddingHorizontal: 10,
    paddingVertical: 5,
    justifyContent: 'space-around',
    alignItems: 'center',
  },
  wrapper: {
    width: '80%',
    backgroundColor: COLORS.white,
    flexDirection: "row",
    height: "80%",
    alignItems: "center",
    justifyContent: "center",
    paddingHorizontal: 20,
    paddingVertical: 5,
    borderRadius: 3,
  },
  icon: {
      marginRight: 10,
  },
  search: {
    height: "100%",
    width: "100%",
    paddingHorizontal: 20,
  },
  logo:{
    width: '80%',
    height: 50,
    maxWidth: 50,
  }
});

export default Header;
