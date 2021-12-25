import React, {useEffect, useState} from "react";
import {EMPTY_STRING} from "../../constants/api/common";
import {ThemeContextConsumer} from "../../context/ThemeContext";
import {Button} from "antd";
import {useDispatch, useSelector} from "react-redux";
import {createPostToProxy, getPostsByUserIdFromProxy, updateUserToProxy} from "../../api/dumMyApi";
import './PostAdder.scss'
import {CloseCircleOutlined} from "@ant-design/icons";
import postAdderReducer from "../../reducers/postAdderReducer";
import {HIDE_POST_ADDER, SHOW_POST_ADDER} from "../../constants/actions/actions_const";


const PostAdder = ({Userid})=>{

    const [text, setText] = useState(EMPTY_STRING);
    const [img, setImg] = useState(EMPTY_STRING);
    const dispatch = useDispatch();
    const state_pAR = useSelector((state => state.postAdderReducer));


    const onSendPost =()=>{
        dispatch(createPostToProxy(Userid, text, img));
        dispatch({type: SHOW_POST_ADDER, payload: false});
        dispatch(getPostsByUserIdFromProxy(Userid, 0, 5));
    }

    useEffect(() => {
        console.log("хук обновления содержимого");
        console.log(state_pAR.showPostAdder);
    }, [state_pAR]);


    const onHide = ()=>{
        dispatch({type: SHOW_POST_ADDER, payload: false});
    }

    return(
        <ThemeContextConsumer>{
            (context) => (
                <div className={state_pAR.showPostAdder ? "modal active" : "modal"}>
                    <div className='modal__open-post'>
                    <Button shape='circle' icon={<CloseCircleOutlined/>} onClick={onHide}></Button>

                    текст поста
                    <input onChange={(e) => setText(e.target.value)}/>
                    ссылка на изображение
                    <input onChange={(e) => setImg(e.target.value)}/>
                    <Button type='primary' onClick={onSendPost}>Отправить</Button>
                    </div>
                </div>
            )
        }</ThemeContextConsumer>
    )
}

export default PostAdder;