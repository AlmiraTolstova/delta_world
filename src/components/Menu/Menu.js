import React from 'react';
import ReactDOM from 'react-dom';
import 'antd/dist/antd.css';
import {Menu} from 'antd';
import {UsergroupAddOutlined, PictureOutlined, AppstoreOutlined, SettingOutlined} from '@ant-design/icons';
import logo from './logo.svg'
import {Switch, Route, Link} from "react-router-dom";

const {SubMenu} = Menu;

export class NewMenu extends React.Component {
    state = {
        current: 'mail',
    };

    handleClick = e => {
        console.log('click ', e);
        this.setState({current: e.key});
    };

    render() {
        const {current} = this.state;
        return (
            // <div>
            <Menu className="navigator" onClick={this.handleClick} selectedKeys={[current]} mode="horizontal">

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

            </Menu>

        );
    }
}

