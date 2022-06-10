import {
  View,
  Text,
  SafeAreaView,
  StyleSheet,
  Image,
  Pressable,
  ScrollView,
  TouchableOpacity,
  Alert,
} from "react-native";
import * as ImagePicker from "expo-image-picker";
import React, { useState, useContext } from "react";

import GlobalStyles from "../GlobalStyles";
import AuthContext from '../context/AuthContext';

import { COLORS } from "../Colors";
import BaseURL from "../api/BaseURL";
import BackButton from "../components/BackButton";
import CustomButton from "../components/CustomButton";

const Verify = () => {
  const [profilePicture, setProfilePicture] = useState(null);
  const [idCardFront, setIdCardFront] = useState(null);
  const [idCardBack, setIdCardBack] = useState(null);
  const [crimCertificate, setCrimCertificate] = useState(null);
  const [message, setMessage] = useState("");

  const [state, dispatch] = useContext(AuthContext);

  //lấy ảnh 3*4
  let ProfilePicture = async () => {
    let permissionResult =
      await ImagePicker.requestMediaLibraryPermissionsAsync();

    if (permissionResult.granted === false) {
      alert("Permission to access camera roll is required!");
      return;
    }

    let pickerResult = await ImagePicker.launchImageLibraryAsync();
    setProfilePicture(pickerResult.uri);
  };

  //lấy ảnh CMND mặt trước
  let IdCardFront = async () => {
    let permissionResult =
      await ImagePicker.requestMediaLibraryPermissionsAsync();

    if (permissionResult.granted === false) {
      alert("Permission to access camera roll is required!");
      return;
    }

    let pickerResult = await ImagePicker.launchImageLibraryAsync();
    setIdCardFront(pickerResult.uri);
  };

  //lấy ảnh CMND mặt sau
  let IdCardBack = async () => {
    let permissionResult =
      await ImagePicker.requestMediaLibraryPermissionsAsync();

    if (permissionResult.granted === false) {
      alert("Permission to access camera roll is required!");
      return;
    }

    let pickerResult = await ImagePicker.launchImageLibraryAsync();
    setIdCardBack(pickerResult.uri);
  };

  //lấy ảnh lí lịch pháp lý
  let CrimCertificate = async () => {
    let permissionResult =
      await ImagePicker.requestMediaLibraryPermissionsAsync();

    if (permissionResult.granted === false) {
      alert("Permission to access camera roll is required!");
      return;
    }

    let pickerResult = await ImagePicker.launchImageLibraryAsync();
    setCrimCertificate(pickerResult.uri);
  };

  const submitHandle = async () => {
    //kiểm tra việc upload file chưa
    if(!profilePicture||!idCardFront||!idCardBack||!crimCertificate){
      setMessage("Chưa đủ ảnh");
      return false;
    }


    const formData = new FormData();
    // lấy ra tên của ảnh
    const arrProfile = profilePicture.split("/");
    const filenameProfile = `file_${Date.now()}_${arrProfile[arrProfile.length-1]}`;
    // lấy ra tên của ảnh
    const arrIdFront = idCardFront.split("/");
    const filenameIdFront = `file_${Date.now()}_${arrIdFront[arrIdFront.length-1]}`;
    // lấy ra tên của ảnh
    const arrIdBack = idCardBack.split("/");
    const filenameIdBack = `file_${Date.now()}_${arrIdBack[arrIdBack.length-1]}`;
    // lấy ra tên của ảnh
    const arrCrimCer = crimCertificate.split("/");
    const filenameCrimCer = `file_${Date.now()}_${arrCrimCer[arrCrimCer.length-1]}`;

    formData.append('file',{
      name: filenameProfile,
      uri: profilePicture,
      type: 'image/*'
    })
    formData.append('file',{
      name: filenameIdFront,
      uri: idCardFront,
      type: 'image/*'
    })

    formData.append('file',{
      name: filenameIdBack,
      uri: idCardBack,
      type: 'image/*'
    })

    formData.append('file',{
      name: filenameCrimCer,
      uri: crimCertificate,
      type: 'image/*'
    })

    //upload ảnh lên server
    try {
      //fetch api
      const res = await fetch(`${BaseURL}/upload`, {
        method: "POST",
        body: formData,
      });
    } catch (error) {
      console.log(error.message);
    }


    const editUser = {
      userId : state.user._id,
      profilePicture: filenameProfile,
      idCardPicture: [filenameIdFront, filenameIdBack],
      crimCertificate: filenameCrimCer,
      waiting: true,
    }
    //cập nhật người dùng
    try {
      const user = await fetch(`${BaseURL}/user/${state.user._id}`,{
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(editUser),
      })
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <SafeAreaView style={GlobalStyles.droidSafeArea}>
      <BackButton />
      <ScrollView showsVerticalScrollIndicator={false}>
        <View style={styles.container}>
          <Text style={styles.txtHeader}>Verify</Text>

          {/* Ảnh 3*4 */}
          <View style={styles.wrapper}>
            <Text style={styles.txtContent}>
              Hình 3*4 cm <Text style={{ color: COLORS.red }}>*</Text>
            </Text>
            <Text style={styles.txtContent}>
              <Text style={{ color: COLORS.red }}>Lưu ý:</Text> Ảnh rõ nét chất
              lượng phim ảnh láng bóng; Chụp không quá 3 tháng; Không dùng ảnh
              scan/ chỉnh sửa; Chính diện rõ nét, không đeo kính, đầu để trần,
              trang phục lịch sự;
            </Text>
            <TouchableOpacity
              onPress={() => ProfilePicture()}
              style={styles.txtContent}
            >
              <Text style={{ color: COLORS.primary }}>Đính kèm</Text>
            </TouchableOpacity>

            <View style={styles.coverImg}>
              <Image
                source={{ uri: profilePicture }}
                style={styles.img}
                resizeMode="contain"
              ></Image>
            </View>
          </View>

          {/* Ảnh CMND mặt trước*/}
          <View style={styles.wrapper}>
            <Text style={styles.txtContent}>
              Mặt trước CMND/CCCD/HC{" "}
              <Text style={{ color: COLORS.red }}>*</Text>
            </Text>
            <Text style={styles.txtContent}>
              <Text style={{ color: COLORS.red }}>Lưu ý:</Text> Còn hạn và
              nguyên gốc, không bong/rách; Các chi tiết rõ nét, không có dấu
              hiệu chỉnh sửa. Đối với CMND: không ép lụa, ép dẻo, không là viền,
              không hở phôi giấy.
            </Text>
            <TouchableOpacity
              onPress={() => IdCardFront()}
              style={styles.txtContent}
            >
              <Text style={{ color: COLORS.primary }}>Đính kèm</Text>
            </TouchableOpacity>
            <View style={styles.coverImg}>
              <Image
                source={{ uri: idCardFront }}
                style={styles.img}
                resizeMode="contain"
              ></Image>
            </View>
          </View>

          {/* Ảnh CMND mặt sau*/}
          <View style={styles.wrapper}>
            <Text style={styles.txtContent}>
              Mặt sau CMND/CCCD/HC <Text style={{ color: COLORS.red }}>*</Text>
            </Text>
            <TouchableOpacity
              onPress={() => IdCardBack()}
              style={styles.txtContent}
            >
              <Text style={{ color: COLORS.primary }}>Đính kèm</Text>
            </TouchableOpacity>
            <View style={styles.coverImg}>
              <Image
                source={{ uri: idCardBack }}
                style={styles.img}
                resizeMode="contain"
              ></Image>
            </View>
          </View>

          {/* Ảnh lý lịch thư pháp*/}
          <View style={styles.wrapper}>
            <Text style={styles.txtContent}>
              Giấy lí lịch thư pháp bản số 3{" "}
              <Text style={{ color: COLORS.red }}>*</Text>
            </Text>
            <TouchableOpacity
              onPress={() => CrimCertificate()}
              style={styles.txtContent}
            >
              <Text style={{ color: COLORS.primary }}>Đính kèm</Text>
            </TouchableOpacity>
            <View style={styles.coverImg}>
              <Image
                source={{ uri: crimCertificate }}
                style={styles.img}
                resizeMode="contain"
              ></Image>
            </View>
          </View>
          <Text style={{color:COLORS.red}}>{message}</Text>
          <CustomButton text="Gửi" onPress={submitHandle} />
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
  txtHeader: {
    fontSize: 36,
    fontWeight: "500",
  },
  wrapper: {
    width: "100%",
    alignItems: "center",
  },
  txtContent: {
    fontSize: 16,
    alignSelf: "flex-start",
    marginBottom: 10,
  },
  coverImg: {
    width: "100%",
    maxWidth: 500,
    height: 200,
    marginHorizontal: 20,
    marginBottom: 25,
    backgroundColor: COLORS.light,
  },
  img: {
    width: "100%",
    height: "100%",
  },
});

export default Verify;
