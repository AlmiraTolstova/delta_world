import React from "react";
import {
    Route, Switch, HashRouter, Redirect,
} from 'react-router-dom';
import {Layout} from 'antd';
import './App.scss';
import NewMenu from "./components/Menu/Menu";
import {UsergroupAddOutlined} from "@ant-design/icons";
import Footer_form from "./components/Footer-form/Footer-form";
import LoginForm from "./forms/Login/Login";
import RegistrationForm from "./forms/Registration/Registration";
import Users from "./forms/Users/Users";
import Posts from "./forms/Posts/Posts";
import PersonalArea from "./forms/PersonalArea/PersonalArea";
import UserProfile from "./forms/UserProfile/UserProfile";
import OpenPost from "./forms/OpenPost/OpenPost";
import {ThemeContextConsumer, ThemeContextProvider} from "./context/ThemeContext";


const {Header, Footer, Content} = Layout;

function App() {
    return (
        <HashRouter>
            <ThemeContextProvider>

                <Layout className="wrapper">
                    <ThemeContextConsumer>
                        {
                            (context) => (
                                <Header className={`header ${context.darkTheme && 'header_dark'}`}>
                                    <NewMenu/>
                                </Header>)
                        }
                    </ThemeContextConsumer>
                    <ThemeContextConsumer>
                        {
                            (context) => (
                                <Content className={`content ${context.darkTheme && 'content_dark'}`}>
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
                                </Content>)
                        }
                    </ThemeContextConsumer>
                    <ThemeContextConsumer>
                        {
                            (context) => (
                                <Footer className={`footer ${context.darkTheme && 'footer_dark'}`}>
                                    <Footer_form/>
                                </Footer>)
                        }
                    </ThemeContextConsumer>
                </Layout>

            </ThemeContextProvider>
        </HashRouter>
    );
}

export default App;
