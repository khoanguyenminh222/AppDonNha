import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
import React from "react";
import { Ionicons } from "@expo/vector-icons";

import { COLORS } from "../Colors";

const CustomButton = ({
  onPress,
  text,
  type = "PRIMARY",
  bgColor,
  fgColor,
  logo,
  size = "100%",
}) => {
  return (
    <TouchableOpacity
      onPress={onPress}
      style={[
        styles.container,
        styles[`container_${type}`],
        bgColor ? { backgroundColor: bgColor } : {},
        {width:size},
      ]}
    >
      <Ionicons style={styles.logo} name={logo} size={30} color={fgColor}/>
      <Text
        style={[
          styles.text,
          styles[`text_${type}`],
          fgColor ? { color: fgColor } : {},
        ]}
      >
        {text}
      </Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    width: '100%',
    padding: 15,
    marginVertical: 5,

    alignItems: "center",
    borderRadius: 5,
  },
  container_PRIMARY: {
    backgroundColor: COLORS.primary,
  },
  container_SECONDARY: {
    borderColor: '#3B71F3',
    borderWidth: 2,
  },
  container_TERTIARY: {},
  logo:{
    position: "absolute",
    top: 10,
    left: 20,
  },
  text: {
    fontWeight: "bold",
    color: COLORS.white,
  },
  text_TERTIARY: {
    color: COLORS.gray,
  },

  text_SECONDARY: {
    color: '#3B71F3',
  },
});

export default CustomButton;
