import { View, Text, TextInput, StyleSheet } from "react-native";
import React from "react";
import { Ionicons } from "@expo/vector-icons";
import { Controller } from "react-hook-form";

import { COLORS } from "../Colors";

const CustomInput = ({
  control,
  name,
  rules={},
  placehoder,
  secureTextEntry,
  logo,
  editable,
  selectTextOnFocus,
  underlineColorAndroid,
  numberOfLines,
  multiline,
  defaultValue,
  color,
}) => {
  return (
    
      
      <Controller
        defaultValue={defaultValue}
        control={control}
        name={name}
        rules={rules}
        render={({ field: { value, onChange, onBlur }, fieldState:{error} }) => (
          <>
          <View style={[styles.container, {borderColor: error ? 'red': "#e8e8e8"}]}>
          {logo ? (
            <View style={styles.wrapperLogo}>
              <Ionicons name={logo} size={30} />
            </View>
          ) : null}
          <TextInput
            editable = {editable}
            selectTextOnFocus = {selectTextOnFocus}
            value={value}
            onChangeText={onChange}
            onBlur={onBlur}
            placeholder={placehoder}
            style={styles.input}
            secureTextEntry={secureTextEntry}
            underlineColorAndroid = {underlineColorAndroid}
            numberOfLines = {numberOfLines}
            multiline = {multiline}
            color = {color}
          />
          </View>
          {error && (
            <Text style={{color:"red", alignSelf: "stretch"}}>{error.message || "error"}</Text>
          )}
          </>
        )}
      />
    
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: COLORS.white,
    width: "100%",
    borderColor: "#e8e8e8",
    borderWidth: 1,
    borderRadius: 5,
    paddingHorizontal: 10,
    paddingVertical: 10,
    marginVertical: 8,
    flexDirection: "row",
  },
  wrapperLogo: {
    paddingHorizontal: 5,
    borderRightWidth: 1,
    justifyContent: "center",
  },
  input: {
    paddingLeft: 10,
    width: '100%',
    flex: 1
  },
});

export default CustomInput;
