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
  Linking,
} from "react-native";
import React, { useEffect, useState, useContext } from "react";
import { useNavigation } from "@react-navigation/native";
import { useForm, Controller, get } from "react-hook-form";
import * as Facebook from "expo-facebook";
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
  const [state, setState] = useContext(AuthContext);
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
    // lưu code vào người dùng và gửi mail
    const saveCodeToUser = await fetch(`${BaseURL}/auth/savecode`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    });
    saveCodeToUser.json().then((user) => {
      navigation.navigate("ConfirmEmail", user);
    });
  };

  const onTermsOfUserPressed =  () => {
    const termsOfUser = Linking.canOpenURL('https://www.termsfeed.com/live/0bdf59a3-f40e-4fe5-b448-62aec8570af2')
    if (termsOfUser){
      Linking.openURL('https://www.termsfeed.com/live/0bdf59a3-f40e-4fe5-b448-62aec8570af2')
    }
  };
  const onSignInFacebook = async () => {
    let user;
    try {
      await Facebook.initializeAsync({
        appId: "740695290579398",
      });
      const { type, token, expirationDate, permissions, declinedPermissions } =
        await Facebook.logInWithReadPermissionsAsync({
          permissions: ["public_profile", "email"],
        });
      if (type === "success") {
        // Get the user's name using Facebook's Graph API
        const response = await fetch(
          `https://graph.facebook.com/me?fields=id,name,email,birthday&access_token=${token}`
        )
          .then((res) => res.json())
          .then((resJson) => {
            user = resJson;
            
          });
          const req = {
            fullname: user.name,
            email: user.email
          }
          const signInAuth =  await fetch(`${BaseURL}/auth/loginAuth`, {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify(req),
          })
          .then((res)=>res.json())
          .then((resJson)=>{
            setState(resJson);
            navigation.navigate("Main")
          })
      } else {
        // type === 'cancel'
      }
    } catch ({ message }) {
      console.log(`Facebook Login Error: ${message}`);
    }
  };
  const onSignInGoogle = () => {
   
  };
  const onSignInPressed = () => {
    navigation.navigate("SignIn");
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
