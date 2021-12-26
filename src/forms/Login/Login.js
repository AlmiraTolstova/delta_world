import React, {useState} from 'react';
import ReactDOM from 'react-dom';
import 'antd/dist/antd.css';
import './Login.scss'
import {Form, Input, Button, Checkbox} from 'antd';
import {Link} from "react-router-dom";
import {EMPTY_STRING} from "../../constants/api/common";
import {getUsersByID, getUsersByIDFromProxy} from "../../api/dumMyApi";
import {connect, useDispatch, useSelector} from "react-redux";
import {bindActionCreators} from "redux";
import {loginIn} from "../../actions/actions";
import loginReducer from "../../reducers/loginReducer";
import {ThemeContextConsumer} from "../../context/ThemeContext";
import {CloseCircleOutlined} from "@ant-design/icons";
import {useTranslation} from "react-i18next";

const LoginForm =()=> {
    const [inputValue, setInputValue] = useState(EMPTY_STRING);
    const [userId, setUserId]=useState(EMPTY_STRING);
    const [userFirstName, setUserFirstName] = useState(EMPTY_STRING);
    const [userPhotoURL, setUserPhotoURL] = useState(EMPTY_STRING);
    const state = useSelector(state=>state.loginReducer);
    const dispatch = useDispatch();

    const handleLoginClick =() =>{
        console.log(state);
        //dispatch(getUsersByID(inputValue.toString()));
        dispatch(getUsersByIDFromProxy(inputValue.toString()));

        setUserId(state.userId);
        setUserFirstName(state.userFirstName);
        setUserPhotoURL(state.userPhotoURL);
        console.log(`данные получены: ${userId} ${userFirstName} ${userPhotoURL}`);
    };

    const handleLoginReducerClick=(inputValue)=>{};
    const{t}=useTranslation();
        return (
            <ThemeContextConsumer>{
                (context) =>(
                    <Form className={`login-form ${context.darkTheme && 'login-form_dark'}`}>
                        <Link to="/">
                        <Button className="registration__close-btn" shape="circle" icon={<CloseCircleOutlined/>}>
                        </Button>
                        </Link>
                    <h1 className={`login-form__h1 ${context.darkTheme && 'login-form__h1_dark'}`}>{t('login')}</h1>
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
                                {t('login')}
                            </Link>
                        </Button>
                        <Link className="login-form__btn2" to="/registration">
                            {t('loginFormRegistration')}
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



