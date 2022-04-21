import React, {useContext, useState} from "react";
import './App.css';
import axios from "axios";
import { Input } from "./input";
import { StatusContext } from "./App";
import { useNavigate } from "react-router";
import { LYRICS_API } from "./keys";

export const Lyrics=(props)=>{


    const {stat, setStat}=useContext(StatusContext);
    const artists=props.artists;
    const songs=props.songs;
    const URI='http://api.musixmatch.com/ws/1.1/';
    let exactArtist='';
    let exactSong='';

    const navigate=useNavigate();

    const [lyrics, setLyrics]=useState('Press the button to start the game!');
    const [getSong, setGetSong]=useState(false);
    const [showName,setShowName]=useState("Click To Get Song's Name");
    const [currentSong, setCurrentSong]= useState('');
    const [answer, setAnswer]=useState('');
    const [correction, setCorrection]=useState();
    const [input, setInput]=useState();
    const [loading, setLoading]=useState(false);



    const cleanData=(x,xString,type)=>{
        for(let i=0; i<x.length; i++){
            if(x[i]===' '||x[i]==="'"||x[i]==="-"){
                xString.push('%20');
            }else if(x[i]==='('){
                if(x[i-1]===' '||x[i]==="'"||x[i]==="-"){
                    xString.pop();
                }
                if(type===0)exactArtist=xString.join('');
                if(type===1)exactSong=xString.join('');
                return xString;
            }else{
                xString.push(x[i].toLowerCase());
            }
        }
        if(type===0)exactArtist=xString.join('');
        if(type===1)exactSong=xString.join('');

    }
    
    const guessLyrics=(arr)=>{
        let newLyrics=[];
        let Num=Math.floor(Math.random()*(arr.length));
        if (arr[Num]===''||arr[Num]==='...') {
            guessLyrics(arr);    
        }else{
            setAnswer(arr[Num]);
            arr[Num]='???????';
            arr.forEach(e=>{
                if(e==='???????'){
                newLyrics.push(<div className="missing">{e}<br/></div>) 

                }else{
                newLyrics.push(<div>{e}<br/></div>) 
                }
                });
           setLyrics(newLyrics);
                
        }
        setLoading(false);
    }
console.log(loading);


    const getLyrics = async()=>{ 
        setLoading(true);
        setInput('')

        let num=Math.floor(Math.random()*artists.length);
        let artist=artists[num];
        let song=songs[num];
        setShowName("Click Too Get Song's Name")
        setCurrentSong(song);
        let artistString=[];
        let songString=[];


        cleanData(artist,artistString,0);
        cleanData(song,songString,1);

    
        try{
            const res=await axios.get(URI+'matcher.lyrics.get?apikey=23f276cb525dab46554b6414b1578990&q_track='+exactSong+'&q_artist='+exactArtist,{
                headers:{
                    Authorization:'Bearer '+ LYRICS_API,
                    
                }
            }
            );
            let status=res.data.message.header['status_code']?res.data.message.header['status_code']:'No';
            let copyright=res.data.message.body.hasOwnProperty('lyrics')?res.data.message.body.lyrics['lyrics_copyright']:'no';
            let lyricsBody=res.data.message.body.hasOwnProperty('lyrics')?res.data.message.body.lyrics.lyrics_body:'nooo';

            if(status===404){
                setLyrics('No lyrics of "'+song+'" found');
                console.log('cause 404');
                setAnswer('');
                setLoading(false);
             }else{
                if(copyright==="Unfortunately we're not authorized to show these lyrics."){
                    setLyrics('Sorry, the Lyrics of "'+song+'" is not authorized...');
                    console.log('cause not Auth');
                    setAnswer('');
                    setLoading(false);
                }else{
                    if(lyricsBody===''){
                    setLyrics('No Lyrics in "'+song+'"')
                    console.log('cause no Lyrics');
                    setAnswer('');setLoading(false);
                    }
                    else{
                        let temp=lyricsBody.split("\n");
                        temp.pop();
                        temp.pop();
                        guessLyrics(temp);
                        setGetSong(true);
                    }
                }
            }
        }catch(err){
            console.log(err);
        }
        



    }

    
    const handleSongName=()=>{
        setShowName(currentSong);
    }
    const getResult=()=>{
        navigate('/result');
        setStat(-1);
    }


    const getButton= <button onClick={getLyrics} className='getLyrics'>Get Lyrics</button>;
    const showResult=<button onClick={getResult} className='showResult'>Show Result</button>
    const inputSection=<Input  setGetSong={setGetSong} answer={answer} setCorrection={setCorrection} 
    input={input} setInput={setInput}/>;
    const correctSection=<div>{correction}</div>;

    return(
        <div className="lyricsPage">
            <div className="lyrics">
            <button className="songsName" onClick={handleSongName}>{showName}</button>
            <div>{loading?'Loading...':lyrics}</div>  
            </div>
            {answer!==''&&!getSong?correctSection:""}
            {!getSong&&stat!==5?getButton:''}
            {stat===5&&!getSong?showResult:''}
            {getSong?inputSection:''}
        </div>
    )
}