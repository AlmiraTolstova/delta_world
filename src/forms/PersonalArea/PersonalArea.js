import {useDispatch, useSelector} from "react-redux";
import Post from "../../components/Post/Post";
import {Button} from "antd";
import {Link} from "react-router-dom";
import './PersonalArea.scss'
import {ThemeContextConsumer} from "../../context/ThemeContext";
import {useTranslation} from "react-i18next";
import React, {useEffect, useState} from "react";
import {getCommentsByPostIDFromProxy, getUsersFullInfoByIDFromProxy, getUsersList} from "../../api/dumMyApi";
import PostAdder from "../../components/PostAdder/PostAdder";
import {LOGIN_IN, SHOW_POST_ADDER, SHOW_POST_WITH_COMMENTS} from "../../constants/actions/actions_const";
import dateFormat from "dateformat";
import OpenPost from "../OpenPost/OpenPost";
import {EMPTY_STRING} from "../../constants/api/common";

const PersonalArea = () => {
    const dispatch = useDispatch();
    const stateLR = useSelector((state => state.loginReducer));
    const statePAR = useSelector((state => state.personalAreaReducer));
    const statePUR = useSelector((state => state.postsByUserReducer));
    console.log(stateLR);
    const {t} = useTranslation();

    const onHandleAddPost = () => {
        dispatch({type: SHOW_POST_ADDER, payload: true})
    }
    const [index, setIndex] = useState(0);
    const [postText, setPostText] = useState(EMPTY_STRING);
    const [postTitle, setPostTitle] = useState(EMPTY_STRING);
    const [firstName, setFirstName] = useState(EMPTY_STRING);
    const [lastName, setLastName] = useState(EMPTY_STRING);
    const [dataPost, setDataPost] = useState(EMPTY_STRING);
    const [imgUrl, setImgUrl] = useState(EMPTY_STRING);
    const [postID, setPostID] = useState(EMPTY_STRING);

    const onHandleClickByPost = (postId, index) => {
        setIndex(index);
        dispatch(getCommentsByPostIDFromProxy(postId, 0, 5));
        dispatch({type: SHOW_POST_WITH_COMMENTS, payload: true})
        console.log("вывод открытия поста ", postId)
        setPostText(statePUR.postsList[index].text);
        setPostTitle(statePUR.postsList[index].owner.title);
        setFirstName(statePUR.postsList[index].owner.firstName);
        setLastName(statePUR.postsList[index].owner.lastName);
        setDataPost(statePUR.postsList[index].publishDate)
        setImgUrl(statePUR.postsList[index].image);
        setPostID(postId)
    }

    return (
        <ThemeContextConsumer>{
            (context) => (
                <div className="personal-area">
                    <div className={`personal-area__user ${context.darkTheme && 'personal-area__user_dark'}`}>
                        <img className="personal-area__photo" src={statePAR.picture}/>
                        <div>
                            <h2>{statePAR.title} {statePAR.firstName} {statePAR.lastName}</h2>
                            <p>{t('gender')}: {statePAR.gender == 'male' ? t('masculine') : t('female')}</p>
                            <p>{t('registrationDate')}: {statePAR.registerDate}</p>
                            <p>Email: {statePAR.email}</p>
                            <p>{t('phone')}: {statePAR.phone}</p>
                            <p>ID: {statePAR.id}</p>
                        </div>
                        <Link to="/userprofile">
                            <Button disabled={(stateLR.userId == statePAR.id) ? false : true}>
                                {t('change')}
                            </Button>
                        </Link>
                    </div>
                    <Button className="personal-area__addBtn" type='primary' onClick={onHandleAddPost} disabled={stateLR.userId ? false : true}>Добавить
                        пост</Button>
                    <div className={`personal-area__posts ${context.darkTheme && 'personal-area__posts_dark'}`}>
                        {(statePUR.postsList.length != 0)
                            ? statePUR.postsList.map((elem, index) => (
                                <div className="personal-area__post" onClick={() => {
                                    onHandleClickByPost(elem.id, index)
                                }}>
                                    <Post
                                        avatarUrl={elem.owner.picture}
                                        text={elem.text}
                                        imgUrl={elem.image}
                                    >
                                    </Post>
                                </div>
                            )) : "Пока нет постов"
                        }

                        <PostAdder
                            Userid={stateLR.userId}>
                        </PostAdder>
                        <OpenPost
                            title={postTitle}
                            firstName={firstName}
                            lastName={lastName}
                            dataPost={dateFormat(dataPost, "yyyy-mm-dd h:MM:ss")}
                            imgUrl={imgUrl}
                            textPost={postText}
                            postId={postID}
                        />
                    </div>
                </div>)
        }
        </ThemeContextConsumer>
    )
}

export default PersonalArea;
