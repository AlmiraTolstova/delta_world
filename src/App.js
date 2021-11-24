import React from "react";
import {Layout, Switch} from 'antd';
import './App.css';
import {NewMenu} from "./components/Menu/Menu";
import {UsergroupAddOutlined} from "@ant-design/icons";
import {Footer_form} from "./components/Footer-form/Footer-form";
import {LoginForm} from "./forms/Login/Login";



const { Header, Footer, Content } = Layout;

function App() {
    return (
        <div className="App">
            <Layout className="wrapper">
                <Header>
                    <NewMenu/>
                </Header>
                <Content className="content">
                    <LoginForm/>
                </Content>
                <Footer className="footer">
                    <Footer_form/>
                </Footer>
            </Layout>
        </div>
);
}

export default App;
