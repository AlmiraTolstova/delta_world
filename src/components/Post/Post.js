import React, {useState} from 'react';
import "./Post.css"
import {EMPTY_STRING} from "../../constants/api/common";
import {useDispatch} from "react-redux";
import {getCommentsByPostID} from "../../api/dumMyApi";
import {Link} from "react-router-dom";
import OpenPost from "../../forms/OpenPost/OpenPost";
import {SHOW_POST_WITH_COMMENTS} from "../../constants/actions/actions_const";
import {Tooltip} from "antd";


const Post = ({name, lastName, text, imgUrl, datePost, avatarUrl, title, postId,userId}) => {


    return (

        <div className="post" >
            <div className="post__container">
                <div className="post__container_heading">
                    <img className="post__photo" src={avatarUrl}/>
                    <div className="post__user-name">
                        <Tooltip title={`id: ${userId}`}>
                            <span>{title} {name} {lastName}</span>
                        </Tooltip>
                    </div>
                    <div className="post__date">{datePost}</div>
                </div>
                {/*<div className="post__image">*/}
                <img className="post__image" src={imgUrl}/>
                {/*</div>*/}
                <div className="post__text">
                    {text}
                </div>
            </div>
        </div>

    );
};
export default Post;