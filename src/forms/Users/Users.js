
import React, {useEffect, useState} from 'react';
import './Users.css'
import ReactDOM from 'react-dom';
import 'antd/dist/antd.css';
import {Row, Col, Slider} from 'antd';
import User from "../../components/User/User";
import {EMPTY_STRING} from "../../constants/api/common";
import {getUsersList} from "../../api/dumMyApi";
import Post from "../../components/Post/Post";
import Posts from "../Posts/Posts";
import {connect, useDispatch, useSelector} from 'react-redux';
import {bindActionCreators, Dispatch} from "redux";
import {loadUsers, loginIn} from "../../actions/actions";

const Users = () => {
    const [users, setUsers] = useState([]);
    const [loading, setLoading] = useState(EMPTY_STRING);
    const [error, setError] = useState(EMPTY_STRING);
    const state = useSelector(state=>state.usersReducer);
    // const error = state.us;
    // const loading = state.user

    console.log(state)
    const dispatch = useDispatch();

    // useEffect(() => {
    //
    //     (getUsersList(
    //         0,
    //        9,
    //         (resp) => {
    //             setUsers(resp);
    //             //console.log("вызов loadAllUser");
    //             //loadAllUsers(resp);
    //
    //         },
    //         () => {
    //         },
    //     ));
    // },[]);
    useEffect(()=>{
        dispatch(getUsersList(0,9));

    }, [])



    return (
        <Row>
            {state.usersList.length != 0
                ? state.usersList.map((elem, index) => (
                    <User
                        key={index}
                        avatarImg={elem.picture}
                        userName={elem.firstName}
                        lastName={elem.lastName}
                        title={elem.title}
                    />
                )) : "Произошла ошибка при загрузке списска пользователей"}

            }
            {/*<Col xs={{span: 5, offset: 1}} lg={{span: 6, offset: 2}}>*/}
            {/*    Col*/}
            {/*</Col>*/}
            {/*<Col xs={{span: 5, offset: 1}} lg={{span: 6, offset: 2}}>*/}
            {/*    Col*/}
            {/*</Col>*/}
            {/*<Col xs={{span: 5, offset: 1}} lg={{span: 6, offset: 2}}>*/}
            {/*    Col{User}*/}
            {/*</Col>*/}
        </Row>
    )
};

export default Users;


// export default connect(
//     (state)=>({
//         users:state.usersList
//     }),
//     (dispatch)=>({
//         loadAllUsers:bindActionCreators(loadUsers, dispatch)
//     })
// )(Users)