import {useDispatch, useSelector} from "react-redux";
import Post from "../../components/Post/Post";
import {Button} from "antd";
import {Link} from "react-router-dom";
import './PersonalArea.scss'
import {ThemeContextConsumer} from "../../context/ThemeContext";
import {useTranslation} from "react-i18next";
import {useEffect, useState} from "react";
import {getUsersList} from "../../api/dumMyApi";

const PersonalArea = () => {
    const statePAR = useSelector((state => state.personalAreaReducer));
    const statePUR = useSelector((state => state.postsByUserReducer));
    const stateLR = useSelector((state => state.loginReducer));
    console.log(statePAR);
    console.log(statePUR);
    const{t}=useTranslation();


    return (
        <ThemeContextConsumer>{
            (context) =>(
            <div className="personal-area">
                <div className={`personal-area__user ${context.darkTheme && 'personal-area__user_dark'}`}>
                    <img className="personal-area__photo" src={statePAR.picture}/>
                    <div>
                        <h2>{statePAR.title} {statePAR.firstName} {statePAR.lastName}</h2>
                        <p>{t('gender')}: {statePAR.gender == 'male' ? t('masculine'): t('female')}</p>
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
