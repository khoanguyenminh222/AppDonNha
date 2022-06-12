import {
  View,
  Text,
  StyleSheet,
  useWindowDimensions,
  Image,
  Pressable,
  TouchableOpacity,
} from "react-native";
import React from "react";
import HCM from "../../assets/images/1.jpg";
import { COLORS } from "../Colors";
const Suggestion = () => {
  const { width, height } = useWindowDimensions();
  return (
    <View style={styles.container}>
      <TouchableOpacity style={styles.wrapper}>
        <Image
          source={HCM}
          style={[styles.img, { width: width * 0.25, height: height * 0.1 }]}
          resizeMode="cover"
        />
        <Text style={[styles.txtContent, { fontSize: height * 0.02}]}>Tp Hồ Chí Minh</Text>
      </TouchableOpacity>
      <TouchableOpacity style={styles.wrapper}>
        <Image
          source={HCM}
          style={[styles.img, { width: width * 0.25, height: height * 0.1 }]}
          resizeMode="cover"
        />
        <Text style={[styles.txtContent, { fontSize: height * 0.02}]}>Tp Hồ Chí Minh</Text>
      </TouchableOpacity>
      <TouchableOpacity style={styles.wrapper}>
        <Image
          source={HCM}
          style={[styles.img, { width: width * 0.25, height: height * 0.1 }]}
          resizeMode="cover"
        />
        <Text style={[styles.txtContent, { fontSize: height * 0.02}]}>Tp Hồ Chí Minh</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 10,
    flexDirection: "row",
    justifyContent: "space-around",
    alignItems: "center",
    height: 100,
  },
  wrapper: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  img: {
    // maxHeight: 100,
    // maxWidth: 100,
  },
  txtContent: {
    //fontSize: 16,
  },
});

export default Suggestion;
