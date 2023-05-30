"use client"
import React, {useEffect} from 'react';
import "./kodik.css";
interface KodikProps{
    src: string
}

const Kodik = ({src}: KodikProps) => {

    function setEpisodeAndSeason(season:number, episode: number){
        sendMethodKodik("kodik-player", {method: "seek", seconds: {method: "change_episode", season: season, episode: episode}})
    }

    function setTime(time:number){
        sendMethodKodik("kodik-player", {method: "seek", seconds: time})
    }

    function sendMethodKodik(key: string, value: any){
        // @ts-ignore
        let kodikIframe = document.getElementById("kodik-player")?.contentWindow;
        if (kodikIframe){
            kodikIframe.postMessage({ key: key, value: value}, '*');
        }
    }

    useEffect(() => {
        const kodikMessageListener = (message: any) => {
            if (message.data.key === 'kodik_player_time_update') {
                console.log(message.data.value);
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

    return (
        <iframe style={{border: "none"}} allowFullScreen allow="autoplay ; fullscreen" width={"100%"} height={"100%"} src={src} />
    );
};

export default Kodik;