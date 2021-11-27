import React, {useEffect, useState} from "react";
import {Form} from "antd";
import 'antd/dist/antd.css';
import {Link} from "react-router-dom";
import {EMPTY_STRING} from "../../constants/api/common";
import {useDispatch, useSelector} from "react-redux";
import {updateUser} from "../../api/dumMyApi";
import loginReducer from "../../reducers/loginReducer";




const UserProfile=()=>{
    const [img, setImg]=useState(EMPTY_STRING);
    const [name, setName] = useState(EMPTY_STRING);
    const [gender, setGender] = useState(EMPTY_STRING);
    const [dateOfBirth, setDateOfBirth] = useState(EMPTY_STRING)
    const [phone, setPhone] = useState(EMPTY_STRING);
    const [firstName, setFirstName] = useState(EMPTY_STRING);
    const [SecondName, setSecondName] = useState(EMPTY_STRING);

    const statePAR = useSelector((state=>state.personalAreaReducer));
    
    const dispatch = useDispatch();

    useEffect(()=>{
        setImg(statePAR.picture);
        setName(statePAR.firstName+" "+statePAR.lastName);
        setGender(statePAR.gender=="male"?"Мужской":"Женский");
        setDateOfBirth(statePAR.dateOfBirth);
        setPhone(statePAR.phone);
    },[])

    const onSendNewInfoAboutUser=()=>{

        const namming = name;
        const namePos = namming.indexOf(' ');
        if(namePos>0){
            setFirstName(namming.slice(0, namePos));
            setSecondName(namming.slice(namePos, namming.length));
        }
        else
        {
            setFirstName(namming);
            setSecondName('notLastName');
        }
        console.log(statePAR.id, firstName, SecondName, dateOfBirth, phone)
        dispatch(updateUser(statePAR.id, firstName, SecondName, dateOfBirth, phone));
    }

    return(
        <Form>
            <img src={img}/>
            <button>Обновить фотографию</button>
            <button>Удалить фотографию</button>
            <Form.Item>
            <span>Имя: </span>
                <input value={name} onChange={(e)=>setName(e.target.value)}/>
            </Form.Item>
            <Form.Item>
                <span>Пол: </span>
                <input value={gender} />
            </Form.Item>
            <Form.Item>
                <span>Дата рождения: </span>
                <input value={dateOfBirth} onChange={(e)=>setDateOfBirth(e.target.value)}/>
            </Form.Item>
            <Form.Item>
                <span>Телефон </span>
                <input value={phone} onChange={(e)=>setPhone(e.target.value)}/>
            </Form.Item>
            <Link>
                <button onClick={onSendNewInfoAboutUser}>Сохранить</button>
            </Link>

        </Form>

    )
};

export default UserProfile;