import {UserModel, MessageModel, ChatBoxModel} from "./models/message.js"
const chatBoxes = {};
const makeName =  (name, to) => { return [name, to].sort().join('_'); };
const sendData = (data, ws) => {ws.send(JSON.stringify(data)); }
const sendStatus = (payload, ws) => {sendData(["status", payload], ws); }
const broadcastMessage =(wss, data, status) =>{
    wss.clients.forEach((client) => {
        sendData(data, client);
        sendStatus(status,client);
    })
}

// const validateUser = async (name) => {
//     console.log("Finding ..." + name);
//     let box = await ChatBoxModel.findOne({name});
    
    
//     return box
// };
    
const validateChatBox = async (name, ms) => {
    let box = await ChatBoxModel.findOne({ name });
    
    if (!box)
        box = await new ChatBoxModel
            ({ name:name, messages:ms }).save();
    else 
        if(ms !== undefined){
            box.messages = [...box.messages,ms]
        }
            
    await box.save();
    
    return await box.populate("messages")
};
    
export default {
    // initData: (ws) => {
    //     Message.find()
    //     .sort({ created_at: -1 })
    //     .limit(100)
    //     .exec((err, res) => {
    //         if (err) throw err;

    //         // initialize app with existing messages
    //         sendData(["init", res],ws);
    //     });
    // },
        
    onMessage: (wss, ws) => (
       
        async (byteString) => {
            const { data } = byteString
            const {type, payload} = JSON.parse(data)
            switch (type) {
                // case 'input': {
                //     const { name, txt } = payload
                //     // Save payload to DB
                //     const message = new Message({ name, txt})
                //     try {
                //         await message.save();
                //     } catch (e) { 
                //         console.log(name, txt)
                //         throw new Error("Message DB save error: " + e); }
                    
                //     // Respond to client
                //     broadcastMessage(
                //         ws,
                //         ['output', [payload]],
                //         {
                //             type: "success",
                //             msg: "Message sent."
                //         });
                //     break;
                // }


                case 'Message': {
                    const { name, to, txt } = payload
                    const chatBoxName = makeName(name, to)
                    // Save payload to DB
                    const message = MessageModel({
                        sender:name,
                        body: txt
                    });
                    //console.log(message)
                    try {
                        await message.save();
                    } catch (e) { 
                        throw new Error("Message DB save error: " + e); }
                    
                    const mes = await validateChatBox(chatBoxName, message)
                    console.log( chatBoxName)
                    chatBoxes[chatBoxName].forEach((ws)=>{
                        console.log(mes)
                        sendData(["Output", mes],ws);
                    })
                    
                    // // Respond to client
                    // broadcastMessage(
                    //     ws,
                    //     ['output', [payload]],
                    //     {
                    //         type: "success",
                    //         msg: "Message sent."
                    //     });
                    break;
                }
                case 'Chat': {
                    const { name, to} = payload
                    const chatBoxName = makeName(name, to)
                    ws.box = chatBoxName
                    if (!chatBoxes[chatBoxName]){
                        console.log('hihi')
                        chatBoxes[chatBoxName] = new Set();
                    }
                    chatBoxes[chatBoxName].add(ws);
                    console.log('hi',chatBoxName)
                    // if (ws.box !== "" && chatBoxes[ws.box])
                    //     // user(ws) was in another chatbox
                    //     {chatBoxes[ws.box].delete(ws);}

                    // const user = await validateUser(chatBoxName)
                    // console.log(user)
                    // Save payload to DB
                    
                    //validateChatBox(chatBoxName, user)
                    const mes = await validateChatBox(chatBoxName)
                    sendData(["Output", mes],ws);
                    //await validateUser(makeName(name, to))
                    
                    // Respond to client
                    // broadcastMessage(
                    //     ws,
                    //     ['output', [payload]],
                    //     {
                    //         type: "success",
                    //         msg: "Message sent."
                    //     });
                    break;
                }
                case 'clear': {
                    Message.deleteMany({}, () => {
                        broadcastMessage(
                            ws,
                            ['cleared'],
                            {
                                type: 'info', 
                                msg: 'Message cache cleared.'
                            });
                        })
                    break;
                    
                }
                default: break
            }

        }
    )
}