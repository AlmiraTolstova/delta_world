import React, {useEffect, useState} from 'react';
import './Users.css'
import ReactDOM from 'react-dom';
import 'antd/dist/antd.css';
import User from "../../components/User/User";
import {EMPTY_STRING} from "../../constants/api/common";
import {getUsersList, getUsersListFromProxy} from "../../api/dumMyApi";
import Post from "../../components/Post/Post";
import Posts from "../Posts/Posts";
import {connect, useDispatch, useSelector} from 'react-redux';
import {bindActionCreators, Dispatch} from "redux";
import {loadUsers, loginIn} from "../../actions/actions";
import "./Users.css"

const Users = () => {
    const [users, setUsers] = useState([]);
    const [loading, setLoading] = useState(EMPTY_STRING);
    const [error, setError] = useState(EMPTY_STRING);
    const state = useSelector(state=>state.usersReducer);

    console.log(state)
    const dispatch = useDispatch();

    useEffect(()=>{
        //dispatch(getUsersList(0,9));
        console.log("тут запрос пользователей от прокси")
        dispatch(getUsersListFromProxy(0,9));
    }, [])



    return (
        <div className="user-form">
            {state.usersList.length != 0
                ? state.usersList.map((elem, index) => (
                    <User
                        key={index}
                        avatarImg={elem.picture}
                        userName={elem.firstName}
                        lastName={elem.lastName}
                        title={elem.title}
                        id={elem.id}
                    />
                )) : "Загрузка..."}

            }

        </div>
    )
};

export default Users;

