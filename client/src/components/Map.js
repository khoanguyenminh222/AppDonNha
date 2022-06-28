import {
  View,
  Text,
  StyleSheet,
  Dimensions,
  TextInput,
  TouchableOpacity,
} from "react-native";
import React, { useState, useEffect, useContext } from "react";
import MapView, {
  Callout,
  Circle,
  Marker,
  MarkerAnimated,
  PROVIDER_GOOGLE,
} from "react-native-maps";
import * as Location from "expo-location";
import CustomButton from "./CustomButton";
import { COLORS } from "../Colors";
import AuthContext from "../context/AuthContext";
import baseURL from "../api/BaseURL";
import { useNavigation } from "@react-navigation/native";

const Map = () => {
  const navigation = useNavigation();

  const [state, setState] = useContext(AuthContext);
  const [text, setText] = useState("");
  const [address, setAddress] = useState(null);

  const [region, setRegion] = useState({
    latitude: 0,
    longitude: 0,
    latitudeDelta: 0,
    longitudeDelta: 0,
  });

  useEffect(() => {
    (async () => {
      let { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== "granted") {
        setErrorMsg("Permission to access location was denied");
        return;
      }

      let location = await Location.getCurrentPositionAsync({});
      let arrayNameLocation = await Location.reverseGeocodeAsync(
        location.coords
      );
      setRegion({
        latitude: location.coords.latitude,
        longitude: location.coords.longitude,
        latitudeDelta: 0.0122,
        longitudeDelta: 0.0122,
      });
      setAddress(arrayNameLocation[0]);
      setText(
        (arrayNameLocation[0].streetNumber!==null ? arrayNameLocation[0].streetNumber + ", " :"") + 
          (arrayNameLocation[0].street!==null ? arrayNameLocation[0].street + ", " :"") + 
          (arrayNameLocation[0].city!==null ? arrayNameLocation[0].city + ", " :"") + 
          (arrayNameLocation[0].district!==null ? arrayNameLocation[0].district + ", " :"") + 
          (arrayNameLocation[0].subregion !==null ?  arrayNameLocation[0].subregion + ", " : "") +
          (arrayNameLocation[0].region !==null ?  arrayNameLocation[0].region : "")
      );
    })();
  }, []);

  useEffect(() => {
    // lần đầu không gọi
    if (region.latitudeDelta === 0.0122) {
      (async () => {
        let arrayNameLocation = await Location.reverseGeocodeAsync(region);

        setAddress(arrayNameLocation[0]);
      })();
    }
    // tránh việc address bị null không có thuộc tính
    if(address){
      setText(
        (address.streetNumber!==null ? address.streetNumber + ", "  :"") + 
        (address.street!==null ? address.street + ", "  :"") + 
        (address.city!==null ? address.city + ", "  :"") + 
        (address.district!==null ? address.district + ", " :"") + 
        (address.subregion !==null ?  address.subregion + ", " : "") +
        (address.region !==null ?  address.region : "")
      );
    }
    
  },[region]);

  // gọi lại khi address thay đổi
  useEffect(()=>{
    // nếu 
    if(address){
      setText(
        (address.streetNumber!==null ? address.streetNumber + ", "  :"") + 
          (address.street!==null ? address.street + ", "  :"") + 
          (address.city!==null ? address.city + ", "  :"") + 
          (address.district!==null ? address.district + ", " :"") + 
          (address.subregion !==null ?  address.subregion + ", " : "") +
          (address.region !==null ?  address.region : "")
      );
    }
    
  }, [address])
  
  // nhấn nút tìm kiếm
  const onChangeAddress = async (street) => {
    let geocode = await Location.geocodeAsync(street, Location.setGoogleApiKey("AIzaSyD9OXYLGgT1cSQ5XX7pi0vmSSJ9AY1x4y8"));

    setRegion({
      latitude: geocode[0].latitude,
      longitude: geocode[0].longitude,
      latitudeDelta: 0.0122,
      longitudeDelta: 0.0122,
    });
    if(address){
      setText(
        (address.streetNumber!==null ? address.streetNumber + ", "  :"") + 
          (address.street!==null ? address.street + ", "  :"") + 
          (address.city!==null ? address.city + ", "  :"") + 
          (address.district!==null ? address.district + ", " :"") + 
          (address.subregion !==null ?  address.subregion + ", " : "") +
          (address.region !==null ?  address.region : "")
      );
    }
  };

  // nhấn nút lưu vị trí
  const onChangeRegion = async() => {
    const editUser = {
      coordinates: [region.longitude,region.latitude],
      city: text,
      userId: state._id,
    }
    const res = await fetch(`${baseURL}/user/${state._id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(editUser),
    });
    navigation.goBack();
  }

  return (
    <View style={styles.container}>
      {address ? (
        <View style={styles.wrapperInput}>
          <TextInput
            multiline={true}
            numberOfLines = {2}
            onChangeText={setText}
            value={text}
            focusable={true}
          />
          <CustomButton
            onPress={() => onChangeAddress(text)}
            text="Tìm kiếm"
            logo="search-circle-outline"
            size="50%"
            fgColor={COLORS.light}
          />
        </View>
      ) : undefined}
      <TouchableOpacity style={styles.saveBtn} onPress={onChangeRegion}>
        <Text style={{color:COLORS.white, fontSize: 16}}>Lưu vị trí</Text>
      </TouchableOpacity>
      {region.latitudeDelta === 0 ? (
        <Text>Waiting...</Text>
      ) : (
        <MapView
          style={styles.map}
          region={region}
          initialRegion={{
            latitude: region.latitude,
            longitude: region.longitude,
            latitudeDelta: 0.0122,
            longitudeDelta: 0.0122,
          }}
          provider={PROVIDER_GOOGLE}
        >
          <Marker
            coordinate={{
              latitude: region.latitude,
              longitude: region.longitude,
            }}
            draggable={true}
            onDragStart={(e) => {}}
            onDragEnd={(e) => {
              setRegion({
                latitude: e.nativeEvent.coordinate.latitude,
                longitude: e.nativeEvent.coordinate.longitude,
                latitudeDelta: 0.0122,
                longitudeDelta: 0.0122,
              });
            }}
          >
            <Callout>
              <Text>I'm here</Text>
            </Callout>
          </Marker>
        </MapView>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    width: "100%",
    height: "100%",
    alignItems: "center",
    justifyContent: "center",
    position: 'relative',
  },
  map: {
    flex: 1,
    width: "100%",
    height: "100%",
  },
  wrapperInput: {
    paddingHorizontal: 10,
    width: "100%",
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 5,
    backgroundColor: COLORS.backgroundColor,
  },
  saveBtn:{
    width: '50%',
    backgroundColor: COLORS.green,
    borderRadius: 8,
    justifyContent: 'center',
    paddingHorizontal: 10,
    paddingVertical: 10,
    alignItems: 'center',
    position: 'absolute',
    bottom: 10,
    zIndex: 1,
  },
});

export default Map;
