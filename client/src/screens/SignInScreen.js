import {
  SafeAreaView,
  View,
  StyleSheet,
  Image,
  useWindowDimensions,
} from "react-native";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import React, { useState } from "react";

import GlobalStyles from "../GlobalStyles";
import { COLORS } from "../Colors";
import Logo from "../../assets/images/logo.png";
import CustomInput from "../components/CustomInput";
import CustomButton from "../components/CustomButton";

const LoginScreen = () => {
  const { height } = useWindowDimensions();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const onSignInPressed = () => {
    console.warn("Sign in");
  };
  const onForgotPasswordPressed = () => {
    console.warn("Forgot Password");
  };
  const onSignInFacebook = () => {
    console.warn("Sign in facebook");
  };
  const onSignInGoogle = () => {
    console.warn("Sign in google");
  };
  const onSignUpPressed = () => {
    console.warn("Sign up");
  };

  return (
    <SafeAreaView style={GlobalStyles.droidSafeArea}>
      <KeyboardAwareScrollView>
      <View style={styles.container}>
      
        <Image
          source={Logo}
          style={[styles.logo, { height: height * 0.3 }]}
          resizeMode="contain"
        />
        <CustomInput placehoder="Email" value={email} setValue={setEmail} />
        <CustomInput
          placehoder="Mật khẩu"
          value={password}
          setValue={setPassword}
          secureTextEntry={true}
        />

        <CustomButton text="Đăng nhập" onPress={onSignInPressed} />
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
        />
        <CustomButton
          text="Đăng nhập với Google"
          onPress={onSignInGoogle}
          bgColor="#fae9ea"
          fgColor="#dd4d44"
        />
        <CustomButton
          text="Chưa có tài khoản? Đăng kí ngay"
          onPress={onSignUpPressed}
          type="TERTIARY"
        />
      
      </View>
      </KeyboardAwareScrollView>
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

export default LoginScreen;
