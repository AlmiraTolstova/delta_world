import  React, { useEffect, useState } from 'react';
import Post from "../../components/Post/Post";
import { EMPTY_STRING } from '../../constants/api/common';
import {getCommentsByPostID, getPostsList} from "../../api/dumMyApi";
import "./Posts.css"
import {Row} from "antd";
import OpenPost from "../OpenPost/OpenPost";
import {useDispatch, useSelector} from "react-redux";
import openPostReducer from "../../reducers/openPostReducer";
import {SHOW_POST_WITH_COMMENTS} from "../../constants/actions/actions_const";


const Posts=()=>{
    const [posts, setPosts] = useState(EMPTY_STRING);
    const [openPostActive,setOpenPost]=useState(false);

    const [postID, setPostID]=useState(EMPTY_STRING);
    const [openPostArrActive, setPostArrActive]=useState([]);



    const loadPosts = (page, limit) => {
        getPostsList(
            page,
            limit,
            (resp) => {
                setPosts(resp);
            },
            () => {},
        );
    };



    useEffect(()=>{
        loadPosts(0,6);
    },[])

    return(
        // <Post name={"Вася"}
        // avatarUrl={"https://randomuser.me/api/portraits/women/58.jpg"}
        // text={"бла бла бла"}
        // imgUrl={"https://img.dummyapi.io/photo-1564694202779-bc908c327862.jpg"}
        // datePost={"01.01.2020"}
        // />
        <Row className="posts-form">
            {posts.length !=0
            ? posts.map((elem, index) => (
                <div >
                    <Post
                        key={index}
                        name={elem.owner.firstName}
                        lastName={elem.owner.lastName}
                        text={elem.text}
                        imgUrl={elem.image}
                        datePost={elem.publishDate}
                        avatarUrl={elem.owner.picture}
                        title={elem.owner.title}
                        postId={elem.id}
                    />

                </div>
                )):"Произошла ошибка при загрузке постов"}
        </Row>
    )
}

export default Posts;