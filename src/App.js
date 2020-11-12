import React from 'react';
import {Switch, Route} from 'react-router-dom';
import Home from './pages/Home';
import Login from './pages/auth/Login';
import Register from './pages/auth/Register';
import Header from './components/nav/Header';
import RegisterComplete from './pages/auth/RegisterComplete';

import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const App = () => {
  return (
    <>
      <Header />
      <ToastContainer />
      <Switch>
          <Route exact path='/' component={Home}/>
          <Route exact path='/login' component={Login}/>
          <Route exact path='/register' component={Register}/>
          <Route exact path='/registercomplete' component={RegisterComplete}/>
      </Switch>
    </>
  )
}


export default App;
