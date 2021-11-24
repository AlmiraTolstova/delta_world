import React from 'react';
import ReactDOM from 'react-dom';
import './Registration.css';
import 'antd/dist/antd.css';
import {Form, Input, InputNumber, Button, Radio, DatePicker, Space,Select} from 'antd';
import moment from 'moment';

const dateFormat = 'YYYY/MM/DD';
const weekFormat = 'MM/DD';
const monthFormat = 'YYYY/MM';

const dateFormatList = ['DD/MM/YYYY', 'DD/MM/YY'];

const customFormat = value => `custom format: ${value.format(dateFormat)}`;

const customWeekStartEndFormat = value =>
    `${moment(value).startOf('week').format(weekFormat)} ~ ${moment(value)
        .endOf('week')
        .format(weekFormat)}`;

const { Option } = Select;
const prefixSelector = (
    <Form.Item >
        <Select style={{width: 70,}}>
            <Option value="7">+7</Option>
            <Option value="8">8</Option>
        </Select>
    </Form.Item>
);

export class RegistrationForm extends React.Component {
    // const layout = {
    //     labelCol: {
    //         span: 8,
    //     },
    //     wrapperCol: {
    //         span: 16,
    //     },
    // };
    /* eslint-disable no-template-curly-in-string */

    // const validateMessages = {
    //     required: '${label} is required!',
    //     types: {
    //         email: '${label} is not a valid email!',
    //         number: '${label} is not a valid number!',
    //     },
    //     number: {
    //         range: '${label} must be between ${min} and ${max}',
    //     },
    // };
    /* eslint-enable no-template-curly-in-string */

    // const Demo = () => {
    //     const onFinish = (values) => {
    //         console.log(values);
    //     };

    // const [value, setValue] = React.useState(1);
    //
    // const onChange = e => {
    //     console.log('radio checked', e.target.value);
    //     setValue(e.target.value);
    // };






render()
{
    return (<div className="registration-form">
        <Form>
            <h1>Регистрация</h1>
            <Form.Item
                name={['user', 'name']}
                label="Имя:"
                rules={[
                    {
                        required: true,
                    },
                ]}>
                <Input/>
            </Form.Item>
            <Form.Item>
                <p>Пол:</p>
                <Radio.Group>
                    <Radio value={1}>Мужской</Radio>
                    <Radio value={2}>Женский</Radio>
                </Radio.Group>
            </Form.Item>
            <Space direction="horizontal" size={12}>
                <p>Дата рождения:</p>
                <DatePicker defaultValue={moment('2015/01/01', dateFormat)} format={dateFormat}/>
            </Space>,
            <Form.Item
                name={['user', 'email']}
                label="Email:"
                rules={[
                    {
                        type: 'email',
                    },
                ]}
            >
                <Input/>
            </Form.Item>

            <Form.Item
                name="phone"
                label="Телефон:"
                rules={[
                    {
                        required: true,
                        message: 'Please input your phone number!',
                    },
                ]}
            >
                <Input
                    addonBefore={prefixSelector}
                    style={{
                        width: '100%',
                    }}
                />
            </Form.Item>
            <Button type="primary" htmlType="submit">
                Зарегистрироваться
            </Button>
            <Button type="text" htmlType="submit">
                Уже есть аккаунт? Войти
            </Button>
        </Form>
    </div>)
}
}
;






