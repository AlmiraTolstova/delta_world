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
import PersonalArea from "./forms/PersonalArea/PersonalArea";
import UserProfile from "./forms/UserProfile/UserProfile";
import OpenPost from "./forms/OpenPost/OpenPost";
import {ThemeContextProvider} from "./context/ThemeContext";



const { Header, Footer, Content } = Layout;

function App() {
    return (
        <HashRouter>
            <ThemeContextProvider>
            {/*<div className="App">*/}
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
                            <Route path="/personalarea">
                                <PersonalArea/>
                            </Route>
                            <Route path="/userprofile">
                                <UserProfile/>
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
            {/*</div>*/}
            </ThemeContextProvider>
        </HashRouter>
);
}

export default App;
