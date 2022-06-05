import {
  SafeAreaView,
  View,
  StyleSheet,
  Image,
  useWindowDimensions,
  ScrollView,
  TextInput,
  Text,
} from "react-native";
import React, { useEffect, useState, useContext } from "react";
import { useNavigation } from "@react-navigation/native";
import { useForm, Controller, get } from "react-hook-form";

import GlobalStyles from "../GlobalStyles";
import { COLORS } from "../Colors";
import BaseURL from "../api/BaseURL";

import AuthContext from "../context/AuthContext";

import Logo from "../../assets/images/logo.png";
import CustomInput from "../components/CustomInput";
import CustomButton from "../components/CustomButton";

const EMAIL_REGEX =
  /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;

const ForgotPassword = () => {
  const { height } = useWindowDimensions();
  //useForm
  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const onSendPressed = () => {
    console.warn("onSendPressed");
  };
  const onSignInPressed = () => {
    console.warn("onSignInPressed");
  };
  return (
    <SafeAreaView style={GlobalStyles.droidSafeArea}>
      <ScrollView showsVerticalScrollIndicator={false}>
        <View style={styles.container}>
          <h1> LẤY LẠI MẬT KHẨU MỚI </h1>
          <CustomInput control={control} name="email" placehoder="Nhập Email" />
          <CustomButton text="Gửi" onPress={onSendPressed} />

          <CustomButton
            text="Trở về Đăng nhập"
            onPress={onSignInPressed}
            type="TERTIARY"
          />
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.backgroundColor,
    alignItems: "center",
    padding: 20,
  },

  logo: {
    width: "70%",
    maxWidth: 300,
    maxHeight: 200,
  },

  text: {
    color: "gray",
    marginVertical: 20,
  },
  link: {
    color: "#FDB075",
  },
});

export default ForgotPassword;
