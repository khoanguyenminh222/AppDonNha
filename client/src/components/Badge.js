import { View, Text, StyleSheet } from 'react-native'
import React from 'react'
import { COLORS } from '../Colors'

const Badge = () => {
  return (
    <View style={styles.container}>

    </View>
  )
}

const styles = StyleSheet.create({
    container:{
        position: 'absolute',
        top: 0,
        right: 0,
        backgroundColor: COLORS.red,
        width: 12,
        height: 12,
        borderRadius: 150/2,
        zIndex: 1,
    }
})

export default Badge