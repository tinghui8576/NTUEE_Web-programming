
const Query = {
  chatBox: async (parent,args , { ChatBoxModel}) => {
    const name =  [args.name1, args.name2].sort().join('_'); 
    let box = await ChatBoxModel.findOne({ name });
    console.log(box, 'box')
    if (!box)
      box = await new ChatBoxModel({ name }).save();
    return box;
  },
};

export default Query;
