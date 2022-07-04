import {
  View,
  Text,
  Image,
  StyleSheet,
  useWindowDimensions,
  TouchableOpacity,
  Pressable,
} from "react-native";
import React, { useEffect, useState } from "react";
import { COLORS } from "../Colors";
import PublicFolder from "../api/PublicFolder";
import { useNavigation } from "@react-navigation/native";
import { Ionicons } from "@expo/vector-icons";
import baseURL from "../api/BaseURL";
import { Avatar } from "react-native-elements";

const ReviewItem = ({ r }) => {
  const [user, setUser] = useState([]);
  const { height } = useWindowDimensions();
  const navigation = useNavigation();
  const fetchUser = async () => {
    await fetch(`${baseURL}/user/${r.idReviewer}`)
      .then((res) => res.json())
      .then((resJson) => {
        setUser(resJson);
      });
  };
  useEffect(() => {
    fetchUser();
  }, []);

  return (
    <View style={styles.container}>
       <View style={{flexDirection: "row"}}>
        <View style={styles.avt}>
            <Avatar
              size={"small"}
              rounded
              source={{
                uri:
                  user.profilePicture !== ""
                    ? PublicFolder + user.profilePicture
                    : PublicFolder + "persons/noAvatar.png",
              }}
            ></Avatar>
          </View>
          <Text style={styles.fullname}>{user.fullname}</Text>
      </View>
    
      <Text style={[styles.title, { fontSize: height * 0.02 , paddingLeft: 50 } ]}>
        {r.ratingStar === 5 ? (
          <>
            <Ionicons
              name="star"
              size={15}
              color={"rgb(186, 126, 6)"}
            ></Ionicons>
            <Ionicons
              name="star"
              size={15}
              color={"rgb(186, 126, 6)"}
            ></Ionicons>
            <Ionicons
              name="star"
              size={15}
              color={"rgb(186, 126, 6)"}
            ></Ionicons>
            <Ionicons
              name="star"
              size={15}
              color={"rgb(186, 126, 6)"}
            ></Ionicons>
            <Ionicons
              name="star"
              size={15}
              color={"rgb(186, 126, 6)"}
            ></Ionicons>
          </>
        ) : r.ratingStar === 4 ? (
          <>
            <Ionicons
              name="star"
              size={15}
              color={"rgb(186, 126, 6)"}
            ></Ionicons>
            <Ionicons
              name="star"
              size={15}
              color={"rgb(186, 126, 6)"}
            ></Ionicons>
            <Ionicons
              name="star"
              size={15}
              color={"rgb(186, 126, 6)"}
            ></Ionicons>
            <Ionicons
              name="star"
              size={15}
              color={"rgb(186, 126, 6)"}
            ></Ionicons>
            <Ionicons name="star" size={15}></Ionicons>
          </>
        ) : r.ratingStar === 3 ? (
          <>
            <Ionicons
              name="star"
              size={15}
              color={"rgb(186, 126, 6)"}
            ></Ionicons>
            <Ionicons
              name="star"
              size={15}
              color={"rgb(186, 126, 6)"}
            ></Ionicons>
            <Ionicons
              name="star"
              size={15}
              color={"rgb(186, 126, 6)"}
            ></Ionicons>
            <Ionicons name="star" size={15}></Ionicons>
            <Ionicons name="star" size={15}></Ionicons>
          </>
        ) : r.ratingStar === 2 ? (
          <>
            <Ionicons
              name="star"
              size={15}
              color={"rgb(186, 126, 6)"}
            ></Ionicons>
            <Ionicons
              name="star"
              size={15}
              color={"rgb(186, 126, 6)"}
            ></Ionicons>
            <Ionicons name="star" size={15}></Ionicons>
            <Ionicons name="star" size={15}></Ionicons>
            <Ionicons name="star" size={15}></Ionicons>
          </>
        ) : (
          <>
            <Ionicons
              name="star"
              size={15}
              color={"rgb(186, 126, 6)"}
            ></Ionicons>
            <Ionicons name="star" size={15}></Ionicons>
            <Ionicons name="star" size={15}></Ionicons>
            <Ionicons name="star" size={15}></Ionicons>
            <Ionicons name="star" size={15}></Ionicons>
          </>
        )}
      </Text>
    
      <Text style={[styles.content, { fontSize: height * 0.02 }]}>
        {r.ratingText}
      </Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    borderBottomColor: COLORS.light,
    borderBottomWidth: 0.8,
    paddingVertical: 20,
  },
  avt:{
    paddingRight : 10,
  },

  wrapperText: {
    flex: 2,
    marginLeft: 20,
    justifyContent: "center",
    position: "relative",
  },
  
  content: {
    fontSize: 18,
    lineHeight: 24,
    color: COLORS.gray,
  },
  fullname:{
    flexDirection:"row",
    fontSize: 16,
    fontWeight: "bold",
    marginTop: 5,
  }
});

export default ReviewItem;
