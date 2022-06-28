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
const PersonalScreen = ({ route }) => {
  const { width } = useWindowDimensions();
  const navigation = useNavigation();
  const [user, setUser] = useState([]);
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

  return (
    <SafeAreaView style={GlobalStyles.droidSafeArea}>
      <Back textCenter="Chi tiết" />
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
          </View>
          <CustomInput
            control={control}
            name="fullname"
            defaultValue={route.params.fullname}
            logo="person-outline"
            editable={false}
            color="black"
          />
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
          <CustomButton
            text="ĐÁNH GIÁ"
            bgColor={COLORS.blue}
            fgColor={COLORS.white}
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
    alignItems: "center",
    padding: 20,
  },
  headerWrapper: {
    alignItems: "center",
    width: "100%",
  },
  logo: {
    width: 150,
    height: 150,
    borderRadius: 150 / 2,
    overflow: "hidden",
    borderWidth: 3,
    borderColor: COLORS.light,
  },
  bodyWrapper: {
    width: "100%",
    marginVertical: 20,
  },
});

export default PersonalScreen;
