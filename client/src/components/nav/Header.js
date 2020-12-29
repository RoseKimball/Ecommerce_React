import React, { useState } from 'react';
import { Menu } from 'antd';
import { HomeOutlined, KeyOutlined, UserOutlined, ShoppingOutlined } from '@ant-design/icons';
import { Link } from 'react-router-dom';
import firebase from 'firebase';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';
import Search from '../forms/Search';

const { SubMenu } = Menu; //Menu.submenu

const Header = () => {
    const [current, setCurrent] = useState("home");
    let dispatch = useDispatch();
    let { user } = useSelector((state) => ({ ...state }));
    let history = useHistory();

    const handleClick = (e) => {
         setCurrent(e.key)
    }

    const logout = () => {
        firebase.auth().signOut();
        dispatch({
            type: 'LOGOUT',
            payload: null
        }, [])
        
        /*history.push('/login') normally this is how we would redirect, but we can't recieve 
        history through props here, because header is not an actual route in app.js. instead,
        now we have to use useHistory hook, imported above.*/

        history.push('/login');
     }

    const { Item } = Menu;

    return (
        <Menu onClick={handleClick} selectedKeys={[current]} mode="horizontal">
            <Item key="home" icon={<HomeOutlined />}>
                <Link to='/'>Home</Link>
            </Item>
            <Item key="shop" icon={<ShoppingOutlined />}>
                <Link to='/shop'>Shop</Link>
            </Item>

            { !user && (
                <Item key="Register" icon={<KeyOutlined />} className="float-right"> 
                    <Link to='/register'>Register</Link>
                </Item>
            )}
            
            { !user && (
                <Item key="Login" icon={<UserOutlined />} className="float-right">
                    <Link to='/login'>Login</Link>
                </Item>
            )}

            {user && (
                <SubMenu 
                    key="SubMenu" 
                    icon={<UserOutlined />} 
                    title={user.email && user.email.split('@')[0]} 
                    className='float-right'
                >
                    { user && user.role === 'subscriber' && (
                        <Item>
                            <Link to='user/history'>Dashboard</Link>
                        </Item>
                    )}

                    { user && user.role === 'admin' && (
                        <Item>
                            <Link to='admin/dashboard'>Dashboard</Link>
                        </Item>
                    )}
                    <Item icon={<UserOutlined />} onClick={logout}>Logout</Item>
                </SubMenu>
            )}
            <span className='float-right p-1'>
                <Search />
            </span>
        </Menu>
    );
};

export default Header;