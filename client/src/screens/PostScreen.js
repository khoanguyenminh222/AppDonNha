import {
  View,
  Text,
  SafeAreaView,
  ScrollView,
  Button,
  TouchableOpacity,
  StyleSheet,
  useWindowDimensions,
} from "react-native";
import React from "react";
import GlobalStyles from "../GlobalStyles";
import Back from "../components/Back";
import { COLORS } from "../Colors";
import { Ionicons } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";
const PostScreen = () => {
  const { height, width } = useWindowDimensions();
  const navigation = useNavigation();
  
  
  const onIndividualPost = ()=>{
    navigation.navigate("IndividualPost")
  } 
  const onOrganizationPost = ()=>{
    navigation.navigate("OrganizationPost")
  } 

  return (
    <SafeAreaView style={GlobalStyles.droidSafeArea}>
      <Back textCenter="Đăng tin" />

      <View style={styles.container}>
        <View style={styles.btn}>
          <TouchableOpacity
            style={[
              styles.btnPost,
              {
                height: height * 0.2,
                width: height * 0.2,
                backgroundColor: COLORS.primary,
              },
            ]}

            onPress={onIndividualPost}
          >
            <Ionicons
              style={styles.icon}
              name="person-circle-outline"
              size={50}
              color="brown"
            ></Ionicons>
            <Text style={styles.Text}>CÁ NHÂN</Text>

          </TouchableOpacity>
          <TouchableOpacity
            style={[
              styles.btnPost,
              {
                height: height * 0.2,
                width: height * 0.2,
                backgroundColor: COLORS.gray,
              },
            ]}
            onPress={onOrganizationPost}
          >
            <Ionicons
              style={styles.icon}
              name="briefcase-outline"
              size={50}
              color="black"
            ></Ionicons>
            <Text style={styles.Text}>TỔ CHỨC</Text>
          </TouchableOpacity>
        </View>
        <View>
        <Text>
          *Lưu ý:{"\n"}
          {"\t"}- Chọn vào mục "CÁ NHÂN" khi đăng tin tìm dịch vụ dọn nhà.{"\n"}
          {"\t"}- Chọn vào mục "TỔ CHỨC" khi đăng tin cung cấp dịch vụ dọn nhà.
        </Text>
      </View>
      </View>
    </SafeAreaView>
  );
};
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.backgroundColor,
    justifyContent:'center',
    alignItems: "center",
    padding: 20,
  },
  btn: {
    flexDirection: 'row',
    marginVertical: 50,
  },
  btnPost: {
    width: 100,
    height: 100,
    marginHorizontal: 5,
    borderRadius: 5,
    justifyContent: "center",
    alignItems: "center",
  },
  Text: {
    color: COLORS.white,
  },
  
});
export default PostScreen;
