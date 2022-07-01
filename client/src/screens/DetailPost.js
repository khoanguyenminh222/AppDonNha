import {
  View,
  Text,
  SafeAreaView,
  ScrollView,
  StyleSheet,
  useWindowDimensions,
  Image,
  TouchableOpacity,
  Alert,
} from "react-native";
import React, { useContext, useEffect, useState } from "react";
import GlobalStyles from "../GlobalStyles";
import Back from "../components/Back";
import Banner from "../components/Banner";
import { Avatar } from "react-native-elements";
import { Ionicons } from "@expo/vector-icons";
import PublicFolder from "../api/PublicFolder";
import imageBanner1 from "../../assets/images/banner1.png";

import baseURL from "../api/BaseURL";
import CustomButton from "../components/CustomButton";
import { stopLocationUpdatesAsync } from "expo-location";
import { useNavigation } from "@react-navigation/native";
import AuthContext from "../context/AuthContext";
import { COLORS } from "../Colors";
const DetailPost = ({ route }) => {
  const { width, height } = useWindowDimensions();
  const navigation = useNavigation();

  const [state, setState] = useContext(AuthContext);

  const [user, setUser] = useState([]);

  // fetch data lấy dữ liệu người dùng set lại user
  const getFullnameById = async () => {
    try {
      const response = await fetch(baseURL + `/user/${route.params.userId}`)
        .then((user) => user.json())
        .then((userJson) => {
          setUser(userJson);
        });
    } catch (error) {
      console.log(error);
    }
  };
  console.log(route.params);
  //gọi hàm khi load lần đầu load trang lấy ra người dùng đổ dữ liệu vào view
  useEffect(() => {
    getFullnameById();
  }, []);

  //hàm chuyển qua trang LocationScreen
  const handleLocation = () => {
    const req = {
      action: "view",
      textAddress: route.params.address,
      location: route.params.location.coordinates,
    };
    navigation.navigate("Location", req);
  };

  // hàm chuyển sang trang cá nhân người dùng
  const onPress = () => {
    navigation.navigate("Personal", user);
  };

  // nhấn duyệt bài đăng (chỉ có admin mới có quyền)
  const AcceptBtn = () => {
    const editPost = {
      admin: state._id,
      isWaiting: false,
    };
    const notify = {
      userId: user._id,
      title: "TIN CỦA BẠN ĐÃ ĐƯỢC DUYỆT",
      text: "Thật tuyệt vời, chắc chắn sẽ có rất nhiều người tìm đến bạn",
    };
    Alert.alert("Thông báo!", "Xác nhận duyệt tin đăng người dùng này", [
      { text: "Cancel", onPress: () => console.log("alert closed") },
      { text: "OK", onPress: () => completeProcess(editPost, notify) },
    ]);
  };

  const RejectBtn = () => {
    const editPost = {
      admin: state._id,
      isWaiting: false,
      isCancel: true,
    };
    const notify = {
      userId: user._id,
      title: "TIN CỦA BẠN KHÔNG ĐƯỢC CHẤP NHẬN",
      text: "Có thể tin chưa đầy đủ thông tin",
    };
    Alert.alert("Thông báo!", "Xác nhận duyệt tin đăng người dùng này", [
      { text: "Cancel", onPress: () => console.log("alert closed") },
      { text: "OK", onPress: () => completeProcess(editPost, notify) },
    ]);
  };

  const completeProcess = (editPost, notify) => {
    updatePost(editPost);
    createNotify(notify);
    navigation.goBack();
  };

  // cập nhật tin đăng
  const updatePost = async (editPost) => {
    try {
      const response = await fetch(`${baseURL}/postUser/${route.params._id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(editPost),
      });
      console.log(response);
    } catch (error) {
      console.log(error);
    }
  };

  //tạo thông báo
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

  return (
    <SafeAreaView style={GlobalStyles.droidSafeArea}>
      <Back textCenter="Chi tiết" />

      <ScrollView showsVerticalScrollIndicator={false}>
        <ScrollView
          style={styles.containBanner}
          horizontal={true}
          showsHorizontalScrollIndicator={false}
        >
          {route.params.picture.map((p) => (
            <View key={p} style={[styles.containerImage, { width: width }]}>
              <Image
                style={[styles.img, { width: width }]}
                source={{ uri: PublicFolder + p }}
                resizeMode="contain"
              />
            </View>
          ))}
        </ScrollView>
        <View style={styles.container}>
          <Text
            style={[
              styles.title,
              { textTransform: "uppercase", fontSize: height * 0.035 },
            ]}
          >
            {route.params.title}
          </Text>
          {route.params.nameOrganization ? (
            <View style={[styles.detail]}>
              <Ionicons
                name="home-sharp"
                size={height * 0.06}
                color={"brown"}
              ></Ionicons>
              <Text style={{ paddingTop: 20, fontSize: height * 0.03, paddingHorizontal: 5, textAlign: "center" }}>
                {route.params.nameOrganization}
              </Text>
            </View>
          ) : undefined}

          <TouchableOpacity
            style={{
              flexDirection: "row",
              alignItems: "center",
              paddingTop: 10,
            }}
            onPress={handleLocation}
          >
            <Ionicons
              name="location-outline"
              size={height * 0.03}
              color={"blue"}
            ></Ionicons>
            <Text
              style={[
                styles.address,
                { color: "blue", fontSize: height * 0.02 },
              ]}
            >
              {route.params.address}
            </Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={{
              flexDirection: "row",
              paddingBottom: 4,
              borderBottomColor: "blue",
              borderBottomWidth: StyleSheet.hairlineWidth,
            }}
            onPress={onPress}
          >
            <Avatar
              size={"medium"}
              rounded
              source={{
                uri:
                  user.profilePicture === ""
                    ? PublicFolder + user.profilePicture
                    : PublicFolder + "persons/noAvatar.png",
              }}
            ></Avatar>
            <Text style={[styles.info, { fontSize: height * 0.027 }]}>
              {user.fullname}
            </Text>
            <TouchableOpacity style={styles.button} onPress={onPress}>
              <Text style={styles.text}>Xem trang</Text>
            </TouchableOpacity>
          </TouchableOpacity>
          <View>
            <Text style={[styles.detail, { fontSize: height * 0.02 }]}>
              {route.params.desc}
            </Text>
          </View>
          <View style={[styles.detail]}>
            <Ionicons
              name="navigate-outline"
              size={height * 0.03}
              color={"brown"}
            ></Ionicons>
            <Text style={styles.textdetail}>{route.params.address}</Text>
          </View>
          <View style={[styles.detail]}>
            <Ionicons
              name="grid"
              size={height * 0.03}
              color={"brown"}
            ></Ionicons>
            <Text style={styles.textdetail}>{route.params.category}</Text>
          </View>
          {route.params.emailOrgazization ? (
            <View style={[styles.detail]}>
              <Ionicons
                name="mail"
                size={height * 0.03}
                color={"brown"}
              ></Ionicons>
              <Text style={styles.textdetail}>
                {route.params.emailOrgazization}
              </Text>
            </View>
          ) : undefined}

          <View style={[styles.detail]}>
            <Ionicons
              name="call"
              size={height * 0.03}
              color={"brown"}
            ></Ionicons>
            <Text style={styles.textdetail}>{route.params.phonenumber}</Text>
          </View>
          {route.params.website ? (
            <View style={[styles.detail]}>
              <Ionicons
                name="globe"
                size={height * 0.03}
                color={"brown"}
              ></Ionicons>
              <Text style={styles.textdetail}>{route.params.website}</Text>
            </View>
          ) : undefined}
        </View>

        {state.isAdmin ? (
          <View style={styles.wrapperBtn}>
            <CustomButton
              text="Từ chối"
              bgColor={COLORS.red}
              fgColor={COLORS.light}
              size="45%"
              onPress={RejectBtn}
            />
            <CustomButton
              text="Duyệt"
              bgColor={COLORS.green}
              fgColor={COLORS.light}
              size="45%"
              onPress={AcceptBtn}
            />
          </View>
        ) : undefined}
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginHorizontal: 10,
    marginBottom: 20,
  },
  containBanner: {
    flexDirection: "row",
    width: "100%",
    maxheight: 500,
  },
  containerImage: {
    width: "100%",
    maxWidth: 800,
    maxHeight: 200,
    marginHorizontal: 5,
  },
  title: {
    paddingTop: 10,
    paddingHorizontal: 5,
    borderBottomColor: "blue",
    borderBottomWidth: StyleSheet.hairlineWidth,
    fontWeight: "bold",
  },
  address: {
    paddingTop: 10,
  },
  info: {
    paddingTop: 20,
    paddingHorizontal: 20,
  },
  img: {
    width: "100%",
    height: "100%",
  },
  button: {
    paddingTop: 20,
    position: "absolute",
    left: 270,
    bottom: 5,
    display: "flex",
  },
  text: {
    alignItems: "center",
    justifyContent: "center",
    paddingVertical: 5,
    paddingHorizontal: 20,
    borderRadius: 4,
    elevation: 3,
    backgroundColor: "green",
    color: "white",
    lineHeight: 21,
    fontWeight: "bold",
    letterSpacing: 0.25,
  },
  detail: {
    alignItems: "center",
    flexDirection: "row",
    paddingHorizontal: 20,
    paddingVertical: 10,
  },
  textdetail: {
    paddingHorizontal: 5,
  },
  wrapperBtn: {
    flexDirection: "row",
    justifyContent: "space-around",
  },
});

export default DetailPost;
