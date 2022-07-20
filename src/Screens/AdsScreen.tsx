import React, { useEffect, useState } from 'react'
import { View, Text, Button } from 'react-native'
import { InterstitialAd, AdEventType, BannerAd, TestIds, BannerAdSize } from 'react-native-google-mobile-ads';

const adUnitId = __DEV__ ? TestIds.APP_OPEN : '';

const interstitial = InterstitialAd.createForAdRequest(adUnitId, {
    requestNonPersonalizedAdsOnly: true,
    keywords: ['fashion', 'clothing'],
});

export const AdsScreen = () => {

    const [loaded, setLoaded] = useState(true);

    useEffect(() => {
        interstitial.addAdEventListener(AdEventType.CLOSED, () => {
            setLoaded(true);
        })

        interstitial.load();
        //setDisabled(false);
    }, []);

    // useEffect(() => {
    //   const unsubcribed = interstitial.addAdEventListener(AdEventType.LOADED, () => {
    //     setLoaded(true)
    //   });
    //   interstitial.load();

    //   return unsubcribed;
    // }, []);

    // if (!loaded) {
    //   return null;
    // }
    return (
        <View style={{ backgroundColor: 'red', flex: 1 }}>
            <Text>AdsScreen</Text>
            {
                loaded && (
                    <Button
                        //disabled={disabled}
                        title="Show Interstitial"
                        onPress={() => {

                            interstitial.show();
                            setLoaded(false);
                        }}
                    />
                )
            }

            <View style={{ position: 'absolute', bottom: 0 }}>
                <BannerAd unitId={TestIds.BANNER} size={BannerAdSize.FULL_BANNER} />

            </View>
        </View>
    )
}