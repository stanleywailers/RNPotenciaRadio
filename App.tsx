import 'react-native-gesture-handler';
import React from 'react'
import { NavigationContainer } from '@react-navigation/native';
import { CustomDrawer } from './src/Navigator/CustomDrawer';
// import { AdsScreen } from './src/Screens/AdsScreen';



const App = () => {
  return (
    <NavigationContainer> 
    <CustomDrawer/>
    </NavigationContainer>
  )
}


export default App;