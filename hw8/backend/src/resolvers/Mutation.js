import {v4 as uuidv4} from 'uuid';
const makeName =  (name, to) => { return [name, to].sort().join('_'); };

const Mutation = {
  
  createChatBox: async( _, args, { ChatBoxModel} ) => {
    const name = makeName(args.name1, args.name2); 
    let box = await ChatBoxModel.findOne({ name });
    //console.log(box)
    console.log('mutate')
    if (!box)
      box = await new ChatBoxModel({ name }).save();
    return box;
    
  },
  createMessage: async ( _, { from, to, body }, {ChatBoxModel, pubsub } )=> {
    const name =  makeName(from, to); 
    let chatBox = await ChatBoxModel.findOne({ name });
    if (!chatBox)
      chatBox = await new ChatBoxModel({ name }).save();
    console.log('create')
    const newMsg = { sender: from, body };
    chatBox.messages.push(newMsg);
    await chatBox.save();

    pubsub.publish(`chatBox ${name}`, {
      message: newMsg,
    });

    return newMsg;
  },
};

export { Mutation as default };
