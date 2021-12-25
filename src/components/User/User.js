import React, {useEffect, useState} from 'react';
import './User.scss'
import {
    getPostsByUserId,
    getPostsByUserIdFromProxy,
    getUsersFullInfoByID,
    getUsersFullInfoByIDFromProxy
} from "../../api/dumMyApi";
import {useDispatch} from "react-redux";
import {Link} from "react-router-dom";
import {Tooltip} from 'antd';
import {ThemeContextConsumer} from "../../context/ThemeContext";

const User = ({avatarImg, userName, lastName, className, title, id}) => {
    const dispatch = useDispatch();
    const onHandleClickByUser = () => {
        console.log(id);
        dispatch(getUsersFullInfoByIDFromProxy(id));
        dispatch(getPostsByUserIdFromProxy(id, 0, 5));
    }

    return (
        <ThemeContextConsumer>
            {
                (context) => (
                    <div className={`user ${context.darkTheme && 'user_dark'}`}>
                        <div className="user__container">
                            <Link to="/personalarea">
                                <img className="user__img" src={avatarImg} onClick={onHandleClickByUser}/>
                            </Link>
                            <div>
                                <Tooltip title={`id: ${id}`}>
                                    <span className="user__name">{title} {userName} {lastName}</span>
                                </Tooltip>,
                            </div>
                        </div>
                    </div>)
            }
        </ThemeContextConsumer>
    );
};

export default User;




