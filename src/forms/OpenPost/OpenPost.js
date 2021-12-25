import React, {useEffect, useState} from "react"
import "./OpenPost.scss"
import {useDispatch, useSelector} from "react-redux";
import {HIDE_POST_WITH_COMMENTS} from "../../constants/actions/actions_const";
import commentReducer from "../../reducers/commentReducer";
import Post from "../../components/Post/Post";
import {Button} from "antd";
import {CloseCircleOutlined} from "@ant-design/icons";
import {ThemeContextConsumer} from "../../context/ThemeContext";
import dateFormat from "dateformat";
import {EMPTY_STRING} from "../../constants/api/common";
import {createCommentToProxy} from "../../api/dumMyApi";


const OpenPost = ({title, firstName, lastName, dataPost, imgUrl, textPost, postId}) => {

    const [openPostActive, setOpenPost] = useState(false);
    const statePR = useSelector((state => state.openPostReducer));
    const dispatch = useDispatch();
    const stateCR = useSelector(state => state.commentReducer);
    const [textComment, setTextComment] = useState(EMPTY_STRING);
    const stateLR = useSelector(state => state.loginReducer);

    useEffect(() => {
        console.log(stateCR);
        console.log(statePR.showPostComments);
        console.log("хук обновления содержимого");
    }, [stateCR]);

    const onSendComment = ()=>{
        dispatch(createCommentToProxy(stateLR.userId, textComment, postId));
        setTextComment('');
    }
    const deletePost=()=>{
        console.log('deletePost work')
    }

    return (
        <ThemeContextConsumer>
            {
                (context) => (
                    <div className={statePR.showPostComments ? "modal active" : "modal"}
                         onClick={(e) => e.stopPropagation()}>
                        <div className={`modal__open-post ${context.darkTheme && 'modal__open-post_dark'}`}>

                            <div className="modal__btn">
                                <Button shape="circle" icon={<CloseCircleOutlined/>} onClick={() => {
                                    dispatch({type: HIDE_POST_WITH_COMMENTS, payload: false});
                                    console.log("показывать окно? ", statePR.showPostComments)
                                }}>
                                </Button>
                            </div>
                            <div className="modal__container">
                                <div className="modal__title">
                                    {`${title ? title : ''}  ${firstName} ${lastName} ${dataPost}`}
                                </div>

                                <img className="modal__img" src={imgUrl}/>

                                <div className="modal__text">
                                    {textPost}
                                </div>
                                <Button onClick={deletePost}>Удалить пост</Button>

                                {stateCR.listComments.length != 0
                                    ? stateCR.listComments.map((elem, index) => (
                                        <div className="modal__comments">
                                            {elem.message}
                                            {dateFormat(elem.publishDate, "yyyy-mm-dd h:MM:ss")}
                                            {elem.owner.title}
                                            {elem.owner.firstName}
                                            {elem.owner.lastName}
                                            <img className="modal__comments_photo" src={elem.owner.picture}/>
                                        </div>
                                    )) : "Пока никто не оставил комментариев..."}
                                <input value={textComment} onChange={(e) => setTextComment(e.target.value)}/>
                                <Button type='primary' onClick={onSendComment} disabled={stateLR.userId ? false:true}>Отправить</Button>
                            </div>
                        </div>
                    </div>)
            }
        </ThemeContextConsumer>
    )
}

export default OpenPost