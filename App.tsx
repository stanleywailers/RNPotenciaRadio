import React, { useEffect } from 'react'
import { View } from 'react-native'
import SplashScreen from 'react-native-splash-screen'
import { HomeScreen } from './src/Screens/HomeScreen';



const App = () => {



  return (
    <View  style={{backgroundColor:'red', flex:1}}>
     <HomeScreen></HomeScreen> 
    </View>
  )
}

export default App;