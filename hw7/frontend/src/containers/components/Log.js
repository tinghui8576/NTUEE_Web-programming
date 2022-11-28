import {Input} from "antd";
import {UserOutlined} from "@ant-design/icons";
import { useState, useEffect,  useRef } from 'react'
const LogIn = ({me, setMe, LogIn}) => {
    const LOCALSTORAGE_KEY = "save-me";
    const savedMe = localStorage.getItem(LOCALSTORAGE_KEY);
    
    return(
        <Input.Search
            size = 'large'
            style={{width: 300, margin: 50}}
            prefix = {<UserOutlined />}
            placeholder = "Enter your name"
            value = {me}
            onChange = {(e) => setMe(e.target.value)}
            enterButton ="Sign In"
            onSearch = {(name) => LogIn(name)}
        />
    );
}

export default LogIn;