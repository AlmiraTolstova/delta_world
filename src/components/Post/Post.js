import React, {useState} from 'react';
import "./Post.css"
import {Tooltip} from "antd";
import {ThemeContextConsumer} from "../../context/ThemeContext";

const Post = ({name, lastName, text, imgUrl, datePost, avatarUrl, title, postId, userId}) => {

    return (
        <ThemeContextConsumer>
            {
                (context) => (
                    <div className={`post ${context.darkTheme && 'post_dark'}`}>
                        <div className={`post__container ${context.darkTheme && 'post__container_dark'}`}>
                            <div className="post__container_heading">
                                <img className="post__photo" src={avatarUrl}/>
                                <div className="post__user-name">
                                    <Tooltip title={`id: ${userId}`}>
                                        <span>{title} {name} {lastName}</span>
                                    </Tooltip>
                                </div>
                                <div className="post__date">{datePost}</div>
                            </div>
                            <img className="post__image" src={imgUrl}/>
                            <div className="post__text">
                                {text}
                            </div>
                        </div>
                    </div>
                )
            }
        </ThemeContextConsumer>
    );
};
export default Post;