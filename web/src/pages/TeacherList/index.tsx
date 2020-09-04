import React from 'react';

import PageHeader from '../../components/PageHeader';
import TeacherItems from '../../components/TeacherItems';

import './styles.css';

function TeacherList() {
  return (
    <div id="page-teacher-list" className="container">
       <PageHeader title="These are the avaiable Proffys...">
        <form id="search-teachers">
          <div className="input-block">
            <label htmlFor="subject">Subject</label>
            <input type="text" id="subject"/>
          </div>

          <div className="input-block">
            <label htmlFor="week-day">Week day</label>
            <input type="text" id="Week-day"/>
          </div>

          <div className="input-block">
            <label htmlFor="time">Time</label>
            <input type="text" id="time"/>
          </div>
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