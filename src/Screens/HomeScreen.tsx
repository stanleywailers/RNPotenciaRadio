/* eslint-disable react-native/no-inline-styles */
import React, {useEffect, useState} from 'react';
import {Dimensions, Image, StyleSheet, Text, View} from 'react-native';
import SplashScreen from 'react-native-splash-screen';
import LinearGradient from 'react-native-linear-gradient';
import analytics from '@react-native-firebase/analytics';

import {PlayPauseButton} from '../Components/PlayPauseButton';
import {SetupServicePlayer} from '../Services/SetupServicePlayer';
import {QueueInitalTracksService} from '../Services/QueueInitalTracksService';
import TrackPlayer from 'react-native-track-player';
import firestore, {
  FirebaseFirestoreTypes,
} from '@react-native-firebase/firestore';

import {BannerAd, BannerAdSize, TestIds} from 'react-native-google-mobile-ads';
import messaging from '@react-native-firebase/messaging';
import Slider from '../types/slider';
import Carousel from 'react-native-reanimated-carousel';
import SliderComponent from '../Components/SliderComponent/SliderComponent';

const adUnitIdBanner = __DEV__
  ? TestIds.BANNER
  : 'ca-app-pub-8582719280960685/3307949149';

export const HomeScreen = () => {
  const [isPlayerReady, setIsPlayerReady] = useState<boolean>(false);
  const width = Dimensions.get('window').width;
  const [sliders, setSliders] = useState<Slider[]>([]);
  console.log(sliders);

  useEffect(() => {
    SplashScreen.hide();
  });

  useEffect(() => {
    const unsubscribe = firestore()
      .collection('sliders')
      .onSnapshot(snapshot => {
        const slidersList: Slider[] = snapshot.docs.map(doc => {
          const data = doc.data() as Partial<Slider>;
          return {
            id: doc.id,
            image: data.image || '',
            title: data.title || '',
            url: data.url || '',
          };
        });

        setSliders(slidersList);
      });

    return () => unsubscribe();
  }, []);

  useEffect(() => {
    // async function run() {
    //   const isSetup = await SetupServicePlayer();
    //   setIsPlayerReady(isSetup);
    //   if (isSetup) {
    //     TrackPlayer.play();
    //   }
    //   const queue = await TrackPlayer.getQueue();
    //   if (isSetup && queue.length <= 0) {
    //     await QueueInitalTracksService();
    //   }
    // }
    // run();
  }, []);

  // Muestra el FCM token en consola.
  useEffect(() => {
    const checkToken = async () => {
      const fcmToken = await messaging().getToken();
      if (fcmToken) {
        console.log({fcmToken});
      }
    };

    checkToken();
  }, []);

  return (
    <View style={{flex: 1}}>
      <LinearGradient
        colors={['#feb308', '#ee1d71']}
        style={{...StyleSheet.absoluteFillObject, justifyContent: 'center'}}>
        <View style={{width: '100%', alignItems: 'center'}}>
          <Carousel
            loop
            width={width}
            height={width / 2}
            autoPlay={true}
            data={sliders}
            scrollAnimationDuration={5000}
            onSnapToItem={index => console.log('current index:', index)}
            renderItem={({index, item}) => <SliderComponent item={item} />}
          />
        </View>
        <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
          <Image
            source={require('../Assets/logo_cuadrado.png')}
            style={{
              width: 300,
              height: 250,
              resizeMode: 'contain',
            }}
          />
        </View>

        <View
          style={{
            position: 'absolute',
            bottom: 100,
            width: '100%',
          }}>
          <BannerAd
            unitId={adUnitIdBanner}
            size={BannerAdSize.ANCHORED_ADAPTIVE_BANNER}
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
          <PlayPauseButton
            OnPressAd={async () => {
              await analytics().logEvent('playRadio', {
                id: Date.now.toString(),
                description: 'play/pause Radio',
              });
            }}
          />
        </View>
      </LinearGradient>
    </View>
  );
};
