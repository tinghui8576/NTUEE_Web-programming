import { useState } from "react";
const useChat = () => {
const [messages, setMessages] = useState([]);
    const [status, setStatus] = useState({});

    const client = new WebSocket ('ws://localhost:4000')
    const sendData = async (data) => {
        await client.send(
            JSON.stringify(data));
    };
    const sendMessage = (payload) => {
        setMessages([...messages, payload]); 
        setStatus({
            type: "success", 
            msg: "Message send"});
        console.log(payload);
        sendData(["input", payload]);
    }

    client.onmessage = (byteString) => {
        const { data } = byteString;
        const [task, payload] = JSON.parse(data);
        switch (task) {
            case "output": {
                setMessages(() =>
                [...messages, ...payload]); break; }
            case "status": {
                    setStatus(payload); break; }
            default: break;
        }
    }
    return {
        status, messages, sendMessage
    };
};
export default useChat;