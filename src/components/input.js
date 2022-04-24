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
        let allChinese=false;
        let chinese=false;

        if(input.match(/[\u3400-\u9FBF]/)){
            allChinese=true;
        }

        if(input===''){
            setCorrection(
                <div className=" correction">
                    <span>Correct Answer:<br/>
                    <span className="red big">{answer}</span></span>
                    </div>)
        }else{
            if(allChinese){
                let tempARR=[];
                seperateInput.forEach(input=>{
                    if(input.match(/[\u3400-\u9FBF]/)){
                        let tempInput=input.split('');
                        tempInput.forEach(i=>{
                            tempARR.push(i);
                        })
                    }else{
                        tempARR.push(input);
                    } 
                });
                seperateInput=tempARR;
            }
            console.log(seperateInput);
            seperateInput.forEach(input => {
                if(answer.toLowerCase().includes(input.toLowerCase())){
                    if(input.match(/[\u3400-\u9FBF]/))chinese=true;
                    correctCount=correctCount+1;
                    temp.push(<span className="green big">{input}</span>);
                    if(!chinese)temp.push(<span className="space"> </span>);
                    console.log(chinese);
                }else{
                    if(input.match(/[\u3400-\u9FBF]/))chinese=true;
                    temp.push(<span className="red big">{input}</span>);
                    if(!chinese)temp.push(<span className="space"> </span>);
                    console.log(chinese);
                }
            });
            console.log(temp);
            if(correctCount>=4){
                setCorrection(
                    <div className=" correction">
                        {input.toLowerCase()===answer.toLowerCase()?
                        <span>Correct!!<br/>
                        <span className="green big">{answer}</span><br/>
                        Your Answer: <br/> 
                        {temp}</span>:
                        <span>Not Bad!!<br/>
                        Correct Answer:<br/>
                        <span className="green big">{answer}</span><br/>
                        Your Answer: <br/> 
                        {temp}</span>
                    }     
                    </div>); 
                setScore(score+1);
            }else{
                setCorrection(
                    <div className=" correction">
                    <span>Better Luck Next Time!    
                    Correct Answer:<br/>
                    <span className="green">{answer}</span><br/>
                    Your Answer: <br/> 
                    {temp}</span>
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