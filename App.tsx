import React from 'react'
import { View } from 'react-native'
import { HomeScreen } from './src/Screens/HomeScreen';
// import { AdsScreen } from './src/Screens/AdsScreen';

const App = () => {

  

  return (
    <View style={{ flex: 1 }}>
      <HomeScreen />
      {/* <AdsScreen /> */}
    </View>
  )
}


export default App;