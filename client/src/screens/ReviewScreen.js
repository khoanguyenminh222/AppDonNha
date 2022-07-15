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
import { COLORS } from "../Colors";
import CustomInput from "../components/CustomInput";
import { useForm } from "react-hook-form";
import AuthContext from "../context/AuthContext";
import ReviewItem from "../components/ReviewItem";

const ReviewScreen = ({ route }) => {
  const {width} = useWindowDimensions();
  const { control, handleSubmit } = useForm();
  const [state, setState] = useContext(AuthContext);
  const [review, setReview] = useState([]);
  const [defaultRating, setDefaultRating] = useState(2);
  const [maxRating, setmaxRating] = useState([1, 2, 3, 4, 5]);
  const starImgFilled =
    "https://raw.githubusercontent.com/tranhonghan/images/main/star_filled.png";
  const starImgCorner =
    "https://raw.githubusercontent.com/tranhonghan/images/main/star_corner.png";

  const Review = async (data) => {
    let dataReview = {
      userId: route.params._id, // ID người đánh giá
      idReviewer: state._id, //ID của người được đánh giá
      ratingStar: parseInt(defaultRating),
      ratingText: data.reviewText,
    };
    try {
      const response = await fetch(`${baseURL}/review`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(dataReview),
      });
      fetchReview();
    } catch (error) {
      console.log(error);
    }
  };
  const fetchReview = async () =>{
    try {
      const res = await fetch(`${baseURL}/review/${route.params._id}`)
        .then((res) => res.json())
        .then((resJson) => {
          setReview(resJson);
          console.log(resJson)
        });
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    fetchReview();
  }, []);

  const [end, setEnd] = useState(5);
  const handleLoadMore = () => {
    setEnd(end+5);
}
 console.log(review.length)
  return (
    <SafeAreaView style={GlobalStyles.droidSafeArea}>
      <Back textCenter="Đánh giá" />
      <ScrollView showsVerticalScrollIndicator={false}>
        <View style={styles.container}>
          <Text style={{ fontSize: 32 }}>ĐÁNH GIÁ NGƯỜI DÙNG</Text>
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
              name="reviewText"
              placehoder="Hãy chia sẻ những điều mà bạn thích."
              numberOfLines={20}
              multiline={true}
              underlineColorAndroid="transparent"
              rules={{
                required: "Đánh giá không được để trống",
                maxLength: { value: 1000, message: "Mô tả tối đa 1000 ký tự" },
                minLength: { value: 10, message: "Mô tả tối thiểu 10 ký tự" },
              }}
            />
          </View>
        </View>
        <View style={styles.container}>
          <CustomButton
            text="HOÀN TẤT"
            bgColor={COLORS.blue}
            fgColor={COLORS.white}
            onPress={handleSubmit(Review)}
          />
        </View>
        <View style={styles.text}>
          <Text>Các đánh giá khác</Text>
          {review &&
            review.slice(0,end).map((r) =>
              (
                <ReviewItem key={r.id} r={r}/>
              ) 
            )}
          {end>=review.length ? (
            undefined
          ): (
            <TouchableOpacity style={styles.btnLoadmore} onPress={handleLoadMore}>
            <Text>Xem thêm</Text>
            <Ionicons size={width * 0.05} name="chevron-down-outline"></Ionicons>
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
    fontSize: 24,
    color: COLORS.gray,
    borderBottomColor: "gray",
    borderTopColor: "gray",
    borderBottomWidth: StyleSheet.hairlineWidth,
    borderTopWidth: StyleSheet.hairlineWidth,
    paddingBottom: 10,
    paddingTop: 10,
  },
  btnLoadmore: {
    padding:20,
    justifyContent: 'center',
    alignItems: 'center',
    width: '100%',
    flexDirection: 'row',
}
});

export default ReviewScreen;
