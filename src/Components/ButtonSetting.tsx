import React from 'react';
import {View, Text, StyleSheet, TouchableOpacity, Linking} from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';

interface Props {
  bgColor?: string;
  iconName: string;
  textButton: string;
  urlNavigation: string;
}

export const ButtonSetting = ({
  bgColor = '#FFF',
  iconName,
  textButton,
  urlNavigation,
}: Props) => {
  return (
    <TouchableOpacity
      activeOpacity={0.9}
      onPress={() => Linking.openURL(urlNavigation)}>
      <View
        style={{
          ...styles.buttonContainer,
          backgroundColor: bgColor,
        }}>
        <Icon name={iconName} size={25} color="#FFF" />

        <Text style={styles.textButton}>{textButton}</Text>

        <Icon name="chevron-forward-outline" size={25} color="#FFF" />
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  buttonContainer: {
    flexDirection: 'row',
    paddingHorizontal: 10,
    height: 50,
    marginHorizontal: 20,
    alignItems: 'center',
    borderRadius: 5,
    justifyContent: 'space-between',
    marginVertical: 15,
    elevation: 3,
  },
  textButton: {
    fontWeight: 'bold',
    color: '#FFF',
    fontSize: 20,
  },
});
