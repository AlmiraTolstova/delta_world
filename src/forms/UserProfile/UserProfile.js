import React, {useEffect, useState} from "react";
import {Button, Form, Input} from "antd";
import 'antd/dist/antd.css';
import {Link} from "react-router-dom";
import {EMPTY_STRING} from "../../constants/api/common";
import {useDispatch, useSelector} from "react-redux";
import {updateUser, updateUserToProxy} from "../../api/dumMyApi";
import loginReducer from "../../reducers/loginReducer";
import "./UserProfilie.scss"
import {ThemeContextConsumer} from "../../context/ThemeContext";
import {useTranslation} from "react-i18next";
import onTestNewInfoAboutUser from "../../utils/utils";
import {UploadOutlined} from "@ant-design/icons";

const UserProfile = () => {
    const [img, setImg] = useState(EMPTY_STRING);
    const [name, setName] = useState(EMPTY_STRING);
    const [gender, setGender] = useState(EMPTY_STRING);
    const [dateOfBirth, setDateOfBirth] = useState(EMPTY_STRING)
    const [phone, setPhone] = useState(EMPTY_STRING);
    const [firstName, setFirstName] = useState(EMPTY_STRING);
    const [SecondName, setSecondName] = useState(EMPTY_STRING);
    const [file, setFile] = useState(EMPTY_STRING);

    const statePAR = useSelector((state => state.personalAreaReducer));

    const dispatch = useDispatch();

    useEffect(() => {
        setImg(statePAR.picture);
        //setName(statePAR.firstName + " " + statePAR.lastName);
        setGender(statePAR.gender == "male" ? "Мужской" : "Женский");
        setDateOfBirth(statePAR.dateOfBirth);
        setPhone(statePAR.phone);
        setFirstName(statePAR.firstName);
        setSecondName(statePAR.lastName);
        console.log(firstName, SecondName);
        console.log(img);
    }, [])

    const onSendNewInfoAboutUser = () => {
        console.log(statePAR.id, firstName, SecondName, dateOfBirth, phone, img)
        //dispatch(updateUser(statePAR.id, firstName, SecondName, dateOfBirth, phone));
        dispatch(updateUserToProxy(statePAR.id, firstName, SecondName, dateOfBirth, phone, img));
    }

    const onDownloadPicture = () => {
        setImg(file);
    }

    const onClearPicture = () => {
        setImg('');
    }


    const {t} = useTranslation();

    return (
        <ThemeContextConsumer>
            {
                (context) => (
                    <div className="user-profile">
                        <div
                            className={`user-profile__container ${context.darkTheme && 'user-profile__container_dark'}`}>
                            <img className="user-profile__img" src={img}/>
                            <div className="user-profile__bts">
                                <Button  type="file" onClick={onDownloadPicture}>{t('userProfileReplace')}</Button>
                                <Input className="user-profile__input" value={file} onChange={(e) => setFile(e.target.value)}/>
                                <Button onClick={onClearPicture}> {t('userProfileDelete')}</Button>
                            </div>
                            <Form.Item>
                                <span>{t('name')} : </span>
                                <Input value={firstName} onChange={(e) => setFirstName(e.target.value)}/>
                                <Input value={SecondName} onChange={(e) => setSecondName(e.target.value)}/>
                            </Form.Item>
                            <Form.Item>
                                <span>{t('gender')}: </span>
                                <Input value={gender}/>
                            </Form.Item>
                            <Form.Item>
                                <span>{t('dateOfBirth')}: </span>
                                <Input value={dateOfBirth} onChange={(e) => setDateOfBirth(e.target.value)}/>
                            </Form.Item>
                            <Form.Item>
                                <span>{t('phone')} </span>
                                <Input value={phone} onChange={(e) => setPhone(e.target.value)}/>
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