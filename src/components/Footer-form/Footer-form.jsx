import React from 'react';
import ReactDOM from 'react-dom';
import 'antd/dist/antd.css';
import {Switch} from 'antd';
import './Footer-form.css'


export class Footer_form extends React.Component {

    onChange(checked) {
        console.log(`switch to ${checked}`);
    }

    render() {
        return (
            <div className="footer_component">

            <span>Delta World © 1970-2077</span>

        <div className="switch-component">
            <span>Тёмная тема </span>
            <Switch defaultChecked onChange={this.onChange}/>
        </div>
            </div>
    )
    }

}
