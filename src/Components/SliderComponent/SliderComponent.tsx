import React from 'react';
import {Image, TouchableOpacity, View} from 'react-native';
import Slider from '../../types/slider';
import {Linking} from 'react-native';

type SliderComponentProps = {
  item: Slider;
};

const SliderComponent = ({item}: SliderComponentProps) => {
  const openUri = () => {
    if (item && item?.url) {
      Linking.openURL(item.url);
    }
  };

  return (
    <TouchableOpacity onPress={openUri} style={{justifyContent: 'center'}}>
      <Image
        source={{uri: item.image}}
        style={{
          height: 200,
          resizeMode: 'contain',
        }}
      />
    </TouchableOpacity>
  );
};

export default SliderComponent;
