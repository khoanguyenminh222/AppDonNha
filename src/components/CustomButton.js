import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
import React from "react";

import { COLORS } from "../Colors";

const CustomButton = ({
  onPress,
  text,
  type = "PRIMARY",
  bgColor,
  fgColor,
}) => {
  return (
    <TouchableOpacity
      onPress={onPress}
      style={[
        styles.container,
        styles[`container_${type}`],
        bgColor ? { backgroundColor: bgColor } : {},
      ]}
    >
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
    width: "100%",
    padding: 15,
    marginVertical: 5,

    alignItems: "center",
    borderRadius: 5,
  },
  container_PRIMARY: {
    backgroundColor: COLORS.primary,
  },
  container_TERTIARY: {},
  text: {
    fontWeight: "bold",
    color: COLORS.white,
  },
  text_TERTIARY: {
    color: COLORS.gray,
  },
});

export default CustomButton;
