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
  TouchableOpacity,
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

import { COLORS } from "../Colors";
import { Ionicons } from "@expo/vector-icons";

const wait = (timeout) => {
  return new Promise((resolve) => setTimeout(resolve, timeout));
};
const HomeScreen = () => {
  const navigation = useNavigation();
  const { height, width } = useWindowDimensions();

  //lấy ra người dùng hiện tại
  const [state, setState] = useContext(AuthContext);

  //lưu tin đăng
  const [posts, setPosts] = useState([]);

  // lưu tin mới nhất
  const [postsNew, setPostsNew] = useState([]);

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
          setLastItem(posts.length);
        } else {
          setPosts([...posts, ...resJson]);
          setIsLoading(false);
          setLastItem(posts.length);
        }
      });
  };

  // lấy ra tin mới nhất
  const fetchPostNew = async () => {
    await fetch(`${BaseURL}/postUser/new`)
      .then((res) => res.json())
      .then((resJson) => {
        setPostsNew(resJson);
      });
  };

  // gọi sau khi navigate trang
  useEffect(() => {
    fetchData();
    if (state.coordinates[0] !== null) {
      fetchPost();
    }

    fetchPostNew();
    const willFocusSubscription = navigation.addListener("focus", () => {
      fetchData();
      if (state.coordinates[0] !== null) {
        fetchPost();
      }

      fetchPostNew();
    });
    return willFocusSubscription;
  }, []);

  //tạo biến refresh trang
  const [refreshing, setRefreshing] = useState(false);

  const onRefresh = useCallback(() => {
    setPageCurrent(1);
    fetchData();
    if (state.coordinates[0] !== null) {
      fetchPost();
    }
    fetchPostNew();
    setRefreshing(true);
    wait(2000).then(() => setRefreshing(false));
  }, []);

  useEffect(() => {
    if (state.coordinates[0] !== null) {
      fetchPost();
    }
    console.log(state.coordinates[0]);
  }, [state.coordinates[0]]);

  const [end, setEnd] = useState(5);
  const [start, setStart] = useState(0);
  const [tempPost, setTempPost] = useState([]);

  const handleLoadMore = () => {
    setEnd(end + 5);
    setStart(start + 5);
    console.log(end, start);
  };
  useEffect(() => {
    for (let index = start; index < posts.length; index++) {
      setTempPost([...tempPost, ...posts[index]]);
    }
  }, [end]);
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
      <ScrollView
        style={styles.container}
        showsVerticalScrollIndicator={false}
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
        }
      >
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
        <ScrollView
          style={styles.containSuggestion}
          horizontal={true}
          showsHorizontalScrollIndicator={false}
        >
          <Suggestion content="Hồ Chí Minh" source={imageHCM} />
          <Suggestion content="Đà Nẵng" source={imageDN} />
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
          <Suggestion content="Phòng trọ" source={imagePhongTro} />
          <Suggestion content="Chung cư" source={imageNhaO} />
          <Suggestion content="Văn phòng" source={imageVanPhong} />
        </ScrollView>
        <View
          style={{
            flexDirection: "row",
            justifyContent: "space-between",
            alignItems: "center",
          }}
        >
          <Text style={[styles.txtheader, { fontSize: height * 0.03 }]}>
            Tin mới nhất
          </Text>
          <TouchableOpacity
            style={{
              marginHorizontal: 20,
              justifyContent: "center",
              alignItems: "center",
            }}
            onPress={() => {
              navigation.navigate("SearchScreen", postsNew);
            }}
          >
            <Text style={{ fontSize: height * 0.02, color: COLORS.gray }}>
              Xem tất cả
            </Text>
          </TouchableOpacity>
        </View>

        {postsNew
          .slice(0, 5)
          .map((item) =>
            item.isWaiting == false && item.isCancel == false ? (
              <Item key={item._id} post={item} />
            ) : undefined
          )}
        <Text style={[styles.txtheader, { fontSize: height * 0.03 }]}>
          Tin theo vị trí
        </Text>
        <ScrollView
          style={styles.sugesstion}
          horizontal={true}
          showsHorizontalScrollIndicator={false}
        >
          <TouchableOpacity
            style={styles.btnSugession}
            onPress={async () => {
              await fetch(`${BaseURL}/postUser/filter?txt=false`)
                .then((res) => res.json())
                .then((resJson) => {
                  navigation.navigate("SearchScreen", resJson);
                });
            }}
          >
            <Text style={styles.txtSugession}>Cá nhân tìm kiếm dịch vụ</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.btnSugession}
            onPress={async () => {
              await fetch(`${BaseURL}/postUser/filter?txt=true`)
                .then((res) => res.json())
                .then((resJson) => {
                  navigation.navigate("SearchScreen", resJson);
                });
            }}
          >
            <Text style={styles.txtSugession}>Tổ chức cung cấp dịch vụ</Text>
          </TouchableOpacity>
        </ScrollView>
        {posts.slice(0,end).map((item) =>
          item.isWaiting == false && item.isCancel == false ? (
            <Item key={item._id} post={item} />
          ) : undefined
        )}
        {end>=posts.length ? (
          <View style={styles.btnLoadmore}>
            <Text>Hết tin</Text>
          </View>
        ): (
          <TouchableOpacity style={styles.btnLoadmore} onPress={handleLoadMore}>
          <Text>Xem thêm</Text>
          <Ionicons size={width * 0.05} name="chevron-down-outline"></Ionicons>
        </TouchableOpacity>
        )}
        
      </ScrollView>
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
  sugesstion: {
    flexDirection: "row",
    paddingHorizontal: 20,
  },
  btnSugession: {
    borderColor: COLORS.yellow,
    borderWidth: 1,
    borderRadius: 50,
    marginRight: 30,
    paddingHorizontal: 10,
    paddingVertical: 5,
    marginBottom: 20,
  },
  txtSugession: {},
  btnLoadmore: {
    padding:20,
    justifyContent: 'center',
    alignItems: 'center',
    width: '100%',
    flexDirection: 'row',
},
});

export default HomeScreen;
