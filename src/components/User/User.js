/* eslint-disable */
import React, {useEffect, useState} from 'react';
import './User.css'
import {getPostsByUserId, getUsersFullInfoByID} from "../../api/dumMyApi";
import {useDispatch} from "react-redux";
import {Link} from "react-router-dom";


const User = ({avatarImg,userName,lastName,className,title, id}) => {
    const dispatch = useDispatch();
    const onHandleClickByUser=()=>{
        console.log(id);
        dispatch(getUsersFullInfoByID(id));
        dispatch(getPostsByUserId(id, 0, 5));
    }


    return (
        <div className="user-form">
            {/*{loading ? 'Идёт загрузка' :*/}
            <div>
                <Link to="/personalarea">
                    <img src={avatarImg} onClick={onHandleClickByUser}/>
                </Link>
                <div>
                    {title} {userName} {lastName}
                </div>
            </div>
        </div>
    );
};

export default User;




