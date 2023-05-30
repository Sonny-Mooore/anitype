"use client"
import React, {useEffect, useRef, useState} from 'react';
import "./kodik.css";
interface KodikProps{
    src: string
}

const Kodik = ({src}: KodikProps) => {

    const time= useRef(0)

    const [showHud, setShowHud] = useState(true)

    const interval = useRef(setInterval(() => {}))

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
            <div className={showHud ? "kodik_close_button" : "kodik_close_button close"} title={"+80s"} onClick={() => setTime(time.current + 80)}>
                <svg height="20px" width="20px" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <path d="M22.2,10.6l-9-5.4c-1-0.6-2.2,0.2-2.2,1.4v3.2L3.2,5.2C2.2,4.6,1,5.4,1,6.6v10.7c0,1.2,1.2,2,2.2,1.4l7.8-4.6   v3.2c0,1.2,1.2,2,2.2,1.4l9-5.4C23.3,12.8,23.3,11.2,22.2,10.6z"/>
                </svg>
            </div>
            <iframe id="kodik-player" style={{border: "none"}} allowFullScreen allow="autoplay ; fullscreen" width={"100%"} height={"100%"} src={src} />
        </>
    );
};

export default Kodik;