import React from 'react';
import './Post.css'


const Post =({name, text, className, userId, imgUrl, datePost,avatarUrl}) =>
{
    return (
        <div className={`post ${className}`}>
            <div className="post__avatar">
                <img src={avatarUrl}/>
            </div>
            <div className="post__user-name">{name}</div>
            <div className="post__date">{datePost}</div>
            <div className="post__image">
                <img src={imgUrl}/>
            </div>
            <div className="post__text">
                {text}
            </div>
        </div>
    );
};