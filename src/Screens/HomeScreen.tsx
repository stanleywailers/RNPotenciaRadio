import React, {useEffect, useState} from 'react';
import {AppState, Image, StyleSheet, Text, Touchable, TouchableOpacity, View} from 'react-native';
import SplashScreen from 'react-native-splash-screen';
import LinearGradient from 'react-native-linear-gradient';
import {PlayPauseButton} from '../Components/PlayPauseButton';
import {SetupServicePlayer} from '../Services/SetupServicePlayer';
import {QueueInitalTracksService} from '../Services/QueueInitalTracksService';
import TrackPlayer from 'react-native-track-player';
import {useOnTogglePlayback} from '../Hooks/useOnTogglePlayback';
import {AdEventType, BannerAd, BannerAdSize, InterstitialAd, TestIds} from 'react-native-google-mobile-ads';

const adUnitIdBanner = __DEV__
  ? TestIds.BANNER
  : 'ca-app-pub-8582719280960685/3307949149';
const adUnitId = __DEV__
  ? TestIds.INTERSTITIAL
  : 'ca-app-pub-8582719280960685/2007740063';

  const interstitial = InterstitialAd.createForAdRequest(adUnitId, {
    requestNonPersonalizedAdsOnly: true,
    keywords: ['fashion', 'clothing'],
});

export const HomeScreen = () => {
  const [loaded, setLoaded] = useState(true);
  const [aState, setAppState] = useState(AppState.currentState);
  const [isPlayerReady, setIsPlayerReady] = useState<boolean>(false);
  useEffect(() => {
    SplashScreen.hide();
  });

  useEffect(() => {
    async function run() {
      const isSetup = await SetupServicePlayer();
      setIsPlayerReady(isSetup);

      if (isSetup) {
        TrackPlayer.play();
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

  useEffect(() => {

    const unsubscribe = interstitial.addAdEventsListener(({ type }) => {
        type === AdEventType.LOADED && setLoaded(true);
        type === AdEventType.CLOSED && loadAd();
    })

    loadAd();

    return unsubscribe;
}, []);

const loadAd = () => {
    setLoaded(false);
    interstitial.load()
}

const showAds = () => {
    if (!loaded) {
        console.log('no loaded ad [null]')
        return null
    }
    interstitial.show();
}

  return (
    <View style={{flex: 1}}>
      <LinearGradient
        colors={['#feb308', '#ee1d71']}
        style={{...StyleSheet.absoluteFillObject, justifyContent: 'center'}}>
        <View
          style={{
            bottom: 30,
            justifyContent: 'center',
            alignItems: 'center',
          }}>
          <Image
            source={require('../Assets/logo_cuadrado.png')}
            style={{width: 300, height: 250, resizeMode: 'contain'}}
          />
        </View>

        <View
          style={{
            backgroundColor: '#462945',
            bottom: 0,
            position: 'absolute',
            height: 100,
            width: '100%',
            justifyContent: 'center',
            alignItems: 'center',
          }}>
             <PlayPauseButton OnPressAd={() => showAds()}/>
        
           
         
        </View>
        <View style={{position: 'absolute', bottom: 0}}>
          <BannerAd unitId={adUnitIdBanner} size={BannerAdSize.FULL_BANNER} />
        </View>
      </LinearGradient>
    </View>
  );
};
