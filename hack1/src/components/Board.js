/****************************************************************************
  FileName      [ Board.js ]
  PackageName   [ src/components ]
  Author        [ Cheng-Hua Lu ]
  Synopsis      [ This file generates the Board. ]
  Copyright     [ 2022 10 ]
****************************************************************************/

import Row from "./Row";
import './css/Board.css';
import React, { useEffect, useState } from 'react';
import CurRow from "./CurRow";



const Board = ({ turn, guesses, curGuess }) => {

    const [ board, setBoard ] = useState([true, false,false,false,false,false]);

    useEffect(() =>{
        let b = [false, false,false,false,false,false];
        b[turn] = true;
        setBoard(b);
        
    },[curGuess]);   
    return (
        <div className="Board-container">
            {/* TODO 2-2: show 6 rows (map function is recommended) and defined row's key.
                Hint: Use `CurRow` instead of `Row` when you are passing `curGuess` into it. */}
            {board.map((t, id)=>{
                if(t === true){
                    return(
                        <CurRow curGuess={curGuess} rowIdx={id}/>
                    )
                }
                    
                else
                    return(
                        <Row id = {'row_' + id} key = {'row_' + id} guess = {guesses[id]} rowIdx={id}/>
                    )
                /* id = {'row_' + id} key = {'row_' + id} curGuess = {t}*/
            })}

             
        </div>
    )
};
export default Board;
