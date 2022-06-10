import { View, Text, StyleSheet, Image, Pressable } from 'react-native'
import React from 'react'
import HCM from "../../assets/images/1.jpg";
import { COLORS } from '../Colors';
const Item = () => {
  return (
    <View style={styles.container}>
      <Pressable style={({pressed})=>[{backgroundColor: pressed ? COLORS.white: COLORS.backgroundColor}]}>
        <View style={styles.wrapper}>
          <Image source={HCM} style={styles.img} resizeMode="cover" />
          <Text style={styles.txtContent}>Tp Hồ Chí Minh</Text>
        </View>
      </Pressable>
      <Pressable style={({pressed})=>[{backgroundColor: pressed ? COLORS.white: COLORS.backgroundColor}]}>
        <View style={styles.wrapper}>
          <Image source={HCM} style={styles.img} resizeMode="cover" />
          <Text style={styles.txtContent}>Tp Hồ Chí Minh</Text>
        </View>
      </Pressable>
      <Pressable style={({pressed})=>[{backgroundColor: pressed ? COLORS.white: COLORS.backgroundColor}]}>
        <View style={styles.wrapper}>
          <Image source={HCM} style={styles.img} resizeMode="cover" />
          <Text style={styles.txtContent}>Tp Hồ Chí Minh</Text>
        </View>
      </Pressable>
    </View>
  );
}

const styles = StyleSheet.create({
    container:{
        paddingHorizontal: 20,
        flexDirection: 'row',
        justifyContent: 'space-around',
        alignItems: 'center',
        height: 100,
    },
    wrapper:{

    },
    img:{   
        height: '100%',
        maxHeight: 100,
        maxWidth: 110,
    },
    txtContent:{
      fontSize: 16,
    }

})

export default Item