import React from 'react';

import PageHeader from '../../components/PageHeader';
import TeacherItems from '../../components/TeacherItems';
import Input from '../../components/Input';
import Select from '../../components/Select';

import './styles.css';

function TeacherList() {
  return (
    <div id="page-teacher-list" className="container">
       <PageHeader title="These are the avaiable Proffys...">
        <form id="search-teachers">
          <Select name="subject" label="Subject" options={[
             { value: 'math', label: 'Math'},
             { value: 'portuguese', label: 'Portuguese'},
             { value: 'english', label: 'English'}
            ]} />
          <Select name="week-day" label="Week Day"options={[
            { value: '1', label: 'Monday'},
            { value: '2', label: 'Tuesday'},
            { value: '3', label: 'Wednesday'},
            { value: '4', label: 'Thursday'},
            { value: '5', label: 'Friday'},
            { value: '6', label: 'Saturday'},
            { value: '0', label: 'Sunday'}
          ]} />
          <Input type="time" name="time" label="Time" />
        </form>
      </PageHeader>
      <main>
        <TeacherItems />
        <TeacherItems />
        <TeacherItems />
      </main>
    </div>
  )
}

export default TeacherList;