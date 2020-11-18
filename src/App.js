import React, { useEffect } from 'react';
import { Switch, Route } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { auth } from './firebase';
import { useDispatch } from 'react-redux';

import Home from './pages/Home';
import Login from './pages/auth/Login';
import Register from './pages/auth/Register';
import Header from './components/nav/Header';
import RegisterComplete from './pages/auth/RegisterComplete';
import ForgotPassword from './pages/auth/ForgotPassword';

const App = () => {
  const dispatch = useDispatch();

  // to check firebase auth state
  useEffect(() => {
    const loggedIn = auth.onAuthStateChanged(async (user) => {
      if(user) {
        const idTokenResult = await user.getIdTokenResult();
        console.log('user', user)
        dispatch({
          type: 'LOGGED_IN_USER',
          payload: {
            email: user.email,
            token: idTokenResult.token
          }
        })
      }
    })
    //cleanup
    return () => loggedIn();
  }, [])

  return (
    <>
      <Header />
      <ToastContainer />
      <Switch>
          <Route exact path='/' component={Home}/>
          <Route exact path='/login' component={Login}/>
          <Route exact path='/register' component={Register}/>
          <Route exact path='/registercomplete' component={RegisterComplete}/>
          <Route exact path='/forgot/password' component={ForgotPassword}/>
      </Switch>
    </>
  )
}


export default App;
