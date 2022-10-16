/****************************************************************************
  FileName      [ Board.js ]
  PackageName   [ src/components ]
  Author        [ Cheng-Hua Lu ]
  Synopsis      [ This file generates the Board. ]
  Copyright     [ 2022 10 ]
****************************************************************************/

import './css/Board.css'
import Cell from './Cell';
import Modal from './Modal';
import Dashboard from './Dashboard';
import { revealed } from '../util/reveal';
import createBoard from '../util/createBoard';
import React, { useEffect, useState } from 'react';


const Board = ({ boardSize, mineNum, backToHome }) => {
    const [board, setBoard] = useState([]);                     // An 2-dimentional array. It is used to store the board.
    const [nonMineCount, setNonMineCount] = useState(0);        // An integer variable to store the number of cells whose value are not '💣'.
    const [mineLocations, setMineLocations] = useState([]);     // An array to store all the coordinate of '💣'.
    const [gameOver, setGameOver] = useState(false);            // A boolean variable. If true, means you lose the game (Game over).
    const [remainFlagNum, setRemainFlagNum] = useState(0);      // An integer variable to store the number of remain flags.
    const [win, setWin] = useState(false);                      // A boolean variable. If true, means that you win the game.

    useEffect(() => {
        // Calling the function
        freshBoard();
    }, []);

    // Creating a board
    const freshBoard = () => {
        const newBoard = createBoard(boardSize, mineNum);
        setBoard(newBoard.board);
        setMineLocations(newBoard.mineLocations);
        // Basic TODO: Use `newBoard` created above to set the `Board`.
        // Hint: Read the definition of those Hook useState functions and make good use of them.

    }

    const restartGame = () => {
        freshBoard();
        setGameOver(false);
        setWin(false);
        setRemainFlagNum(0);
    }

    // On Right Click / Flag Cell
    const updateFlag = (e, x, y) => {
        // To not have a dropdown on right click
        e.preventDefault();
        // Deep copy of a state
        let newBoard = JSON.parse(JSON.stringify(board));
        let newFlagNum = remainFlagNum;

        // Basic TODO: Right Click to add a flag on board[x][y]
        // Remember to check if board[x][y] is able to add a flag (remainFlagNum, board[x][y].revealed)
        // Update board and remainFlagNum in the end
        if(newBoard[x][y].revealed !== true){

            if (newBoard[x][y].flagged === true){
                newBoard[x][y].flagged = false;
                newFlagNum -= 1;
            }
            else{
                if(newFlagNum !== mineNum){
                    newBoard[x][y].flagged = true;
                    newFlagNum += 1;
                }
                
            }
        }
        setBoard(newBoard);
        setRemainFlagNum(newFlagNum);
        checking(newBoard,newFlagNum);
    };

    const revealCell = (x, y) => {

        if (board[x][y].revealed || gameOver || board[x][y].flagged) return;
        let newBoard = JSON.parse(JSON.stringify(board));
        // setBoard(newBoard.board);
        // Basic TODO: Complete the conditions of revealCell (Refer to reveal.js)
        // Hint: If `Hit the mine`, check ...?
        //       Else if `Reveal the number cell`, check ...?
        // Reminder: Also remember to handle the condition that after you reveal this cell then you win the game.
        
        var reveal = [];
        newBoard[x][y].revealed = true;
        if (newBoard[x][y].value === '💣'){
            console.log('no')
            setGameOver(true);
        }
        else{
            reveal.push([x,y])
        }
        
        while (reveal.length != 0){
            var [idx,idy] = reveal.pop();
            if( newBoard[idx][idy].value !== '💣'){
                newBoard[idx][idy].revealed = true;
                
            }
            if( newBoard[idx][idy].value === 0){
                if(idx-1 >= 0 && newBoard[idx-1][idy].revealed === false){
                    reveal.push([idx-1,idy]) 
                }
                if(idx+1 < boardSize && newBoard[idx+1][idy].revealed === false){
                    reveal.push([idx+1, idy]);
                }
                if(idy-1 >= 0){
                    if(newBoard[idx][idy-1].revealed === false)
                        reveal.push([idx,idy-1])
                    if(idx-1 >=0 && newBoard[idx-1][idy-1].revealed === false)
                        reveal.push([idx-1,idy-1])
                    if(idx+1 < boardSize && newBoard[idx+1][idy-1].revealed === false)
                        reveal.push([idx+1,idy-1])
                }
                
                if(idy+1 < boardSize){
                    if(newBoard[idx][idy+1].revealed === false)
                        reveal.push([idx, idy+1]);
                    if(idx-1 >=0 && newBoard[idx-1][idy+1].revealed === false)
                        reveal.push([idx-1,idy+1])    
                    if(idx+1 < boardSize && newBoard[idx+1][idy+1].revealed === false)
                        reveal.push([idx+1, idy+1]);
                }
            }   
        }
        setBoard(newBoard);
        checking(newBoard, remainFlagNum);
        
        // newBoard.map((cell)=>{
        //     console.log(cell)
        //     if(cell.revealed === false){
        //         win = false;
        //     }
            
        // })
        // if(win === true){
        //     console.log('win');
        //     setWin(true);
        //     setGameOver(true);
        // }
    };

    const checking = (newBoard, remains) =>{
        var left = 0;
        var winning = false;
        newBoard.map((r, idy)=>{
            r.map((c, idx)=>{
                if(c.revealed === false){
                    left += 1;
                }
            })
        })
        console.log(left, mineNum)
        if(left === remains && remains=== parseInt(mineNum))
            winning = true;
        if(winning){
            console.log('win');
            setWin(true);
            setGameOver(true);
        }
    }
    return (
        <div className='boardPage' >
            {gameOver && <Modal restartGame={restartGame} 
            backToHome={backToHome} win={win} />}
                <div className='boardWrapper' >
                    
                    {/* Advanced TODO: Implement Modal based on the state of `gameOver` */}
                    {/* Basic TODO: Implement Board 
                    Useful Hint: The board is composed of BOARDSIZE*BOARDSIZE of Cell (2-dimention). So, nested 'map' is needed to implement the board.
                    Reminder: Remember to use the component <Cell> and <Dashboard>. See Cell.js and Dashboard.js for detailed information. */
                    <div className='boardContainer' >
                        <Dashboard remainFlagNum={remainFlagNum} gameOver={gameOver}/> 
                        {board.map((row, rowIdx)=>{
                            return(
                                <div id={"row"+rowIdx} style={{display: 'flex'}}>
                                    {row.map((col, colIdx)=>{
                                        return(
                                            <Cell rowIdx={rowIdx} colIdx={colIdx} detail={col} updateFlag={updateFlag} revealCell={revealCell}/>
                                        );
                                    })}
                                </div>
                            );
                            
                        })}
                    
                    </div>
                    }
                    
                </div>
        </div>
    );
}

export default Board