import React from 'react';
import ReactDOM from 'react-dom';
import 'antd/dist/antd.css';
import {Switch} from 'antd';
import './Footer-form.css'
import {ThemeCheckbox} from "../ThemeCheckbox/ThemeCheckbox";
import {ThemeContextConsumer} from "../../context/ThemeContext";


export class Footer_form extends React.Component {

    onChange(checked) {
        console.log(`switch to ${checked}`);
    }

    render() {
        return (
            <ThemeContextConsumer>{
                (context) => (
                    <div className={`footer_component ${context.darkTheme && 'footer__component_dark'}`}>
                        <p>Delta World © 1970-2077</p>
                        <div className="switch-component">
                            <ThemeCheckbox/>
                            {/*<p>Тёмная тема </p>*/}
                            {/*<Switch defaultChecked onChange={this.onChange}/>*/}
                        </div>
                    </div>
                )
            }
            </ThemeContextConsumer>
        )
    }

}
