import {
  View,
  Text,
  SafeAreaView,
  ScrollView,
  StyleSheet,
  useWindowDimensions,
  Image,
  TouchableOpacity,
} from "react-native";
import React, { useEffect, useState } from "react";
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
const DetailPost = ({ route }) => {
  const { width } = useWindowDimensions();
  const navigation = useNavigation();
  const [user, setUser] = useState([]);
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

  useEffect(() => {
    getFullnameById();
  }, []);

  const handleLocation = () => {
    const req = {
      action : 'view',
      textAddress: route.params.address,
      location: route.params.location.coordinates,
    }
   navigation.navigate("Location",req);
  };
  const onPress = () => {  navigation.navigate("Personal", user )
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
          <Text style={[styles.title, { textTransform: "uppercase" }]}>
            {route.params.title}
          </Text>
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
              size={30}
              color={"blue"}
            ></Ionicons>
            <Text style={[styles.address, { color: "blue" }]}>
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
              size="medium"
              rounded
              source={{
                uri:
                  user.profilePicture === ""
                    ? PublicFolder + user.profilePicture
                    : PublicFolder + "persons/noAvatar.png",
              }}
            ></Avatar>
            <Text style={styles.info}>{user.fullname}</Text>
            <TouchableOpacity style={styles.button} onPress={onPress}>
              <Text style={styles.text}>Xem trang</Text>
            </TouchableOpacity>
          </TouchableOpacity>
          <View style={{ flexDirection: "row" }}>
            <Text style={styles.detail}>{route.params.desc}</Text>
          </View>
          <View style={[styles.detail, { flexDirection: "row" }]}>
            <Ionicons
              name="navigate-outline"
              size={20}
              color={"brown"}
            ></Ionicons>
            <Text style={styles.textdetail}>{route.params.address}</Text>
          </View>
          <View style={[styles.detail, { flexDirection: "row" }]}>
            <Ionicons name="grid" size={20} color={"brown"}></Ionicons>
            <Text style={styles.textdetail}>{route.params.category}</Text>
          </View>
          {route.params.emailOrgazization ? (
            <View style={[styles.detail, { flexDirection: "row" }]}>
              <Ionicons name="mail" size={20} color={"brown"}></Ionicons>
              <Text style={styles.textdetail}>
                {route.params.emailOrgazization}
              </Text>
            </View>
          ) : undefined }

          <View style={[styles.detail, { flexDirection: "row" }]}>
            <Ionicons name="call" size={20} color={"brown"}></Ionicons>
            <Text style={styles.textdetail}>{route.params.phonenumber}</Text>
          </View>
          {route.params.website  ? (
            <View style={[styles.detail, { flexDirection: "row" }]}>
              <Ionicons name="globe" size={20} color={"brown"}></Ionicons>
              <Text style={styles.textdetail}>{route.params.website}</Text>
            </View>
          ) : undefined}
        </View>
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
    fontSize: 26,
    borderBottomColor: "blue",
    borderBottomWidth: StyleSheet.hairlineWidth,
  },
  address: {
    paddingTop: 10,
    fontSize: 14,
  },
  info: {
    paddingTop: 20,
    paddingHorizontal: 20,
    fontSize: 20,
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
    alignItems:"center",
    fontSize: 16,
    paddingHorizontal: 20,
    paddingVertical: 10,
  },
  textdetail: {
    paddingHorizontal: 5,
    fontSize: 16,
  },
});

export default DetailPost;
