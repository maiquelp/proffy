 import React from 'react';
 import api from '../../services/api';
 
 import './styles.css';

 import whatsappIcon from '../../assets/images/icons/whatsapp.svg';

 export interface Teacher {
        id: number, avatar: string, name: string, subject: string, bio: string, 
        cost: number, whatsapp: string
 }
 
 interface TeacherItemProps {
     teacher: Teacher
 }
 
 const TeacherItems: React.FC<TeacherItemProps> = ({teacher}) => {
    function addConnection() {
        api.post('connections', { user_id: teacher.id})
    }

        return (
            <article className="teacher-item" key={teacher.id}>
                <header>
                <img src={teacher.avatar} alt={teacher.avatar}/>
                <div>
                    <strong>{teacher.name}</strong>
                    <span>{teacher.subject}</span>
                </div>
                </header>

                <p>{teacher.bio}</p>

                <footer>
                <p>
                    Price/hour
                    <strong>$ {teacher.cost}</strong>
                </p>
                <a href={`http://wa.me/${teacher.whatsapp}`} onClick={addConnection} 
                    target="_blank">
                        <img src={whatsappIcon} alt="Whatsapp contact"/>
                        Teacher Contact
                </a>
                </footer>
            </article>
        )
 }
 
 export default TeacherItems;