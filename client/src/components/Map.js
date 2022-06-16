import { View, Text, StyleSheet, Dimensions } from 'react-native'
import React, { useState } from 'react'
import MapView, { Callout, Circle, Marker, PROVIDER_GOOGLE } from 'react-native-maps'

const Map = () => {
    const [pin, setPin] = useState({
        latitude: 10.82302,
    longitude: 106.62965,
    })
  return (
    <View style={styles.container}>
    <MapView style={styles.map}
        initialRegion={{
        latitude: 10.82302,
        longitude: 106.62965,
        latitudeDelta: 0.0922,
        longitudeDelta: 0.0421
        }}
        provider={PROVIDER_GOOGLE}
    >
      <Marker 
        coordinate={pin}
        draggable={true}
        onDragStart={(e)=>{
          console.log("Drag start", e.nativeEvent.coordinate)
        }}
        onDragEnd={(e)=>{
            console.log("change");
          setPin({
            latitude: e.nativeEvent.coordinate.latitude,
            longitude: e.nativeEvent.coordinate.longitude
          })
        }}
      >
        <Callout> 
          <Text>I'm here</Text>
        </Callout>
      </Marker>
      <Circle center={pin} radius={1000}/>
      
    </MapView>
    </View>
  )
}

const styles = StyleSheet.create({
  container:{
    flex:1,
    width: '100%',
    height: '100%',
    alignItems: 'center',
    justifyContent: 'center',
  },
    map:{
        flex:1,
        width: '100%',
        height:'100%',
    },
    
})

export default Map