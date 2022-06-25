import { View, Text, StyleSheet, Image, useWindowDimensions } from 'react-native'
import React from 'react'

const Banner = ({source}) => {
  const {width} = useWindowDimensions();
  return (
    <View style={[styles.container,{width:width}]}>
      <Image style={[styles.img,{width:width}]}  source={source} resizeMode="stretch"/>
    </View>
  )
}

const styles = StyleSheet.create({
    container: {
        width: '100%',
        maxWidth: 800,
        maxheight: 500,
        marginHorizontal: 5,
    },
    img:{
      width: '100%',
      maxHeight: 500,
    }
})

export default Banner