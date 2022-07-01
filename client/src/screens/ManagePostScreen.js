import {
  View,
  Text,
  SafeAreaView,
  ScrollView,
  Button,
  TouchableOpacity,
  StyleSheet,
  useWindowDimensions,
  TextInput,
} from "react-native";
import React, { useContext, useEffect, useState } from "react";
import { TabView, SceneMap, TabBar } from "react-native-tab-view";
import GlobalStyles from "../GlobalStyles";
import Back from "../components/Back";
import InfoText from "../components/InfoText";
import { useForm } from "react-hook-form";
import { useNavigation } from "@react-navigation/native";
import baseURL from "../api/BaseURL";
import CustomInput from "../components/CustomInput";
import CustomButton from "../components/CustomButton";
import { COLORS } from "../Colors";
import AuthContext from "../context/AuthContext";
import Item from "../components/Item";


const ManagePostScreen = () => {

  //lấy ra người dùng hiện tại
  const [state, setState] = useContext(AuthContext);

  const [posts, setPosts] = useState([]);

  useEffect(()=>{
    const fetchPosts = async()=>{
      const res = await fetch(`${baseURL}/postUser/${state._id}`)
      res.json()
      .then(p=>{
        setPosts(p);
      })
    };
    fetchPosts();
    console.log(posts);
  },[])

  const FirstRoute = () => (
    <View style={{ flex: 1, backgroundColor: COLORS.backgroundColor }} >
      {posts && posts.map((post)=>(
            post.isWaiting==false && post.isCancel==false ? 
            <Item key={post._id} post={post}/>
            :
            undefined
          ))}
    </View>
  );

  const SecondRoute = () => (
    <View style={{ flex: 1, backgroundColor: COLORS.backgroundColor }} >
      {posts && posts.map((post)=>(
            post.isCancel==true ? 
            <Item key={post._id} post={post}/>
            :
            undefined
          ))}
    </View>
  );
  const ThirdRoute = () => (
    <View style={{ flex: 1, backgroundColor: COLORS.backgroundColor }} >
      {posts && posts.map((post)=>(
            post.isWaiting==true && post.isCancel==false ? 
            <Item key={post._id} post={post}/>
            :
            undefined
          ))}
    </View>
  );

  const renderScene = SceneMap({
    first: FirstRoute,
    second: SecondRoute,
    third: ThirdRoute
  });

  const layout = useWindowDimensions();
  const [index, setIndex] = useState(0);
  const [routes] = useState([
    { key: "first", title: "Tin đang hiển thị"},
    { key: "second", title: "Tin bị từ chối" },
    { key: "third", title: "Tin chờ xác nhận" },
  ]);

  return (
    <SafeAreaView style={GlobalStyles.droidSafeArea}>
      <Back textCenter="Quản lý tin đăng" />
      <ScrollView showsVerticalScrollIndicator={false}>
        <View style={styles.topbar}>
          <TabView
            
            navigationState={{ index, routes }}
            renderScene={renderScene}
            onIndexChange={setIndex}
            initialLayout={{ width: layout.width }}
            renderTabBar={props=>
            <TabBar {...props}
              renderLabel={({route, color}) => (
                <Text style={{ color: 'white', margin: 8, textAlign:'center'}}>
                  {route.title}
                </Text>
              )}
            />}
            
          />
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.backgroundColor,
    padding: 10,
  },
  
})
export default ManagePostScreen;
