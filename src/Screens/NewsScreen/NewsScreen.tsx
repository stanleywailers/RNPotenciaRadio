import React, {useEffect, useState} from 'react';
import {View, Text} from 'react-native';
import firestore from '@react-native-firebase/firestore';

export const NewsScreen = () => {
  const [news, setNews] = useState([]);
  console.log(news, 'noticias');

  useEffect(() => {
    const fetchNews = async () => {
      try {
        const snapshot = await firestore().collection('news').get();
        const newsList = snapshot.docs.map(doc => ({
          id: doc.id,
          ...doc.data(),
        }));
        setNews(newsList);
      } catch (error) {
        console.error('Error fetching news:', error);
      }
    };

    fetchNews();
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
