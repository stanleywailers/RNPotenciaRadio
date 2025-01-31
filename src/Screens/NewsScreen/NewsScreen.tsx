import React, {useEffect, useState} from 'react';
import {View, Text} from 'react-native';
import firestore from '@react-native-firebase/firestore';

export const NewsScreen = () => {
  const [news, setNews] = useState([]);

  useEffect(() => {
    const unsubscribe = firestore()
      .collection('news')
      .onSnapshot(snapshot => {
        const newsList = snapshot.docs.map(doc => ({
          id: doc.id,
          ...doc.data(),
        }));
        setNews(newsList);
      });

    // Cleanup al desmontar
    return () => unsubscribe();
  }, []);

  useEffect(() => {
    console.log('entre');
  }, []);

  return (
    <View>
      {news.map(item => (
        <View key={item.title}>
          <Text>{item.title}</Text>
          <Text>{item.description}</Text>
        </View>
      ))}
    </View>
  );
};
