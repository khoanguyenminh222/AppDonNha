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
const PersonalScreen = ({ route }) => {
  const { width, height} = useWindowDimensions();
  const navigation = useNavigation();
  const [user, setUser] = useState([]);
  const [posts , setPosts] = useState([]);
  const { control, handleSubmit } = useForm();
  const getFullnameById = async () => {
    try {
      const response = await fetch(`$baseURL + /user/${route.params._id}`)
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
  const Posting = async()=>{
    try {
      const res = await fetch(`${baseURL}/postUser/${route.params._id}`)
      .then((res) => res.json())
      .then((resJson) =>{
        setPosts(resJson);
      })    
    }
    catch(error){
      console.log(error)
    }
  }
  Posting();
  }, []);
console.log(user)
  const sendOnReviewScreen = ()=>{
    navigation.navigate("Review")
  };

  return (
    <SafeAreaView style={GlobalStyles.droidSafeArea}>
      <Back textCenter="Trang cá nhân" />
      <ScrollView showsVerticalScrollIndicator={false}>
        <View style={styles.container}>
          <View style={styles.headerWrapper}>
            <Image
              source={{
                uri:
                  user.profilePicture === ""
                    ? PublicFolder + user.profilePicture
                    : PublicFolder + "persons/noAvatar.png",
              }}
              style={styles.logo}
              resizeMode="cover"
            />
            <View style={styles.button}>
              <Text style={{ paddingLeft: 10, fontSize: height * 0.03, fontWeight: "bold" , paddingBottom: 5}}>
                {route.params.fullname}
              </Text>
              <CustomButton
                text="ĐÁNH GIÁ"
                bgColor={COLORS.green}
                fgColor={COLORS.white}
                size= {'70%'}
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
            name="desc"
            defaultValue={route.params.desc}
            logo="pencil-outline"
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
          <CustomInput
            control={control}
            name="vote"
            defaultValue={route.params.desc}
            logo="star-outline"
            editable={false}
            color="black"
          />
        </View>
        <View style={styles.text}>
          <Text>Tin đang đăng</Text>
          {
            posts && posts.map((post) => 
            post.isWaiting == false && post.isCancel == false ?(
              <Item key = {post.id} post={post}/>
            ): undefined
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
  button:{
    flex: 1,
    justifyContent: "center",
    alignItems: "center"
  }
});

export default PersonalScreen;
