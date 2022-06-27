import {
  View,
  Text,
  SafeAreaView,
  ScrollView,
  StyleSheet,
  useWindowDimensions,
  Image,
  TouchableOpacity
} from "react-native";
import React, { useState } from "react";
import GlobalStyles from "../GlobalStyles";
import Back from "../components/Back";
import Banner from "../components/Banner";
import { Ionicons } from "@expo/vector-icons";
import PublicFolder from "../api/PublicFolder";
import imageBanner1 from "../../assets/images/banner1.png";
import LocationScreen from "./LocationScreen";
import baseURL from "../api/BaseURL";
const DetailPost = ({ route }) => {
  const { width } = useWindowDimensions();
  const [user , setUser] = useState([]);
  const getFullnameById = async()=>{
    try{
      const response = await fetch (baseURL+`/user/${route.params.userId}`)
      .then(user=>user.json())
      .then(userJson=>{
          setUser(userJson)
      })
    }
    catch(error){
        console.log(error)
    }
 }
 getFullnameById();
 const handleLocation = () =>{
    
 }
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
            <View style={[styles.containerImage, { width: width }]}>
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

          <TouchableOpacity style={{flexDirection : 'row' , alignItems:'center'}} onPress={handleLocation}>
            <Ionicons name="location-outline" size={30} color={"blue"}></Ionicons>
            <Text style={[styles.info,{color:"blue"}]}>{route.params.address}</Text>
          </TouchableOpacity>
          <Text style={styles.info}>{user.fullname}</Text>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginHorizontal: 10,
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
    paddingLeft: 5,
    fontSize: 26,
  },
  info: {
    paddingTop: 10,
    paddingLeft: 5,
    fontSize: 20,
  },
  img: {
    width: "100%",
    height: "100%",
  },
});

export default DetailPost;
