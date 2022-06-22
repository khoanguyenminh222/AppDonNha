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

const ForgotPassword = () => {
  const { height } = useWindowDimensions();
  const [err , setErr] = useState(' ');
  const navigation = useNavigation();
  //useForm
  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const onSendPressed = async(data) => {
    const forgotPass = await fetch(`${BaseURL}/auth/resetpassword`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    });
    console.log(data)
    forgotPass.json().then(res=>{
      if(res.message){
        setErr(res.message);
      }
      else{
        Alert.alert("Thông báo!","Mật khẩu mới đã được gửi về Email. Trở về đăng nhập.",[
          {text:"Cancel", onPress:()=>console.log("alert closed")},
          {text:"OK", onPress:()=>navigation.navigate("SignIn")}
        ]);
      }
    })
    
  };
  const onSignInPressed = () => {
    navigation.navigate("SignIn");
   
  };
  return (
    <SafeAreaView style={GlobalStyles.droidSafeArea}>
      <ScrollView showsVerticalScrollIndicator={false}>
        <View style={styles.container}>
          <Text> LẤY LẠI MẬT KHẨU MỚI </Text>
          <CustomInput control={control} 
            name="email" 
            placehoder="Nhập Email" 
            rules={{
              required: "Email không được để trống",
              pattern: { value: EMAIL_REGEX, message: "Email sai định dạng" },
            }}
            />
            <Text style={{color: "red"}}>{err}</Text>
          <CustomButton 
            text="Gửi" 
            onPress={handleSubmit(onSendPressed)} 
          />

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
