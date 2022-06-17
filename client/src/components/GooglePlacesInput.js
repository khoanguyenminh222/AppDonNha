import { View, Text, StyleSheet } from 'react-native'
import React, { useState } from 'react'
import GOOGLE_PLACES_API_KEY from '../api/KEY_GOOGLE';
import { GooglePlacesAutocomplete } from 'react-native-google-places-autocomplete';
import { COLORS } from '../Colors';

const GooglePlacesInput = () => {
  const [region, setRegion] = useState({
    latitude: 10.82302,
    longitude: 106.62965,

})
  return (
    <View style={styles.container}>
    {/* <GooglePlacesAutocomplete
      placeholder='Tìm vị trí'
      fetchDetails={true}
      listViewDisplayed="auto"
      onPress={(data, details = null) => {
        // 'details' is provided when fetchDetails = true
        console.log(data, details);
      }}
      query={{
        key: GOOGLE_PLACES_API_KEY,
        language: 'en',
        types: '(regions)',
      }}
      
    /> */}
    <GooglePlacesAutocomplete
        placeholder="Search"
        query={{
          key: 'AIzaSyC-CWSH6B1PrY562d5tu-rir6MAIren6MY',
          language: 'en', // language of the results
        }}
        onPress={(data, details = null) => console.log(data)}
        onFail={(error) => console.error(error)}
        requestUrl={{
          url:
            'https://cors-anywhere.herokuapp.com/https://maps.googleapis.com/maps/api',
          useOnPlatform: 'web',
        }} // this in only required for use on the web. See https://git.io/JflFv more for details.
      />
    </View>
  )
}

const styles = StyleSheet.create({
  container:{
    zIndex: 1,
    paddingTop: 1,
  }
})

export default GooglePlacesInput