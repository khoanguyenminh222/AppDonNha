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

const Suggestion = ({content, source}) => {
  const { width, height } = useWindowDimensions();
  return (
    <View style={styles.container}>
      <TouchableOpacity style={styles.wrapper}>
        <Image
          source={source}
          style={[styles.img, { width: width * 0.25, height: height * 0.1 }]}
          resizeMode="cover"
        />
        <Text style={[styles.txtContent, { fontSize: height * 0.02}]}>{content}</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginRight: 10,
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
