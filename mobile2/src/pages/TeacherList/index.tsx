import React, { useState } from 'react';
import { View, ScrollView, Text, TextInput, AsyncStorage } from 'react-native';
import { BorderlessButton, RectButton } from 'react-native-gesture-handler';
import { useFocusEffect } from '@react-navigation/native';
import { Feather } from '@expo/vector-icons';

import api from '../../services/api';
import PageHeader from '../../components/PageHeader';
import TeacherItems, { Teacher } from '../../components/TeacherItems';

import styles from './styles';

function TeacherList() {
  const [filtersVisibility, setFiltersVisibility] = useState(false);  
  const [favorites, setFavorites] = useState<number[]>([]);
  const [teacherListItems, setTeacherListItems] = useState([]);
  const [subject, setSubject] = useState('');
  const [week_day, setWeek_day] = useState('');
  const [time, setTime] = useState('');

  function loadFavorites() {
    AsyncStorage.getItem('favorites').then(res => {
      if (res) {
        const favoriteTeachers = JSON.parse(res);
        const favoriteTeachersId = favoriteTeachers.map((element: Teacher) => element.id )
        setFavorites(favoriteTeachersId);
      }
    });
  }

  useFocusEffect(
    React.useCallback(() => {
      loadFavorites();
    }, [])
  );
    
  function togleFiltersVisibility() {
      setFiltersVisibility(!filtersVisibility);
  }

  async function searchTeachers() {
    loadFavorites();

    const res = await api.get('classes', {
      params: {
        subject,
        week_day,
        time
      }
    });
    setTeacherListItems(res.data); 
    setFiltersVisibility(!filtersVisibility);  
  }


  return (
    <View style={styles.container}>
      <PageHeader title="Available Proffys" 
        headerRight={(
          <BorderlessButton onPress={togleFiltersVisibility}>
            <Feather name="filter" size={20} color="#fff" />
          </BorderlessButton>
        )}>
        { filtersVisibility && (
          <View style={styles.searchForm}>
            <Text style={styles.label}>Subject</Text>
            <TextInput style={styles.input} placeholder="What subject?" placeholderTextColor="#c1bccc" value={subject} onChangeText={text => setSubject(text)} />

            <View style={styles.inputGroup}>
              <View style={styles.inputBlock}>
                <Text style={styles.label}>Week day</Text>
                <TextInput style={styles.input} placeholder="What week day?" placeholderTextColor="#c1bccc" value={week_day} onChangeText={text => setWeek_day(text)} />
              </View>
              
              <View style={styles.inputBlock}>
                <Text style={styles.label}>Schedule</Text>
                <TextInput style={styles.input} placeholder="What schedule?" placeholderTextColor="#c1bccc" value={time} onChangeText={text => setTime(text)} />
              </View>
            </View>

            <RectButton style={styles.submitButton} onPress={searchTeachers}>
              <Text style={styles.submitButtonText}>Filter</Text>
            </RectButton>

          </View>
        )}
      </PageHeader>
      
      <ScrollView style={styles.teacherList} contentContainerStyle={{ paddingHorizontal: 16, paddingBottom: 16 }}>
      
      {teacherListItems.map((element: Teacher) => {
        return (
          <TeacherItems key={element.id} teacher={element} favorited={favorites.includes(element.id)} />
          )
      })}
       
      </ScrollView>
    </View>
  );
}

export default TeacherList;