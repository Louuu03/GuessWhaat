import React, { useEffect, useState } from "react";
import axios from 'axios';
import { Lyrics } from "./lyrics";
import { Score } from "./score";


export const Main=(stat)=>{

    const accessToken=localStorage.getItem('accessToken');
    const playlistEndpoint=	'https://api.spotify.com/v1/me/top/tracks';
    const[data, setData]=useState([]);
    const [token, setToken]=useState(accessToken);
    const [artists, setArtists]=useState([]);
    const [songs, setSongs]=useState([]);
    

    const getData= async ()=>{
        
        try{
            const response=await axios.get(playlistEndpoint,{
            headers:{
                Authorization:'Bearer '+accessToken,
                
            }
        });
        setData(response.data);
        getPLAY(response.data);
      }catch(error) {
        console.error(error);
      }
    }

    const getPLAY=(x)=>{
        const artist=[];
        const names=[];
        for(let i=0; i<20;i++){
            artist.push(x.items[i].artists[0].name);
            names.push(x.items[i].name);
            }
            
            setArtists(artist);
            setSongs(names);
    }
    useEffect(()=>{
        getData();
    },[token]);
    return(
        <div className="mainPage">
            <Score  />
            <Lyrics songs={songs} artists={artists}/>
        </div>
    )  
}