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

const ConfirmEmail = ({ route }) => {
  const { height } = useWindowDimensions();
  const navigation = useNavigation();
  const [code, setCode] = useState('');
  const [message, setMessage] = useState('');
  //useForm
  const {
    control,
    handleSubmit,
    formState: { errors },
    watch,
  } = useForm();
  const pwd = watch(route.params.code);

  const onConfirmCodePressed = async() => {
    compareCodeConfirm();
    let editUser = {
      userId: route.params._id,
      status: true,
    };
      try {
        const response = await fetch(`${BaseURL}/user/${route.params._id}`, {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(editUser),
        });
        console.log(response);
      } catch (error) {
        console.log(error);
      }
  };
  const compareCodeConfirm = async() =>{
    try {
      const response = await fetch(`${BaseURL}/user/${route.params._id}`)
      response.json().then(userA => {
      console.log(userA)
        if(code === userA.code){
          setMessage()
          navigation.navigate("SignIn");
          return;
        }
        else if(code === ""){
          setMessage("Mã xác thực không được để trống")
          return;
        }else{
          setMessage("Mã xác nhận không chính xác")
          return;
        }
      });
     
    } catch (error) {
      console.log(error);
    }
  } 

  const onResendPressed = async () => {
    const saveCodeToUser = await fetch(`${BaseURL}/auth/savecode`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(route.params),
    })
    Alert.alert("Thông báo!","Mã xác nhận của bạn đã được gửi",[
      {text:"OK", onPress:()=>console.log("alert closed")}
    ]);
  };
  const onSignInPressed = () => {
    navigation.navigate("SignIn");
  };
  return (
    <SafeAreaView style={GlobalStyles.droidSafeArea}>
      <ScrollView showsVerticalScrollIndicator={false}>
        <View style={styles.container}>
          <Text> XÁC THỰC TÀI KHOẢN EMAIL </Text>
          
          <View style={styles.wraperTextInput}>
            <TextInput style={styles.TextInput}
            onChangeText={setCode}
            value = {code}
            placeholder= "Nhập mã xác thực" 
                 
          />
          </View>
          <Text>
            {
              message
            }
          </Text>
          <CustomButton
            text="Xác thực"
            onPress={handleSubmit(onConfirmCodePressed)}
          />

          <CustomButton
            text="Gửi lại mã xác nhận"
            onPress={handleSubmit(onResendPressed)}
            type="SECONDARY"
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
  TextInput: {
    paddingLeft: 10,
    width: '100%',
  },

  wraperTextInput: {
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
});

export default ConfirmEmail;
