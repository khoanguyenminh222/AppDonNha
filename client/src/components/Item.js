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
import {format} from "timeago.js"

const Item = ({ post }) => {
  const { height } = useWindowDimensions();
  const navigation = useNavigation();

  const handleChangeScreen = (post) => {
    navigation.navigate("DetailPost", post);
      
  };
  return (
    <TouchableOpacity onPress={() => handleChangeScreen(post)}>
      <View style={styles.container}>
        <Image
          source={{ uri: !post.picture || post.picture[0]!=="" ? PublicFolder + post.picture[0] : PublicFolder + "/persons/noAvatar.png"}}
          style={[styles.logo, { height: height * 0.3 }]}
          resizeMode="cover"
        />
        <View style={styles.wrapperText}>
          <Text style={[styles.title, { fontSize: height * 0.02 }]}>
            {post.title}
          </Text>
          <Text style={[styles.content, { fontSize: height * 0.02 }]}>
            {post.category}
          </Text>
          <Text style={[styles.content, { fontSize: height * 0.02 }]}>
            {post.address}
          </Text>
          {post.nameOrganization ? (
            <>
            <Text>{format(post.createdAt)}</Text>
            <Ionicons
              style={styles.icon}
              name="briefcase-outline"
              size={height * 0.03}
              color={COLORS.primary}
            ></Ionicons>
            </>
          ) : (
            <>
            <Text>{format(post.createdAt)}</Text>
            <Ionicons
              style={styles.icon}
              name="person-circle-outline"
              size={height * 0.03}
              color={COLORS.yellow}
            ></Ionicons>
            </>
          )}
        </View>
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-around",
    marginHorizontal: 20,
    borderBottomColor: COLORS.light,
    borderBottomWidth: 0.8,
    paddingVertical: 20,
  },
  wrapperText: {
    flex: 2,
    marginLeft: 20,
    justifyContent: "center",
    position: "relative",
  },
  logo: {
    flex: 1,
    width: "28%",
    maxWidth: 80,
    maxHeight: 100,
  },
  title: {
    fontSize: 24,
    fontWeight: "400",
  },
  content: {
    fontSize: 18,
    lineHeight: 24,
    color: COLORS.gray,
  },
  icon: {
    position: "absolute",
    bottom: 0,
    right: 0,
  },
});

export default Item;
