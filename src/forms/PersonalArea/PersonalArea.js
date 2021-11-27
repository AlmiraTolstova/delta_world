import {useDispatch, useSelector} from "react-redux";
import loginReducer from "../../reducers/loginReducer";
import User from "../../components/User/User";
import {useEffect} from "react";
import {getPostsByUserId, getUsersFullInfoByID} from "../../api/dumMyApi";
import personalAreaReducer from "../../reducers/personalAreaReducer";
import Post from "../../components/Post/Post";
import {Button} from "antd";
import {Link} from "react-router-dom";


const PersonalArea =()=>
{
    //const stateLR = useSelector(state=>state.loginReducer);
    const statePAR = useSelector((state=>state.personalAreaReducer));
    const statePUR = useSelector((state=>state.postsByUserReducer));
    const stateLR = useSelector((state=>state.loginReducer));
    //const dispatch = useDispatch();
    console.log(statePAR);
    console.log(statePUR);
    // useEffect(()=>{
    //
    //     console.log(statePAR);
    // },[])

    return(
        <div className="personal-area">
            <div>
                <Link to="/userprofile">
                    <Button disabled={(stateLR.userId==statePAR.id)?false:true}>
                        Редактировать
                    </Button>
                </Link>
                    <img src={statePAR.picture}/>
                    {statePAR.title} {statePAR.firstName} {statePAR.lastName}
                    Пол: {statePAR.gender=='male'?"Мужской":"Женский"}
                    Дата регистрации: {statePAR.registerDate}
                    Email: {statePAR.email}
                    Телефон: {statePAR.phone}
                    ID: {statePAR.id}
            </div>
            <div>
                {(statePUR.postsList.length !=0)
                    ? statePUR.postsList.map((elem, index)=>(
                    <Post
                        text={elem.text}
                        imgUrl={elem.image}
                    >

                    </Post>
                )) : "Загрузка"
                }
            </div>

        </div>
    )
}

export default PersonalArea;
