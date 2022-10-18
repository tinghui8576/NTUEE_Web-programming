/****************************************************************************
  FileName      [ Row.js ]
  PackageName   [ src/components ]
  Author        [ Cheng-Hua Lu ]
  Synopsis      [ This file generates the Row. ]
  Copyright     [ 2022 10 ]
****************************************************************************/

import "./css/Row.css";
import React from 'react';


const Row = ({ guess, rowIdx }) => {
    var check = false;
    if(guess !== undefined){
        check = true;
    }
    return (
        <div className='Row-container'>
            {/* TODO 3: Row Implementation -- Row */}
            
            {/* ↓ Default row, you should modify it. ↓ */}
            <div className='Row-wrapper'>
                <div className={check ?'Row-wordbox '+guess[0].color :'Row-wordbox'} id ={rowIdx +'0'} >{check? guess[0].char : ''}</div>
                <div className={check ?'Row-wordbox '+guess[1].color :'Row-wordbox'} id ={rowIdx +'1'} >{check? guess[1].char : ''}</div>
                <div className={check ?'Row-wordbox '+guess[2].color :'Row-wordbox'} id ={rowIdx +'2'} >{check? guess[2].char : ''}</div>
                <div className={check ?'Row-wordbox '+guess[3].color :'Row-wordbox'} id ={rowIdx +'3'} >{check? guess[3].char : ''}</div>
                <div className={check ?'Row-wordbox '+guess[4].color :'Row-wordbox'} id ={rowIdx +'4'} >{check? guess[4].char : ''}</div>

            </div>
            {/* ↑ Default row, you should modify it. ↑ */}
        </div>
    )
}

export default Row;