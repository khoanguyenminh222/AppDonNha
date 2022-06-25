import { View, Text, Image, StyleSheet, useWindowDimensions, TouchableOpacity, Pressable } from 'react-native'
import React, { useEffect, useState } from 'react'
import Logo from "../../assets/images/logo.png";
import { COLORS } from '../Colors';
import PublicFolder from '../api/PublicFolder';

const Item = ({post, onPress}) => {
    const { height } = useWindowDimensions();

  return (
    <TouchableOpacity onPress={onPress}>

        <View style={styles.container}>
        <Image
          source={{uri: PublicFolder+post.picture[0]}}
          style={[styles.logo, { height: height * 0.3 }]}
          resizeMode="contain"
        />
        <View style={styles.wrapperText}>
          <Text style={[styles.title,{fontSize:height*0.02}]}>{post.title}</Text>
          <Text style={[styles.content,{fontSize:height*0.02}]}>{post.category}</Text>
          <Text style={[styles.content,{fontSize:height*0.02}]}>{post.address}</Text>
        </View>
        
      </View>
      
    
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-around",
    marginHorizontal: 20,
    marginBottom: 30,
    borderBottomColor: COLORS.light,
    borderBottomWidth: 0.8,
  },
  wrapperText: {
    flex: 2,
    marginLeft: 20,
    justifyContent: 'center',
  },
  logo: {
    flex: 1,
    width: "28%",
    maxWidth: 80,
    maxHeight: 100,
  },
  title: {
    fontSize: 24,
    fontWeight: "400",
  },
  content: {
    fontSize: 18,
    lineHeight: 24,
    color: COLORS.gray,
  },
})

export default Item