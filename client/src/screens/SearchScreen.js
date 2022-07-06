import { View, Text, SafeAreaView, ScrollView, TouchableOpacity, StyleSheet, useWindowDimensions } from 'react-native'
import React, { useEffect, useState } from 'react'
import GlobalStyles from '../GlobalStyles'
import Search from '../components/Search'
import Item from '../components/Item'
import { COLORS } from '../Colors'
import { Ionicons } from "@expo/vector-icons";

const SearchScreen = ({route}) => {
    const [end, setEnd] = useState(5);
    const [start, setStart] = useState(0);
    const {width} = useWindowDimensions();
    const [posts, setPosts] = useState([route.params]);
    const [tempPost, setTempPost] = useState([]);
    const handleLoadMore = () => {
        setEnd(end+5);
        setStart(start+5);
        console.log(end, start);
    }
    useEffect(() => {
        for (let index = start; index < posts.length; index++) {
            setTempPost([...tempPost, ...posts[index]]);
        }
    }, [ end ]);
  return (
    <SafeAreaView style={GlobalStyles.droidSafeArea}>
      <Search/>
      <ScrollView showsVerticalScrollIndicator={false}
        // refreshControl={<RefreshControl refreshing={refreshing} onRefresh={onRefresh} />}
      >
      {tempPost.slice(0,end).map((post)=>(
        <Item key={post._id} post={post}/>
      ))}
      {end>=posts[0].length ? (
          <View style={styles.btnLoadmore}>
            <Text>Hết tin</Text>
          </View>
        ): (
          <TouchableOpacity style={styles.btnLoadmore} onPress={handleLoadMore}>
          <Text>Xem thêm</Text>
          <Ionicons size={width * 0.05} name="chevron-down-outline"></Ionicons>
        </TouchableOpacity>
        )}
    </ScrollView>
    </SafeAreaView>
  )
}

const styles = StyleSheet.create({
    btnLoadmore: {
        padding:20,
        justifyContent: 'center',
        alignItems: 'center',
        width: '100%',
        flexDirection: 'row',
    }
})

export default SearchScreen