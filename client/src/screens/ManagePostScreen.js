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
import React, { useState } from "react";
import { TabView, SceneMap } from "react-native-tab-view";
import GlobalStyles from "../GlobalStyles";
import Back from "../components/Back";
import InfoText from "../components/InfoText";
import { useForm } from "react-hook-form";
import { useNavigation } from "@react-navigation/native";
import baseURL from "../api/BaseURL";
import CustomInput from "../components/CustomInput";
import CustomButton from "../components/CustomButton";
import { COLORS } from "../Colors";


const ManagePostScreen = () => {
  const FirstRoute = () => (
    <View style={{ flex: 1, backgroundColor: '#ff4081' }} />
  );

  const SecondRoute = () => (
    <View style={{ flex: 1, backgroundColor: '#ff4081' }} />
  );
  const ThirdRoute = () => (
    <View style={{ flex: 1, backgroundColor: '#ff4081' }} />
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
      {/* <Back textCenter="Quản lý tin đăng" /> */}
      <ScrollView showsVerticalScrollIndicator={false}>
     
          <TabView
            navigationState={{ index, routes }}
            renderScene={renderScene}
            onIndexChange={setIndex}
            initialLayout={{ width: layout.width }}
          />
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
