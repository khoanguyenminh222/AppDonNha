import { View, Text, StyleSheet, Image, Pressable } from 'react-native'
import React from 'react'
import HCM from "../../assets/images/1.jpg";
const Item = () => {
  return (
    <View style={styles.container}>
      <Pressable>
        <View style={styles.wrapper}>
          <Image source={HCM} style={styles.img} resizeMode="cover" />
          <Text>Tp Hồ Chí Minh</Text>
        </View>
      </Pressable>
      <Pressable>
        <View style={styles.wrapper}>
          <Image source={HCM} style={styles.img} resizeMode="cover" />
          <Text>Tp Hồ Chí Minh</Text>
        </View>
      </Pressable>
      <Pressable>
        <View style={styles.wrapper}>
          <Image source={HCM} style={styles.img} resizeMode="cover" />
          <Text>Tp Hồ Chí Minh</Text>
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
    },
    wrapper:{

    },
    img:{   
        height: 80,
        width: 100,
        maxheight: 100,
        maxwidth: 300,
    }

})

export default Item