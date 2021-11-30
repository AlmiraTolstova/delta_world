// Компонент который будет хранить информацию и давать к ней доступ
import React from 'react';
import {ReactNode} from "react";

//
// interface Props{
//     children:ReactNode;
// }
//
// export interface ThemeContextState{
//     darkTheme:boolean;
//     toggleTheme:()=>void;
// }


const {Provider,Consumer} = React.createContext({});


class  ThemeContextProvider extends React.Component{
    constructor(props) {
        super(props);
        this.state={
            darkTheme:false,
            toggleTheme:this.toggleTheme.bind(this)
        };
    }

    toggleTheme(){
        this.setState({darkTheme: !this.state.darkTheme})
    }

    render():React.ReactNode{
        return  <Provider value={{
            darkTheme:this.state.darkTheme,
            toggleTheme:this.state.toggleTheme,
        }}> {this.props.children}</Provider>
    }

}

export {ThemeContextProvider,Consumer as ThemeContextConsumer}
