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
                <p>Delta World © 1970-2077</p>
                <div className="switch-component">
                    <p>Тёмная тема </p>
                    <Switch defaultChecked onChange={this.onChange}/>
                </div>
            </div>
        )
    }

}
