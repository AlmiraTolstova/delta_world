import React, {useEffect, useState} from "react";
import {Button, Form} from "antd";
import 'antd/dist/antd.css';
import {Link} from "react-router-dom";
import {EMPTY_STRING} from "../../constants/api/common";
import {useDispatch, useSelector} from "react-redux";
import {updateUser, updateUserToProxy} from "../../api/dumMyApi";
import loginReducer from "../../reducers/loginReducer";
import "./UserProfilie.css"
import {ThemeContextConsumer} from "../../context/ThemeContext";
import {useTranslation} from "react-i18next";


const UserProfile = () => {
    const [img, setImg] = useState(EMPTY_STRING);
    const [name, setName] = useState(EMPTY_STRING);
    const [gender, setGender] = useState(EMPTY_STRING);
    const [dateOfBirth, setDateOfBirth] = useState(EMPTY_STRING)
    const [phone, setPhone] = useState(EMPTY_STRING);
    const [firstName, setFirstName] = useState(EMPTY_STRING);
    const [SecondName, setSecondName] = useState(EMPTY_STRING);

    const statePAR = useSelector((state => state.personalAreaReducer));

    const dispatch = useDispatch();

    useEffect(() => {
        setImg(statePAR.picture);
        setName(statePAR.firstName + " " + statePAR.lastName);
        setGender(statePAR.gender == "male" ? "Мужской" : "Женский");
        setDateOfBirth(statePAR.dateOfBirth);
        setPhone(statePAR.phone);
    }, [])

    const onSendNewInfoAboutUser = () => {

        const namming = name;
        const namePos = namming.indexOf(' ');
        if (namePos > 0) {
            setFirstName(namming.slice(0, namePos));
            setSecondName(namming.slice(namePos, namming.length));
        } else {
            setFirstName(namming);
            setSecondName('notLastName');
        }
        console.log(statePAR.id, firstName, SecondName, dateOfBirth, phone)
        //dispatch(updateUser(statePAR.id, firstName, SecondName, dateOfBirth, phone));
        dispatch(updateUserToProxy(statePAR.id, firstName, SecondName, dateOfBirth, phone));

    }
    const{t}=useTranslation();

    return (
        <ThemeContextConsumer>
            {
                (context) =>(
                <div className="user-profile">
                <div className={`user-profile__container ${context.darkTheme && 'user-profile__container_dark'}`}>
                    <img className="user-profile__img" src={img}/>
                    <div className="user-profile__bts">
                        <button>{t('userProfileReplace')}</button>
                        <button> {t('userProfileDelete')}</button>
                    </div>
                    <Form.Item>
                        <span>{t('name')} : </span>
                        <input value={name} onChange={(e) => setName(e.target.value)}/>
                    </Form.Item>
                    <Form.Item>
                        <span>{t('gender')}: </span>
                        <input value={gender}/>
                    </Form.Item>
                    <Form.Item>
                        <span>{t('dateOfBirth')}: </span>
                        <input value={dateOfBirth} onChange={(e) => setDateOfBirth(e.target.value)}/>
                    </Form.Item>
                    <Form.Item>
                        <span>{t('phone')} </span>
                        <input value={phone} onChange={(e) => setPhone(e.target.value)}/>
                    </Form.Item>
                    <Link>
                        <Button type="primary" onClick={onSendNewInfoAboutUser}>{t('save')}</Button>
                    </Link>
                </div>
            </div>)
            }
        </ThemeContextConsumer>
    )
};

export default UserProfile;