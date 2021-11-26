
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
import { connect } from 'react-redux';
import {bindActionCreators, Dispatch} from "redux";
import {loadUsers} from "../../actions/actions";

const Users = () => {
    const [users, setUsers] = useState(EMPTY_STRING);

    useEffect(() => {
        getUsersList(
            0,
           9,
            (resp) => {
                setUsers(resp);
            },
            () => {
            },
        );
    },[]);

    return (
        <Row>
            {users.length != 0
                ? users.map((elem, index) => (
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

// const mapStateToProps = (state)=>{
//     return{
//         users: state.users
//     };
// }

// export default Users;


export default connect(
    (state)=>({
        users:state.users
    }),
    (Dispatch)=>({
        load:bindActionCreators(loadUsers, Dispatch)
    })
)(Users)