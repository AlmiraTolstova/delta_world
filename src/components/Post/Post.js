import React from 'react';
import '../../forms/Posts/Post.css'



const Post =({name,lastName, text, className, userId, imgUrl, datePost,avatarUrl,title}) =>
{
    return (
        <div className={`post ${className}`}>
            <div className="post__avatar">
                <img src={avatarUrl}/>
            </div>
            <div className="post__user-name">{title} {name} {lastName}</div>
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
export default Post;