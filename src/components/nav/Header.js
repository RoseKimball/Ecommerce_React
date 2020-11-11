import React, { useState } from 'react';
import { Menu } from 'antd';
import { HomeOutlined, KeyOutlined, UserOutlined, QuestionOutlined } from '@ant-design/icons';
import { Link } from 'react-router-dom';

const { SubMenu } = Menu; //Menu.submenu

const Header = () => {
    const [current, setCurrent] = useState("home");

    const handleClick = (e) => {
         setCurrent(e.key)
    }

    const { Item } = Menu;

    return (
        <Menu onClick={handleClick} selectedKeys={[current]} mode="horizontal">
            <Item key="home" icon={<HomeOutlined />}>
                <Link to='/'>Home</Link>
            </Item>
            <Item key="Register" icon={<KeyOutlined />} className="float-right"> 
                <Link to='/register'>Register</Link>
            </Item>
            <Item key="Login" icon={<UserOutlined />} className="float-right">
                <Link to='/login'>Login</Link>
            </Item>
            <SubMenu key="SubMenu" icon={<QuestionOutlined />} title="Username">
                <Item key="setting:1">Option 1</Item>
                <Item key="setting:2">Option 2</Item>
            </SubMenu>
        </Menu>
    );
};

export default Header;