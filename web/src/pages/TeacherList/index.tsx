import React from 'react';

import PageHeader from '../../components/PageHeader';
import TeacherItems from '../../components/TeacherItems';
import Input from '../../components/Input';

import './styles.css';

function TeacherList() {
  return (
    <div id="page-teacher-list" className="container">
       <PageHeader title="These are the avaiable Proffys...">
        <form id="search-teachers">
          <Input name="subject" label="Subject" />
          <Input name="week-day" label="Week Day" />
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