/* eslint-disable */
import React, {useEffect, useState} from 'react';
import './Users.css'
import ReactDOM from 'react-dom';
import 'antd/dist/antd.css';
import {Row, Col, Slider} from 'antd';
import User from "./User";

export class UsersForm extends React.Component {
    render() {
        return (
            <Row>
                <Col xs={{span: 5, offset: 1}} lg={{span: 6, offset: 2}}>
                    Col
                </Col>
                <Col xs={{span: 5, offset: 1}} lg={{span: 6, offset: 2}}>
                    Col
                </Col>
                <Col xs={{span: 5, offset: 1}} lg={{span: 6, offset: 2}}>
                    Col{User}
                </Col>
            </Row>
    )
    }
}