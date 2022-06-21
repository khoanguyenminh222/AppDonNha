import { View, Text, SafeAreaView, StyleSheet, ScrollView } from 'react-native'
import React from 'react'
import GlobalStyles from '../GlobalStyles'
import Back from '../components/Back';
import InfoText from '../components/InfoText';

const UpdateInforScreen = ({route}) => {
    console.log(route.params);
  return (
    <SafeAreaView style={GlobalStyles.droidSafeArea}>
      <Back textCenter="Thay đổi thông tin"/>

        <View style={styles.container}>
            <InfoText name="Email" data={route.params.email} editable={false}/>
            <InfoText name="Họ tên" data={route.params.fullname} editable={true}/>
            <InfoText name="Họ tên" data={route.params.fullname} editable={true}/>
            <InfoText name="Họ tên" data={route.params.fullname} editable={true}/>

        </View>

    </SafeAreaView>
  )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        padding: 20,
    }
})

export default UpdateInforScreen