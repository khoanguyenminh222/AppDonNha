import { View, Text, Image, StyleSheet, useWindowDimensions, Pressable } from 'react-native'
import React from 'react'
import Logo from "../../assets/images/logo.png";
import { COLORS } from '../Colors';

const Post = () => {
    const { height } = useWindowDimensions();
  return (
    <Pressable style={({pressed})=>[{backgroundColor: pressed ? COLORS.white: COLORS.backgroundColor}]}>
    <View style={styles.container}>
      <Image
        source={Logo}
        style={[styles.logo, { height: height * 0.3 }]}
        resizeMode="contain"
      />
      <View style={styles.wrapperText}>
        <Text style={styles.title}>Tieu de</Text>
        <Text style={styles.content}>Lorem Ipsum is simply dummy text of the printing and typesetting industry.</Text>
      </View>
      
    </View>
    </Pressable>
  );
}

const styles = StyleSheet.create({
    container:{
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-around',
        marginHorizontal: 20,
        marginBottom: 30,
    },
    wrapperText:{
        flex: 2,
        marginLeft: 20,
    },
    logo: {
        flex: 1,
        width: '28%',
        maxWidth: 80,
        maxHeight: 100,
    },
    title:{
      fontSize: 24,
      fontWeight: '400',
    },
    content: {
      fontSize: 18,
      lineHeight: 24,
    }
})

export default Post