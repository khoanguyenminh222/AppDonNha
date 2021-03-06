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
import PublicFolder from "../api/PublicFolder";
const IndividualPostScreen = ({ route }) => {
  const [state, setState] = useContext(AuthContext);

  const { height, width } = useWindowDimensions();
  const [category, setCategory] = useState("");
  const { control, handleSubmit } = useForm();
  const navigation = useNavigation();
  const VNF_REGEX = /((09|03|07|08|05)+([0-9]{8})\b)/g;
  const [errMessage, setErrMessage] = useState("");

  const [arrayPicture, setArrayPicture] = useState([]);

  const [address, setAddress] = useState([]);
  const [coordinate, setCoordinate] = useState([]);

  const [post, setPost] = useState(null);
  const [title, setTitle] = useState("");
  const [desc, setDesc] = useState("");
  const [phonenumber, setPhonenumber] = useState("");
  useEffect(() => {
    if (route.params?.post) {
      setPost(route.params.post);
      setTitle(route.params.post.title);
      setDesc(route.params.post.desc);
      setPhonenumber(route.params.post.phonenumber);
      let arr = [];
      route.params.post.picture.forEach((element) => {
        arr.push(PublicFolder + element);
      });
      setArrayPicture(arr);
    }
  }, [route.params?.post]);
  // set l???i address khi c?? tham s??? route.params
  useEffect(() => {
    if (route.params?.address) {
      setAddress(route.params.address);
    }
  }, [route.params?.address]);

  // set l???i coordinate khi c?? tham s??? route.params
  useEffect(() => {
    if (route.params?.coordinate) {
      setCoordinate(route.params.coordinate);
    }
  }, [route.params?.coordinate]);

  // h??m cho ph??p upload ???nh
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

  // m???i khi picture thay ?????i s??? c???p nh???t l???i ???nh b??? null
  useEffect(() => {
    if (
      arrayPicture[arrayPicture.length - 1] == null ||
      arrayPicture[arrayPicture.length - 1] == undefined
    ) {
      arrayPicture.pop();
    }
  }, [arrayPicture.length]);

  //h??m x??? l?? xo?? ???nh
  const handleDeleteImage = (image) => {
    arrayPicture.forEach((element, i) => {
      if (image === element) {
        arrayPicture.splice(i, 1);
        setArrayPicture([...arrayPicture]);
      }
    });
  };

  // h??m x??? l?? khi b???m n??t ????ng
  const onSendIndividualPost = async () => {
    // ki???m tra b???t ng?????i d??ng nh???p ?????y ?????
    if (category == "") {
      setErrMessage("Ch??a cho??n Danh mu??c");
      return;
    }
    if (title == "") {
      setErrMessage("Ch??a c?? ti??u ?????");
      return;
    }
    if (desc == "") {
      setErrMessage("Ch??a c?? n???i dung");
      return;
    }
    if (address == null || route.params == undefined) {
      setErrMessage("Ch??a cho??n v??? tr??");
      return;
    }

    if (arrayPicture.length === 0) {
      setErrMessage("Ch??a ch???n ???nh");
      return;
    }
    if (phonenumber == "") {
      setErrMessage("Ch??a c?? s??? ??i???n tho???i");
      return;
    }
    if (!VNF_REGEX.test(phonenumber) || phonenumber.length !== 10) {
      setErrMessage("S??? ??i???n tho???i kh??ng ????ng ?????nh d???ng");
      return;
    }

    // l???y ra text ?????a ch??? ????? l??u v??o DB
    const textAddress =
      (address.streetNumber !== null ? address.streetNumber + ", " : "") +
      (address.street !== null ? address.street + ", " : "") +
      (address.city !== null ? address.city + ", " : "") +
      (address.district !== null ? address.district + ", " : "") +
      (address.subregion !== null ? address.subregion + ", " : "") +
      (address.region !== null ? address.region : "");

    // t???o formData ????? upload ???nh l??n DB
    const formData = new FormData();
    //m???ng ch??a t??n ???nh
    const arrayFilename = [];
    //duy???t qua t???t c??? ???????ng d???n uri
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

    //upload ???nh l??n server
    try {
      //fetch api
      const res = await fetch(`${baseURL}/upload`, {
        method: "POST",
        body: formData,
      });
    } catch (error) {
      console.log(error.message);
    }

    // C??c thu???c t??nh c???n thi???t c???a m???t tin ????ng
    let postIndividual = {
      userId: state._id,
      coordinates: [coordinate.longitude, coordinate.latitude],
      category: category,
      picture: arrayFilename,
      title: title,
      desc: desc,
      address: textAddress,
      phonenumber: phonenumber,
    };
    // fetch post tin ????ng
    try {
      const postIndi = await fetch(`${baseURL}/postUser`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(postIndividual),
      });
    } catch (err) {
      console.log(err);
    }

    const notify = {
      userId: state._id,
      title: "VUI L??NG CH??? CHO TIN C???A B???N ???????C DUY???T !",
      text: "C?? th??? m???t v??i ti???ng ????? tin ???????c duy???t.",
    };
    createNotify(notify);
    Alert.alert("TIN ??ANG CH??? DUY???T !", "H??y ch??? th??ng b??o m???i nh???t", [
      { text: "OK", onPress: () => navigation.navigate("Main") },
    ]);
  };

  // ch???nh s???a tin
  const handleModifyPost = async () => {
    // ki???m tra b???t ng?????i d??ng nh???p ?????y ?????
    if (category == "") {
      setErrMessage("Ch??a cho??n Danh mu??c");
      return;
    }
    if (title == "") {
      setErrMessage("Ch??a c?? ti??u ?????");
      return;
    }
    if (desc == "") {
      setErrMessage("Ch??a c?? n???i dung");
      return;
    }
    if (address == null || route.params == undefined) {
      setErrMessage("Ch??a cho??n v??? tr??");
      return;
    }

    if (arrayPicture.length === 0) {
      setErrMessage("Ch??a ch???n ???nh");
      return;
    }
    if (phonenumber == "") {
      setErrMessage("Ch??a c?? s??? ??i???n tho???i");
      return;
    }
    if (!VNF_REGEX.test(phonenumber) || phonenumber.length !== 10) {
      setErrMessage("S??? ??i???n tho???i kh??ng ????ng ?????nh d???ng");
      return;
    }
    // l???y ra text ?????a ch??? ????? l??u v??o DB
    let textAddress;
    if (address.length === 0) {
    } else {
      textAddress =
        (address.streetNumber !== null ? address.streetNumber + ", " : "") +
        (address.street !== null ? address.street + ", " : "") +
        (address.city !== null ? address.city + ", " : "") +
        (address.district !== null ? address.district + ", " : "") +
        (address.subregion !== null ? address.subregion + ", " : "") +
        (address.region !== null ? address.region : "");
    }

    // t???o formData ????? upload ???nh l??n DB
    const formData = new FormData();
    //m???ng ch??a t??n ???nh
    const arrayFilename = [];
    //duy???t qua t???t c??? ???????ng d???n uri
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

    //upload ???nh l??n server
    try {
      //fetch api
      const res = await fetch(`${baseURL}/upload`, {
        method: "POST",
        body: formData,
      });
    } catch (error) {
      console.log(error.message);
    }

    // C??c thu???c t??nh c???n thi???t c???a m???t tin ????ng
    let postIndividual;
    if (address.length === 0) {
      postIndividual = {
        userId: state._id,
        category: category,
        picture: arrayFilename,
        title: title,
        desc: desc,
        phonenumber: phonenumber,
      };
    } else {
      postIndividual = {
        userId: state._id,
        coordinates: [coordinate.longitude, coordinate.latitude],
        category: category,
        picture: arrayFilename,
        title: title,
        desc: desc,
        address: textAddress,
        phonenumber: phonenumber,
      };
    }

    // fetch put ch???nh s???a tin
    try {
      const postIndi = await fetch(`${baseURL}/postUser/${post._id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(postIndividual),
      });
    } catch (err) {
      console.log(err);
    }

    const notify = {
      userId: state._id,
      title: "CH???NH S???A TH??NH C??NG, H??Y ?????I ????? TIN ???????C DUY???T !",
      text: "C?? th??? m???t v??i ti???ng ????? tin ???????c duy???t.",
    };
    createNotify(notify);
    Alert.alert("C???P NH???T TH??NH C??NG !", "H??y ch??? th??ng b??o m???i nh???t", [
      { text: "OK", onPress: () => navigation.goBack() },
    ]);
  };

  //t???o th??ng b??o
  const createNotify = async (notify) => {
    try {
      const response = await fetch(`${baseURL}/notify`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(notify),
      });
    } catch (error) {
      console.log(error);
    }
  };
  // n??t chuy???n qua trang location nh???p v??? tr??
  const onChangeScreen = () => {
    const req = { action: "fill", name: "IndividualPost" };
    navigation.navigate("Location", req);
  };

  return (
    <SafeAreaView style={GlobalStyles.droidSafeArea}>
      <Back textCenter={post ? "Ch???nh s???a" : "????ng tin"} />
      <ScrollView showsVerticalScrollIndicator={false}>
        <View style={styles.container}>
          <Text style={styles.title}>DANH MU??C</Text>
          <RNPickerSelect
            placeholder={{
              label: post ? post.category : "Cho??n danh mu??c*",
              value: post ? post.category : null,
            }}
            onValueChange={(category) => setCategory(category)}
            items={[
              { label: "V??n pho??ng", value: "V??n pho??ng" },
              { label: "Pho??ng tro??", value: "Pho??ng tro??" },
              { label: "Chung c??", value: "Chung c??" },
            ]}
            style={pickerSelectStyles}
          />

          <Text style={styles.title}>TH??NG TIN CHI TI????T</Text>
          <View style={styles.image}>
            {arrayPicture.length < 3 ? (
              <TouchableOpacity
                style={styles.icon}
                onPress={() => onUploadImage()}
              >
                <Ionicons name="camera-outline" size={90}></Ionicons>
                <Text> ????NG T???? 1 ??????N 3 A??NH </Text>
              </TouchableOpacity>
            ) : undefined}

            {arrayPicture.map((element, i) => (
              <View key={i} style={styles.coverImg}>
                <Image
                  source={{ uri: element }}
                  style={styles.img}
                  resizeMode="contain"
                ></Image>
                <Ionicons
                  onPress={() => handleDeleteImage(element)}
                  style={{ position: "absolute", top: 0, right: 0 }}
                  name="close-circle-outline"
                  size={30}
                ></Ionicons>
              </View>
            ))}
          </View>

          <Text style={styles.title}>TI??U ?????? VA?? M?? TA??</Text>

          <View style={styles.containerInput}>
            <TextInput
              value={title !== "" ? title : null}
              onChangeText={setTitle}
              placeholder="Ti??u ??????*"
              style={styles.input}
            />
          </View>
          <View style={styles.textAreaContainer}>
            <View style={styles.containerInput}>
              <TextInput
                value={desc !== "" ? desc : null}
                onChangeText={setDesc}
                placeholder="M?? ta?? chi ti????t*"
                style={styles.input}
                numberOfLines={20}
                multiline={true}
              />
            </View>
          </View>

          <Text style={styles.title}>??I??A CHI??</Text>
          {post && address.length == 0 ? (
            <View style={styles.containerInput}>
              <TextInput
                value={post ? post.address : null}
                placeholder="?????a ch???*"
                style={styles.input}
                editable={false}
              />
            </View>
          ) : undefined}

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
            <Text style={{ color: COLORS.primary }}>Ch???n t??? b???n ?????</Text>
          </TouchableOpacity>
          {address.region ? (
            <View style={styles.containerInput}>
              <TextInput
                value={address.region}
                placeholder="T???nh*"
                style={styles.input}
              />
            </View>
          ) : undefined}
          {address.subregion ? (
            <View style={styles.containerInput}>
              <TextInput
                value={address.subregion}
                placeholder="Qu???n/Huy???n*"
                style={styles.input}
              />
            </View>
          ) : undefined}
          {address.city ? (
            <View style={styles.containerInput}>
              <TextInput
                value={address.city}
                placeholder="Th??nh ph???*"
                style={styles.input}
              />
            </View>
          ) : undefined}
          {address.district ? (
            <View style={styles.containerInput}>
              <TextInput
                value={address.district}
                placeholder="Ph?????ng/X??*"
                style={styles.input}
              />
            </View>
          ) : undefined}
          {address.street ? (
            <View style={styles.containerInput}>
              <TextInput
                value={address.street}
                placeholder="T??n ???????ng*"
                style={styles.input}
              />
            </View>
          ) : undefined}
          {address.streetNumber ? (
            <View style={styles.containerInput}>
              <TextInput
                value={address.streetNumber}
                placeholder="S??? nh??*"
                style={styles.input}
              />
            </View>
          ) : undefined}

          <Text style={styles.title}>S???? ??I????N THOA??I</Text>
          <View style={styles.containerInput}>
            <TextInput
              value={phonenumber !== "" ? phonenumber : null}
              onChangeText={setPhonenumber}
              placeholder="S???? ??i????n thoa??i*"
              style={styles.input}
            />
          </View>
          {errMessage !== "" ? (
            <CustomButton
              text={errMessage}
              bgColor={COLORS.red}
              fgColor={COLORS.white}
            />
          ) : undefined}

          {post ? (
            <CustomButton text="Ch???nh s???a" onPress={handleModifyPost} />
          ) : (
            <CustomButton text="????NG TIN" onPress={onSendIndividualPost} />
          )}
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
    position: "relative",
  },
  img: {
    width: "100%",
    height: "100%",
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
export default IndividualPostScreen;
