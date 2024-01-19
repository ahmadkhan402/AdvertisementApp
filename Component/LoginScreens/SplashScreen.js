import { Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React from 'react'
import { DataList } from '../../DataBases/DataBase'



const SplashScreen = ({navigation}) => {
  return (
    <View style={styles.container}>
      <View style={{marginVertical:"70%", borderColor:"#fff",borderWidth:3,borderRadius:100}}>
      <Image source={DataList.LoginImageUrl}  style={{width:150,height:150, padding:50}}/>
      </View>
      <View style={{alignContent:"center"}}>
      <TouchableOpacity style={styles.btn} onPress={()=>navigation.navigate("Login")}>
        <Text style={styles.Text}>Get Started!</Text>
      </TouchableOpacity>
      </View>
    
    </View>
  )
}

export default SplashScreen

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: DataList.primaryColor,
        alignItems: 'center',
        justifyContent: 'center',
      },
      Text:{
        color:"#fff",
        fontSize:22
      },
      btn:{
        backgroundColor:DataList.btnBg,
        padding:10,
        paddingHorizontal:70,
        borderRadius:30,
        elevation:12

      }
})