import React from 'react';
import {ThemeContextConsumer} from "../../context/ThemeContext";
import type {ThemeContextState} from "../../context/ThemeContext";


export class ThemeCheckbox extends React.Component {
    render(): React.ReactNode {
        return (
            <ThemeContextConsumer>{
                (context) => (
                    <div className="theme-checkbox">
                    Темная тема
                    <input className="theme-checkbox__input" checked={context.darkTheme} type="checkbox" onClick={context.toggleTheme}/>
                </div>
                )}
            </ThemeContextConsumer>
        );
    }
}