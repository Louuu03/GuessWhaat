import './App.css';
import React, {  useState } from "react";
import {BrowserRouter, Routes, Route} from 'react-router-dom';
import { Login } from './login';
import { Main } from './main';
import {Result} from './result';

export const StatusContext=React.createContext();

function App() {
  const spotify="https://accounts.spotify.com/authorize?";
  const redirect_uri='http://localhost:3000/';
  const clientID='6fbde934ca6445a285096b84a31b160d';
  const scope=['user-read-recently-played','user-follow-read','user-top-read','playlist-read-private','user-read-email','user-read-private'];
  const AllScopes=scope.join('%20'); 
  const loginWeb=`${spotify}client_id=${clientID}&redirect_uri=${redirect_uri}&scope=${AllScopes}&response_type=token&show_dialog=true`;

  const [score, setScore]=useState(0);
  const [stat, setStat]=useState(0);

  const handleChangeUser=()=>{
    window.location.href=loginWeb;
  }
  const user=<div className='user' onClick={handleChangeUser}>Change<br/>User</div>;
  
  return (
    <div className="App" onLoad={()=>alert('loading')}> 
      <div className='title'>
        <h1>Guess Whatt!!!</h1>
       { window.location.href!=="https://guesswhaat.netlify.app"?user:""}
      </div>
      <BrowserRouter>
      <StatusContext.Provider value={{score, setScore, stat, setStat}}>
        <Routes>
          <Route path='/' element={<Login loginWeb={loginWeb} />}/>
          <Route path='/main' element={<Main/>}/>
          <Route path='/result' element={<Result/>}/>
        </Routes>
        </StatusContext.Provider>
      </BrowserRouter>
    </div>
  );
}

export default App;
