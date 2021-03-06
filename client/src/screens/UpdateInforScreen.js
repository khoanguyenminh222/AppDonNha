import {
  View,
  Text,
  SafeAreaView,
  ScrollView,
  TouchableOpacity,
  StyleSheet,
  TextInput,
} from "react-native";

import React, { useEffect, useState } from "react";
import GlobalStyles from "../GlobalStyles";
import Back from "../components/Back";

import { useForm } from "react-hook-form";
import { useNavigation } from "@react-navigation/native";
import baseURL from "../api/BaseURL";
import CustomInput from "../components/CustomInput";
import CustomButton from "../components/CustomButton";

import { Ionicons } from "@expo/vector-icons";
import {DateTimePickerAndroid} from '@react-native-community/datetimepicker';
import { COLORS } from "../Colors";

const UpdateInforScreen = ({ route }) => {

  const VNF_REGEX = /((09|03|07|08|05)+([0-9]{8})\b)/g;

   //useForm
   const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const navigation = useNavigation();

  const [date, setDate] = useState(new Date().getDate()+"/"+(new Date().getMonth()+1)+"/"+new Date().getFullYear());
  const [textDate, setTextDate] = useState(route.params.dayOfBirth)
  const onChange = (event, selectedDate) => {
    const currentDate = selectedDate;

    let tempDate = new Date(currentDate);
    let fDate = tempDate.getDate()+"/"+(tempDate.getMonth()+1) + "/" + tempDate.getFullYear();
    setDate(fDate);
    setTextDate(fDate);
  };

  const showMode = (currentMode) => {
    DateTimePickerAndroid.open({
      value: new Date(),
      onChange,
      mode: currentMode,
      is24Hour: true
    })
  };

  const showDatepicker = () => {
    showMode('date');
  };

  useEffect(() => {
    console.log(date)
  }, [date]);

  const onSendUpdateInfor = async(data) => {
    const editUser = {
      userId: route.params._id,
      fullname: data.fullname,
      dayOfBirth: textDate,
      from: data.from,
      phone: data.phone
    }
    const response = await fetch(baseURL+`/user/${route.params._id}`,{
      method: 'PUT',
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(editUser),
    })
    if(response.status==200){
      navigation.goBack();
    }
    
  };

  return (
    <SafeAreaView style={GlobalStyles.droidSafeArea}>
      <Back textCenter="Thay ?????i th??ng tin" />
      <ScrollView showsVerticalScrollIndicator={false}>
        <View style={styles.container}>
          <CustomInput
            control={control}
            name="email"
            rules={{
              required: "Email kh??ng ???????c ????? tr???ng",
            }}
            editable={false}
            defaultValue={route.params.email}
            logo="mail-outline"
          />
          <CustomInput
            control={control}
            name="fullname"
            defaultValue={route.params.fullname}
            placehoder="Ho?? va?? t??n"
            rules={{
              required: "Ho?? va?? t??n kh??ng ????????c ?????? tr????ng",
              minLength: {
                value: 3,
                message: "Ho?? va?? t??n pha??i nhi????u h??n 3 ky?? t????",
              },
              maxLength: {
                value: 24,
                message: "Ho?? va?? t??n pha??i i??t h??n 24 ky?? t????",
              },
            }}
            logo="person-outline"
          />

          <TouchableOpacity
            style={styles.containerDate}
            onPress={showDatepicker}
          >
            <View style={styles.wrapperLogo}>
              <Ionicons name="calendar-outline" size={30} />
            </View>
            <TextInput
              value={textDate}
              onChangeText={setTextDate}
              placeholder="Ng??y sinh"
              style={styles.input}
              editable={false}
            />
          </TouchableOpacity>

          <CustomInput
            control={control}
            name="from"
            defaultValue={route.params.from}
            placehoder="Qu?? qu??n"
            rules={{
              required: "Qu?? qu??n kh??ng ????????c ?????? tr????ng",
              minLength: {
                value: 3,
                message: "Qu??n qu??n pha??i nhi????u h??n 3 ky?? t????",
              },
            }}
            logo="home-outline"
          />
          <CustomInput
            control={control}
            name="phone"
            defaultValue={route.params.phone}
            placehoder="S??? ??i???n tho???i"
            rules={{
              required: "S???? ??i????n thoa??i kh??ng ????????c ?????? tr????ng",
              pattern: {
                value: VNF_REGEX,
                message: "S???? ??i????n thoa??i sai ?????nh d???ng",
              },
              minLength: {
                value: 10,
                message: "S???? ??i????n thoa??i t????i thi????u 10 ky?? t????",
              },
            }}
            logo="call-outline"
          />
      <CustomButton
        text="HOA??N T????T"
        bgColor={COLORS.blue}
        fgColor={COLORS.white}
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

  containerDate: {
    backgroundColor: COLORS.white,
    width: "100%",
    borderColor: "#e8e8e8",
    borderWidth: 1,
    borderRadius: 5,
    paddingHorizontal: 10,
    paddingVertical: 10,
    marginVertical: 8,
    flexDirection: "row",
  },
  wrapperLogo: {
    paddingHorizontal: 5,
    borderRightWidth: 1,
  },
  input: {
    paddingLeft: 10,
    width: '100%',
    color: COLORS.black,
  },
});

export default UpdateInforScreen;
