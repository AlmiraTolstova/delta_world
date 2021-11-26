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

const LoginForm =()=> {
    const [inputValue, setInputValue] = useState(EMPTY_STRING);
    const [userId, setUserId]=useState(EMPTY_STRING);
    const [userFirstName, setUserFirstName] = useState(EMPTY_STRING);
    const [userPhotoURL, setUserPhotoURL] = useState(EMPTY_STRING);
    const state = useSelector(state=>state);
    const dispatch = useDispatch();
    // const Demo = () => {
    //     const onFinish = (values) => {
    //         console.log('Success:', values);
    //     };
    //
    //     const onFinishFailed = (errorInfo) => {
    //         console.log('Failed:', errorInfo);
    //     };
    //
    const handleLoginClick =() =>{
        // getUsersByID(inputValue.toString(),
        //     (resp) => {
        //         setUserId(resp.id.toString());
        //         setUserFirstName(resp.firstName);
        //         setUserPhotoURL(resp.picture);
        //         console.log(`данные получены: ${userId} ${userFirstName} ${userPhotoURL}`);
        //     },
        //     () => {});
        console.log(state);
        dispatch(getUsersByID(inputValue.toString()));
        setUserId(state.id);
        setUserFirstName(state.firstName);
        setUserPhotoURL(state.picture);
        console.log(`данные получены: ${userId} ${userFirstName} ${userPhotoURL}`);
    };

    const handleLoginReducerClick=(inputValue)=>{

    }

        return (
            <div className="login-form">
                <Form>
                    <h1>Вход</h1>
                    <Form.Item
                        label="ID"
                        name="username"
                        rules={[
                            {
                                required: true,
                                message: 'Please input your username!',
                            },
                        ]}>
                        <Input value={inputValue} onChange={(e)=>setInputValue(e.target.value)}/>
                    </Form.Item>
                    <Form.Item
                        wrapperCol={{
                            offset: 8,
                            span: 16,
                        }}>
                        <Button type="primary" htmlType="submit" onClick={handleLoginClick}>
                            Войти
                        </Button>
                        <Button
                            href=""
                            type="link">
                            <Link to="/registration">
                                Ещё нет аккаунта? Зарегистрироваться
                            </Link>

                        </Button>

                    </Form.Item>
                </Form>
            </div>
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



