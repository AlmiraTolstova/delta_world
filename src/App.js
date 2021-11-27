import React from "react";
import {
    Route, Switch, HashRouter, Redirect,
} from 'react-router-dom';
import { Layout } from 'antd';
import './App.css';
import NewMenu from "./components/Menu/Menu";
import {UsergroupAddOutlined} from "@ant-design/icons";
import {Footer_form} from "./components/Footer-form/Footer-form";
import LoginForm from "./forms/Login/Login";
import RegistrationForm from "./forms/Registration/Registration";
import Users from "./forms/Users/Users";
import Posts from "./forms/Posts/Posts";



const { Header, Footer, Content } = Layout;

function App() {
    return (
        <HashRouter>

            <div className="App">
                <Layout className="wrapper">
                    <Header className="header">
                        <NewMenu/>
                    </Header>
                    <Content className="content">
                        <Switch>
                            <Route path="/login">
                                <LoginForm/>
                            </Route>
                            <Route path="/registration">
                                <RegistrationForm/>
                            </Route>
                            <Route path="/users">
                                <Users/>
                            </Route>
                            <Route path="/">
                                <Posts/>
                            </Route>
                        </Switch>

                    </Content>
                    <Footer className="footer">
                        <Footer_form/>
                    </Footer>
                </Layout>
            </div>
        </HashRouter>
);
}

export default App;
