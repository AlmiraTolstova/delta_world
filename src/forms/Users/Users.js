import React, {useEffect, useState} from 'react';
import './Users.scss'
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

import {Pagination} from "antd";

const Users = () => {
    const [users, setUsers] = useState([]);
    const [loading, setLoading] = useState(EMPTY_STRING);
    const [error, setError] = useState(EMPTY_STRING);
    const state = useSelector(state=>state.usersReducer);

    console.log(state)
    const dispatch = useDispatch();

    const [newCurrentPage, setNewCurrentPage] = useState(1);

    useEffect(() => {
        dispatch(getUsersListFromProxy(newCurrentPage - 1, 10));
        console.log("обновление страницы поехали")

    }, [newCurrentPage])

    const onChangePainator = (currentPage, sizeBatch) => {
        //console.log(`current: ${currentPage},size:${sizeBatch}`)
        setNewCurrentPage(currentPage);
    }

    return (
        <div className="users">
            <div className="users-form">
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
            </div>
            <Pagination className="users-pagination"
                        total={50}
                        pageSize={5}
                        current={newCurrentPage}
                        onChange={onChangePainator}
            />
        </div>
    )
};

export default Users;

