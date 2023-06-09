"use client"
import React, {useEffect, useRef, useState} from 'react';
import {useRouter} from "next/navigation";
import "../../app/player/kodik/[id]/kodik.css";
import "./watchTogetherKodik.css"
import axios from "axios";
import {URLUsers} from "@/utils/constants";
import {getJwt} from "@/utils/JWT";
import SockJS from 'sockjs-client';
import {Client} from '@stomp/stompjs';
import {formatTime} from "@/utils/function";
import {User, WatchLog, WatchTogetherKodikProps} from "@/utils/interfaces";

const WatchTogetherKodik = ({src, id, hubId}: WatchTogetherKodikProps) => {

    const router = useRouter()

    const [hubTitle, setHubTitle] = useState("")

    const hubIdHost = useRef()

    const useEffectIterate = useRef(0)

    const watchLogs = useRef<WatchLog>()

    const ArrayUser = useRef<Array<User>>([])
    const [userList, setUserList] = useState<Array<User>>()

    const [isShowHub, setIsShowHud] = useState(true)

    const [connectionState, setConnectionState] = useState("Не подключён")

    const time= useRef(0)

    const isCloseConnection = useRef(false)

    function setTime(time: number){
        sendMethodKodik( {method: "seek", seconds: time})
    }

    function getConnectionStateClassName(state: string){
        if (state === "Не подключён") return "watch_together_hud_connect_state"
        if (state === "Подключён") return "watch_together_hud_connect_state connect"
        if (state === "Разорвано") return "watch_together_hud_connect_state disconnect"
    }

    const updateUser = (user: User, isHost: boolean) => {

        if (!isHost){
            if (user.main){
                if (watchLogs.current?.isPaused || watchLogs.current?.isPaused !== user.isPaused){

                    if (user.isPaused){
                        sendMethodKodik({
                            method: "pause"
                        })
                    }
                    else {
                        sendMethodKodik({
                            method: "play"
                        })
                    }
                }
                if (watchLogs.current?.season != user.season || watchLogs.current?.episode != user.episode){
                    sendMethodKodik({
                        method: "change_episode",
                        season: user.season,
                        episode: user.episode

                    })
                }
                if (!watchLogs.current?.seconds || Math.abs(watchLogs.current?.seconds - user.seconds) > 2){
                    sendMethodKodik({
                        method: "seek",
                        seconds: user.seconds
                    })
                }
            }
        }


        const copyArray = [...ArrayUser.current];
        const index = copyArray.findIndex((u) => u.username === user.username);

        if (index !== -1) {
            // Пользователь найден в массиве, обновляем его поля
            copyArray[index] = {
                ...copyArray[index],
                ...user
            };
        } else {
            // Пользователь не найден в массиве, добавляем его
            copyArray.push(user);
        }
        setUserList(copyArray)
        ArrayUser.current = copyArray
    };

    function sendMethodKodik(value: any) {
        // @ts-ignore
        let kodikIframe = document.getElementById("kodik-player")?.contentWindow;
        if (kodikIframe) {
            kodikIframe.postMessage({key: "kodik_player_api", value: value}, '*');
        }
    }

    function checkPause(key: string) {
        if (key === 'kodik_player_pause') {
            return true
        }
        if (key === 'kodik_player_play') {
            return false
        }
        return watchLogs?.current?.isPaused ? watchLogs?.current?.isPaused : false
    }

    useEffect(() => {

        const kodikMessageListener = async (message: any) => {
            let Token = (await getJwt()).access;

            const {key, value} = message.data;

            if (key === 'kodik_player_time_update') {
                time.current = value
            }

            watchLogs.current = {
                hubId: hubIdHost.current ?? "0",
                releaseId: +id,
                seconds: key === "kodik_player_time_update" ? value : watchLogs?.current?.seconds ?? 0,
                episode: key === 'kodik_player_current_episode' ? value.episode : watchLogs?.current?.episode ?? 0,
                season: key === 'kodik_player_current_episode' ? value.season : watchLogs?.current?.season ?? 0,
                translationTitle: key === 'kodik_player_current_episode' ? value.translation.title : watchLogs?.current?.translationTitle ?? "",
                accessToken: Token ?? "",
                isPaused: checkPause(key)
            };
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
    }, [id]);

    async function leave() {
        isCloseConnection.current = true

        axios({
            method: "get",
            url: URLUsers + `/hubs/leave/${hubId}`,
            headers: {"Authorization": "Bearer " + (await getJwt()).access}
        }).then(() => {
            router.push("/welcome")
        }).catch(() => router.push("/welcome"))
    }

    useEffect(() => {
            async function ConnectHub(stompClient: any, isHost: boolean, title: string, socket: any) {
                hubIdHost.current = hubId
                setHubTitle(title)
                const handleConnect = () => {
                    console.log('Соединение установлено.', hubId);
                    setConnectionState("Подключён")

                    stompClient.subscribe(`/topic/watchlogs-${hubId}`, (message: any) => {
                        const watchLogResultDto = JSON.parse(message.body);
                        updateUser(watchLogResultDto, isHost)
                        console.log(watchLogResultDto)
                    });
                    let interval = setInterval( () => {
                        if (isCloseConnection.current){
                            setConnectionState("Разорвано")
                            stompClient.deactivate()
                            socket.close()
                            clearInterval(interval)
                            isCloseConnection.current = false
                        }
                        try {
                            if (watchLogs.current) {
                                const watchLogDto = watchLogs.current

                                const headers: any = {};
                                stompClient.publish({
                                    destination: '/app/watchlogs',
                                    body: JSON.stringify(watchLogDto),
                                    headers,
                                });
                            }
                        } catch (e) {
                            setConnectionState("Разорвано")
                            stompClient.deactivate()
                            socket.close()
                            clearInterval(interval)
                            startConnection()
                        }

                    }, 1000)
                };

                const handleError = (frame: any) => {
                    console.error('Произошла ошибка STOMP:', frame);
                    setConnectionState("Разорвано")
                };

                stompClient.onConnect = handleConnect;
                stompClient.onStompError = handleError;

                stompClient.activate();
            }

            async function checkHost(stompClient: any, socket: any) {
                axios({
                    method: "get",
                    url: URLUsers + `/hubs/is/host/${hubId}`,
                    headers: {"Authorization": "Bearer " + (await getJwt()).access}
                }).then(res => {
                    getInfo(stompClient, hubId, res.data, socket).catch(e => console.log(e))
                }).catch(e => console.log(e))
            }

            async function getInfo(stompClient: any, id: string | number, isHost: boolean, socket: any) {
                axios({
                    method: "get",
                    url: URLUsers + `/hubs/find/id/${id}`,
                    headers: {"Authorization": "Bearer " + (await getJwt()).access}
                }).then(res => {
                    ConnectHub(stompClient, isHost, res.data.title, socket).catch(e => console.log(e))
                }).catch(e => console.log(e))
            }

            if (useEffectIterate.current === 0) {
                useEffectIterate.current += 1
                startConnection()
            }

            function startConnection(){
                const socket = new SockJS(URLUsers + '/websocket');
                const stompClient = new Client({
                    webSocketFactory: () => socket,
                    debug: (str: string) => console.log(str),
                });
                checkHost(stompClient, socket).catch(e => console.log(e))
            }

    }, [hubId, leave, updateUser])

    return (
            <>
                <div className={"kodik_button skip"} title={"+80s"} onClick={() => setTime(time.current + 80)}>
                    <svg height="20px" width="20px" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                        <path d="M22.2,10.6l-9-5.4c-1-0.6-2.2,0.2-2.2,1.4v3.2L3.2,5.2C2.2,4.6,1,5.4,1,6.6v10.7c0,1.2,1.2,2,2.2,1.4l7.8-4.6   v3.2c0,1.2,1.2,2,2.2,1.4l9-5.4C23.3,12.8,23.3,11.2,22.2,10.6z"/>
                    </svg>
                </div>
                <div className={"kodik_button close"} onClick={() => router.push(`/anime/${id}`)}>
                    <svg height="20px" viewBox="0 0 512 512" width="20px" xmlns="http://www.w3.org/2000/svg">
                        <path d="M437.5,386.6L306.9,256l130.6-130.6c14.1-14.1,14.1-36.8,0-50.9c-14.1-14.1-36.8-14.1-50.9,0L256,205.1L125.4,74.5  c-14.1-14.1-36.8-14.1-50.9,0c-14.1,14.1-14.1,36.8,0,50.9L205.1,256L74.5,386.6c-14.1,14.1-14.1,36.8,0,50.9  c14.1,14.1,36.8,14.1,50.9,0L256,306.9l130.6,130.6c14.1,14.1,36.8,14.1,50.9,0C451.5,423.4,451.5,400.6,437.5,386.6z"/>
                    </svg>
                </div>
                <iframe id="kodik-player" style={{border: "none", transition: ".8s"}} allowFullScreen allow="autoplay; fullscreen"
                        width={"100%"} height={isShowHub ? "75%" : "94%"} src={src}/>
                <div style={{background: "#232323", width: "100%", display: "flex", justifyContent: "space-between", padding: "5px 20px", alignItems: "center"}}>
                    <div style={{cursor: "pointer", fontSize: "12px", width: "fit-content", display: "flex", alignItems: "center"}} onClick={leave}>
                        <svg width={20} height={20} fill={"white"} viewBox="0 0 64 64" xmlns="http://www.w3.org/2000/svg">
                            <path d="M30,28H9a1,1,0,0,1,0-2H30a1,1,0,0,1,0,2Z"/>
                            <path d="M36,57a1,1,0,0,1-.53-.15A1,1,0,0,1,35,56V18a1,1,0,0,1,.57-.9L52.66,9H45a1,1,0,0,1,0-2h9a3,3,0,0,1,3,3V44.76a3,3,0,0,1-1.66,2.69L36.45,56.89A1,1,0,0,1,36,57Zm1-38.37V54.38l17.45-8.72a1,1,0,0,0,.55-.9V10.11Z"/>
                            <path d="M17,37a1,1,0,0,1-.71-.29l-9-9a1,1,0,0,1,0-1.42l9-9a1,1,0,0,1,1.42,1.42L9.41,27l8.3,8.29a1,1,0,0,1,0,1.42A1,1,0,0,1,17,37Z"/>
                            <path d="M36,47H27a3,3,0,0,1-3-3V36a1,1,0,0,1,2,0v8a1,1,0,0,0,1,1h9a1,1,0,0,1,0,2Z"/>
                            <path d="M25,19a1,1,0,0,1-1-1V10a3,3,0,0,1,3-3H49a1,1,0,0,1,0,2H27a1,1,0,0,0-1,1v8A1,1,0,0,1,25,19Z"/>
                        </svg>
                    </div>
                    <div className={"watch_together_hud_connect_state"}>Статус подключения: <div className={getConnectionStateClassName(connectionState)}>{connectionState}</div> </div>
                    <div className={isShowHub ? "watch_together_hud_hide_button" : "watch_together_hud_hide_button close"} onClick={() => setIsShowHud(!isShowHub)}>
                        <svg width={20} height={20} viewBox="0 0 32 32" xmlns="http://www.w3.org/2000/svg">
                            <path d="M16.88,15.53,7,5.66A1,1,0,0,0,5.59,7.07l9.06,9.06-8.8,8.8a1,1,0,0,0,0,1.41h0a1,1,0,0,0,1.42,0l9.61-9.61A.85.85,0,0,0,16.88,15.53Z"/>
                            <path d="M26.46,15.53,16.58,5.66a1,1,0,0,0-1.41,1.41l9.06,9.06-8.8,8.8a1,1,0,0,0,0,1.41h0a1,1,0,0,0,1.41,0l9.62-9.61A.85.85,0,0,0,26.46,15.53Z"/>
                        </svg>
                    </div>
                </div>
                <div className={isShowHub ? "watch_together_hud" : "watch_together_hud close"}>
                    <div className={"watch_together_hud_header"}>{hubTitle}</div>
                    <div className={"watch_together_hud_names"}>
                        <div className={"watch_together_hud_text_item"}>Имя</div>
                        <div className={"watch_together_hud_text_item"}>Сезон</div>
                        <div className={"watch_together_hud_text_item"}>Эпизод</div>
                        <div className={"watch_together_hud_text_item"}>Озвучка</div>
                        <div className={"watch_together_hud_text_item"}>Время</div>
                    </div>
                    <div className={"watch_together_hud_user_list"}>
                        {userList?.map(user => <div className={"watch_together_hud_user"} key={user.username}>
                            <div className={"watch_together_hud_text_item"} style={{color: user.main ? "goldenrod" : ""}}>{user.username}</div>
                            <div className={"watch_together_hud_text_item"}>{user.season}</div>
                            <div className={"watch_together_hud_text_item"}>{user.episode}</div>
                            <div className={"watch_together_hud_text_item"}>{user.translationTitle}</div>
                            <div className={"watch_together_hud_text_item"}>{formatTime(user.seconds)}</div>
                        </div>)}
                    </div>
                </div>
            </>
    );
};

export default WatchTogetherKodik;