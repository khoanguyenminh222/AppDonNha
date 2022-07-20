import {
  View,
  Text,
  SafeAreaView,
  ScrollView,
  StyleSheet,
  useWindowDimensions,
  Image,
  TouchableOpacity,
  handleSubmit,
  TextInput,
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
import { COLORS } from "../Colors";
import CustomInput from "../components/CustomInput";
import { useForm } from "react-hook-form";
import ReviewScreen from "./ReviewScreen";
import Item from "../components/Item";
import { format } from "timeago.js";

const PersonalScreen = ({ route }) => {
  const { width, height } = useWindowDimensions();
  const navigation = useNavigation();
  const [user, setUser] = useState([]);
  const [posts, setPosts] = useState([]);
  const { control, handleSubmit } = useForm();
  const getFullnameById = async () => {
    try {
      const response = await fetch(`${baseURL}/user/${route.params._id}`)
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
  useEffect(() => {
    const Posting = async () => {
      try {
        const res = await fetch(`${baseURL}/postUser/${route.params._id}`)
          .then((res) => res.json())
          .then((resJson) => {
            setPosts(resJson);
          });
      } catch (error) {
        console.log(error);
      }
    };
    Posting();
  }, []);
  const sendOnReviewScreen = () => {
    navigation.navigate("Review", route.params);
  };

  const [rating, setRating] = useState("");
  useEffect(() => {
    const fetchRating = async () => {
      await fetch(`${baseURL}/review/averageRating/${route.params._id}`)
        .then((res) => res.json())
        .then((resJson) => {
          if (resJson.message) {
            setRating(resJson.message);
          } else {
            setRating(resJson);
          }
        });
    };
    fetchRating();
  }, []);

  const [end, setEnd] = useState(5);
  const handleLoadMore = () => {
    setEnd(end + 5);
  };

  return (
    <SafeAreaView style={GlobalStyles.droidSafeArea}>
      <Back textCenter="Trang cá nhân" />
      <ScrollView showsVerticalScrollIndicator={false}>
        <View style={styles.container}>
          <View style={styles.headerWrapper}>
            <View style={{position:'relative'}}>
              <Image
                source={{
                  uri:
                    route.params.profilePicture !== ""
                      ? PublicFolder + route.params.profilePicture
                      : PublicFolder + "persons/noAvatar.png",
                }}
                style={styles.logo}
                resizeMode="cover"
              />
              {route.params.isVerify===true ? (
                <Ionicons style={{position:'absolute', bottom:0, right: 0, left: 0, marginLeft:'auto', marginRight: 'auto', textAlign:'center'}} color={COLORS.green} size={width*0.1} name="shield-checkmark"></Ionicons>

              ): undefined}
            </View>
            
            <View style={styles.button}>
              <Text
                style={{
                  paddingLeft: 10,
                  fontSize: height * 0.03,
                  fontWeight: "bold",
                  paddingBottom: 5,
                }}
              >
                {route.params.fullname}
              </Text>
              <CustomButton
                text="ĐÁNH GIÁ"
                bgColor={COLORS.green}
                fgColor={COLORS.white}
                size={"70%"}
                onPress={sendOnReviewScreen}
              />
            </View>
          </View>

          <CustomInput
            control={control}
            name="email"
            defaultValue={route.params.email}
            logo="mail-outline"
            editable={false}
            color="black"
          />
          <CustomInput
            control={control}
            name="dayofbirth"
            defaultValue={route.params.dayOfBirth}
            logo="calendar-outline"
            editable={false}
            color="black"
          />
          <CustomInput
            control={control}
            name="phonenumber"
            defaultValue={route.params.phone}
            logo="call-outline"
            editable={false}
            color="black"
          />
          <CustomInput
            control={control}
            name="address"
            defaultValue={route.params.city}
            logo="location-outline"
            editable={false}
            numberOfLines={3}
            underlineColorAndroid="transparent"
            multiline={true}
            color="black"
          />
          {/* <View style={styles.containerInput}>
            <View style={styles.wrapperLogo}>
              <Ionicons name="star-outline" size={30} />
            </View>
            <TextInput
              value={rating}
              placeholder="Đánh giá"
              style={styles.input}
              editable={false}
            />
          </View> */}
          <View style={{flex: 1, justifyContent: 'center', alignContent: 'center'}}>
            <View
            style={{
              flex: 1,
              flexDirection: "row",
              justifyContent: "space-between",
            }}
          >
            {rating >= 5 ? (
              <>
                <Ionicons
                  name="star"
                  size={height * 0.04}
                  color={"rgb(186, 126, 6)"}
                ></Ionicons>
                <Ionicons
                  name="star"
                  size={height * 0.04}
                  color={"rgb(186, 126, 6)"}
                ></Ionicons>
                <Ionicons
                  name="star"
                  size={height * 0.04}
                  color={"rgb(186, 126, 6)"}
                ></Ionicons>
                <Ionicons
                  name="star"
                  size={height * 0.04}
                  color={"rgb(186, 126, 6)"}
                ></Ionicons>
                <Ionicons
                  name="star"
                  size={height * 0.04}
                  color={"rgb(186, 126, 6)"}
                ></Ionicons>
              </>
            ) : rating >= 4 ? (
              <>
                <Ionicons
                  name="star"
                  size={height * 0.04}
                  color={"rgb(186, 126, 6)"}
                ></Ionicons>
                <Ionicons
                  name="star"
                  size={height * 0.04}
                  color={"rgb(186, 126, 6)"}
                ></Ionicons>
                <Ionicons
                  name="star"
                  size={height * 0.04}
                  color={"rgb(186, 126, 6)"}
                ></Ionicons>
                <Ionicons
                  name="star"
                  size={height * 0.04}
                  color={"rgb(186, 126, 6)"}
                ></Ionicons>
                <Ionicons name="star" size={height * 0.04}></Ionicons>
              </>
            ) : rating >= 3 ? (
              <>
                <Ionicons
                  name="star"
                  size={height * 0.04}
                  color={"rgb(186, 126, 6)"}
                ></Ionicons>
                <Ionicons
                  name="star"
                  size={height * 0.04}
                  color={"rgb(186, 126, 6)"}
                ></Ionicons>
                <Ionicons
                  name="star"
                  size={height * 0.04}
                  color={"rgb(186, 126, 6)"}
                ></Ionicons>
                <Ionicons name="star" size={height * 0.04}></Ionicons>
                <Ionicons name="star" size={height * 0.04}></Ionicons>
              </>
            ) : rating >= 2 ? (
              <>
                <Ionicons
                  name="star"
                  size={height * 0.04}
                  color={"rgb(186, 126, 6)"}
                ></Ionicons>
                <Ionicons
                  name="star"
                  size={height * 0.04}
                  color={"rgb(186, 126, 6)"}
                ></Ionicons>
                <Ionicons name="star" size={height * 0.04}></Ionicons>
                <Ionicons name="star" size={height * 0.04}></Ionicons>
                <Ionicons name="star" size={height * 0.04}></Ionicons>
              </>
            ) : (
              <>
                <Ionicons
                  name="star"
                  size={height * 0.04}
                  color={"rgb(186, 126, 6)"}
                ></Ionicons>
                <Ionicons name="star" size={height * 0.04}></Ionicons>
                <Ionicons name="star" size={height * 0.04}></Ionicons>
                <Ionicons name="star" size={height * 0.04}></Ionicons>
                <Ionicons name="star" size={height * 0.04}></Ionicons>
              </>
            )}
            <View>
              
            </View>
            </View>
            <Text style={{textAlign:'center', color: COLORS.red}}>{rating}/5.0</Text>
          </View>
          
        </View>
        <View style={styles.text}>
          <Text>Tin đang đăng</Text>
          {posts &&
            posts
              .slice(0, end)
              .map((post) =>
                post.isWaiting == false && post.isCancel == false ? (
                  <Item key={post.id} post={post} />
                ) : undefined
              )}
          {end >= posts.length ? undefined : (
            <TouchableOpacity
              style={styles.btnLoadmore}
              onPress={handleLoadMore}
            >
              <Text>Xem thêm</Text>
              <Ionicons
                size={width * 0.05}
                name="chevron-down-outline"
              ></Ionicons>
            </TouchableOpacity>
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
    alignItems: "center",
    padding: 20,
  },
  headerWrapper: {
    alignItems: "flex-start",
    width: "100%",
    flexDirection: "row",
    alignItems: "center",
  },
  logo: {
    width: 100,
    height: 100,
    borderRadius: 150 / 2,
    overflow: "hidden",
    borderWidth: 3,
    borderColor: COLORS.light,
  },
  bodyWrapper: {
    width: "100%",
    marginVertical: 20,
  },
  text: {
    paddingLeft: 15,
    fontSize: 16,
    color: COLORS.gray,
    borderBottomColor: "gray",
    borderTopColor: "gray",
    borderBottomWidth: StyleSheet.hairlineWidth,
    borderTopWidth: StyleSheet.hairlineWidth,
    paddingBottom: 10,
    paddingTop: 10,
  },
  button: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  btnLoadmore: {
    padding: 20,
    justifyContent: "center",
    alignItems: "center",
    width: "100%",
    flexDirection: "row",
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
    justifyContent: "center",
    alignItems: "center",
  },
  wrapperLogo: {
    paddingHorizontal: 5,
    borderRightWidth: 1,
  },
  input: {
    flex: 1,
    paddingLeft: 10,
    width: "100%",
    height: "100%",
    color: COLORS.black,
  },
});

export default PersonalScreen;
