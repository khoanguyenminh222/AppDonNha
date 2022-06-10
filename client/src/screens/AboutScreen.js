import { View, Text, SafeAreaView, Image, StyleSheet, useWindowDimensions, TextInput, ScrollView, Alert } from "react-native";
import React, { useContext } from "react";
import { useNavigation } from "@react-navigation/native";

import AuthContext from "../context/AuthContext";
import CustomButton from "../components/CustomButton";
import GlobalStyles from "../GlobalStyles";
import Logo from "../../assets/images/logo.png";
import { COLORS } from "../Colors";
import Header from "../components/Header";
import InfoText from "../components/InfoText";
import PublicFolder from "../api/PublicFolder";

const AboutScreen = () => {


  const { height } = useWindowDimensions();

  const navigation = useNavigation();

  const [state, dispatch] = useContext(AuthContext);

  const VerifyUser = ()=>{
    console.log(!state.user.dayOfBirth)
    //kiểm tra thông tin đầy đủ
    if(!state.user.dayOfBirth||!state.user.phone||!state.user.from){
      Alert.alert("Cần thiết!","Cập nhật thông tin trước khi thực hiện thao tác này",[
        {text:"OK", onPress:()=>console.log("alert closed")}
      ])
      return false;
    }else{  
      navigation.navigate("Verify");
    }

    
  }

  const ChangePassword = ()=>{
    navigation.navigate("NewPassword");
  }
  console.log(PublicFolder+state.user.profilePicture);
  return (
    <SafeAreaView style={GlobalStyles.droidSafeArea}>
      <Header/>
      <ScrollView showsVerticalScrollIndicator={false}>
      <View style={styles.container}>
          <View style={styles.headerWrapper}>

          
            <Image
              source={{uri: state.user.profilePicture ? PublicFolder+state.user.profilePicture : PublicFolder+"persons/noAvatar.png"}}
              style={styles.logo}
              resizeMode="cover"
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
    width: 150,
    height: 150,
    borderRadius: 150/2,
    overflow: "hidden",
    borderWidth: 3,
    borderColor: COLORS.light,
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
