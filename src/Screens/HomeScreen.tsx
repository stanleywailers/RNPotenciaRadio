import React, { useEffect, useState } from 'react'
import { AppState, Image, StyleSheet, Text, View } from 'react-native'
import SplashScreen from 'react-native-splash-screen'
import LinearGradient from 'react-native-linear-gradient';
import { PlayPauseButton } from '../Components/PlayPauseButton';
import { SetupServicePlayer } from '../Services/SetupServicePlayer';
import { QueueInitalTracksService } from '../Services/QueueInitalTracksService';
import TrackPlayer from 'react-native-track-player';
import { useOnTogglePlayback } from '../Hooks/useOnTogglePlayback';


 
 
export const HomeScreen = () => {
  const [aState, setAppState] = useState(AppState.currentState);
  const [isPlayerReady, setIsPlayerReady] = useState<boolean>(false);
    useEffect(() => {
        SplashScreen.hide();
      } )

      useEffect(() => {
        async function run() {
          const isSetup = await SetupServicePlayer();
          setIsPlayerReady(isSetup);

          if(isSetup){
           TrackPlayer.play()
          }
    
          const queue = await TrackPlayer.getQueue();
          if (isSetup && queue.length <= 0) {
            await QueueInitalTracksService();
          }
        }
    
        run();

        
      }, []);

      useEffect(() => {
        const appStateListener = AppState.addEventListener(
          'change',
          nextAppState => {
            console.log('Next AppState is: ', nextAppState);
            setAppState(nextAppState);
          },
        );
        return () => {
          appStateListener?.remove();
        };
      }, []);
      
  return (
    <View style={{ flex:1}}>
    
        <LinearGradient colors={['#feb308', '#ee1d71']} style={{...StyleSheet.absoluteFillObject, justifyContent:'center'}}>
       
        <View style={{ bottom:30,
        justifyContent:'center', alignItems:'center'}} >
        <Image   source={require('../Assets/logo_cuadrado.png')} style={{ width: 300, height: 250, resizeMode:'contain' }} />
      
        </View>
     
       
       
       
        <View style={{backgroundColor:'#462945',bottom:0, position:'absolute', height:100 , width:'100%', 
        justifyContent:'center', alignItems:'center'}}>
          <PlayPauseButton/>
          </View>
          
          </LinearGradient>

          
          
    </View>
  )
}
