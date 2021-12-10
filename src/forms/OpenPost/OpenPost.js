import React, {useEffect, useState} from "react"
import "./OpenPost.css"
import {useDispatch, useSelector} from "react-redux";
import {HIDE_POST_WITH_COMMENTS} from "../../constants/actions/actions_const";
import commentReducer from "../../reducers/commentReducer";
import Post from "../../components/Post/Post";
import {Button} from "antd";
import {CloseCircleOutlined} from "@ant-design/icons";
import {ThemeContextConsumer} from "../../context/ThemeContext";


const OpenPost = ({title, firstName, lastName, dataPost, imgUrl, textPost}) => {

    const [openPostActive, setOpenPost] = useState(false);
    const statePR = useSelector((state => state.openPostReducer));
    const dispatch = useDispatch();
    const stateCR = useSelector(state => state.commentReducer);

    useEffect(() => {
        console.log(stateCR);
        console.log(statePR.showPostComments);
        console.log("хук обновления содержимого");
    }, [stateCR]);


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
                                    {`${title}  ${firstName} ${lastName} ${dataPost}`}
                                </div>

                                <img className="modal__img" src={imgUrl}/>

                                <div className="modal__text">
                                    {textPost}
                                </div>

                                {stateCR.listComments.length != 0
                                    ? stateCR.listComments.map((elem, index) => (
                                        <div className="modal__comments">
                                            {elem.message}
                                            {elem.publishDate}
                                            {elem.owner.title}
                                            {elem.owner.firstName}
                                            {elem.owner.lastName}
                                            <img className="modal__comments_photo" src={elem.owner.picture}/>
                                        </div>
                                    )) : "Пока никто не оставил комментариев..."}
                            </div>
                        </div>
                    </div>)
            }
        </ThemeContextConsumer>
    )
}

export default OpenPost