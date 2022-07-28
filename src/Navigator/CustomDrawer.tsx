import React from 'react'
import { createDrawerNavigator, DrawerContentComponentProps, DrawerContentScrollView, DrawerNavigationOptions } from '@react-navigation/drawer';
import { HomeScreen } from '../Screens/HomeScreen';
import { AdsScreen } from '../Screens/AdsScreen';
import { Image, Text, View } from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import { DrawerMenuCell } from '../Components/DrawerMenuCell';
import { NewsScreen } from '../Screens/NewsScreen';
import { SettingsScreen } from '../Screens/SettingsScreen';


const Drawer = createDrawerNavigator();

export const CustomDrawer = () => {
  return (
    <Drawer.Navigator  
    drawerContent={ (props) => <SideMenu  {...props}/>}
    initialRouteName="HomeScreen">
    <Drawer.Screen name="HomeScreen" component={HomeScreen} />
    <Drawer.Screen name="NewsScreen" component={NewsScreen} />
    <Drawer.Screen name="SettingsScreen" component={SettingsScreen} />
    <Drawer.Screen name="AdsScreen" component={AdsScreen} />
  </Drawer.Navigator>
  )
}

const SideMenu = ({navigation}: DrawerContentComponentProps) =>{
    return(
    <DrawerContentScrollView  contentContainerStyle={{flex:1}}>
        <View style={{flex:1}}>
  
         <DrawerMenuCell iconName='home-sharp' name='Inicio' navProps={navigation} screenName='HomeScreen'/>
         <DrawerMenuCell iconName='newspaper-sharp' name='Noticias' navProps={navigation} screenName='NewsScreen'/>
         <DrawerMenuCell iconName='settings-sharp' name='Configuraciones' navProps={navigation} screenName='SettingsScreen'/>
          
        </View>

        
     

    </DrawerContentScrollView>
    );
}