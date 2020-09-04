import React from 'react';
import { BrowserRouter, Route } from 'react-router-dom';
import Landing from './pages/Landing';
import TeacherList from './pages/TeacherList';
import TeacherForm from './pages/TeacherForm';

// import { Container } from './styles';

function Routes() {
  return (
      <BrowserRouter>
            <Route path="/" exact component={Landing} />
            <Route path="/study" component={TeacherList} />
            <Route path="/teach" component={TeacherForm} />
      </BrowserRouter>
  );
}

export default Routes;