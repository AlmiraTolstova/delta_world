import React from 'react';
import i18next from 'i18next';
import 'antd/dist/antd.css';
import './Footer-form.css'
import ThemeCheckbox from "../ThemeCheckbox/ThemeCheckbox";
import {ThemeContextConsumer} from "../../context/ThemeContext";
import {useTranslation} from "react-i18next";
import '../../locale/i18next';
import {Button} from "antd";
import {MouseEventHandler} from "react";
import {SyntheticEvent} from "react";



const Footer_form =() =>{

    const onChange=(checked)=> {
        console.log(`switch to ${checked}`);
    }

        const{t}=useTranslation();
    const handleChangeLanguage=(e:React.MouseEvent<HTMLButtonElement>)=>{
    i18next.changeLanguage(e.currentTarget.value)
    }
        return (
            <ThemeContextConsumer>{
                (context) => (
                    <div className={`footer_component ${context.darkTheme && 'footer__component_dark'}`}>
                        <p>Delta World © 1970-2077</p>
                        <div id="app">
                            {/*<p>{t('helloMessage')}</p>*/}
                            <div>
                                <Button value='en' type="button" onClick={handleChangeLanguage}>EN</Button>
                                <Button value='ru' type="button" onClick={handleChangeLanguage}>RU</Button>

                            </div>
                        </div>
                        <div className="switch-component">
                            <ThemeCheckbox/>
                        </div>
                    </div>
                )
            }
            </ThemeContextConsumer>
        )


};
export default Footer_form;
