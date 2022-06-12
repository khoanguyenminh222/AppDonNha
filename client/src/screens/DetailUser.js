import {
  View,
  Text,
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Image,
  Alert,
} from "react-native";
import React, { useContext } from "react";
import GlobalStyles from "../GlobalStyles";
import AuthContext from '../context/AuthContext';
import { COLORS } from "../Colors";
import PublicFolder from "../api/PublicFolder";
import InfoText from "../components/InfoText";
import CustomButton from "../components/CustomButton";
import BaseURL from "../api/BaseURL";
import { useNavigation } from "@react-navigation/native";
import Header from "../components/Header";
const DetailUser = ({ route }) => {
  const user = route.params;

  //const [state, dispatch] = useContext(AuthContext);
  const [state,setState] = useContext(AuthContext);
  const navigation = useNavigation();

  const AcceptBtn = ()=>{
    const editUser={
      userId : state.user._id,
      waiting: false,
      isVerify: true,
    }
    Alert.alert("Thông báo!","Xác nhận danh tính người dùng này",[
      {text:"Cancel", onPress:()=>console.log("alert closed")},
      {text:"OK", onPress:()=>updateUser(editUser)}
    ]);
  }

  const RejectBtn = ()=>{
    const editUser={
      userId : state._id,
      profilePicture: "",
      idCardPicture: [],
      crimCertificate: "",
      waiting: false,
    }
    Alert.alert("Thông báo!","Từ chối xác nhận danh tính người dùng này",[
      {text:"Cancel", onPress:()=>console.log("alert closed")},
      {text:"OK", onPress:()=>updateUser(editUser)}
    ]);
    
  }

  const updateUser = async(editUser)=>{
    try {
      const response = await fetch(`${BaseURL}/user/${user._id}`,{
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(editUser),
      })
      navigation.goBack();
    } catch (error) {
      console.log(error);
    }
  }

  const createNotify = async(notify)=>{
    try {
      const response = await fetch(`${BaseURL}/notify`,{
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(notify),
      })
      navigation.goBack();
    } catch (error) {
      console.log(error);
    }
  }

  return (
    <SafeAreaView style={GlobalStyles.droidSafeArea}>
      <Header iconLeft="chevron-back-outline" textCenter="Thông tin"/>
      <ScrollView showsVerticalScrollIndicator={false}>
        <View style={styles.container}>
          <View style={styles.wrapper}>
            <InfoText name="Họ và tên" data={user.fullname} />
            <InfoText name="Email" data={user.email} />
            <InfoText name="Ngày sinh" data={user.dayOfBirth} />
            <InfoText name="Quê quán" data={user.from} />
            <InfoText name="Số điện thoại" data={user.phone} />
          </View>

          {/* Giấy CCCD mặt sau */}
          <View style={styles.wrapper}>
            <Text style={styles.txtContent}>
                Hình 3*4 cm
            </Text>
            <View style={styles.coverImg}>
              <Image
                source={{ uri: PublicFolder + user.crimCertificate }}
                style={styles.img}
                resizeMode="contain"
              ></Image>
            </View>
          </View>

          {/* Giấy CCCD mặt trước */}
          <View style={styles.wrapper}>
            <Text style={styles.txtContent}>
                Mặt trước CMND/CCCD/HC
            </Text>
            <View style={styles.coverImg}>
              <Image
                source={{ uri: PublicFolder + user.crimCertificate }}
                style={styles.img}
                resizeMode="contain"
              ></Image>
            </View>
          </View>

          {/* Giấy CCCD mặt sau */}
          <View style={styles.wrapper}>
            <Text style={styles.txtContent}>
                Mặt sau CMND/CCCD/HC
            </Text>
            <View style={styles.coverImg}>
              <Image
                source={{ uri: PublicFolder + user.crimCertificate }}
                style={styles.img}
                resizeMode="contain"
              ></Image>
            </View>
          </View>


          {/* Giấy lí lịch thư pháp */}
          <View style={styles.wrapper}>
            <Text style={styles.txtContent}>
              Giấy lí lịch thư pháp bản số 3
            </Text>
            <View style={styles.coverImg}>
              <Image
                source={{ uri: PublicFolder + user.crimCertificate }}
                style={styles.img}
                resizeMode="contain"
              ></Image>
            </View>
          </View>
        </View>

        <View style={styles.wrapperBtn}>
            <CustomButton text="Từ chối" bgColor={COLORS.red} fgColor={COLORS.light} size='45%' onPress={RejectBtn}/>
            <CustomButton text='Chấp nhận' bgColor={COLORS.green} fgColor={COLORS.light} size='45%' onPress={AcceptBtn}/>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 20,
    alignItems: "center",
  },
  wrapper: {
    width: "100%",
    alignItems: "center",
    marginVertical: 10,
  },
  txtContent: {
    width: '100%',
    alignSelf: "flex-start",
    marginBottom: 10,
  },
  img: {
    width: "100%",
    height: "100%",
    maxWidth: 500,
    height: 200,
    marginHorizontal: 20,
    marginBottom: 25,
  },
  wrapperBtn:{
    flexDirection:'row',
    justifyContent: 'space-around',
  },
});

export default DetailUser;
