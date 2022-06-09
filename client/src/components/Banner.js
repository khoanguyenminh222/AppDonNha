import { View, Text, StyleSheet } from 'react-native'
import React from 'react'

const Banner = () => {
  return (
    <View style={styles.container}>
      <Text>Banner</Text>
    </View>
  )
}

const styles = StyleSheet.create({
    container: {
        width: '100%',
        maxWidth: 800,
        height: 200,
        backgroundColor: 'red',
        alignSelf: 'center',
    }
})

export default Banner