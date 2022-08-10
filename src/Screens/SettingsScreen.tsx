import React from 'react';
import {Text, View} from 'react-native';
import {BannerAd, BannerAdSize, TestIds} from 'react-native-google-mobile-ads';
import {getVersion} from 'react-native-device-info';

import {ButtonSetting} from '../Components/ButtonSetting';

const adUnitIdBanner = __DEV__
  ? TestIds.BANNER
  : 'ca-app-pub-8582719280960685/3307949149';

export const SettingsScreen = () => {
  return (
    <View style={{flex: 1, backgroundColor: '#FFF'}}>
      <ButtonSetting
        iconName="logo-facebook"
        bgColor="#0B84EE"
        textButton="Facebook"
        urlNavigation="https://www.facebook.com/PotenciaRadioTv"
      />
      <ButtonSetting
        iconName="logo-instagram"
        bgColor="#D62A76"
        textButton="Instagram"
        urlNavigation="https://www.instagram.com/potenciaradiotv/"
      />
      <ButtonSetting
        iconName="logo-whatsapp"
        bgColor="#34B245"
        textButton="Whatsapp"
        urlNavigation="https://wa.me/50376034599"
      />
      <ButtonSetting
        iconName="reader-outline"
        bgColor="#feb308"
        textButton="Políticas de Privacidad"
        urlNavigation="https://radiopotenciaapp.blogspot.com/p/privacy-policy-updated-at-2029-07-21.html"
      />
      <View style={{position: 'absolute', bottom: 25, width: '100%'}}>
        <BannerAd
          unitId={adUnitIdBanner}
          size={BannerAdSize.ANCHORED_ADAPTIVE_BANNER}
        />
      </View>
      <View
        style={{
          position: 'absolute',
          bottom: 0,
          right: 0,
          padding: 5,
        }}>
        <Text>v{getVersion()}</Text>
      </View>
    </View>
  );
};
