import React, {useState} from 'react';
import {
  ActivityIndicator,
  View,
  StyleSheet,
  TouchableOpacity,
  Image,
} from 'react-native';
import TrackPlayer, {usePlaybackState, State} from 'react-native-track-player';
// import {useOnTogglePlayback} from '../Hooks/useOnTogglePlayback';

interface Props {
  OnPressAd: () => void;
  isPlaying: boolean;
  setIsPlaying: React.Dispatch<React.SetStateAction<boolean>>;
}

export const PlayPauseButton = ({
  OnPressAd,
  isPlaying,
  setIsPlaying,
}: Props) => {
  const state = usePlaybackState();
  // const isPlaying = state === State.Playing;
  const isLoading = state === State.Connecting || state === State.Buffering;
  // const playbackState = usePlaybackState();

  // const [isPlaying, setIsPlaying] = useState(false);

  // const onTogglePlayback = useOnTogglePlayback();

  if (isLoading) {
    return (
      <View style={styles.statusContainer}>
        {isLoading && <ActivityIndicator />}
      </View>
    );
  }

  const togglePlayback = async () => {
    const state1 = await TrackPlayer.getState();
    if (state1 === State.Playing) {
      TrackPlayer.pause();
      setIsPlaying(false);
    } else {
      TrackPlayer.play();
      setIsPlaying(true);
    }
  };

  return (
    <TouchableOpacity
      onPress={() => {
        OnPressAd();
        togglePlayback();
        // onTogglePlayback();
      }}>
      <Image
        source={
          isPlaying
            ? require('../Assets/ic_pause.png')
            : require('../Assets/ic_play.png')
        }
        style={{width: 70, height: 70, resizeMode: 'contain'}}
      />
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
