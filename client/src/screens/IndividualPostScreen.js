import {
  View,
  Text,
  SafeAreaView,
  ScrollView,
  Button,
  TouchableOpacity,
  StyleSheet,
  useWindowDimensions,
  TextInput,
} from "react-native";
import React, { useState } from "react";
import RNPickerSelect from "react-native-picker-select";
import GlobalStyles from "../GlobalStyles";
import Back from "../components/Back";
import { COLORS } from "../Colors";
import { Ionicons } from "@expo/vector-icons";
import { useForm } from "react-hook-form";
import CustomInput from "../components/CustomInput";
import CustomButton from "../components/CustomButton";
import { useNavigation } from "@react-navigation/native";
import baseURL from "../api/BaseURL";
const IndividualPostScreen = () => {
  const { height, width } = useWindowDimensions();
  const [category, setCategory] = useState("");
  const { control, handleSubmit } = useForm();
  const navigation = useNavigation();
  const VNF_REGEX = /((09|03|07|08|05)+([0-9]{8})\b)/g;
  const [errMessage, setErrMessage] = useState("Chưa chọn Danh mục");

  const onSendIndividualPost = async(data) => {
    let postIndividual = {
      userId : "62b1b1682251ecc6c91931ec",

      category: category,
      
      title: data.title,
      desc: data.desciption,
      address: data.address,
      phonenumber: data.phonenumber,
    };
    try{
      const postIndi = await fetch(`${baseURL}/postUser`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(postIndividual),
      });
      console.log(postIndi)
    }catch(err){
      console.log(err)
    }
    
    //navigation.navigate("ManagePost");
  };
  
  return (
    <SafeAreaView style={GlobalStyles.droidSafeArea}>
      <Back textCenter="Đăng tin" />
      <ScrollView showsVerticalScrollIndicator={false}>
        <View style={styles.container}>
          <Text style={styles.title}>DANH MỤC</Text>
          <RNPickerSelect
            placeholder={{ label: "Chọn danh mục*", value: null }}
            onValueChange={(category) => setCategory(category)}
            items={[
              { label: "Văn phòng", value: "office" },
              { label: "Phòng trọ", value: "motel" },
              { label: "Chung cư", value: "apartment" },
            ]}
            style={pickerSelectStyles}
          />
          {category === "" || category === null? <Text style={{color: "red"}} marginLeft="5">{errMessage}</Text> : undefined}

          <Text style={styles.title}>THÔNG TIN CHI TIẾT</Text>
          <View style={styles.image}>
            <TouchableOpacity style={styles.icon}>
              <Ionicons name="camera-outline" size={90}></Ionicons>
              <Text> ĐĂNG TỪ 1 ĐẾN 3 ẢNH </Text>
            </TouchableOpacity>
          </View>
          <Text style={styles.title}>TIÊU ĐỀ VÀ MÔ TẢ</Text>
          <CustomInput
            control={control}
            name="title"
            placehoder="Tiêu đề*"
            rules={{
              required: "Tiêu đề không được để trống",
              maxLength: { value: 70, message: "Tiêu đề tối đa 70 ký tự" },
              minLength: { value: 20, message: "Tiêu đề tối thiểu 20 ký tự" },
            }}
          />
          <CustomInput
            control={control}
            name="desciption"
            placehoder="Mô tả chi tiết*"
            rules={{
              required: "Mô tả chi tiết không được để trống",
              maxLength: { value: 200, message: "Mô tả tối đa 200 ký tự" },
              minLength: { value: 20, message: "Mô tả tối thiểu 20 ký tự" },
            }}
          />

          <Text style={styles.title}>ĐỊA CHỈ</Text>
          <CustomInput
            control={control}
            name="address"
            placehoder="Địa chỉ*"
            rules={{
              required: "Địa chỉ không được để trống",
            }}
          />
          <Text style={styles.title}>SỐ ĐIỆN THOẠI</Text>
          <CustomInput 
            control={control}
            name="phonenumber"
            placehoder="Số điện thoại*"
            rules={{
              required: "Số điện thoại không được để trống",
              pattern: {
                value: VNF_REGEX,
                message: "Số điện thoại sai định dạng",
              },
              minLength: {
                value: 10,
                message: "Số điện thoại tối thiểu 10 ký tự",
              },
            }}
          />
          <CustomButton
            text="ĐĂNG TIN"
            onPress={handleSubmit(onSendIndividualPost)}
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
    padding: 10,
  },
  title: {
    fontSize: 20,
    marginLeft: 10,
    marginTop: 20,
  },
  image: {
    width: "100%",
    borderRadius: 3,
    backgroundColor: COLORS.light,
    height: 200,
  },
  icon: {
    justifyContent: "center",
    alignItems: "center",
    width: "100%",
    height: "100%",
  },
    
});
const pickerSelectStyles = StyleSheet.create({
  inputIOS: {
    fontSize: 16,
    paddingVertical: 12,
    paddingHorizontal: 10,
    borderWidth: 5,
    borderColor: "gray",
    borderRadius: 4,
    color: "black",
    paddingRight: 30,
  },
  inputAndroid: {
    fontSize: 16,
    paddingHorizontal: 10,
    paddingVertical: 8,
    borderWidth: 3,
    borderColor: "purple",
    borderRadius: 10,
    color: "black",
    paddingRight: 30,
  },
});
export default IndividualPostScreen;
