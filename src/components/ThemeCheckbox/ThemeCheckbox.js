import React from 'react';
import {ThemeContextConsumer} from "../../context/ThemeContext";
import './ThemeCheckbox.css'
import {useTranslation} from "react-i18next";



const ThemeCheckbox =()=>{
        const{t}=useTranslation();
        return (
            <ThemeContextConsumer>{
                (context) => (
                    <div className="theme-checkbox">
                        {t('themeCheckbox')}
                    <input className="theme-checkbox__input" checked={context.darkTheme} type="checkbox" onClick={context.toggleTheme}/>
                </div>
                )}
            </ThemeContextConsumer>
        );
};

export default ThemeCheckbox;