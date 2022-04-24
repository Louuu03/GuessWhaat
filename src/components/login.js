import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router';
import './App.css';

export const Login=(props)=>{
    const loginWeb=props.loginWeb;
    const data=window.location.href.match(/access_token=([^&]*)/);
    const navigate=useNavigate();
    useEffect(()=>{
         if(data){
        const accessToken=data[1];
        const expiresIn= window.location.href.match(/expires_in=([^&]*)/[1]);
        const tokenType= window.location.href.match(/token_type=([^&]*)/[1]);
        localStorage.clear();
        localStorage.setItem('accessToken',accessToken);
        localStorage.setItem("expireIn",expiresIn);
        localStorage.setItem("tokenType",tokenType);
        navigate('./main');
    }
    },[data, navigate])

    
    const handleLogIn=async()=>{
        localStorage.clear();
        window.location.href=loginWeb;
    }

    return(
        <div className='logInPage'>
                <div className='description'>
                <h2>This is a song guessing game.</h2>
                We will get your <span className='red big'>top 20</span> songs from spotify.<br/>
                The game will randomly get one of the songs,<br/>
                and randomly choose a line of the lyrics.<br/>
                <h3>Try your best to guess the lyrics of your favorite songs!</h3>
                You'll be correct still if you get <span className='red big'>4</span> words of the line.<br/>
                <br/>
                <div className='small'>
                *The game is not really available for languages other than English.<br/>
                *The Lyrics are from Musixmatch.
                </div>
                
                </div>
            <button onClick={handleLogIn} className='spotifyLogIn'>Log in with Spotify</button>
        </div>
    )
}
