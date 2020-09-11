import React, { useState } from 'react';
import { View, Image, Text, Linking, AsyncStorage } from 'react-native';
import { RectButton } from 'react-native-gesture-handler';

import api from '../../services/api';

import styles from './styles';

import heartOutlineIcon from '../../assets/images/icons/heart-outline.png';
import unfavoriteIcon from '../../assets/images/icons/unfavorite.png';
import whatsappIcon from '../../assets/images/icons/whatsapp.png';

export interface Teacher {
    id: number, avatar: string, name: string, subject: string, bio: string, 
    cost: number, whatsapp: string
}

interface TeacherItemProps {
 teacher: Teacher;
 favorited: boolean
}

const TeacherItems: React.FC<TeacherItemProps> = ({teacher, favorited}) => {
    const [isFavorited, setIsFavorited] = useState(favorited);

    function handleContact() {
      api.post('connections', { user_id: teacher.id});

      Linking.openURL(`whatsapp://send?phone=${teacher.whatsapp}`);
    }

    async function toggleFavorite() {
      const favorites = await AsyncStorage.getItem('favorites');

      let favoritesArray = [];

      if (favorites) {
          favoritesArray = JSON.parse(favorites);
      }

      if (isFavorited) {
        const favoriteIndex = favoritesArray.findIndex((element: Teacher) => {
            return element.id === teacher.id
        });

        favoritesArray.splice(favoriteIndex, 1);

        setIsFavorited(false);

      } else {
       
        favoritesArray.push(teacher);

        setIsFavorited(true);

      } 

      await AsyncStorage.setItem('favorites', JSON.stringify(favoritesArray));
    }

    return (
    <View style={styles.container}>
      <View style={styles.profile}>
        <Image style={styles.avatar} 
          source={{ uri : teacher.avatar}}
        />

        <View style={styles.profileInfo}>
            <Text style={styles.name}>{teacher.name}</Text>
            <Text style={styles.subject}>{teacher.subject}</Text>
        </View>
      </View>

      <Text style={styles.bio}>{teacher.bio}</Text>

      <View style={styles.footer}>
        <Text style={styles.price}>Price/Hour {' '}
          <Text style={styles.priceValue}>${teacher.cost}</Text>
        </Text>

          <View style={styles.buttonsContainer}>
              <RectButton style={[styles.favoriteButton, isFavorited ? styles.favorited : {}]} onPress={toggleFavorite}>
                { isFavorited
                  ? <Image source={unfavoriteIcon} />
                  : <Image source={heartOutlineIcon} />
                }
              </RectButton>
              
              <RectButton style={styles.contactButton} onPress={handleContact}>
                <Image source={whatsappIcon} />
                <Text style={styles.contactButtonText}>Contact</Text>
              </RectButton>
          </View>
      </View>
    </View>
  );
}

export default TeacherItems;