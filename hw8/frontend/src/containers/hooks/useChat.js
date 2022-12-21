import React, { useState, useEffect, createContext , useContext, useCallback } from "react";
import { message } from 'antd';
import { useLazyQuery, useMutation } from '@apollo/client';
import { 
    CHATBOX_QUERY, 
    CREATE_CHATBOX_MUTATION, CREATE_MESSAGE_MUTATION,
    MESSAGE_SUBSCRIPTION } from "../../graphql";

const LOCALSTORAGE_KEY = "save-me";
const savedMe = localStorage.getItem(LOCALSTORAGE_KEY);
// status, me, signedIn, messages, friend, setMe, setFriend, setSignedIn,
//             sendMessage, clearMessages, displayStatus, 
       
const ChatContext = createContext({
    status: {},
    me: "",
    signedIn: false,
    messages: [],
    activeKey: "",
    startChat: () => {},
    sendMessage: () => {},
    clearMessages: () => {},
    displayStatus: ()=>{},
});
// const client = new WebSocket ('ws://localhost:4000')
// client.onopen = () => console.log('Backend socket server connected!');

const ChatProvider = (props) => {
    const [status, setStatus] = useState({});
    const [me, setMe] = useState(savedMe || "");
    const [signedIn, setSignedIn] = useState(false);
    const [To,setFriend] = useState('');
    const [messages, setMessages] = useState([]);
    const makeName =  (name, to) => { return [name, to].sort().join('_'); };
    
    const [getbox, {loading, error, data: chatbox, subscribeToMore }]= useLazyQuery(CHATBOX_QUERY)
        // ,{ variables: {
        //     name1: me,
        //     name2: To,
        // }});

    const [chat] = useMutation(CREATE_CHATBOX_MUTATION);
    const [mes] = useMutation(CREATE_MESSAGE_MUTATION);
    
    

    const startChat = async(name, to) =>{
        //await getbox({ variables:{name1: name, name2: to}})
        const d = await getbox({ variables:{name1: name, name2: to}})
        await chat({
            variables: {
                name1: name, 
                name2: to,
            },
        });
        //console.log(chatBox.createChatBox.messages)
        setMessages( d.data.chatBox.messages)
        console.log(d.data.chatBox.messages)
        //messages = d.data.chatBox.messages
        setStatus({
            type: "success", 
            msg: "Chat start"});

        // console.log(data)
        //setMessages(data.chatBox.messages)
    }
        
    const sendMessage = async(name, to, body) =>{
        console.log(name,to,body)
        const newmes = await mes({
            variables: {
                from: name, 
                to: to,
                body: body
            },
        });
        
        
        //const d = await getbox({ variables:{name1: name, name2: to}})

        //console.log(d.data.chatBox.messages)
        //console.log(chatbox.createChatBox.messages)
        setMessages([...messages,newmes.data.createMessage])
        // console.log(loads)
        // refetch()
        
        setStatus({
            type: "success", 
            msg: "Message send"});
    
        // console.log(data)
    }
    
   
    const clearMessages = () => {
        //sendData(["clear"]);
    };

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

    // useEffect()
    
    // useEffect(() => {
    //     console.log('data')
    //     //console.log( loading, error, data, subscribeToMore)
    //     if(!data){
    //         console.log(data)
    //     } 
    // }, [friend])
    // useEffect(()=>{
    //     refetch({friend})
    //     console.log('refetech')
    // },[refetch])
    
    useEffect(() => {
        if (signedIn) {
            localStorage.setItem(LOCALSTORAGE_KEY, me);
        }
    
    }, [me, signedIn]);     
    
   
    useEffect(() =>{ 
        console.log('h')
        try {
            subscribeToMore({
                document: MESSAGE_SUBSCRIPTION,
                variables: { from: me, to: To},
                updateQuery: (prev, { subscriptionData }) => {
                    
                    if (!subscriptionData.data) return prev;
                    const newMessage = subscriptionData.data.message;
                    setMessages([...prev.chatBox.messages, newMessage])
                    return {
                        chatBox: {
                            __typename: prev.chatBox.__typename,
                            name: prev.chatBox.name,
                            messages: [...prev.chatBox.messages, newMessage],
                        },
                    };
                },
            })
        }catch (e) {}
            
    }, [subscribeToMore]);
    
    // if (loading) {
    //     console.log('loading')
    //     return 
    // }
    // if(!messages){
    //     console.log(';t')
    // }
    // console.log('t', To, messages)
    // //console.log(chatBox.chatBox.messages)
    // //const messages = chatBox.chatBox.messages
    //console.log(messages)
    return (
        <ChatContext.Provider
        value={{
            status, me, signedIn, messages, 
            setMe,  setSignedIn, setStatus, setFriend,
             clearMessages, displayStatus, startChat, sendMessage
        }}
        {...props}
        />
        );
};
const useChat = () => useContext(ChatContext);
export { ChatProvider, useChat };