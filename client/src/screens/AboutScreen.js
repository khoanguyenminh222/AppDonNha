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

const wait = timeout => {
  return new Promise(resolve => setTimeout(resolve, timeout));
};

const AboutScreen = () => {
  const { height } = useWindowDimensions();

  const navigation = useNavigation();

  // lấy ra người dùng hiện tại
  const [state, setState] = useContext(AuthContext);

  //tạo biến refresh trang
  const [refreshing, setRefreshing] = useState(false);

  const onRefresh = useCallback( async() => {
    const res = await fetch(`${BaseURL}/user/${state._id}`)
    res.json()
    .then(user=>{
      setState(user);
    })

    setRefreshing(true);
    wait(1000).then(() => setRefreshing(false));
  }, []);
  

  useEffect(() => {
    const fetchUser = async () => {
      let response = await fetch(`${BaseURL}/user/${state._id}`);
      let responseJson = await response.json();
      setState(responseJson);
    };
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
            <InfoText name="Email" data={state.email} editable={false}/>
            <InfoText name="Tên người dùng" data={state.fullname} editable={false}/>
            <InfoText name="Địa chỉ" data={state.city} editable={false}/>
            <InfoText name="Số điện thoại" data={state.phone} editable={false}/>
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
  footer: {
    width: "100%",
    flexDirection: "row",
    justifyContent: "space-between",
  },
});

export default AboutScreen;
