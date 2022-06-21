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
import Back from "../components/Back";

const EMAIL_REGEX =
  /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;

const NewPassword = () => {
  const [state, setState] = useContext(AuthContext);
  const { height } = useWindowDimensions();
  const navigation = useNavigation();
  const [errorMess, setErrorMess] = useState("");
  //useForm
  const {
    control,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm();

  const pwd = watch("newPassword");

  const onResetPasswordPressed = async (data) => {
    const bodyJson = {
      email: state.email,
      password: data.oldPassword,
      newpassword: data.newPassword,
    };
    const changPassword = await fetch(`${BaseURL}/auth/changepassword`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(bodyJson),
    });
    changPassword.json().then((res) => {
      if (res.message) {
        setErrorMess(res.message);
      } else {
        navigation.goBack();
      }
    });
  };
  const backHomePressed = () => {
    navigation.goBack();
  };
  return (
    <SafeAreaView style={GlobalStyles.droidSafeArea}>
      <Back textCenter="Thay đổi mật khẩu" />

      <ScrollView showsVerticalScrollIndicator={false}>
        <View style={styles.container}>
          <CustomInput
            control={control}
            name="oldPassword"
            placehoder="Nhập mật khẩu hiện tại"
            secureTextEntry={true}
            rules={{
              required: "Mật khẩu không được để trống",
              minLength: { value: 6, message: "Mật khẩu ít nhất 6 kí tự" },
            }}
          />
          <CustomInput
            control={control}
            name="newPassword"
            placehoder="Nhập mật khẩu mới"
            secureTextEntry={true}
            rules={{
              required: "Mật khẩu không được để trống",
              minLength: { value: 6, message: "Mật khẩu ít nhất 6 kí tự" },
            }}
          />
          <CustomInput
            control={control}
            name="newPasswordRepeat"
            placehoder="Nhập lại mật khẩu mới"
            secureTextEntry={true}
            rules={{
              validate: (value) => value === pwd || "Mật khẩu không khớp",
              required: "Mật khẩu không được để trống",
              minLength: { value: 6, message: "Mật khẩu ít nhất 6 kí tự" },
            }}
          />
          <Text style={{ color: COLORS.red }}>{errorMess}</Text>
          <CustomButton
            text="Đổi mật khẩu"
            onPress={handleSubmit(onResetPasswordPressed)}
          />

          <CustomButton
            text="Trở về Trang chủ"
            onPress={backHomePressed}
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

export default NewPassword;
