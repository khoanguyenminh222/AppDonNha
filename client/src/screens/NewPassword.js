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
  
  const NewPassword = () => {
    const { height } = useWindowDimensions();
    //useForm
    const {
      control,
      handleSubmit,
      formState: { errors },
    } = useForm();
    const onResetPasswordPressed = () => {
      console.warn("onResetPasswordPressed");
    };
    const backHomePressed = () => {
        console.warn("backHomePressed");
      };
    return (
      <SafeAreaView style={GlobalStyles.droidSafeArea}>
        <ScrollView showsVerticalScrollIndicator={false}>
          <View style={styles.container}>
            <Text> ĐỔI MẬT KHẨU </Text>
            <CustomInput control={control} name="oldPassword" placehoder="Nhập mật khẩu hiện tại"  secureTextEntry={true} />
            <CustomInput control={control} name="newPassword" placehoder="Nhập mật khẩu mới"   secureTextEntry={true}/>
            <CustomInput control={control} name="newPasswordRepeat" placehoder="Nhập mật lại khẩu mới"   secureTextEntry={true} />
            
            <CustomButton text="Đổi mật khẩu" onPress={onResetPasswordPressed} />
  
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
  