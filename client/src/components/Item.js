import {
  View,
  Text,
  Image,
  StyleSheet,
  useWindowDimensions,
  TouchableOpacity,
  Pressable,
  Modal,
} from "react-native";
import React, { useEffect, useState } from "react";
import { COLORS } from "../Colors";
import PublicFolder from "../api/PublicFolder";
import { useNavigation } from "@react-navigation/native";
import { Ionicons } from "@expo/vector-icons";
import baseURL from "../api/BaseURL";
import { format } from "timeago.js";
import CustomButton from "./CustomButton";
import OptionsMenu from "react-native-option-menu";
const Item = ({ post, action }) => {
  const { width,height } = useWindowDimensions();
  const navigation = useNavigation();
  const handleChangeScreen = (post) => {
    navigation.navigate("DetailPost", post);
  };

  const [modalVisible, setModalVisible] = useState(false);
  const handleChangeEditScreen = () => {
    const req = {
      post: post
    }
    setModalVisible(!modalVisible);
    navigation.navigate("IndividualPost", req)
  };
  const handleDeletePost = async() => {
    
    const postIndi = await fetch(`${baseURL}/postUser/${post._id}`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
      },
    });
    setModalVisible(!modalVisible);
  };
  const handleOpenModel = () =>{
    setModalVisible(!modalVisible);
  };
  return (
    <TouchableOpacity
      delayLongPress={100}
      onPress={() => handleChangeScreen(post)}
      onLongPress={action ? handleOpenModel : undefined}
    >
      <View style={styles.container}>
        <Image
          source={{
            uri:
              !post.picture || post.picture[0] !== ""
                ? PublicFolder + post.picture[0]
                : PublicFolder + "/persons/noAvatar.png",
          }}
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

      {/* <Modal animationType='fade' transparent={true} visible={modalVisible}>
        <View style={styles.centeredView}>
          <View style={styles.modalView}>
            <Ionicons onPress={handleOpenModel} style={styles.btnClose} name="close-outline" size={width*0.05}/>
            <CustomButton onPress={handleChangeEditScreen} text='Chỉnh sửa' logo='create-outline' bgColor={COLORS.primary} fgColor={COLORS.backgroundColor}/>
            <CustomButton onPress={handleDeletePost} text='Xoá' logo='trash-outline' bgColor={COLORS.light} fgColor={COLORS.red}/>
          </View>
        </View>
      </Modal> */}
      
        {/* <View style={styles.btnOption}>
            customButton={(<Ionicons name="ellipsis-vertical-outline" size={height * 0.03}/>)}
            options={["Chỉnh sửa", "Xóa tin", "Hủy"]}
            actions={[handleChangeEditScreen, handleDeletePost]}
          />
        </View> */}
      
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
  centeredView: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    marginTop: 22,
  },
  modalView: {
    width: '80%',
    position: 'relative',
    margin: 20,
    backgroundColor: "white",
    borderRadius: 20,
    padding: 35,
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5
  },
  btnOption:{
    position: 'absolute',
    top: 10,
    right: 10,
  }
});

export default Item;
