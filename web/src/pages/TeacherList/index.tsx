import React, { useState, FormEvent } from 'react';
import api from '../../services/api';

import PageHeader from '../../components/PageHeader';
import TeacherItems, { Teacher } from '../../components/TeacherItems';
import Input from '../../components/Input';
import Select from '../../components/Select';

import './styles.css';

function TeacherList() {
  const [teacherListItems, setTeacherListItems] = useState([]);
  const [subject, setSubject] = useState('');
  const [week_day, setWeek_day] = useState('');
  const [time, setTime] = useState('');

  async function searchTeachers(e: FormEvent) {
    e.preventDefault();
    
    const res = await api.get('classes', {
      params: {
        subject,
        week_day,
        time
      }
    });
    setTeacherListItems(res.data);     
  }

  return (
    <div id="page-teacher-list" className="container">
       <PageHeader title="These are the avaiable Proffys...">
        <form id="search-teachers" onSubmit={searchTeachers}>
          <Select name="subject" label="Subject" value={subject} onChange={e => setSubject(e.target.value)} 
            options={[
              { value: 'english', label: 'English'},
              { value: 'history', label: 'History'},
              { value: 'math', label: 'Math'},
              { value: 'portuguese', label: 'Portuguese'}
          ]} />

          <Select name="week-day" label="Week Day" value={week_day} onChange={e => setWeek_day(e.target.value)}
            options={[
              { value: '0', label: 'Sunday'},
              { value: '1', label: 'Monday'},
              { value: '2', label: 'Tuesday'},
              { value: '3', label: 'Wednesday'},
              { value: '4', label: 'Thursday'},
              { value: '5', label: 'Friday'},
              { value: '6', label: 'Saturday'}
          ]} />

          <Input type="time" name="time" label="Time" value={time} onChange={e => setTime(e.target.value)}/>
          
          <button type="submit">Search</button>
        </form>
      </PageHeader>
      <main>
        {teacherListItems.map((element: Teacher) => {
          return (
            <TeacherItems key={element.id} teacher={element} />
          )
        })}
      </main>
    </div>
  )
}

export default TeacherList;