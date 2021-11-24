import React from "react";
import { Layout } from 'antd';
import './App.css';
import {NewMenu} from "./components/Menu/Menu";
import {UsergroupAddOutlined} from "@ant-design/icons";


const { Header, Footer, Content } = Layout;

function App() {
    return (
        <div className="App">
            <Layout className="wrapper">
                <Header><NewMenu/></Header>

                <Content className="content">Content</Content>
                <Footer className="footer">Footer</Footer>
            </Layout>
        </div>
);
}

export default App;
