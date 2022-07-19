import React, { useEffect } from 'react'
import { Image, StyleSheet, Text, View } from 'react-native'
import SplashScreen from 'react-native-splash-screen'
import LinearGradient from 'react-native-linear-gradient';


 
 
export const HomeScreen = () => {

    useEffect(() => {
        SplashScreen.hide();
      } )
      
  return (
    <View style={{ flex:1}}>
    
        <LinearGradient colors={['#feb308', '#ee1d71']} style={{...StyleSheet.absoluteFillObject, justifyContent:'center'}}>
       
        <View style={{ bottom:30,
        justifyContent:'center', alignItems:'center'}} >
        <Image   source={require('../Assets/logo_cuadrado.png')} style={{ width: 300, height: 250, resizeMode:'contain' }} />
        </View>
     
       
       
       
        <View style={{backgroundColor:'#462945',bottom:0, position:'absolute', height:100 , width:'100%', 
        justifyContent:'center', alignItems:'center'}}>
            <Image   source={require('../Assets/ic_play.png')} style={{ width: 50, height: 50 }}/>
          </View>
          
          </LinearGradient>

          
          
    </View>
  )
}
