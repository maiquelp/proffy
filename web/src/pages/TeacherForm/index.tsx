import React from 'react';

import PageHeader from '../../components/PageHeader';
import Input from '../../components/Input';
import Textarea from '../../components/Textarea';
import Select from '../../components/Select';

import './styles.css';
import warningIcon from '../../assets/images/icons/warning.svg';

function TeacherForm() {
  return (
    <div id="page-teacher-form" className="container">
      <PageHeader title="So you wanna teach someone..." description="The first step is to fill the sign in form"/>
      <main>
        <fieldset>
          <legend>Your Data</legend>

          <Input name="name" label="Name" />
          <Input name="avatar" label="Avatar" />
          <Input name="whatsapp" label="Whatsapp" />
          <Textarea name="bio" label="Bio" />

        </fieldset>

        <fieldset>
          <legend>About the Subject</legend>

          <Select name="subject" label="Subject" 
            options={[
              { value: 'math', label: 'Math'},
              { value: 'portuguese', label: 'Portuguese'},
              { value: 'english', label: 'English'}
            ]}
          />
          <Input name="cost" label="Cost per hour" />
        </fieldset>

        <fieldset>
            <legend>Avaiable Schedule
              <button type="button">+ New Schedule</button>
            </legend>
            <div className="schedule-item">
              <Select name="week-day" label="Week Day"options={[
                { value: '1', label: 'Monday'},
                { value: '2', label: 'Tuesday'},
                { value: '3', label: 'Wednesday'},
                { value: '4', label: 'Thursday'},
                { value: '5', label: 'Friday'},
                { value: '6', label: 'Saturday'},
                { value: '0', label: 'Sunday'}
              ]} />
              <Input name="from" label="From" type="time" />
              <Input name="to" label="To" type="time" />
            </div>
        </fieldset>

        <footer>
          <p>
            <img src={warningIcon} alt="warning" />
            Important! <br/>
            Fill all data.  
          </p>
          <button type="button">Save</button>
        </footer>
      </main>
    </div>
  )
}

export default TeacherForm;