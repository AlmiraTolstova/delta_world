import  React, { useEffect, useState } from 'react';
import Post from "../../components/Post/Post";
import { EMPTY_STRING } from '../../constants/api/common';
import {getPostsList} from "../../api/dumMyApi";


const Posts=()=>{
    const [posts, setPosts] = useState(EMPTY_STRING);

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
        <div>
            {posts.length !=0
            ? posts.map((elem, index) => (
                    <Post
                        key={index}
                        name={elem.owner.firstName}
                        lastName={elem.owner.lastName}
                        text={elem.text}
                        userId={elem.owner.id}
                        imgUrl={elem.image}
                        datePost={elem.publishDate}
                        avatarUrl={elem.owner.picture}
                        title={elem.owner.title}
                    />
                )):"Произошла ошибка при загрузке постов"}
        </div>
    )
}

export default Posts;