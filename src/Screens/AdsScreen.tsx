import React, { useEffect, useState } from 'react'
import { View, Text, Button } from 'react-native'
import { InterstitialAd, AdEventType, BannerAd, TestIds, BannerAdSize } from 'react-native-google-mobile-ads';

const adUnitId = __DEV__ ? TestIds.INTERSTITIAL : 'ca-app-pub-8582719280960685/2007740063';
const adUnitIdBanner = __DEV__ ? TestIds.BANNER : 'ca-app-pub-8582719280960685/3307949149';

const interstitial = InterstitialAd.createForAdRequest(adUnitId, {
    requestNonPersonalizedAdsOnly: true,
    keywords: ['fashion', 'clothing'],
});

export const AdsScreen = () => {

    const [loaded, setLoaded] = useState(true);

    useEffect(() => {

        const unsubscribe = interstitial.addAdEventsListener(({ type }) => {
            type === AdEventType.LOADED && setLoaded(true);
            type === AdEventType.CLOSED && loadAd();
        })

        loadAd();

        return unsubscribe;
    }, []);

    const loadAd = () => {
        setLoaded(false);
        interstitial.load()
    }

    const showAds = () => {
        if (!loaded) {
            console.log('no loaded ad [null]')
            return null
        }
        interstitial.show();
    }

    return (
        <View style={{ backgroundColor: 'red', flex: 1 }}>
            <Text>AdsScreen</Text>

            <Button
                title="Show Interstitial"
                onPress={() => {
                    showAds()
                }}
            />

            <View style={{ position: 'absolute', bottom: 0 }}>
                <BannerAd unitId={adUnitIdBanner} size={BannerAdSize.FULL_BANNER} />

            </View>
        </View>
    )
}