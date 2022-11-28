import { useState, useEffect, useRef, createContext , useContext } from "react";
import { Button, Input, message, Tag } from 'antd';

const LOCALSTORAGE_KEY = "save-me";
const savedMe = localStorage.getItem(LOCALSTORAGE_KEY);

const ChatContext = createContext({
    status: {},
    me: "",
    signedIn: false,
    messages: [],
    startChat: () => {},
    sendMessage: () => {},
    clearMessages: () => {},
    displayStatus: ()=>{},
});
const client = new WebSocket ('ws://localhost:4000')
client.onopen = () => console.log('Backend socket server connected!');

const ChatProvider = (props) => {
    const [status, setStatus] = useState({});
    const [me, setMe] = useState(savedMe || "");
    const [signedIn, setSignedIn] = useState(false);
    const [messages, setMessages] = useState([]);

    const makeName =  (name, to) => { return [name, to].sort().join('_'); };
    const sendData = async (data) => {
        await client.send(
            JSON.stringify(data));
    };
    // const sendMessage = (payload) => {
    //     setMessages([...messages, payload]); 
    //     setStatus({
    //         type: "success", 
    //         msg: "Message send"});
    //     console.log(payload);
    //     sendData(["input", payload]);
    // }
    const clearMessages = () => {
        sendData(["clear"]);
    };

    const startChat = (name, to) =>{
        if (!name || !to) throw new Error("Name or to required.")
        setStatus({
            type: "success", 
            msg: "Chat start"});
        sendData({
            type: 'Chat',
            payload: {name, to},
        });
    }
    const sendMessage = (name, to, txt) =>{
        
        if(!name || !to || !txt) 
            throw new Error("Name or to or body required.")
         
        setStatus({
            type: "success", 
            msg: "Message send"});
        sendData({
            type: 'Message',
            payload: {name, to, txt}
        })
        //setMessages([...messages, {name, to, txt}]);
        
    }
    client.onmessage = (byteString) => {
        const { data } = byteString;
        const [type, payload] = JSON.parse(data);
        
        switch (type) {
            case "Chat": {
                setMessages(payload); 
                break; }
            case "Message": {
                setMessages(() =>
                [...messages, ...payload]); 
                break; }

            case "Output":{
                setMessages(payload.messages);
                //console.log(payload.messages.sender, payload.messages)
                break; 
            }
            // case "status": {
            //     setStatus(payload); break; }
            // case "init": {
            //     setMessages(payload);
            //     break;}
            // case "cleared": {
            //     setMessages([]);
            //     break;}
            
            default: break;
        }
    }
    const displayStatus = (s) => {
        if (s) {
          const { type, msg } = s;
          const content = {
          content: msg, duration: 0.5 }
          switch (type) {
            case 'success':
              message.success(content)
              break
            case 'error':
              console.log('eroor')
              message.error(content)
              break;
            default:
                
              break
    }}}

    useEffect(() => {
        if (signedIn) {
            localStorage.setItem(LOCALSTORAGE_KEY, me);
        }
        }, [me, signedIn]);
        
    
    return (
        <ChatContext.Provider
        value={{
            status, me, signedIn, messages, setMe, setSignedIn,
            sendMessage, clearMessages, displayStatus, startChat
        }}
        {...props}
        />
        );
};
const useChat = () => useContext(ChatContext);
export { ChatProvider, useChat };