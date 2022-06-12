import { View, Text, Image, StyleSheet, useWindowDimensions, TouchableOpacity, Pressable } from 'react-native'
import React from 'react'
import Logo from "../../assets/images/logo.png";
import { COLORS } from '../Colors';

const Post = ({item,image,title,content,onPress}) => {
    const { height } = useWindowDimensions();

  return (
    <TouchableOpacity onPress={onPress}>
    <View style={styles.container}>
      <Image
        source={{uri: image}}
        style={[styles.logo, { height: height * 0.3 }]}
        resizeMode="contain"
      />
      <View style={styles.wrapperText}>
        <Text style={[styles.title,{fontSize:height*0.04}]}>{title}</Text>
        {content.map((c) => (<Text key={c.email} style={[styles.content, {fontSize:height*0.03}]}>{c}</Text>))}
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
  },
})

export default Post