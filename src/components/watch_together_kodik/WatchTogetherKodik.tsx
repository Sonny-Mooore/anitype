"use client"
import React, {useEffect, useRef, useState} from 'react';
import {useRouter} from "next/navigation";
import "../kodik/kodik.css";

interface WatchTogetherKodikProps{
    src: string
}

const WatchTogetherKodik = ({src}: WatchTogetherKodikProps) => {

    const time= useRef(0)

    const [showHud, setShowHud] = useState(true)

    const interval = useRef(setInterval(() => {}))

    const router = useRouter()

    function setEpisodeAndSeason(season:number, episode: number){
        sendMethodKodik({method: "change_episode", seconds: {method: "change_episode", season: season, episode: episode}})
    }

    function setTime(time: number){
        sendMethodKodik( {method: "seek", seconds: time})
    }

    function sendMethodKodik(value: any){
        // @ts-ignore
        let kodikIframe = document.getElementById("kodik-player")?.contentWindow;
        if (kodikIframe){
            console.log({ key: "kodik_player_api", value: value})
            kodikIframe.postMessage({ key: "kodik_player_api", value: value}, '*');
        }
    }

    useEffect(() => {
        const kodikMessageListener = (message: any) => {
            if (message.data.key === 'kodik_player_time_update') {
                time.current = message.data.value
                console.log(time.current)
            }
            if (message.data.key === "kodik_player_current_episode"){
                console.log(message.data.value);
            }
        };

        if (window.addEventListener) {
            window.addEventListener('message', kodikMessageListener);
        } else {
            // @ts-ignore
            window?.attachEvent('onmessage', kodikMessageListener);
        }

        return () => {
            if (window.removeEventListener) {
                window.removeEventListener('message', kodikMessageListener);
            } else {
                // @ts-ignore
                window?.detachEvent('onmessage', kodikMessageListener);
            }
        };
    }, []);

    function onMouseEnter(){
        clearInterval(interval.current)
        setShowHud(true)
        interval.current = setInterval(() => {
            setShowHud(false)
        }, 5000)
    }

    return (
        <>
            <>
                <iframe id="kodik-player" style={{border: "none"}} allowFullScreen allow="autoplay ; fullscreen" width={"100%"} height={"80%"} src={src} />
                <div style={{height: "20%", width: "100%", background: "white"}}>

                </div>
            </>
        </>
    );
};

export default WatchTogetherKodik;