import React, { useContext } from "react";
import { StatusContext } from "./App";
import './App.css';

export const Input=(props)=>{
    const {setStat, score, setScore}=useContext(StatusContext);
    const setCorrection=props.setCorrection;
    const setGetSong=props.setGetSong;
    const answer=props.answer;
    const input=props.input;
    const setInput=props.setInput;


    const handleInput=()=>{
        setStat(prev=>prev+1);
        setGetSong(false);
        let seperateInput=input.split(' ');
        let correctCount=0;
        let temp=[];

        if(input===''){
            setCorrection(
                <div className=" correction">
                    Correct Answer:<br/>
                    <span className="red big">{answer}</span><br/>
                    </div>)
        }else if(input.toLowerCase()===answer.toLowerCase()){
            setCorrection(
                <div className="correction ">
                Your Answer:<br/><span className="green big">{input}</span><br/>is correct!
                </div>
                );
            setScore(score+1);
        }else{
            seperateInput.forEach(input => {
                if(answer.toLowerCase().includes(input.toLowerCase())){
                    correctCount=correctCount+1;
                    temp.push(<span className="green big">{input} </span>);
                }else{
                    temp.push(<span className="red big">{input} </span>);
                }
            });
            if(correctCount>=4){
                setCorrection(
                    <div className=" correction">
                        Not Bad!!<br/>
                        Correct Answer:<br/>
                        <span className="green big">{answer}</span><br/>
                        Your Answer: <br/> 
                        {temp}
                        </div>);
                setScore(score+1);
            }else{
                setCorrection(
                    <div className=" correction">
                    Better Luck Next Time!    
                    Correct Answer:<br/>
                    <span className="green">{answer}</span><br/>
                    Your Answer: <br/> 
                    {temp}
                    </div>)
            }
        }
    }

    return(
        <div className="inputSection">
            <input className="input" placeholder="Guess the lyrics here" onChange={e=>setInput(e.target.value)}/>
            <button className="check" onClick={handleInput}>Check Answer</button>

        </div>
    )

}