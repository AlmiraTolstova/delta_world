import React from 'react';
import ReactDOM from 'react-dom';
import 'antd/dist/antd.css';
import './index.css';
import App from './App';
import {ConfigProvider} from 'antd';

ReactDOM.render(
    <React.StrictMode>
        {/*<ConfigProvider locale={ruRU}>*/}
            <App/>
        {/*</ConfigProvider>*/}
    </React.StrictMode>,
    document.getElementById('root')
);

// reportWebVitals();
