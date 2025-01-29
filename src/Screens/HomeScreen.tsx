/* eslint-disable react-native/no-inline-styles */
import React, {useEffect, useState} from 'react';
import {Button, Image, StyleSheet, Text, View} from 'react-native';
import SplashScreen from 'react-native-splash-screen';
import LinearGradient from 'react-native-linear-gradient';
import analytics from '@react-native-firebase/analytics';

import {PlayPauseButton} from '../Components/PlayPauseButton';
import {SetupServicePlayer} from '../Services/SetupServicePlayer';
import {QueueInitalTracksService} from '../Services/QueueInitalTracksService';
import TrackPlayer, {
  AppKilledPlaybackBehavior,
  Capability,
  State,
  usePlaybackState,
} from 'react-native-track-player';

import {BannerAd, BannerAdSize, TestIds} from 'react-native-google-mobile-ads';
import messaging from '@react-native-firebase/messaging';

import localArtwork from '../Assets/logo_cuadrado.png';

const adUnitIdBanner = __DEV__
  ? TestIds.BANNER
  : 'ca-app-pub-8582719280960685/3307949149';

export const HomeScreen = () => {
  const playbackState = usePlaybackState();
  // const [isPlayerReady, setIsPlayerReady] = useState<boolean>(false);
  const [isPlaying, setIsPlaying] = useState(false);

  useEffect(() => {
    SplashScreen.hide();
  });

  useEffect(() => {
    async function setupPlayer() {
      await TrackPlayer.setupPlayer();
      await TrackPlayer.add({
        // url: 'http://max.miradio.in:8300/stream?type=.mp3',
        url: 'http://max.miradio.in/proxy/grupobar/stream?type=.mp3',
        title: 'Potencia Radio',
        artist: 'Somos Potencia Mundial',
        artwork: localArtwork,
      });

      TrackPlayer.updateOptions({
        android: {
          appKilledPlaybackBehavior: AppKilledPlaybackBehavior.ContinuePlayback,
        },
        capabilities: [
          Capability.Play,
          Capability.Pause,
          Capability.SkipToNext,
          Capability.SkipToPrevious,
          Capability.Stop,
        ],
        compactCapabilities: [
          Capability.Play,
          Capability.Pause,
          Capability.SkipToNext,
        ],
        progressUpdateEventInterval: 2,
        playIcon: require('../Assets/ic_play.png'),
        pauseIcon: require('../Assets/ic_pause.png'),
      });
    }

    setupPlayer();
  }, []);

  const togglePlayback = async () => {
    const state = await TrackPlayer.getState();
    if (state === State.Playing) {
      console.log('The player is playing');
    }
    if (state === State.Playing) {
      await TrackPlayer.pause();
      setIsPlaying(false);
    } else {
      await TrackPlayer.play();
      setIsPlaying(true);
    }
  };

  // useEffect(() => {
  //   async function run() {
  //     const isSetup = await SetupServicePlayer();
  //     console.log({isSetup});
  //     setIsPlayerReady(isSetup);

  //     if (isSetup) {
  //       TrackPlayer.play();
  //     }

  //     const queue = await TrackPlayer.getQueue();
  //     console.log({queue});
  //     if (isSetup && queue.length <= 0) {
  //       await QueueInitalTracksService();
  //     }
  //   }

  //   run();
  // }, []);

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
        <View
          style={{
            bottom: 50,
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
          <View
            style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
            <Text>{isPlaying ? 'Reproduciendo' : 'Pausado'}</Text>
            <Button
              title={isPlaying ? 'Pausar' : 'Reproducir'}
              onPress={togglePlayback}
            />
          </View>
          {/* <PlayPauseButton
            OnPressAd={async () => {
              await analytics().logEvent('playRadio', {
                id: Date.now.toString(),
                description: 'play/pause Radio',
              });
            }}
          /> */}
        </View>
      </LinearGradient>
    </View>
  );
};
