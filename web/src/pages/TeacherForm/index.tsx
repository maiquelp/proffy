import React, { useState, FormEvent } from 'react';
import { useHistory } from 'react-router-dom';
import api from '../../services/api';

import PageHeader from '../../components/PageHeader';
import Input from '../../components/Input';
import Textarea from '../../components/Textarea';
import Select from '../../components/Select';

import './styles.css';
import warningIcon from '../../assets/images/icons/warning.svg';

function TeacherForm() {
const history = useHistory();

  const [name, setName] = useState('');
  const [avatar, setAvatar] = useState('');
  const [whatsapp, setWhatsapp] = useState('');
  const [bio, setBio] = useState('');
  const [subject, setSubject] = useState('');
  const [cost, setCost] = useState('');
  const [scheduleItems, setScheduleItens] = useState([{
    week_day: 0,
    from: '',
    to: ''
  }]);

  function addNewScheduleItem() {
    setScheduleItens([...scheduleItems, { week_day: 0, from: '', to: '' }]);
  }

  function setScheduleItemValue(position: number, field: string, value: string) {
    const newScheduleItems = scheduleItems.map((element, index) => {
      if (index === position) {
        return {...element, [field]: value}; //[field] = overwrites prop value
      }
      return element;
    });

    setScheduleItens(newScheduleItems);
  }

  function handleSave(e: FormEvent) {
    e.preventDefault();

    api.post('classes', {
      name, avatar, whatsapp, bio, subject, cost: Number(cost), schedule: scheduleItems
    }).then(() => {
      alert('Data saved');
      history.push('/');
    }).catch(() => {
      alert('Error');
    })
  }

  return (
    <div id="page-teacher-form" className="container">
      <PageHeader title="So you wanna teach someone..." description="The first step is to fill the sign in form"/>
      <main>
        <form onSubmit={handleSave}>
          <fieldset>
            <legend>Your Data</legend>

            <Input name="name" label="Name" value={name} onChange={(e) => setName(e.target.value)}/>
            <Input name="avatar" label="Avatar" value={avatar} onChange={(e) => setAvatar(e.target.value)}/>
            <Input name="whatsapp" label="Whatsapp" value={whatsapp} onChange={(e) => setWhatsapp(e.target.value)}/>
            <Textarea name="bio" label="Bio" value={bio} onChange={(e) => setBio(e.target.value)}/>

          </fieldset>

          <fieldset>
            <legend>About the Subject</legend>

            <Select name="subject" label="Subject" value={subject} onChange={(e) => setSubject(e.target.value)}
              options={[
                { value: 'english', label: 'English'},
                { value: 'history', label: 'History'},
                { value: 'math', label: 'Math'},
                { value: 'portuguese', label: 'Portuguese'}
              ]}
            />
            <Input name="cost" label="Cost per hour" value={cost} onChange={(e) => setCost(e.target.value)}/>
          </fieldset>

          <fieldset>
              <legend>Avaiable Schedule
                <button type="button" onClick={addNewScheduleItem}>+ New Schedule</button>
              </legend>
              {scheduleItems.map((element, index) => {
                return (
                  <div className="schedule-item" key={element.week_day}>
                    <Select name="week-day" label="Week Day" value={element.week_day}
                      onChange={e => setScheduleItemValue(index, 'week_day', e.target.value)}
                      options={[
                        { value: '1', label: 'Monday'},
                        { value: '2', label: 'Tuesday'},
                        { value: '3', label: 'Wednesday'},
                        { value: '4', label: 'Thursday'},
                        { value: '5', label: 'Friday'},
                        { value: '6', label: 'Saturday'},
                        { value: '0', label: 'Sunday'}
                    ]} />
                    <Input name="from" label="From" type="time" value={element.from}
                      onChange={e => setScheduleItemValue(index, 'from', e.target.value)} 
                    />
                    <Input name="to" label="To" type="time" value={element.to}
                      onChange={e => setScheduleItemValue(index, 'to', e.target.value)}
                    />
                  </div>
                )
              })}
          </fieldset>

          <footer>
            <p>
              <img src={warningIcon} alt="warning" />
              Important! <br/>
              Fill all data.  
            </p>
            <button type="submit">Save</button>
          </footer>
        </form>
      </main>
    </div>
  )
}

export default TeacherForm;