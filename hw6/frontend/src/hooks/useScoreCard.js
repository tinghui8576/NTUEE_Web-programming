import { createContext, useContext, useState } from 'react';

const ADD_MESSAGE_COLOR = '#3d84b8';
const REGULAR_MESSAGE_COLOR = '#2b2e4a';
const ERROR_MESSAGE_COLOR = '#fb3640';

const ScoreCardContext = createContext({
  messages: [],
  State: [],
  addCardMessage: () => {},
  addRegularMessage: () => {},
  addErrorMessage: () => {},
  deleteMessage: () => {}
});

const makeMessage = (message, color) => {
  return { message, color };
};

const ScoreCardProvider = (props) => {
  const [messages, setMessages] = useState([]);
  const [State, setState] = useState(false);
  const addCardMessage = (message) => {
    if(State === true){
      setMessages([
        makeMessage(message, ADD_MESSAGE_COLOR)]);
      setState(false);
    }
    else
      setMessages([...messages, makeMessage(message, ADD_MESSAGE_COLOR)]);
  };

  const addRegularMessage = (state, ...ms) => {
    if (state === false){
      setMessages([
        ...ms.map((m) => makeMessage(m, REGULAR_MESSAGE_COLOR))
      ]);
      setState(true);
    }
    else{
      
      setMessages([
          ...messages,
          ...ms.map((m) => makeMessage(m, REGULAR_MESSAGE_COLOR)),
      ]);
      
    }
    
  };

  const addErrorMessage = (message) => {
    setMessages([...messages, makeMessage(message, ERROR_MESSAGE_COLOR)]);
  };

  const deleteMessage = async() =>{
    console.log('delete')
    setMessages(null)
    setMessages([""])
  }
  return (
    <ScoreCardContext.Provider
      value={{
        messages,
        addCardMessage,
        addRegularMessage,
        addErrorMessage,
        deleteMessage
      }}
      {...props}
    />
  );
};

function useScoreCard() {
  return useContext(ScoreCardContext);
}

export { ScoreCardProvider, useScoreCard };
