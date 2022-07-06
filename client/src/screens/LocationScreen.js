import { View, Text, SafeAreaView, ScrollView, StyleSheet } from 'react-native'
import React, { useState, useEffect } from 'react'
import Header from '../components/Header'
import GlobalStyles from '../GlobalStyles'
import Map from '../components/Map'
import Back from '../components/Back'
import GooglePlacesInput from '../components/GooglePlacesInput'

const LocationScreen = ({route}) => {

  return (
    <SafeAreaView style={GlobalStyles.droidSafeArea}>
      
        <Back iconLeft="chevron-back-outline" textCenter="Nhập vị trí"/>
        
          
        <Map action={route.params?.action} name={route.params?.name} location={route.params?.location} textAddress = {route.params?.textAddress}/>

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





