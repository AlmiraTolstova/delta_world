import React from 'react';
import ReactDOM from 'react-dom';
import 'antd/dist/antd.css';
import {Menu} from 'antd';
import {UsergroupAddOutlined, PictureOutlined, AppstoreOutlined, SettingOutlined} from '@ant-design/icons';
import logo from './logo.svg'

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

                    <Menu.Item key="mail" icon={<UsergroupAddOutlined/>}>
                        <a href="https://ant.design" target="_self">
                            Пользователи
                        </a>
                    </Menu.Item>

                    <Menu.Item key="posts" icon={<PictureOutlined/>}>
                        <a href="https://ant.design" target="_self">
                            Посты
                        </a>
                    </Menu.Item>

                    <Menu.Item key="posts">
                        <a href="https://ant.design" target="_self">
                            Вход
                        </a>
                    </Menu.Item>
                    <Menu.Item key="posts">
                        <a href="https://ant.design" target="_self">
                            Регистрация
                        </a>
                    </Menu.Item>

            </Menu>

        );
    }
}

