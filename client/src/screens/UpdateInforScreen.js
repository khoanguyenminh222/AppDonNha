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

import React from "react";
import GlobalStyles from "../GlobalStyles";
import Back from "../components/Back";
import InfoText from "../components/InfoText";
import { useForm } from "react-hook-form";
import { useNavigation } from "@react-navigation/native";
import baseURL from "../api/BaseURL";
import CustomInput from "../components/CustomInput";
import CustomButton from "../components/CustomButton";
const UpdateInforScreen = ({ route }) => {
  const { control, handleSubmit } = useForm();
  const navigation = useNavigation();

  const onSendUpdateInfor = () =>{


  }
  
  console.log(route.params);
  return (
    <SafeAreaView style={GlobalStyles.droidSafeArea}>
      <Back textCenter="Thay đổi thông tin" />
      <ScrollView showsVerticalScrollIndicator={false}>
      <View style={styles.container}>
        <InfoText name="Email" data={route.params.email} editable={false} />
        <InfoText name="Họ tên" data={route.params.fullname} editable={true} />
        <InfoText name="Địa chỉ" data={route.params.address} editable={true} />
        <InfoText
          name="Số điện thoại"
          data={route.params.phonenumber}
          editable={true}
        />
        <CustomButton
          text="HOÀN TẤT"
          onPress={handleSubmit(onSendUpdateInfor)}
        />
      </View>
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    padding: 20,
  },
});

export default UpdateInforScreen;
