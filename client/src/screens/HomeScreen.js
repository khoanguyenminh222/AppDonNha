import {
  View,
  Text,
  Alert,
  SafeAreaView,
  StyleSheet,
  useWindowDimensions,
  RefreshControl,
  ActivityIndicator,
  ScrollView,
  FlatList,
} from "react-native";
import React, { useEffect, useState, useContext, useCallback } from "react";
import { useNavigation } from "@react-navigation/native";

import BaseURL from "../api/BaseURL";
import GlobalStyles from "../GlobalStyles";
import AuthContext from "../context/AuthContext";
import Header from "../components/Header";
import Item from "../components/Item";
import Banner from "../components/Banner";

import Suggestion from "../components/Suggestion";

import imageBanner1 from "../../assets/images/banner1.png";
import imageBanner2 from "../../assets/images/banner2.png";

import imageHCM from "../../assets/images/HCM.jpg";
import imageDN from "../../assets/images/DN.jpg";
import imageHN from "../../assets/images/HN.jpg";
import imagePhongTro from "../../assets/images/phong-tro.jpg";
import imageCanHo from "../../assets/images/can-ho.jpg";
import imageNhaO from "../../assets/images/nha-o.jpg";
import imageVanPhong from "../../assets/images/van-phong.jpg";
import PublicFolder from "../api/PublicFolder";
import { set } from "react-hook-form";

const wait = (timeout) => {
  return new Promise((resolve) => setTimeout(resolve, timeout));
};
const HomeScreen = () => {
  const navigation = useNavigation();
  const { height } = useWindowDimensions();

  //lấy ra người dùng hiện tại
  const [state, setState] = useContext(AuthContext);

  //lưu tin đăng
  const [posts, setPosts] = useState([]);

  // load more
  const [pageCurrent, setPageCurrent] = useState(1);

  const [isLoading, setIsLoading] = useState(false);
  const [lastItem, setLastItem] = useState(0);

  // lấy ra người dùng hiện tại
  const fetchData = async () => {
    await fetch(`${BaseURL}/user/${state._id}`)
      .then((res) => res.json())
      .then((resJson) => {
        setState(resJson);
      });
  };

  // lấy ra các tin vị trí gần nhất
  const fetchPost = async () => {
    await fetch(
      `${BaseURL}/postUser?lng=${state.coordinates[0]}&lat=${state.coordinates[1]}&page=${pageCurrent}`
    )
      .then((res) => res.json())
      .then((resJson) => {
        if (pageCurrent == 1) {
          setPosts(resJson);
          setIsLoading(false);
          setLastItem(posts.length)
        } else {
          setPosts([...posts, ...resJson]);
          setIsLoading(false);
          setLastItem(posts.length)
        }
      });
  };

  // gọi sau khi navigate trang
  useEffect(() => {
    fetchData();
    fetchPost();
    const willFocusSubscription = navigation.addListener("focus", () => {
      fetchData();
    });
    return willFocusSubscription;
  }, []);

  //tạo biến refresh trang
  const [refreshing, setRefreshing] = useState(false);

  const onRefresh = useCallback(() => {
    setPageCurrent(1);
    fetchData();
    fetchPost();
    setRefreshing(true);
    wait(2000).then(() => setRefreshing(false));
  }, []);

  useEffect(() => {
    fetchPost()
    
  }, [pageCurrent]);

  const renderHeader = () => (
    <View style={styles.container}>
      <ScrollView
        style={styles.containBanner}
        horizontal={true}
        showsHorizontalScrollIndicator={false}
      >
        <Banner source={imageBanner1} />
        <Banner source={imageBanner2} />
      </ScrollView>

      <Text style={[styles.txtheader, { fontSize: height * 0.03 }]}>
        Vị trí
      </Text>
      <ScrollView style={styles.containSuggestion} horizontal={true}>
        <Suggestion content="TP.Hồ Chí Minh" source={imageHCM} />
        <Suggestion content="TP.Đà nẵng" source={imageDN} />
        <Suggestion content="Hà Nội" source={imageHN} />
      </ScrollView>

      <Text style={[styles.txtheader, { fontSize: height * 0.03 }]}>
        Danh mục
      </Text>
      <ScrollView
        style={styles.containSuggestion}
        horizontal={true}
        showsHorizontalScrollIndicator={false}
      >
        <Suggestion content="Phòng trọ" source={imagePhongTro} />
        <Suggestion content="Căn hộ" source={imageCanHo} />
        <Suggestion content="Nhà ở" source={imageNhaO} />
        <Suggestion content="Văn phòng" source={imageVanPhong} />
      </ScrollView>
      <Text style={[styles.txtheader, { fontSize: height * 0.03 }]}>
        Tin mới nhất
      </Text>
    </View>
  );

  return (
    <SafeAreaView style={GlobalStyles.droidSafeArea}>
      {state.city === "" ? (
        <Header
          iconLeft="location-outline"
          isSearch={true}
          iconRight={true}
          textLeft="Vị trí"
        />
      ) : (
        <Header
          iconLeft="location-outline"
          isSearch={true}
          iconRight={true}
          textLeft={state.city}
        />
      )}
      <FlatList
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
        }
        showsVerticalScrollIndicator={false}
        horizontal={false}
        data={posts}
        keyExtractor={(item, index) => index.toString()}
        renderItem={({ item, index }) =>
          item.isWaiting == false && item.isCancel == false ? (
            <Item post={item} />
          ) : undefined
        }
        ListHeaderComponent={renderHeader}
        ListFooterComponent={() =>
          isLoading ? (
            <View style={{ marginTop: 10, alignItems: "center" }}>
              <ActivityIndicator size="large" />
            </View>
          ) : null
        }
        onEndReached={() => {
          if(lastItem!==posts.length){
            setIsLoading(true);
            setTimeout(() => {
              setPageCurrent(pageCurrent + 1);
              
            }, 2000);
          }
          
        }}
        onEndReachedThreshold={0.4}
      />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    position: "relative",
  },
  containBanner: {
    flexDirection: "row",
    width: "100%",
    maxheight: 500,
  },
  txtheader: {
    paddingVertical: 5,
    paddingHorizontal: 20,
    fontSize: 24,
    fontWeight: "500",
  },
  containSuggestion: {
    paddingHorizontal: 10,
    flexDirection: "row",
    width: "100%",
    flex: 1,
    height: 100,
    overflow: "hidden",
  },
});

export default HomeScreen;
