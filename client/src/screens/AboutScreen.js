import { View, Text, SafeAreaView, Image, StyleSheet, useWindowDimensions, TextInput, ScrollView } from "react-native";
import React, { useContext } from "react";
import { useNavigation } from "@react-navigation/native";

import AuthContext from "../context/AuthContext";
import CustomButton from "../components/CustomButton";
import GlobalStyles from "../GlobalStyles";
import Logo from "../../assets/images/logo.png";
import { COLORS } from "../Colors";
import Header from "../components/Header";
import InfoText from "../components/InfoText";

const AboutScreen = () => {
  const { height } = useWindowDimensions();

  const navigation = useNavigation();

  const [state, dispatch] = useContext(AuthContext);

  const VerifyUser = ()=>{

  }

  const ChangePassword = ()=>{
    navigation.navigate("NewPassword");
  }

  return (
    <SafeAreaView style={GlobalStyles.droidSafeArea}>
      <Header/>
      <ScrollView showsVerticalScrollIndicator={false}>
      <View style={styles.container}>
          <View style={styles.headerWrapper}>

          
            <Image
              source={Logo}
              style={[styles.logo, { height: height * 0.3 }]}
              resizeMode="contain"
            />
            <Text>Trạng thái: Chưa xác minh</Text>
            <CustomButton
              size="80%"
              text="Xác minh người dùng"
              bgColor={COLORS.green}
              fgColor={COLORS.white}
              logo="shield-checkmark-outline"
              onPress={VerifyUser}
            />
          </View>

          

          <View style={styles.bodyWrapper}>
            <InfoText name='Email' data={state.user.email}/>
            <InfoText name='Tên người dùng' data={state.user.fullname}/>
            <InfoText name='Địa chỉ' data={state.user.city}/>
            <InfoText name='Số điện thoại' data={state.user.phone}/>
          </View>

          <View style={styles.footer}>
            <CustomButton
                size="48%"
                text="Chỉnh sửa thông tin"
              />
              <CustomButton
                size="48%"
                text="Đổi mật khẩu"
                onPress={ChangePassword}
              />
          </View>
          <CustomButton
            text="ĐĂNG XUẤT"
            logo="log-out-outline"
            bgColor={COLORS.red}
            fgColor={COLORS.white}
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
  headerWrapper:{
    alignItems: "center",
    width: '100%',
  },
  logo: {
    width: "70%",
    maxWidth: 300,
    maxHeight: 200,
  },
  bodyWrapper:{
    width: '100%',
    marginVertical: 20,
  },  
  footer: {
    width: '100%',
    flexDirection: "row",
    justifyContent: 'space-between'
  }
});

export default AboutScreen;
