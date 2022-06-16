import {
  View,
  Text,
  TouchableOpacity,
  useWindowDimensions,
  StyleSheet,
} from "react-native";
import React, { useEffect, useState, useContext, useRef } from "react";
import AuthContext from "../context/AuthContext";
import { COLORS } from "../Colors";
import { Ionicons } from "@expo/vector-icons";
import BaseURL from "../api/BaseURL";

const Notify = ({ n }) => {
  const { height } = useWindowDimensions();
  const [state, setState] = useContext(AuthContext);

  const [notify,setNotify] = useState([]);

  const handleNotify = async () => {
    const editNotify = {
      userId: state._id,
      readed: true,
    };
    const response = await fetch(`${BaseURL}/notify/${n._id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(editNotify),
    });
    const responseJson = await response.json();
    setNotify(responseJson);
  };

  useEffect(() => {

    const fetchNotify = async () => {
      const response = await fetch(`${BaseURL}/notify/${n._id}`);
      const responseJson = await response.json();
      setNotify(responseJson);
    };
    fetchNotify();
    
  }, [notify.readed]);

  return (
    <TouchableOpacity style={styles.card} onPress={handleNotify}>
      <View style={styles.cardContent}>
        <Text style={[styles.title, { fontSize: height * 0.04 }]}>
          {n.title}
        </Text>
        <Text style={styles.content}>{n.text}</Text>
      </View>
      {notify.readed ? (
        <View style={styles.icon}>
          <Ionicons
            name="alert-circle-outline"
            size={height * 0.06}
            color={COLORS.primary}
          ></Ionicons>
        </View>
      ) : (
        <View style={styles.icon}>
          <Ionicons
            name="alert-circle-outline"
            size={height * 0.06}
            color={COLORS.red}
          ></Ionicons>
        </View>
      )}
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  card: {
    width: "90%",
    //height: 'auto',
    borderRadius: 6,
    elevation: 4,
    shadowOffset: { width: 1, height: 1 },
    shadowColor: COLORS.gray,
    shadowOpacity: 0.3,
    backgroundColor: COLORS.white,
    marginVertical: 5,
    paddingHorizontal: 20,
    paddingVertical: 20,
  },
  cardContent: {
    flex: 1,
    //height: 'auto',
  },
  title: {
    fontWeight: "500",
  },
  content: {
    lineHeight: 22,
  },
  icon: {
    alignItems: "flex-end",
  },
});

export default Notify;
