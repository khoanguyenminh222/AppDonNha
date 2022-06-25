import { View, Text, SafeAreaView, ScrollView, StyleSheet, useWindowDimensions, Image } from 'react-native'
import React from 'react'
import GlobalStyles from '../GlobalStyles'
import Back from '../components/Back'
import Banner from '../components/Banner'
import PublicFolder from '../api/PublicFolder'
import imageBanner1 from "../../assets/images/banner1.png"
const DetailPost = ({route}) => {
    const {width} = useWindowDimensions();
  return (
    <SafeAreaView style={GlobalStyles.droidSafeArea}>
      <Back textCenter="Chi tiết"/>
      
      <ScrollView showsVerticalScrollIndicator={false}>
        
            <ScrollView style={styles.containBanner} horizontal={true} showsHorizontalScrollIndicator={false}>
            {route.params.picture.map(p=>(
                <View style={[styles.containerImage,{width:width}]}>
                <Image style={[styles.img,{width:width}]}  source={{uri:PublicFolder+p}} resizeMode="contain"/>
            </View>
            ))}    
          </ScrollView>
          <View style={styles.container}>
            <Text>{route.params.title}</Text>
        </View>
        
      </ScrollView>
    </SafeAreaView>
  )
}

const styles = StyleSheet.create({
    container:{
        flex: 1,
        marginHorizontal: 10,
    },
    containBanner:{
        flexDirection: "row",
        width: '100%',    
        maxheight: 500,
      },
      containerImage: {
        width: '100%',
        maxWidth: 800,
        maxHeight: 200,
        marginHorizontal: 5,
    },
    img:{
      width: '100%',
      height: '100%',
    }
})

export default DetailPost