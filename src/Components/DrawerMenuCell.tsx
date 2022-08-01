import React, {useEffect, useState} from 'react';
import {Text, View} from 'react-native';
import {DrawerNavigationHelpers} from '@react-navigation/drawer/lib/typescript/src/types';
import {TouchableOpacity} from 'react-native-gesture-handler';
import Icon from 'react-native-vector-icons/Ionicons';
import {
  AdEventType,
  InterstitialAd,
  TestIds,
} from 'react-native-google-mobile-ads';
interface Props {
  iconName: string;
  name: string;
  navProps: DrawerNavigationHelpers;
  screenName: string;
}

const adUnitId = __DEV__
  ? TestIds.INTERSTITIAL
  : 'ca-app-pub-8582719280960685/2007740063';

const interstitial = InterstitialAd.createForAdRequest(adUnitId, {
  requestNonPersonalizedAdsOnly: true,
  keywords: ['fashion', 'clothing'],
});

export const DrawerMenuCell = ({
  iconName,
  name,
  screenName,
  navProps,
}: Props) => {
  const [loaded, setLoaded] = useState(true);

  useEffect(() => {
    const unsubscribe = interstitial.addAdEventsListener(({type}) => {
      type === AdEventType.LOADED && setLoaded(true);
      type === AdEventType.CLOSED && loadAd();
    });

    loadAd();

    return unsubscribe;
  }, []);

  const loadAd = () => {
    setLoaded(false);
    interstitial.load();
  };

  const showAds = () => {
    if (!loaded) {
      console.log('no loaded ad [null]');
      return null;
    }
    interstitial.show();
  };
  return (
    <TouchableOpacity
      style={{paddingVertical: 20}}
      onPress={() => {
        if (screenName === 'SettingsScreen') {
          showAds();
        }
        navProps.navigate(screenName);
      }}>
      <View
        style={{
          flexDirection: 'row',
          height: 80,
          justifyContent: 'flex-start',
          alignItems: 'center',
        }}>
        <Icon
          name={iconName}
          size={30}
          color="#999797"
          style={{marginLeft: 30}}
        />
        <Text style={{marginLeft: 40, fontWeight: 'bold', color: '#ee1d71'}}>
          {name}
        </Text>
      </View>
      <View
        style={{backgroundColor: '#999797', height: 1, marginHorizontal: 20}}
      />
    </TouchableOpacity>
  );
};
