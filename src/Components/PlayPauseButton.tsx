import React from 'react';
import {ActivityIndicator, View, StyleSheet, TouchableOpacity, Image} from 'react-native';
import {usePlaybackState, State} from 'react-native-track-player';
import { useOnTogglePlayback } from '../Hooks/useOnTogglePlayback';




export const PlayPauseButton: React.FC = () => {
  const state = usePlaybackState();
  const isPlaying = state === State.Playing;
  const isLoading = state === State.Connecting || state === State.Buffering;

  const onTogglePlayback = useOnTogglePlayback();

  if (isLoading) {
    return (
      <View style={styles.statusContainer}>
        {isLoading && <ActivityIndicator />}
      </View>
    );
  }

  return (
    <TouchableOpacity
      
      onPress={onTogglePlayback} > 
       <Image   source={isPlaying?  require('../Assets/ic_pause.png') : require('../Assets/ic_play.png')} style={{ width: 50, height: 50, resizeMode:'contain' }} />
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