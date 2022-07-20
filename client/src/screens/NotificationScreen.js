import {
  View,
  Text,
  SafeAreaView,
  ScrollView,
  StyleSheet,
  TouchableOpacity,
  useWindowDimensions,
} from "react-native";
import React, { useContext, useEffect, useState } from "react";
import AuthContext from "../context/AuthContext";
import GlobalStyles from "../GlobalStyles";

import { COLORS } from "../Colors";
import BaseURL from "../api/BaseURL";

import Notify from "../components/Notify";
import Back from "../components/Back";
import { Ionicons } from "@expo/vector-icons";

const NotificationScreen = ({route}) => {
  const { width } = useWindowDimensions();
  const [state, setState] = useContext(AuthContext);
  const [notifies, setNotifies] = useState([route.params]);

  const [tempNotify, setTempNotify] = useState([]);
  const [end, setEnd] = useState(3);
  const [start, setStart] = useState(0);

  // const fetchNotifies = async () => {
  //   let response = await fetch(`${BaseURL}/notify/user/${state._id}`);
  //   let responseJson = await response.json();

  //   setNotifies(responseJson);
  // };

  // useEffect(() => {
  //   fetchNotifies();
  // }, []);
  
  const handleLoadMore = () => {
    setEnd(end + 3);
    setStart(start + 3);
  };
  useEffect(() => {
    for (let index = start; index < notifies.length; index++) {
      setTempNotify([...tempNotify, ...notifies[index]]);
    }
    
  }, [end]);

  return (
    <SafeAreaView style={GlobalStyles.droidSafeArea}>
      <Back textCenter="Hộp thư" />
      <ScrollView showsVerticalScrollIndicator={false}>
        <View style={styles.container}>
          {tempNotify.slice(0, end).map((n) => (
            <Notify key={n._id} n={n} />
          ))}
          {end >= notifies[0].length ? (
            <View style={styles.btnLoadmore}>
              <Text>Hết thông báo</Text>
            </View>
          ) : (
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
    height: "100%",
    justifyContent: "center",
    alignItems: "center",
    paddingBottom: 20,
  },
  btnLoadmore: {
    padding: 20,
    justifyContent: "center",
    alignItems: "center",
    width: "100%",
    flexDirection: "row",
  },
});

export default NotificationScreen;
