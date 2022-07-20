import TrackPlayer, {RepeatMode} from 'react-native-track-player';

// @ts-ignore
import playlistData from '../Assets/data/playlist.json';
// @ts-ignore
//import localTrack from '../Assets/resources/pure.m4a';
// @ts-ignore
import localArtwork from '../Assets/logo_cuadrado.png';

export const QueueInitalTracksService = async (): Promise<void> => {
  await TrackPlayer.add([
  //  ...playlistData,
    {
      url: 'http://max.miradio.in:8300/stream?type=.mp3',
      title: 'Potencia Radio',
      artist: 'Somos Potencia Mundial',
      artwork: localArtwork,
     
    },
  ]);
  await TrackPlayer.setRepeatMode(RepeatMode.Off);
};