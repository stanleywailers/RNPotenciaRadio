import { DrawerNavigationHelpers } from '@react-navigation/drawer/lib/typescript/src/types';
import React from 'react'
import { Text, View } from 'react-native'
import { TouchableOpacity } from 'react-native-gesture-handler';
import Icon from 'react-native-vector-icons/Ionicons';

interface Props{
    iconName:string;
    name: string;
    navProps: DrawerNavigationHelpers; 
    screenName:string;
}


export const DrawerMenuCell = ({iconName, name, screenName, navProps}: Props) => {
  return (
    <TouchableOpacity style={{paddingVertical:20}} onPress={ () => { navProps.navigate(screenName) }} >
        
    <View style={{ flexDirection:'row' , height:80, justifyContent:'flex-start' ,alignItems:'center' }}>
    <Icon name={iconName} size={30}  color="#999797" style={{marginLeft:30}}/>
      <Text style={{marginLeft:40, fontWeight: 'bold', color:'#ee1d71'}}>{name}</Text>
      </View>
      <View style={{ backgroundColor: "#999797", height:1 , marginHorizontal:20}} />
      
      </TouchableOpacity>
  )
}
