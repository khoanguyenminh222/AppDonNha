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
  Alert,
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

const OrganizationPostScreen = ({ route }) => {
  const [state, setState] = useContext(AuthContext);

  const { height, width } = useWindowDimensions();
  const [category, setCategory] = useState("");
  const { control, handleSubmit } = useForm();
  const navigation = useNavigation();

  const VNF_REGEX = /((09|03|07|08|05)+([0-9]{8})\b)/g;
  const EMAIL_REGEX =
  /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;

  const [errMessage, setErrMessage] = useState("");

  const [arrayPicture, setArrayPicture] = useState([]);
  const [address, setAddress] = useState([]);
  const [coordinate, setCoordinate] = useState([]);

  // set lại address khi có tham số route.params
  useEffect(() => {
    if (route.params?.address) {
      setAddress(route.params.address);
    }
  }, [route.params?.address]);

  // set lại coordinate khi có tham số route.params
  useEffect(() => {
    if (route.params?.coordinate) {
      setCoordinate(route.params.coordinate);
    }
  }, [route.params?.coordinate]);

  // hàm cho phép upload ảnh
  const onUploadImage = async () => {
    let permissionResult =
      await ImagePicker.requestMediaLibraryPermissionsAsync();

    if (permissionResult.granted === false) {
      alert("Permission to access camera roll is required!");
      return;
    }

    let pickerResult = await ImagePicker.launchImageLibraryAsync();

    if (arrayPicture.includes(undefined)) {
      arrayPicture.pop();
    }
    setArrayPicture([...arrayPicture, pickerResult.uri]);
  };

  // mỗi khi picture thay đổi sẽ cập nhật lại ảnh bị null
  useEffect(() => {
    if (
      arrayPicture[arrayPicture.length - 1] == null ||
      arrayPicture[arrayPicture.length - 1] == undefined
    ) {
      arrayPicture.pop();
    }
  }, [arrayPicture.length]);

  // hàm xử lý khi bấm nút đăng
  const onSendOrganizationPost = async (data) => {
    // kiểm tra bắt người dùng nhập đầy đủ
    if (category == "") {
      setErrMessage("Chưa chọn Danh mục");
      return;
    }
    if (address == null || route.params == undefined) {
      setErrMessage("Chưa chọn vị trí");
      return;
    }

    if (arrayPicture.length === 0) {
      setErrMessage("Chưa chọn ảnh");
      return;
    }

    // lấy ra text địa chỉ để lưu vào DB
    const textAddress =
      (address.streetNumber !== null ? address.streetNumber + ", " : "") +
      (address.street !== null ? address.street + ", " : "") +
      (address.city !== null ? address.city + ", " : "") +
      (address.district !== null ? address.district + ", " : "") +
      (address.subregion !== null ? address.subregion + ", " : "") +
      (address.region !== null ? address.region : "");

    // tạo formData để upload ảnh lên DB
    const formData = new FormData();
    //mảng chưa tên ảnh
    const arrayFilename = [];
    //duyệt qua tất cả đường dẫn uri
    arrayPicture.forEach((a) => {
      const arrPicture = a.split("/");
      const filename = `file_${Date.now()}_${
        arrPicture[arrPicture.length - 1]
      }`;
      arrayFilename.push(filename);
      formData.append("file", {
        name: filename,
        uri: a,
        type: "image/*",
      });
    });

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

    // Các thuộc tính cần thiết của một tin đăng
    let postOrganizationPost = {
      userId: state._id,
      coordinates: [coordinate.longitude, coordinate.latitude],
      category: category,
      nameOrganization: data.nameOrganization,
      picture: arrayFilename,
      title: data.title,
      desc: data.desciption,
      emailOrgazization: data.emailOrganization,
      website: data.website,
      address: textAddress,
      phonenumber: data.phonenumber,
    };

    //fetch post tin đăng
    try {
      const postOrgan = await fetch(`${baseURL}/postUser`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(postOrganizationPost),
      });
      console.log(postOrgan);
    } catch (err) {
      console.log(err);
    }

    const notify={
      userId: state._id,
      title: "VUI LÒNG CHỜ CHO TIN CỦA BẠN ĐƯỢC DUYỆT !",
      text: "Có thể mất vài tiếng để tin được duyệt.",
    }
    createNotify(notify);
    Alert.alert("TIN ĐANG CHỜ DUYỆT !","Hãy chờ thông báo mới nhất",[
      {text:"OK", onPress:()=>navigation.navigate("Main")}
    ]);
  };

  //tạo thông báo
  const createNotify = async(notify)=>{
    try {
      const response = await fetch(`${baseURL}/notify`,{
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(notify),
      })
    } catch (error) {
      console.log(error);
    }
  }

  // nút chuyển qua trang location nhập vị trí
  const onChangeScreen = () => {
    const req = { action: "fill", name:"OrganizationPost"};
    navigation.navigate("Location", req);
  }

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
              { label: "Văn phòng", value: "Văn phòng" },
              { label: "Phòng trọ", value: "Phòng trọ" },
              { label: "Chung cư", value: "Chung cư" },
            ]}
            style={pickerSelectStyles}
          />

          <Text style={styles.title}>TÊN NHÀ CUNG CẤP DỊCH VỤ</Text>
          <CustomInput
            control={control}
            name="nameOrganization"
            placehoder="Tên*"
            rules={{
              required: "Tên không được để trống",
              maxLength: { value: 70, message: "Tiêu đề tối đa 70 ký tự" },
              minLength: { value: 5, message: "Tiêu đề tối thiểu 5 ký tự" },
            }}
          />
          <Text style={styles.title}>EMAIL NHÀ CUNG CẤP DỊCH VỤ</Text>
          <CustomInput
            control={control}
            name="emailOrganization"
            placehoder="Email*"
            rules={{
              required: "Email không được để trống",
              pattern: { value: EMAIL_REGEX, message: "Email sai định dạng" },
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

            {arrayPicture.map((element,i) => (
              <View key={i} style={styles.coverImg}>
                <Image
                  source={{ uri: element }}
                  style={styles.img}
                  resizeMode="contain"
                ></Image>
              </View>
            ))}
          </View>

          <Text style={styles.title}>TIÊU ĐỀ VÀ MÔ TẢ</Text>
          <CustomInput
            control={control}
            name="title"
            placehoder="Tiêu đề*"
            rules={{
              required: "Tiêu đề không được để trống",
              maxLength: { value: 70, message: "Tiêu đề tối đa 70 ký tự" },
              minLength: { value: 10, message: "Tiêu đề tối thiểu 10 ký tự" },
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
                minLength: { value: 10, message: "Mô tả tối thiểu 10 ký tự" },
              }}
            />
          </View>

          <Text style={styles.title}>ĐỊA CHỈ</Text>
          <TouchableOpacity
            style={{
              paddingHorizontal: 10,
              flexDirection: "row",
              justifyContent: "center",
              alignItems: "center",
            }}
            onPress={onChangeScreen}
          >
            <Ionicons
              size={30}
              color={COLORS.primary}
              name="map-outline"
            ></Ionicons>
            <Text style={{ color: COLORS.primary }}>Chọn từ bản đồ</Text>
          </TouchableOpacity>
          {address.region ? (
            <View style={styles.containerInput}>
              <TextInput
                value={address.region}
                placeholder="Tỉnh*"
                style={styles.input}
              />
            </View>
          ) : undefined}
          {address.subregion ? (
            <View style={styles.containerInput}>
              <TextInput
                value={address.subregion}
                placeholder="Quận/Huyện*"
                style={styles.input}
              />
            </View>
          ) : undefined}
          {address.city ? (
            <View style={styles.containerInput}>
              <TextInput
                value={address.city}
                placeholder="Thành phố*"
                style={styles.input}
              />
            </View>
          ) : undefined}
          {address.district ? (
            <View style={styles.containerInput}>
              <TextInput
                value={address.district}
                placeholder="Phường/Xã*"
                style={styles.input}
              />
            </View>
          ) : undefined}
          {address.street ? (
            <View style={styles.containerInput}>
              <TextInput
                value={address.street}
                placeholder="Tên đường*"
                style={styles.input}
              />
            </View>
          ) : undefined}
          {address.streetNumber ? (
            <View style={styles.containerInput}>
              <TextInput
                value={address.streetNumber}
                placeholder="Số nhà*"
                style={styles.input}
              />
            </View>
          ) : undefined}

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
          <Text style={styles.title}>Website</Text>
          <CustomInput control={control} name="website" placehoder="Website" />
          {errMessage !== "" ? (
            <CustomButton
              text={errMessage}
              bgColor={COLORS.red}
              fgColor={COLORS.white}
            />
          ) : undefined}
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
    width: "100%",
    borderRadius: 3,
    backgroundColor: COLORS.light,
    height: 200,
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
  },
  icon: {
    justifyContent: "center",
    alignItems: "center",
    flex: 1,
  },
  coverImg: {
    marginHorizontal: 10,
    marginVertical: 10,
    backgroundColor: COLORS.white,
    flex: 1,
  },
  img: {
    width: "100%",
    height: "100%",
  },
  textAreaContainer: {
    borderColor: "#e8e8e8",
    borderWidth: 1,
    padding: 5,
    height: 200,
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
    width: "100%",
    color: COLORS.black,
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
