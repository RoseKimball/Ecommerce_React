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
import userHistory from './pages/user/userHistory';
import UserRoute from './routes/UserRoute';
import AdminRoute from './routes/AdminRoute';
import Password from './pages/user/Password';
import AdminDashboard from './pages/admin/AdminDashboard';
import CategoryCreate from './pages/admin/category/CategoryCreate';
import CategoryUpdate from './pages/admin/category/CategoryUpdate';
import ProductCreate from './pages/product/ProductCreate';
import ProductUpdate from './pages/product/ProductUpdate';

import { currentUser } from './functions/auth';


const App = () => {
  const dispatch = useDispatch();

  // to check firebase auth state
  useEffect(() => {
    const loggedIn = auth.onAuthStateChanged(async (user) => {
      if(user) {
        const idTokenResult = await user.getIdTokenResult();
        // console.log('user', user)
        currentUser(idTokenResult.token).then((res) => {
          dispatch({
              type: 'LOGGED_IN_USER',
              payload: {
                  name: res.data.name,
                  email: res.data.email,
                  token: idTokenResult.token,
                  role: res.data.role,
                  _id: res.data._id
              }
          })
          }).catch((err) => console.log(err))
      }
    })
    //cleanup
    return () => loggedIn();
  })

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
          <UserRoute exact path='/user/history' component={userHistory}/>
          <UserRoute exact path='/user/password' component={Password}/>
          <AdminRoute exact path='/admin/dashboard' component={AdminDashboard}/>
          <AdminRoute exact path='/admin/category' component={CategoryCreate}/>
          <AdminRoute exact path='/admin/category/:slug' component={CategoryUpdate}/>
          <AdminRoute exact path='/admin/product' component={ProductCreate}/>
          <AdminRoute exact path='/admin/product/:slug' component={ProductUpdate}/>
      </Switch>
    </>
  )
}


export default App;
