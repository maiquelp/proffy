import React, { useState } from 'react';
import { View, ScrollView, AsyncStorage } from 'react-native';
import { useFocusEffect } from '@react-navigation/native';

import PageHeader from '../../components/PageHeader';
import TeacherItems, { Teacher } from '../../components/TeacherItems';

import styles from './styles';

function Favorites() {
  const [favorites, setFavorites] = useState([]);

  function loadFavorites() {
    AsyncStorage.getItem('favorites').then(res => {
      if (res) {
        const favoriteTeachers = JSON.parse(res);
        setFavorites(favoriteTeachers);
        }
    });
  }  

  useFocusEffect(
    React.useCallback(() => {
      loadFavorites();
    }, [])
  );
  return (
    <View style={styles.container}>
      <PageHeader title="Favorite Proffys" />

      <ScrollView style={styles.teacherList} contentContainerStyle={{ paddingHorizontal: 16, paddingBottom: 16 }}>

        {favorites.map((element: Teacher) => {
          return (  
            <TeacherItems key={element.id} teacher={element} favorited />
          )
        })}
        
      </ScrollView>
    </View>  );
}

export default Favorites;