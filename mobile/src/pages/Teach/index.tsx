import React from 'react';
import { View, ImageBackground, Text } from 'react-native';
import { RectButton } from 'react-native-gesture-handler';
import { useNavigation } from '@react-navigation/native';

import styles from './styles';

import teachBgImage from '../../assets/images/give-classes-background.png';


function Teach() {
  const { goBack } = useNavigation();

  return (
    <View style={styles.container}>
      <ImageBackground source={teachBgImage} style={styles.content} resizeMode="contain">
        <Text style={styles.title}>Do you wanna be a Proffy?</Text>
        <Text style={styles.description}>So, first you have to subscribe in our web platform</Text>
      </ImageBackground>

      <RectButton style={styles.okButton} onPress={goBack}>
        <Text style={styles.okButtonText}>Ok!</Text>    
      </RectButton>
    </View>
  );
}

export default Teach;