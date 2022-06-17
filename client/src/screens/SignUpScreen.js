import {
  SafeAreaView,
  View,
  StyleSheet,
  Image,
  useWindowDimensions,
  ScrollView,
  TextInput,
  Text,
  Alert,
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

const SignUpScreen = () => {
  const { height } = useWindowDimensions();
  const navigation = useNavigation();
  const [checked, setChecked] = React.useState("first");
  //useForm
  const {
    control,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm();
  const pwd = watch("password");

  const onRegisterPressed = async (data) => {
    // Đăng kí người dùng lưu email, tên người dùng, mật khẩu
    const register = await fetch(`${BaseURL}/auth/register`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    });
    // Tạo mã cho người dùng xác nhận
    const createCode = await fetch(`${BaseURL}/auth/code`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
    });
    //lấy code từ đường dẫn /code trả về

    createCode.json().then((code) => {
      // lưu lại code nhận được từ /code
      const editUser = {
        email: data.email,
        code: code,
      };
      console.log(editUser);
      const saveCodeToUser = fetch(`${BaseURL}/auth/savecode`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(editUser),
      });
    });
    navigation.navigate("ConfirmEmail", data);
  };

  const onTermsOfUserPressed = () => {
    console.warn("onTermsOfUserPressed");
  };
  const onSignInFacebook = () => {
    console.warn("Sign in facebook");
  };
  const onSignInGoogle = () => {
    console.warn("Sign in google");
  };
  const onSignInPressed = () => {
    navigation.navigate("SignIn");
    console.warn("Sign In");
  };
  return (
    <SafeAreaView style={GlobalStyles.droidSafeArea}>
      <ScrollView showsVerticalScrollIndicator={false}>
        <View style={styles.container}>
          <Image
            source={Logo}
            style={[styles.logo, { height: height * 0.3 }]}
            resizeMode="contain"
          />
          <Text> ĐĂNG KÝ </Text>
          <CustomInput
            control={control}
            name="fullname"
            placehoder="Họ và tên"
            rules={{
              required: "Họ và tên không được để trống",
              minLength: {
                value: 3,
                message: "Họ và tên phải nhiều hơn 3 ký tự",
              },
              maxLength: {
                value: 24,
                message: "Họ và tên phải ít hơn 24 ký tự",
              },
            }}
          />
          <CustomInput
            control={control}
            name="email"
            placehoder="Email"
            rules={{
              required: "Email không được để trống",
              pattern: { value: EMAIL_REGEX, message: "Email sai định dạng" },
            }}
          />
          <CustomInput
            control={control}
            name="password"
            rules={{
              required: "Mật khẩu không được để trống",
              minLength: { value: 6, message: "Mật khẩu ít nhất 6 kí tự" },
            }}
            placehoder="Mật khẩu"
            secureTextEntry={true}
          />
          <CustomInput
            control={control}
            name="passwordRepeat"
            rules={{
              validate: (value) => value === pwd || "Mật khẩu không khớp",
              required: "Mật khẩu không được để trống",
              minLength: { value: 6, message: "Mật khẩu ít nhất 6 kí tự" },
            }}
            placehoder="Nhập lại mật khẩu"
            secureTextEntry={true}
          />

          <CustomButton
            text="Đăng ký"
            onPress={handleSubmit(onRegisterPressed)}
          />
          <Text style={styles.text}>
            Bằng việc đăng ký, bạn đã đồng ý với
            <Text style={styles.link} onPress={onTermsOfUserPressed}>
              {" "}
              Điều khoản sử dụng
            </Text>{" "}
            {""}
            của App
          </Text>
          <CustomButton
            text="Đăng nhập với Facebook"
            onPress={onSignInFacebook}
            bgColor="#e7eaf4"
            fgColor="#4765a9"
            logo="logo-facebook"
          />
          <CustomButton
            text="Đăng nhập với Google"
            onPress={onSignInGoogle}
            bgColor="#fae9ea"
            fgColor="#dd4d44"
            logo="logo-google"
          />
          <CustomButton
            text="Bạn đã có tài khoản? Đăng nhập ngay"
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

export default SignUpScreen;
