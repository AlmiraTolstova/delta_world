import React from 'react';
import ReactDOM from 'react-dom';
import 'antd/dist/antd.css';
import './Login.css'
import {Form, Input, Button, Checkbox} from 'antd';

export class LoginForm extends React.Component {
    // const Demo = () => {
    //     const onFinish = (values) => {
    //         console.log('Success:', values);
    //     };
    //
    //     const onFinishFailed = (errorInfo) => {
    //         console.log('Failed:', errorInfo);
    //     };
    //
    render() {
        return (
            <div className="login-form">
                <Form>
                    <h>Вход</h>
                    <Form.Item
                        label="ID"
                        name="username"
                        rules={[
                            {
                                required: true,
                                message: 'Please input your username!',
                            },
                        ]}>
                        <Input/>
                    </Form.Item>
                    <Form.Item
                        wrapperCol={{
                            offset: 8,
                            span: 16,
                        }}>
                        <Button type="primary" htmlType="submit">
                            Войти
                        </Button>
                        <Button
                            href="https://google.com"
                            type="link">
                            Ещё нет аккаунта? Зарегистрироваться
                        </Button>
                    </Form.Item>
                </Form>
            </div>
        )
    }
};




