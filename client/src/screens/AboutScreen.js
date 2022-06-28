import {
  View,
  Text,
  SafeAreaView,
  Image,
  StyleSheet,
  useWindowDimensions,
  TextInput,
  ScrollView,
  Alert,
  RefreshControl
} from "react-native";
import React, { useCallback, useContext, useEffect, useMemo, useState } from "react";
import { useNavigation } from "@react-navigation/native";

import AuthContext from "../context/AuthContext";
import CustomButton from "../components/CustomButton";
import GlobalStyles from "../GlobalStyles";
import Logo from "../../assets/images/logo.png";
import BaseURL from "../api/BaseURL";
import { COLORS } from "../Colors";
import Header from "../components/Header";
import InfoText from "../components/InfoText";
import PublicFolder from "../api/PublicFolder";
import { Ionicons } from "@expo/vector-icons";
import Back from "../components/Back";
import CustomInput from "../components/CustomInput";
import { useForm } from "react-hook-form";

const wait = timeout => {
  return new Promise(resolve => setTimeout(resolve, timeout));
};

const AboutScreen = () => {
  const { height } = useWindowDimensions();

  //useForm
  const {
    control,
    handleSubmit,
    
  } = useForm();

  const navigation = useNavigation();

  // lấy ra người dùng hiện tại
  const [state, setState] = useContext(AuthContext);

  //tạo biến refresh trang
  const [refreshing, setRefreshing] = useState(false);

  const onRefresh = useCallback( async() => {
    const res = await fetch(`${BaseURL}/user/${state._id}`)
    .then(res=>res.json())
    .then(resJson=>{
      setState(resJson);
    })

    setRefreshing(true);
    wait(1000).then(() => setRefreshing(false));
  }, []);
  
  const fetchUser = async()=>{
    const res = await fetch(`${BaseURL}/user/${state._id}`)
    .then(res=>res.json())
    .then(resJson=>{
      setState(resJson);
    })
  }

  // gọi sau khi navigate trang
  useEffect(()=>{
    fetchUser();
    const willFocusSubscription = navigation.addListener('focus',()=>{
      fetchUser();
    });
    return willFocusSubscription;
  }, [])


  useEffect(() => {
    fetchUser();
  },[]);

  const VerifyUser = () => {
    //kiểm tra thông tin đầy đủ
    if (!state.dayOfBirth || !state.phone || !state.from || !state.city) {
      Alert.alert(
        "Cần thiết!",
        "Cập nhật thông tin trước khi thực hiện thao tác này",
        [{ text: "OK", onPress: () => console.log("alert closed") }]
      );
      return false;
    } else {
      navigation.navigate("Verify");
    }
  };

  const ChangePassword = () => {
    navigation.navigate("NewPassword");
  };

  const onUpdateInfor = () => {
    navigation.navigate("UpdateInfor", state);
  }

  return (
    <SafeAreaView style={GlobalStyles.droidSafeArea}>
      <Back textCenter="Thông tin"/>
      <ScrollView showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.scrollView}
        refreshControl={<RefreshControl refreshing={refreshing} onRefresh={onRefresh} />}
      >
        <View style={styles.container}>
          <View style={styles.headerWrapper}>
            <Image
              source={{
                uri: state.profilePicture === ""
                  ? PublicFolder + state.profilePicture
                  : PublicFolder + "persons/noAvatar.png",
              }}
              style={styles.logo}
              resizeMode="cover"
            />

            {state.waiting == false && state.isVerify == false ? (
              <CustomButton
                size="80%"
                text="Xác minh người dùng"
                bgColor={COLORS.green}
                fgColor={COLORS.white}
                logo="shield-checkmark-outline"
                onPress={VerifyUser}
              />
            ) : undefined}

            {state.waiting == true && state.isVerify == false ? (
              <Text style={{ color: COLORS.green }}>
                Trạng thái: Chờ xác minh
              </Text>
            ) : undefined}

            {state.isVerify == true && state.waiting == false ? (
              <Ionicons
                name="shield-checkmark-outline"
                size={50}
                color={COLORS.green}
              />
            ) : undefined}
          </View>

          <View style={styles.bodyWrapper}>

          <View style={styles.containerInput}>
            <View style={styles.wrapperLogo}>
              <Ionicons name="mail-outline" size={30} />
            </View>
            <TextInput
              value={state.email}
              style={styles.input}
              editable={false}
            />
          </View>
           <View style={styles.containerInput}>
            <View style={styles.wrapperLogo}>
              <Ionicons name="person-outline" size={30} />
            </View>
            <TextInput
              value={state.fullname}
              style={styles.input}
              editable={false}
            />
          </View>
          <View style={styles.containerInput}>
            <View style={styles.wrapperLogo}>
              <Ionicons name="home-outline" size={30} />
            </View>
            <TextInput
              value={state.city}
              placeholder="Địa chỉ"
              style={styles.input}
              editable={false}
            />
          </View>
          <View style={styles.containerInput}>
            <View style={styles.wrapperLogo}>
              <Ionicons name="call-outline" size={30} />
            </View>
            <TextInput
              value={state.phone}
              placeholder="Ngày sinh"
              style={styles.input}
              editable={false}
            />
          </View>
          </View>

          <View style={styles.footer}>
            <CustomButton size="48%" text="Chỉnh sửa thông tin" onPress={onUpdateInfor}/>
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
  headerWrapper: {
    alignItems: "center",
    width: "100%",
  },
  logo: {
    width: 150,
    height: 150,
    borderRadius: 150 / 2,
    overflow: "hidden",
    borderWidth: 3,
    borderColor: COLORS.light,
  },
  bodyWrapper: {
    width: "100%",
    marginVertical: 20,
  },

  containerInput: {
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
  wrapperLogo: {
    paddingHorizontal: 5,
    borderRightWidth: 1,
  },
  input: {
    paddingLeft: 10,
    width: '100%',
    color: COLORS.black,
  },
  footer: {
    width: "100%",
    flexDirection: "row",
    justifyContent: "space-between",
  },
});

export default AboutScreen;
