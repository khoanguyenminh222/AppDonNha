import {
  View,
  Text,
  StyleSheet,
  TextInput,
  Image,
  TouchableOpacity,
} from "react-native";
import React, { useContext, useEffect, useState } from "react";
import { useNavigation } from "@react-navigation/native";
import { Ionicons } from "@expo/vector-icons";
import Logo from "../../assets/images/logo.png";
import { COLORS } from "../Colors";
import Badge from "./Badge";
import AuthContext from "../context/AuthContext";
import BaseURL from '../api/BaseURL';

const Header = ({
  iconLeft,
  iconRight,
  textLeft,
  textCenter,
  isSearch,
}) => {

  const [badge,setBadge] = useState(false);

  const [notifies, setNotifies] = useState([]);
  const [state, setState] = useContext(AuthContext);
  
  const navigation = useNavigation();

  const changeScreenLocation = () =>{
    navigation.navigate("Location");
  }

  const changeScreenNotify = ()=>{
    navigation.navigate("Notification");
  }

  const fetchNotifies = async () => {
    const response = await fetch(`${BaseURL}/notify/notread/user/${state._id}`);
    const responseJson = await response.json();
    setNotifies(responseJson);
    notifies && notifies.map((noti)=>{
      if(noti.readed){
        setBadge(false);
      }else{
        setBadge(true);
      }
    }) 
  };

  useEffect(() => {
    fetchNotifies();

  }, [notifies.length]);

  
  return (
    <View style={styles.container}>
      <View style={styles.top}>
        <TouchableOpacity onPress={changeScreenLocation} style={styles.leftWrapper}>
          <Ionicons
            style={styles.iconLocation}
            size={24}
            color={COLORS.primary}
            name={iconLeft}
          ></Ionicons>
          <Text numberOfLines={1} ellipsizeMode='tail' style={styles.txtLocation}>{textLeft}</Text>
        </TouchableOpacity>
        <View style={styles.centerWrapper}>
          <Text style={styles.txtCenter}>{textCenter}</Text>
        </View>

        {iconRight
        
          ? (
            <TouchableOpacity
                  onPress={changeScreenNotify}
                  style={styles.rightWrapper}
                >
                  
                  {badge?<Badge/>:undefined}
                  <Ionicons
                    style={styles.iconNotify}
                    size={24}
                    name="notifications-outline"
                  ></Ionicons>
                </TouchableOpacity>
          )
          : undefined
          }
      </View>
      {isSearch ? (
        <View style={styles.bottom}>
          <Ionicons
            style={styles.icon}
            name="search-outline"
            size={24}
            color={COLORS.gray}
          />
          <TextInput
            style={styles.search}
            placeholder="Tìm kiếm ..."
          ></TextInput>
        </View>
      ) : undefined}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    height: 80,
    paddingHorizontal: 10,
    paddingTop: 5,
    paddingBottom: 10,
    justifyContent: "center",
    alignItems: "center",
  },
  top: {
    width: "100%",
    flex: 1,
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    position: "relative",
    paddingBottom: 10,
  },

  leftWrapper: {
    flex: 1,
    position: "absolute",
    left: 0,
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
  },

  iconLocation: {
    marginRight: 5,
  },
  txtLocation: {
    fontSize: 16,
    fontWeight: "500",
    flex: 1,
    width: 300,
  },

  centerWrapper: {
    flex: 1,
    position: "absolute",
    right: 0,
    left: 0,
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
  },
  txtCenter: {
    fontSize: 16,
    fontWeight: "500",
  },

  rightWrapper: {
    flex: 1,
    position: "absolute",
    right: 0,
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
  },
  iconNotify: {
    position: "relative",
  },

  bottom: {
    width: "100%",
    flex: 1,
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    position: "relative",
    backgroundColor: COLORS.light,
    borderRadius: 50,
  },
  icon: {
    position: "absolute",
    left: "25%",
  },
  search: {
    fontSize: 16,
    width: "100%",
    textAlign: "center",
  },
});

export default Header;
