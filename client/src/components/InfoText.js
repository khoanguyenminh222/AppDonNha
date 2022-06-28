import { View, Text, StyleSheet, TextInput, Keyboard } from "react-native";
import React from "react";

import { COLORS } from "../Colors";

const InfoText = ({ name, data, editable, numberOfLines, multiline, underlineColorAndroid }) => {
  return (
    <View style={styles.wrapperText}>
      <Text style={styles.textField}>{name}</Text>
      <TextInput
        style={styles.textDataField}
        placeholder={data}
        editable={editable}
        placeholderTextColor={COLORS.black}
        numberOfLines={numberOfLines}
        multiline={multiline}
        underlineColorAndroid={underlineColorAndroid}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  wrapperText: {
    width: "100%",
    marginVertical: 5,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  textField: {
    width: "30%",
  },
  textDataField: {
    width: "70%",
    backgroundColor: COLORS.white,
    borderColor: "#e8e8e8",
    borderWidth: 1,
    borderRadius: 5,
    paddingHorizontal: 10,
    paddingVertical: 10,
    marginVertical: 8,
    color: COLORS.black,
  },
});
export default InfoText;
