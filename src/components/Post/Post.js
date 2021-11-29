import React, {useState} from 'react';
import "./Post.css"
import {EMPTY_STRING} from "../../constants/api/common";
import {useDispatch} from "react-redux";
import {getCommentsByPostID} from "../../api/dumMyApi";
import {Link} from "react-router-dom";
import OpenPost from "../../forms/OpenPost/OpenPost";
import {SHOW_POST_WITH_COMMENTS} from "../../constants/actions/actions_const";


const Post = ({name, lastName, text, imgUrl, datePost, avatarUrl, title, postId}) => {
    const dispatch = useDispatch();
    const onHandleClickByPost = () => {
        dispatch(getCommentsByPostID(postId, 0, 5));
        //setOpenPost(!openPostActive);
        dispatch({type: SHOW_POST_WITH_COMMENTS, payload: true})
        console.log("вывод открытия поста ", postId)
    }

    return (
        <div className="post" onClick={() => {onHandleClickByPost()}}>

            <div className="post__container">
                <div className="post__container_heading">
                    <img className="post__photo" src={avatarUrl}/>
                    <div className="post__user-name">{title} {name} {lastName}</div>
                    <div className="post__date">{datePost}</div>
                </div>
                {/*<div className="post__image">*/}
                <img className="post__image" src={imgUrl}/>
                {/*</div>*/}
                <div className="post__text">
                    {text}
                </div>
            </div>
            <OpenPost
                //active={openPostArrActive[index]}
                //setActive={setPostArrActive}
                title={title}
                firstName={name}
                lastName={lastName}
                dataPost={datePost}
                imgUrl={imgUrl}
                textPost={text}
            />
        </div>
    );
};
export default Post;