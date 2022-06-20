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

const SignInScreen = () => {
  const { height } = useWindowDimensions();
  const navigation = useNavigation();

  //const [state, dispatch] = useContext(AuthContext);
  const [state, setState] = useContext(AuthContext);
  const [errMessage, setErrMessage] = useState('');

  //useForm
  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm();

  //SignIn 
  const onSignInPressed = async (data) => {
    try {
      //fetch api
      const res = await fetch(`${BaseURL}/auth/login`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });
    

      if (res.status == 200) {
        // lưu dữ liệu người dùng
        res.json()
        .then(data=>({
          data: data,
          status: res.status
        }))
        .then(res=>{
          // payload dữ liệu người dùng
          //dispatch({type:'LOGIN_SUCCESS', payload: res.data});
          setState(res.data);
          // chuyển hướng trang
          if(res.data.isAdmin){
            //admin
            navigation.navigate("Admin");
          }else{
            //người dùng
            if(res.data.status){
              navigation.navigate("Main");
            }
            else{
              Alert.alert("Thông báo!","Tài khoản chưa được xác nhận. Vui lòng xác nhận để tiến hành Đăng nhập.",[
                {text:"Cancel", onPress:()=>console.log("alert closed")},
                {text:"OK", onPress:()=>navigation.navigate("ConfirmEmail", res.data)}
              ]);
            }
          }
          
        });
      }else{
        res.json()
        .then(data=>({
          data: data,
          status: res.status
        }))
        .then(res=>{
          setErrMessage(res.data);
        })
        
      }
    } catch (err) {
      console.log(err);
    }
  };
  const onForgotPasswordPressed = () => {
    navigation.navigate("ForgotPassword");
    
  };
  const onSignInFacebook = () => {
    
    
  };
  const onSignInGoogle = () => {
   
  };
  const onSignUpPressed = () => {
    navigation.navigate("SignUp");
   
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
          <CustomInput
            control={control}
            name="email"
            rules={{
              required: "Email không được để trống",
              pattern: { value: EMAIL_REGEX, message: "Email sai định dạng" },
            }}
            placehoder="Email"
            logo="mail-outline"
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
            logo="key-outline"
          />
          <Text style={{color: "red", alignSelf: "stretch"}}>{errMessage}</Text>
          <CustomButton
            text="Đăng nhập"
            onPress={handleSubmit(onSignInPressed)}
          />
          <CustomButton
            text="Quên mật khẩu"
            onPress={onForgotPasswordPressed}
            type="TERTIARY"
          />
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
            text="Chưa có tài khoản? Đăng kí ngay"
            onPress={onSignUpPressed}
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
});

export default SignInScreen;
