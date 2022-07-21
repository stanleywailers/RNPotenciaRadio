import React from 'react';
import {ActivityIndicator, View, StyleSheet, TouchableOpacity, Image} from 'react-native';
import {usePlaybackState, State} from 'react-native-track-player';
import { useOnTogglePlayback } from '../Hooks/useOnTogglePlayback';

interface Props{
  OnPressAd: () => void; 
}


export const PlayPauseButton = ({OnPressAd}:Props ) => {
  const state = usePlaybackState();
  const isPlaying = state === State.Playing;
  const isLoading = state === State.Connecting || state === State.Buffering;

  const onTogglePlayback = useOnTogglePlayback();

  if (isLoading) {
    return (
      <View style={styles.statusContainer}>
        {isLoading && <ActivityIndicator  />}
      </View>
    );
  }

  return (
    <TouchableOpacity
      
      onPress={() => {OnPressAd()
        onTogglePlayback()
      } } > 
       <Image   source={isPlaying?  require('../Assets/ic_pause.png') : require('../Assets/ic_play.png')} style={{ width: 70, height: 70, resizeMode:'contain' }} />
      </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  statusContainer: {
    height: 40,
    marginTop: 20,
    marginBottom: 60,
  },
});