import {useDispatch, useSelector} from "react-redux";
// import loginReducer from "../../reducers/loginReducer";
// import User from "../../components/User/User";
// import {useEffect} from "react";
// import {getPostsByUserId, getUsersFullInfoByID} from "../../api/dumMyApi";
// import personalAreaReducer from "../../reducers/personalAreaReducer";
import Post from "../../components/Post/Post";
import {Button} from "antd";
import {Link} from "react-router-dom";
import './PersonalArea.css'
import {ThemeContextConsumer} from "../../context/ThemeContext";

const PersonalArea = () => {
    const statePAR = useSelector((state => state.personalAreaReducer));
    const statePUR = useSelector((state => state.postsByUserReducer));
    const stateLR = useSelector((state => state.loginReducer));
    //const dispatch = useDispatch();
    console.log(statePAR);
    console.log(statePUR);

    return (
        <ThemeContextConsumer>{
            (context) =>(
            <div className="personal-area">
                <div className={`personal-area__user ${context.darkTheme && 'personal-area__user_dark'}`}>
                    <img className="personal-area__photo" src={statePAR.picture}/>
                    <div>
                        <h2>{statePAR.title} {statePAR.firstName} {statePAR.lastName}</h2>
                        <p>Пол: {statePAR.gender == 'male' ? "Мужской" : "Женский"}</p>
                        <p>Дата регистрации: {statePAR.registerDate}</p>
                        <p>Email: {statePAR.email}</p>
                        <p>Телефон: {statePAR.phone}</p>
                        <p>ID: {statePAR.id}</p>
                    </div>
                    <Link to="/userprofile">
                        <Button disabled={(stateLR.userId == statePAR.id) ? false : true}>
                            Редактировать
                        </Button>
                    </Link>
                </div>
                <div className={`personal-area__posts ${context.darkTheme && 'personal-area__posts_dark'}`}>
                    {(statePUR.postsList.length != 0)
                        ? statePUR.postsList.map((elem, index) => (
                            <div className="personal-area__post">
                                <Post
                                    text={elem.text}
                                    imgUrl={elem.image}
                                >
                                </Post>
                            </div>
                        )) : "Загрузка"
                    }
                </div>
            </div>)
        }
        </ThemeContextConsumer>
    )
}

export default PersonalArea;
