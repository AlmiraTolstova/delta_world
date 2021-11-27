import React, {useEffect, useState} from 'react';
import ReactDOM from 'react-dom';
import 'antd/dist/antd.css';
import {Button, Menu} from 'antd';
import {UsergroupAddOutlined, PictureOutlined, AppstoreOutlined, SettingOutlined} from '@ant-design/icons';
import logo from './logo.svg'
import {Switch, Route, Link} from "react-router-dom";
import {useDispatch, useSelector} from "react-redux";
import './Menu.css'
import {getUsersList} from "../../api/dumMyApi";
import {loginOut} from "../../actions/actions";

const {SubMenu} = Menu;

const NewMenu = ()=> {
    const handleClick = (e) => {
        setCurrent(e.key)
        //setState({current: e.key});
    };
    const [current, setCurrent] = useState('posts');
    const state = useSelector(state=>state.loginReducer);
    const dispatch = useDispatch();

    useEffect(()=>{
        dispatch(getUsersList(0,9, ));

    }, [])

    const onExitButtonClick=()=>{
        dispatch(loginOut());
    }

        return (
            // <div>
            <Menu className="navigator" onClick={handleClick} selectedKeys={[current]} mode="horizontal">
                <Menu.Item key="logo" disabled>
                    <img src={logo} alt={"logo"}/>
                    Delta World
                </Menu.Item>

                <Menu.Item key="users" icon={<UsergroupAddOutlined/>}>
                    <Link to="/users">
                        Пользователи
                    </Link>
                </Menu.Item>

                <Menu.Item key="posts" icon={<PictureOutlined/>}>
                    <Link to="/">
                        Посты
                    </Link>
                </Menu.Item>

                <Menu.Item key="login">
                    <Link to="/login">
                        Вход
                    </Link>
                </Menu.Item>
                <Menu.Item key="registration">
                    <Link to="/registration">
                        Регистрация
                    </Link>
                </Menu.Item>

                <Menu.Item className="user-info">
                    <img className="user-info__photo" src={state.userPhotoURL}/>
                    <span className="user-info__name">{state.userFirstName}</span>

                    <Link to="/exit">
                        <Button type={"link"} onClick={onExitButtonClick}>
                            Выйти
                        </Button>

                    </Link>
                </Menu.Item>
            </Menu>

        );
};

export default NewMenu;

