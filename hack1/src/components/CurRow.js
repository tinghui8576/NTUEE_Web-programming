/****************************************************************************
  FileName      [ CurRow.js ]
  PackageName   [ src/components ]
  Author        [ Cheng-Hua Lu ]
  Synopsis      [ This file generates the CurRow. ]
  Copyright     [ 2022 10 ]
****************************************************************************/

import "./css/Row.css";
import React, { useEffect, useState } from 'react';


const CurRow = ({ curGuess, rowIdx }) => {
    const [ check, setcheck] = useState([false, false,false,false,false,false]);
    
    let letters = '';
    if(curGuess.length !== 0){
        letters = curGuess.split('');
    }
    
    
    useEffect(() =>{
        var c = [false, false,false,false,false,false]
        c[curGuess.length-1] = true;
        setcheck(c);
    },[curGuess]);  
    return (
        <div className='Row-container'>
            {/* TODO 3: Row Implementation -- CurRow */}
            
            {/* ↓ Default row, you should modify it. ↓ */}
            <div className='Row-wrapper current'>
                <div className={check[0]?'Row-wordbox filled':'Row-wordbox'} id ={rowIdx +'0'}>{letters[0]}</div>
                <div className={check[1]?'Row-wordbox filled': 'Row-wordbox' } id ={rowIdx +'1'}>{letters[1]}</div>
                <div className={check[2]?'Row-wordbox filled' : 'Row-wordbox' } id ={rowIdx +'2'}>{letters[2]}</div>
                <div className={check[3]?'Row-wordbox filled' : 'Row-wordbox'} id ={rowIdx +'3'}>{letters[3]}</div>
                <div className={check[4]?'Row-wordbox filled' :'Row-wordbox' } id ={rowIdx +'4'}>{letters[4]}</div>
            </div>
            {/* ↑ Default row, you should modify it. ↑ */}
        </div>
    )
}

export default CurRow;
