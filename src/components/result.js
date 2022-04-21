import React, { useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router";
import { StatusContext } from "./App";
import './App.css';

export const Result=(props)=>{
    const { stat, score,setStat,setScore }=useContext(StatusContext);
    const [result, setResult]=useState('');
    const navigate=useNavigate();

    const handleAgain=()=>{
        navigate('/main');
        setStat(0);
        setScore(0);
    }


    useEffect(()=>{
        if(score===0){
            setResult('Ahhhh, are you really listening to your songs?')
        }else if(score===1){
            setResult('Can you sing your fav songs?')
        }else if(score===2){
            setResult('I guess your brain is the size just as golden fish...')
        }else if(score===3){
            setResult('Could have been better!')
        }else if(score===4){
            setResult('Miight need some memory')
        }else if(score===5){
            setResult('Wow, not half bad!')
        }



    },[stat])   

    return(
        <div className="resultPage">
                <div className="result">
                    You get <span className="bigger">{score}</span> ou of 5! <br />
                    <div className="resultSentence"> {result}</div>
                <button onClick={handleAgain} className='tryButton' >Try again</button>
                </div>
        </div>
    )

}
