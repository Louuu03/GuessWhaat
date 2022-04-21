import React, { useContext } from "react";
import { StatusContext } from "./App";
import './App.css';

export const Score=(props)=>{
    const {score, stat}=useContext(StatusContext);
    const scoreArea=
            <div>
                Score: {score}/5 <br/>
                Attempt: {stat}/5
            </div>;

    return(
        <div className="scoreSection">
            {stat!==-1?scoreArea:''}
        </div>
    )

}