import React, {useState} from 'react';
import ReactDOM from 'react-dom';
import 'antd/dist/antd.css';
import './Login.css'
import {Form, Input, Button, Checkbox} from 'antd';
import {Link} from "react-router-dom";
import {EMPTY_STRING} from "../../constants/api/common";
import {getUsersByID} from "../../api/dumMyApi";
import {connect, useDispatch, useSelector} from "react-redux";
import {bindActionCreators} from "redux";
import {loginIn} from "../../actions/actions";
import loginReducer from "../../reducers/loginReducer";
import {ThemeContextConsumer} from "../../context/ThemeContext";

const LoginForm =()=> {
    const [inputValue, setInputValue] = useState(EMPTY_STRING);
    const [userId, setUserId]=useState(EMPTY_STRING);
    const [userFirstName, setUserFirstName] = useState(EMPTY_STRING);
    const [userPhotoURL, setUserPhotoURL] = useState(EMPTY_STRING);
    const state = useSelector(state=>state.loginReducer);
    const dispatch = useDispatch();

    const handleLoginClick =() =>{
        console.log(state);
        dispatch(getUsersByID(inputValue.toString()));
        setUserId(state.userId);
        setUserFirstName(state.userFirstName);
        setUserPhotoURL(state.userPhotoURL);
        console.log(`данные получены: ${userId} ${userFirstName} ${userPhotoURL}`);
    };

    const handleLoginReducerClick=(inputValue)=>{
    }
        return (
            <ThemeContextConsumer>{
                (context) =>(
                    <Form className={`login-form ${context.darkTheme && 'login-form_dark'}`}>
                    <h1 className={`login-form__h1 ${context.darkTheme && 'login-form__h1_dark'}`}>Вход</h1>
                    <Form.Item
                        label="ID"
                        name="username"
                        rules={[
                            {
                                required: true,
                                message: 'Please input your username!',
                            },
                        ]}>
                        <Input value={inputValue} onChange={(e) => setInputValue(e.target.value)}/>
                    </Form.Item>
                    <div className="login-form__buttons">
                        <Button type="primary" htmlType="submit" onClick={handleLoginClick}>
                            <Link to="/">
                                Войти
                            </Link>
                        </Button>
                        <Link className="login-form__btn2" to="/registration">
                            Ещё нет аккаунта? Зарегистрироваться
                        </Link>
                    </div>
                </Form>)
            }
            </ThemeContextConsumer>
        )
};

// export default LoginForm;
export default connect(
    (state)=>({
        userId:state.userId,
        userFirstName: state.userFirstName,
        userPhotoURL: state.userPhotoURL
    }),
    (dispatch)=>({
        setUserId:bindActionCreators(loginIn, dispatch)
    })
)(LoginForm)



