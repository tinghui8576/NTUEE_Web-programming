import styled from 'styled-components';
import { useState, useEffect, useRef } from "react";
import { Button, Input, Tabs, Tag } from 'antd'
import {useChat} from "./hooks/useChat"
import Title from './components/Title'
import Message from './Message';
import ChatModal from './ChatModal'

const FootRef = styled.div`
    height: 20px;
`
const MessageWrap = styled(Tabs)`
    width: 100%;
    height: 300px;
    background: #eeeeee52;
    border-radius: 10px;
    margin: 20px;
    padding: 20px;
    overflow: auto;
`;

const Wrap = styled.div`
  display: flex;
  flex-direction: column;
  height: calc(240px - 36px);
  overflow:auto;
`

const ChatRoom =() =>{
    const {status, messages, me, sendMessage, displayStatus, startChat} = useChat();
    const [chatBoxes, setChatBoxes] = useState([]); //label, children, key
    const [txt, setMsg] = useState('');
    const [msgSent, setMsgSent] = useState(false);
    const [modalOpen, setModalOpen] = useState(false);
    const [activeKey, setActiveKey] = useState('');
    const msgRef = useRef(null)
    const footer = useRef<(null | HTMLDivElement)>([])
    const msgFooter = useRef([])
    const createChatBox = (friend) => {
        if (chatBoxes.some(({key}) => key === friend)) {
            throw new Error(friend +"'s chat box has already opened.");
        }
        
        const chat = displayMessages(messages)
        //console.log("chat", chat)
        setChatBoxes([...chatBoxes,
            { label: friend, children: chat,
            key: friend }]);
        setMsgSent(true);
        
        return friend;
    };
    const removeChatBox =
        (targetKey, activeKey) => {
        const index = chatBoxes.findIndex(({key}) => key === activeKey);
        const newChatBoxes = chatBoxes.filter(({key}) =>
                        key !== targetKey);

        setChatBoxes(newChatBoxes);
        return activeKey?
                activeKey === targetKey?
                    index === newChatBoxes.length?
                        newChatBoxes.length === 0?
                            "":newChatBoxes[index-1].key
                        :
                        newChatBoxes.length === 0?
                            "":newChatBoxes[index].key
                    : activeKey
                : ''
        
    };
    const displayMessages =(chat) =>{
        const index = chatBoxes.findIndex(({key}) => key === activeKey)
        return(
        chat.length === 0? (
            <p style={{ color: '#ccc' }}> No messages... </p>
            ) : (
                <Wrap>{
                  chat.map(( {sender, body}, i) => (
                    <Message key={i} message ={body} isMe={sender === me} name={sender}/>))
                }
                <FootRef ref={el => msgFooter.current[index] = el} ></FootRef>
                </Wrap>
                
        )
    )}
    
    // const extractChat = (chat) => {
        
    //     console.log('key')
    //     return displayMessages(chat);
    // }

    
    useEffect(() => {
        const index = chatBoxes.findIndex(({key}) => key === activeKey)
        scrollToBottom(index);
        setMsgSent(false); },
        [ msgSent,activeKey]
    )
        
    useEffect(() => {
        displayStatus(status)
    }, 
        [status]
    )

    const scrollToBottom = (index) =>{
        msgFooter.current[index]?.scrollIntoView({behavior: 'smooth', block: "start"});
    };
    useEffect(() => {
        const friend = activeKey
        // console.log("messages", messages)
        
        const chat = displayMessages(messages)
        // console.log("chat", chat)
        // if(chatBoxes.length !== 0){
        //     const newChatBoxes = chatBoxes
        //     const chatBoxes.(
        //         ({key}) => key !== friend
        //     );

        //     setChatBoxes([...newChatBoxes,
        //         { label: friend, children: chat,
        //         key: friend }]);
        // }
        chatBoxes.map( (c)=>{
            if(c.label === friend){
                c.children = chat
            } 
            
        })
        setChatBoxes(chatBoxes)
        setMsgSent(true);
     }, [messages]);
     
    return(<>
        <Title name={me}/>
            <>
                <MessageWrap
                    tabBarExtraContent={{height:'36px'}}
                    type="editable-card"
                    activeKey={activeKey}
                    onChange={(key) => {
                        setActiveKey(key);
                        startChat(me, key);

                    }} 
                    onEdit={(targetKey, action) => {
                        if (action === 'add') setModalOpen(true);
                        else if (action === 'remove') {
                            setActiveKey(removeChatBox(targetKey, activeKey));
                        }
                    }}
                    items={chatBoxes}
                />
                <ChatModal
                    open={modalOpen}
                    onCreate={({ name }) => {
                        setActiveKey(createChatBox(name));
                        startChat(me, name);
                        setModalOpen(false);
                    }}
                    onCancel={() => { setModalOpen(false);}}
                />

                
                <Input.Search
                    value={txt}
                    ref ={msgRef}
                    onChange={(e) => setMsg(e.target.value)}
                    enterButton="Send"
                    placeholder="Type a message here..."
                    onSearch={(m) => {
                        if (!m ){
                            displayStatus({
                                type: 'error',
                                msg: 'Please enter a username and a message body.'
                            })
                            return
                        }
                        else if(activeKey === ''){
                            displayStatus({
                                type: 'error',
                                msg: 'Please add a chatbox first.'
                            })
                            setMsg("");
                            return
                        }
                        sendMessage(me, activeKey, m)
                        setMsg('')
                        setMsgSent(true);
                    }}/>
            </>
    </>)
}
export default ChatRoom
                         