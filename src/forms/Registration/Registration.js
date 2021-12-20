import React, {useState} from 'react';
import ReactDOM from 'react-dom';
import './Registration.css';
import 'antd/dist/antd.css';
import {Form, Input, InputNumber, Button, Radio, DatePicker, Space, Select} from 'antd';
import moment from 'moment';
import {useDispatch, useSelector} from "react-redux";
import {EMPTY_STRING} from "../../constants/api/common";
import {createUser, createUserToProxy} from "../../api/dumMyApi";
import {Link} from "react-router-dom";
import {ThemeContextConsumer} from "../../context/ThemeContext";
import {CloseCircleOutlined} from "@ant-design/icons";
import {HIDE_POST_WITH_COMMENTS} from "../../constants/actions/actions_const";
import {useTranslation} from "react-i18next";

const RegistrationForm = () => {
    const dateFormat = 'YYYY/MM/DD';
    const weekFormat = 'MM/DD';
    const monthFormat = 'YYYY/MM';

    const dateFormatList = ['DD/MM/YYYY', 'DD/MM/YY'];

    const customFormat = value => `custom format: ${value.format(dateFormat)}`;

    const customWeekStartEndFormat = value =>
        `${moment(value).startOf('week').format(weekFormat)} ~ ${moment(value)
            .endOf('week')
            .format(weekFormat)}`;

    const {Option} = Select;

    const dispatch = useDispatch();

    const [firstName, setFirstName] = useState(EMPTY_STRING);
    const [secondName, setSecondName] = useState('testFamily');
    const [male, setMale] = useState(EMPTY_STRING);
    const [dateOfBirth, setDateOfBirth] = useState('01.01.1990');
    const [email, setEmail] = useState(EMPTY_STRING);
    const [phone, setPhone] = useState('+01234567890');

    const onRegistrationButtonClick = () => {
        const namming = firstName;
        const namePos = namming.indexOf(' ');
        if (namePos > 0) {
            setFirstName(namming.slice(0, namePos));
            setSecondName(namming.slice(namePos, namming.length));
        } else {
            setFirstName(namming);
            setSecondName('notLastName');
        }
        //dispatch(createUser(firstName, secondName, male, dateOfBirth, email, phone));
        dispatch(createUserToProxy(firstName, secondName, male, dateOfBirth, email, phone));
    }

    const{t}=useTranslation();

    return (
        <ThemeContextConsumer>{
            (context) => (
                <div className={`registration ${context.darkTheme && 'registration_dark'}`}>
                    <Button className="registration__close-btn" shape="circle" icon={<CloseCircleOutlined/>}>
                    </Button>
                    <Form>
                        <h1 className={` ${context.darkTheme && 'registration-text_dark'}`}>{t('registration')}</h1>
                        <Form.Item
                            name={['user', 'name']}
                            label={t('name')}
                            rules={[
                                {
                                    required: true,
                                },
                            ]}>
                            <Input className={` ${context.darkTheme && 'registration-text_dark'}`} value={firstName} onChange={(e) => setFirstName(e.target.value)}/>
                        </Form.Item>
                        <Form.Item>
                            <p className={` ${context.darkTheme && 'registration-text_dark'}`}>{t('gender')}:</p>
                            <Radio.Group value={male} onChange={(e) => {
                                e.target.value == '1' ? setMale("male") : setMale("female");
                            }}>
                                <Radio className={` ${context.darkTheme && 'registration-text_dark'}`} value={1}>{t('masculine')}</Radio>
                                <Radio className={` ${context.darkTheme && 'registration-text_dark'}`} value={2}>{t('female')}</Radio>
                            </Radio.Group>
                        </Form.Item>
                        <Space direction="horizontal" size={12}>
                            <p className={` ${context.darkTheme && 'registration-text_dark'}`}>{t('dateOfBirth')}:</p>
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
                            <Input value={email} onChange={(e) => setEmail(e.target.value)}/>
                        </Form.Item>

                        <Form.Item
                            name="phone"
                            label={t('phone')}
                            rules={[
                                {
                                    required: true,
                                    message: 'Please input your phone number!',
                                },
                            ]}
                        >
                            <Input value={phone} onChange={(e) => setPhone(e.target.value)}
                                // addonBefore={prefixSelector}
                            />
                        </Form.Item>
                        <Button type="primary" htmlType="submit" onClick={onRegistrationButtonClick}>
                            <Link to="/">
                                {t('registration')}
                            </Link>
                        </Button>
                        <Button className={` ${context.darkTheme && 'registration-text_dark'}`} type="text" htmlType="submit">
                            {t('registrationFormLogin')}
                        </Button>
                    </Form>
                </div>)
        }
        </ThemeContextConsumer>
    )
};

export default RegistrationForm;




