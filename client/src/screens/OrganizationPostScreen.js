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
  Image,
} from "react-native";
import React, { useContext, useEffect, useState } from "react";
import RNPickerSelect from "react-native-picker-select";
import * as ImagePicker from "expo-image-picker";
import * as Location from "expo-location";
import Map from "../components/Map";
import GlobalStyles from "../GlobalStyles";
import Back from "../components/Back";
import { COLORS } from "../Colors";
import { Ionicons } from "@expo/vector-icons";
import { useForm } from "react-hook-form";
import CustomInput from "../components/CustomInput";
import CustomButton from "../components/CustomButton";
import { useNavigation } from "@react-navigation/native";
import baseURL from "../api/BaseURL";
import AuthContext from "../context/AuthContext";

const OrganizationPostScreen = () => {
  const [state, setState] = useContext(AuthContext);

  const { height, width } = useWindowDimensions();
  const [category, setCategory] = useState("");
  const { control, handleSubmit } = useForm();
  const navigation = useNavigation();
  const VNF_REGEX = /((09|03|07|08|05)+([0-9]{8})\b)/g;
  const [errMessage, setErrMessage] = useState("");
  const [errMessage1, setErrMessage1] = useState("");

  const[arrayPicture, setArrayPicture] = useState([]);
  const onUploadImage = async () => {
    let permissionResult =
      await ImagePicker.requestMediaLibraryPermissionsAsync();

    if (permissionResult.granted === false) {
      alert("Permission to access camera roll is required!");
      return;
    }

    let pickerResult = await ImagePicker.launchImageLibraryAsync();
    
    if(arrayPicture.includes(undefined)){
      arrayPicture.pop();
    }
    setArrayPicture([...arrayPicture,pickerResult.uri]);
  };


  useEffect(()=>{
    if(arrayPicture[arrayPicture.length-1]==null || arrayPicture[arrayPicture.length-1]==undefined){
      arrayPicture.pop();
    }
  },[arrayPicture.length])
  const onSendOrganizationPost = async (data) => {
    if(category==""){
      setErrMessage("Chưa chọn Danh mục");
      return;
    }
    if(arrayPicture.length===0){
      setErrMessage1("Chưa chọn ảnh");
      return;
    }

    const address = data.address+", "+data.district+", "+data.subregion+", "+data.region
    let geocode = await Location.geocodeAsync(address, Location.setGoogleApiKey("AIzaSyD9OXYLGgT1cSQ5XX7pi0vmSSJ9AY1x4y8"));

    const formData = new FormData();
    //mảng chưa tên ảnh
    const arrayFilename = [];
    //duyệt qua tất cả đường dẫn uri
    arrayPicture.forEach(a=>{
      const arrPicture = a.split("/");
      const filename = `file_${Date.now()}_${arrPicture[arrPicture.length-1]}`;
      arrayFilename.push(filename);
      formData.append('file',{
        name: filename,
        uri: a,
        type: 'image/*'
      })
    })

    //upload ảnh lên server
    try {
      //fetch api
      const res = await fetch(`${baseURL}/upload`, {
        method: "POST",
        body: formData,
      });
    } catch (error) {
      console.log(error.message);
    }
    
    
    let postOrganizationPost = {
      userId: state._id,
      coordinates: [geocode[0].longitude,geocode[0].latitude],
      category: category,
      nameOrganization: data.nameOrganization,
      picture: data.picture,
      title: data.title,
      desc: data.desciption,
      emailOrgazization: data.emailOrgazization,
      website: data.website,
      address: data.address,
      phonenumber: data.phonenumber,
    };
    try{
      const postOrgan = await fetch(`${baseURL}/postUser`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(postOrganizationPost),
      });
      console.log(postOrgan);
    } catch (err){
      console.log(err);
    }
   

    navigation.navigate("ManagePost");
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
           {errMessage == "" ? undefined : (
            <Text style={{ color: "red" }} marginLeft="5">
              {errMessage}
            </Text>
          )}

          <Text style={styles.title}>TÊN NHÀ CUNG CẤP DỊCH VỤ</Text>
          <CustomInput
            control={control}
            name="nameOrganization"
            placehoder="Tên*"
            rules={{
              required: "Tên không được để trống",
              maxLength: { value: 70, message: "Tiêu đề tối đa 70 ký tự" },
              minLength: { value: 20, message: "Tiêu đề tối thiểu 20 ký tự" },
            }}
          />
          <Text style={styles.title}>THÔNG TIN CHI TIẾT</Text>
          <View style={styles.image}>
            {arrayPicture.length < 3 ? (
              <TouchableOpacity
                style={styles.icon}
                onPress={() => onUploadImage()}
              >
                <Ionicons name="camera-outline" size={90}></Ionicons>
                <Text> ĐĂNG TỪ 1 ĐẾN 3 ẢNH </Text>
              </TouchableOpacity>
            ) : undefined}

            {arrayPicture.map((element) => (
              <View style={styles.coverImg}>
                <Image
                  source={{ uri: element }}
                  style={styles.img}
                  resizeMode="contain"
                ></Image>
              </View>
            ))}
          </View>
          {errMessage1 == "" ? undefined : (
            <Text style={{ color: COLORS.red }}>{errMessage1}</Text>
          )}

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
          <View style={styles.textAreaContainer}>
            <CustomInput
              control={control}
              name="desciption"
              placehoder="Mô tả chi tiết*"
              numberOfLines={20}
              multiline={true}
              underlineColorAndroid="transparent"
              rules={{
                required: "Mô tả chi tiết không được để trống",
                maxLength: { value: 200, message: "Mô tả tối đa 200 ký tự" },
                minLength: { value: 20, message: "Mô tả tối thiểu 20 ký tự" },
              }}
            />
          </View>

          <Text style={styles.title}>ĐỊA CHỈ</Text>
          <CustomInput
            control={control}
            name="region"
            placehoder="Tỉnh/Thành phố*"
            rules={{
              required: "Tỉnh/thành phố không được để trống",
            }}
          />
          <CustomInput
            control={control}
            name="subregion"
            placehoder="Quận/Huyện*"
            rules={{
              required: "Quận/huyện không được để trống",
            }}
          />
          <CustomInput
            control={control}
            name="district"
            placehoder="Phường/Xã*"
            rules={{
              required: "Phường/xã không được để trống",
            }}
          />
          <CustomInput
            control={control}
            name="address"
            placehoder="Số nhà, đường*"
            rules={{
              required: "Số nhà không được để trống",
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
          <CustomInput
            control={control}
            name="website"
            placehoder="Website"
          />
          <CustomButton
            text="ĐĂNG TIN"
            onPress={handleSubmit(onSendOrganizationPost)}
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
    width: '100%',
    borderRadius: 3,
    backgroundColor: COLORS.light,
    height: 200,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
  icon: {
    justifyContent: "center",
    alignItems: "center",
    flex: 1,
  },
  coverImg:{
    marginHorizontal: 10,
    marginVertical: 10,
    backgroundColor: COLORS.white,
    flex:1,
  },
  img:{
    width: '100%',
    height: '100%',
  },
  textAreaContainer: {
    borderColor: "#e8e8e8",
    borderWidth: 1,
    padding: 5,
    height: 200,
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
export default OrganizationPostScreen;
