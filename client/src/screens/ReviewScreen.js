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
const ReviewScreen = () => {
  const { control, handleSubmit } = useForm();
  const [defaultRating, setDefaultRating] = useState(2);
  const [maxRating, setmaxRating] = useState([1, 2, 3, 4, 5]);
  const starImgFilled =
    "https://raw.githubusercontent.com/tranhonghan/images/main/star_filled.png";
  const starImgCorner =
    "https://raw.githubusercontent.com/tranhonghan/images/main/star_corner.png";

  const CustomRatingBar = async () => {};

  return (
    <SafeAreaView style={GlobalStyles.droidSafeArea}>
      <Back textCenter="Đánh giá" />
      <ScrollView showsVerticalScrollIndicator={false}>
        <View style={styles.container}>
          <Text style={{ fontSize: 32}}>ĐÁNH GIÁ NGƯỜI DÙNG</Text>
          <View style={styles.customRatingBarStyle}>
            {maxRating.map((item, key) => {
              return (
                <TouchableOpacity
                  activeOpacity={0.7}
                  key={item}
                  onPress={() => setDefaultRating(item)}
                >
                  <Image
                    style={styles.starStyle}
                    source={
                      item <= defaultRating
                        ? { uri: starImgFilled }
                        : { uri: starImgCorner }
                    }
                  />
                </TouchableOpacity>
              );
            })}
          </View>

          <View style={styles.textAreaContainer}>
            <CustomInput
              control={control}
              name="review"
              placehoder="Hãy chia sẻ những điều mà bạn thích."
              numberOfLines={20}
              multiline={true}
              underlineColorAndroid="transparent"
              rules={{
                required: "Đánh giá không được để trống",
                maxLength: { value: 200, message: "Mô tả tối đa 200 ký tự" },
                minLength: { value: 20, message: "Mô tả tối thiểu 20 ký tự" },
              }}
            />
          </View>
        </View>
        <View style={styles.text}>
          <Text>Các đánh giá khác</Text>
        </View>
        <View style={styles.container}>
          <CustomButton
            text="HOÀN TẤT"
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
    justifyContent: "center",
    padding: 20,
   
  },
  customRatingBarStyle: {
    justifyContent: "center",
    flexDirection: "row",
    marginTop: 30,
    marginBottom: 30,
  },
  starStyle: {
    width: 40,
    height: 40,
    resizeMode: "cover",
  },
  textAreaContainer: {
    borderColor: "#e8e8e8",
    borderWidth: 1,
    padding: 5,
    height: 200,
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
});

export default ReviewScreen;
