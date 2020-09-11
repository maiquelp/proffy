import React, { useState, useEffect } from 'react';
import { View, Image, Text } from 'react-native';
import { useNavigation, useFocusEffect } from '@react-navigation/native';
import { RectButton } from 'react-native-gesture-handler';

import styles from './styles';

import api from '../../services/api';

import studyIcon from '../../assets/images/icons/study.png';
import giveClassesIcon from '../../assets/images/icons/give-classes.png';
import heartIcon from '../../assets/images/icons/heart.png';
import landingImg from '../../assets/images/landing.png';

function Landing() {
  const { navigate } = useNavigation();
  const [ totalConnections, setTotalConnections ] = useState(0);

  function handleNavigateTeach() {
    navigate('Teach');
  }

  function handleNavigateStudy() {
    navigate('Study');
  }

  useFocusEffect(
    React.useCallback(() => {
      api.get('connections').then(res => {
        setTotalConnections(res.data.total);
      })
    }, [])
  ); 

  return (
    <View style={styles.container}>
      <Image source={landingImg} style={styles.banner} />

      <Text style={styles.title}>
        Be welcome, {'\n'}
        <Text style={styles.titleBold}>So what you wanna do?</Text>
      </Text>

      <View style={styles.buttonsContainer}>
        <RectButton style={[styles.button, styles.buttonPrimary]} onPress={handleNavigateStudy}>
          <Image  source={studyIcon} />
          <Text style={styles.buttonText}>Study</Text>
        </RectButton>
        
        <RectButton style={[styles.button, styles.buttonSecondary]} onPress={handleNavigateTeach}>
          <Image  source={giveClassesIcon} />
          <Text style={styles.buttonText}>Teach</Text>
        </RectButton>
      </View>

      <Text style={styles.totalConnections}>
        {totalConnections} total connections done{' '}
        <Image source={heartIcon} />
      </Text>
    </View>
  );
}

export default Landing;