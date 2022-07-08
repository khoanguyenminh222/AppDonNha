import { View, Text, SafeAreaView, ScrollView, TouchableOpacity, StyleSheet, useWindowDimensions } from 'react-native'
import React, { useEffect, useState } from 'react'
import GlobalStyles from '../GlobalStyles'
import Search from '../components/Search'
import Item from '../components/Item'
import { COLORS } from '../Colors'
import { Ionicons } from "@expo/vector-icons";
import baseURL from '../api/BaseURL'


const SearchScreen = ({route}) => {

    const [end, setEnd] = useState(5);
    const [start, setStart] = useState(0);
    const {width} = useWindowDimensions();

    // khi nhấn vào các suggesstion, các tin được lưu vào posts 
    const [posts, setPosts] = useState([route.params?.post]);
    const [tempPost, setTempPost] = useState([]);
    const [txt, setTxt] = useState("");
    const handleLoadMore = () => {
        setEnd(end+5);
        setStart(start+5);
    }
    useEffect(() => {
      if(posts[0]!==undefined){
        posts.forEach(p => {
          console.log("p",p)
          setTempPost(p)
          
        });
      }
        
    }, [ posts ]);

    const fetchPostForSearch = async()=>{
      await fetch(
        `${baseURL}/postUser/search?txt=${txt}`
      )
      .then((res)=>res.json())
      .then((resJson)=>{
        setPosts([resJson]);
      })
    }
    // nhấn nút tìm kiếm
    useEffect(()=>{
      
      if(txt!==""){
        fetchPostForSearch();
      }
    },[txt])
  return (
    <SafeAreaView style={GlobalStyles.droidSafeArea}>
      {route.params?.data==false ? (
        <Search value={txt} onChangeText={setTxt} autoFocus={true}/>
      ):(<Search value={txt} onChangeText={setTxt} autoFocus={false}/>)
      }
      
      <ScrollView showsVerticalScrollIndicator={false}
        // refreshControl={<RefreshControl refreshing={refreshing} onRefresh={onRefresh} />}
      >
      {/* bấm vào nút search teong trang home chưa có data */}
      {route.params?.data===false ?
        (
          <>
        {tempPost.slice(0,end).map((post)=>(
          <Item key={post._id} post={post}/>
        ))}
        {posts[0]!==undefined && end>=posts[0].length ? (
            undefined
          ): (
            <TouchableOpacity style={styles.btnLoadmore} onPress={handleLoadMore}>
            <Text>Xem thêm</Text>
            <Ionicons size={width * 0.05} name="chevron-down-outline"></Ionicons>
          </TouchableOpacity>
          )}
        </>)

        // hiển thị khi đã có data
      :(
        <>
      {tempPost.slice(0,end).map((post)=>(
        <Item key={post._id} post={post}/>
      ))}
      {posts[0]!==undefined && end>=posts[0].length ? (
          undefined
        ): (
          <TouchableOpacity style={styles.btnLoadmore} onPress={handleLoadMore}>
          <Text>Xem thêm</Text>
          <Ionicons size={width * 0.05} name="chevron-down-outline"></Ionicons>
        </TouchableOpacity>
        )}
      </>)
      }
      
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