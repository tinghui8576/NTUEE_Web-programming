/****************************************************************************
  FileName      [ HomePage.js ]
  PackageName   [ src/components ]
  Author        [ Cheng-Hua Lu ]
  Synopsis      [ This file generates the Home page.  ]
  Copyright     [ 2022 10 ]
****************************************************************************/

import './css/HomePage.css';
import React, { useState } from 'react';

const HomePage = ({ startGameOnClick, mineNumOnChange, boardSizeOnChange, mineNum, boardSize /* -- something more... -- */ }) => {
  const [showPanel, setShowPanel] = useState(false);      // A boolean variable. If true, the controlPanel will show.
  const [error, setError] = useState(false);              // A boolean variable. If true, means that the numbers of mines and the board size are invalid to build a game.

  {/* Advanced TODO: Implementation of Difficult Adjustment
                     Some functions may be added here! */ 
  }
  const showing = () => setShowPanel(!showPanel);

  const erroring = (b, m) => {
    if(m >= (b*b))
      setError(true)
    else
      setError(false)
    console.log(m, b)
  }
  const Style ={
    color: '#880000'
  }
  return (
    <div className='HomeWrapper'>
      <p className='title'>MineSweeper</p>
      {/* Basic TODO:  Implemen start button */
        <button className = "btn" onClick={startGameOnClick}>
          Start Game
        </button>
      }
      
      {/* Advanced TODO: Implementation of Difficult Adjustment
                Useful Hint: <input type = 'range' min = '...' max = '...' defaultValue = '...'> 
                Useful Hint: Error color: '#880000', default text color: '#0f0f4b', invisible color: 'transparent' 
                Reminder: The defaultValue of 'mineNum' is 10, and the defaultValue of 'boardSize' is 8. */
        <div className='controlContainer'>
          <button className = "btn" onClick={showing}>
            Difficulty Adjustment
          </button>
          <>
          { showPanel && 
            <div className='controlWrapper'>
              {error && <div className='error'>Error: Mines number and board size are invalid!</div> }
              
              <div className='controlPane'>
                <div className='controlCol'>
                  <p className='controlTitle'> Mines Number</p>
                  <input type='range' step='1' min='...' max='...' defaultValue={mineNum} onChange={(e) => {erroring(boardSize, e.target.value);mineNumOnChange(e.target.value)}}/>
                  {!error && <p className='controlNum'> {mineNum}</p>}
                  {error && <p className='controlNum' style={Style}> {mineNum}</p>}
                </div>
                <div className='controlCol'>
                  <p className='controlTitle'>Board Size (nXn)</p>
                  <input type='range' step='1' min='1' max='24' defaultValue={boardSize} onChange={(e) => {erroring(e.target.value, mineNum);boardSizeOnChange(e.target.value)}}/>
                  {!error && <p className='controlNum'> {boardSize}</p>}
                  {error && <p className='controlNum' style={Style}> {boardSize}</p>}
                </div>
              </div>
            </div>  
          }
          </>
        </div>
      }

    </div>
  );

}
export default HomePage;   