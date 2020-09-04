import React from 'react';

import PageHeader from '../../components/PageHeader';
import Input from '../../components/Input';

import './styles.css';
import warningIcon from '../../assets/images/icons/warning.svg';

function TeacherForm() {
  return (
    <div id="page-teacher-form" className="container">
      <PageHeader title="So you wanna teach someone..." description="The first step is to fill the sign in form"/>
      <main>
        <fieldset>
          <legend>Your data</legend>

          <Input name="name" label="Name" />
          <Input name="avatar" label="Avatar" />
          <Input name="whatsapp" label="Whatsapp" />

        </fieldset>

        <fieldset>
          <legend>About the Subject</legend>

          <Input name="subject" label="Subject" />
          <Input name="cost" label="Cost per hour" />

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