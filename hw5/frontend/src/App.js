import './App.css';
import {guess, startGame, restart} from './axios';
import React, { useState } from 'react';

function App() {
  const [hasStarted, setHasStarted] = useState(false);
  const [hasWon, setHasWon] = useState(false);
  const [number, setNumber] = useState('');
  const [status, setStatus] = useState('');

  const menuchange =() =>{
    setHasStarted(!hasStarted)

  }

  const handleGuess = async() => {

    try{
      const response = await guess(number);
      console.log(response);
      if(response === 'Equal') setHasWon(true)
      else{
        setStatus(response);
        setNumber('');
      }
    }
    catch{
      console.log('error')
    }
    
  }

  const handleRestart = async() => {
    setHasWon(false);
    setNumber('');
    setStatus('');
    await restart();

  }
  const startMenu = 
  <div>
    <button onClick={async() => {
      menuchange();
      await startGame()}}> start game</button>
  </div>

const winningMode =(
  <>
    <p>you won! the number was {number}.</p>
    <button onClick = {handleRestart}> restart</button>
  </>
)
  const gameMode = 
  
  <>
  { !hasWon && <>
    <p>Guess a number between 1 to 100</p>
    <input value = {number} onChange={(e)=>setNumber(e.target.value)}></input>
    <button disabled ={!number} onClick ={handleGuess} >guess!</button>
    <p>{status}</p>
    </>
  }
  {hasWon && winningMode}
  </>
  
// 
  
  return <div className="App">
        
        {hasStarted ? gameMode : startMenu}
        

      </div>
  
}

export default App;
