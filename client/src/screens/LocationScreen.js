import { View, Text, SafeAreaView, ScrollView, StyleSheet } from 'react-native'
import React, { useState } from 'react'
import Header from '../components/Header'
import GlobalStyles from '../GlobalStyles'
import Map from '../components/Map'
import Back from '../components/Back'
import GooglePlacesInput from '../components/GooglePlacesInput'
const LocationScreen = () => {


  return (
    <SafeAreaView style={GlobalStyles.droidSafeArea}>
      
        <Back iconLeft="chevron-back-outline" textCenter="Nhập vị trí"/>
        <GooglePlacesInput/>
          <View style={styles.container}>
          
        <Map/>
        </View>

    </SafeAreaView>
  )
}
const styles = StyleSheet.create({
  container:{
    flex:1,
    width: '100%',
    height: '100%',
    alignItems: 'center',
    justifyContent: 'center',
  }
})

export default LocationScreen





