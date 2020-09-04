 import React from 'react';
 
 import './styles.css';

 import whatsappIcon from '../../assets/images/icons/whatsapp.svg';

 
 function TeacherItems() {
   return (
    <article className="teacher-item">
        <header>
        <img src="https://avatars0.githubusercontent.com/u/49811931?s=460&u=b4766415071056c10ca199d5cb4ac5f33287dddc&v=4" alt="Profile image"/>
        <div>
            <strong>Maiquel P</strong>
            <span>Tech</span>
        </div>
        </header>
        <p>
        Advanced technology teacher.
        <br/><br/>
        Loves to teach high advanced technology disciplines.
        </p>
        <footer>
        <p>
            Price/hour
            <strong>$ 50</strong>
        </p>
        <button type="button">
            <img src={whatsappIcon} alt="Whatsapp contact"/>
            Teacher Contact
        </button>
        </footer>
    </article>
   )
 }
 
 export default TeacherItems;