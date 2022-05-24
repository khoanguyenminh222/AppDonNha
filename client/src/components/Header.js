import { View, Text, StyleSheet, TextInput } from "react-native";
import React from "react";
import { Ionicons } from "@expo/vector-icons";

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
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    height: 60,
    backgroundColor: COLORS.yellow,
    paddingHorizontal: 10,
    paddingVertical: 5,
    justifyContent: "center",
  },
  wrapper: {
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
});

export default Header;
