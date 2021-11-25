/* eslint-disable */
import React, {useEffect, useState} from 'react';
import './User.css'


const User = ({avatarImg,userName,lastName,className,title}) => {

    return (
        <div className="user-form">
            {/*{loading ? 'Идёт загрузка' :*/}
            <div>
                <img src={avatarImg}/>
                <div>
                    {title} {userName} {lastName}
                </div>
            </div>
        </div>
    );
};

export default User;




