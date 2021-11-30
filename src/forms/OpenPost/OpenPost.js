import React, {useEffect, useState} from "react"
import "./OpenPost.css"
import {useDispatch, useSelector} from "react-redux";
import {HIDE_POST_WITH_COMMENTS} from "../../constants/actions/actions_const";
import commentReducer from "../../reducers/commentReducer";
import Post from "../../components/Post/Post";


const OpenPost =({title,firstName,lastName, dataPost,imgUrl, textPost})=>{

    const [openPostActive,setOpenPost]=useState(false);
    const statePR = useSelector((state=>state.openPostReducer));
    const dispatch = useDispatch();
    const stateCR = useSelector(state=>state.commentReducer);

    useEffect(()=>{
        console.log(stateCR);
        console.log(statePR.showPostComments);
        console.log("хук обновления содержимого");
    },[stateCR]);



   return(
       <div className={statePR.showPostComments ? "modal active":"modal"} onClick={(e)=>e.stopPropagation()}>
           <div className="modal__open-post" >
           <div>
               {`${title}  ${firstName} ${lastName} ${dataPost}`}
           </div>
           <div>
               <img className="modal__img" src={imgUrl}/>
           </div>
           <div>
               {textPost}
           </div>
               <div>
                   <button onClick={()=>{dispatch({type:HIDE_POST_WITH_COMMENTS, payload: false});
                       console.log("показывать окно? ",statePR.showPostComments)}}>
                       Закрыть окно
                   </button>
               </div>
               {stateCR.listComments.length !=0
                   ? stateCR.listComments.map((elem, index) => (
                       <div >
                           {elem.message}
                           {elem.publishDate}
                           {elem.owner.title}
                           {elem.owner.firstName}
                           {elem.owner.lastName}
                           <img src={elem.owner.picture}/>
                       </div>
                   )):"Пока никто не оставил комментариев..."}
           </div>
       </div>
   )
}

export  default OpenPost