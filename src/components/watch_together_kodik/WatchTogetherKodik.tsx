"use client"
import React, {useEffect, useRef, useState} from 'react';
import {useRouter} from "next/navigation";
import "../kodik/kodik.css";
import "./watchTogetherKodik.css"
import axios from "axios";
import {URLUsers} from "@/utils/constants";
import {getJwt} from "@/utils/JWT";
import SockJS from 'sockjs-client';
import {Client} from '@stomp/stompjs';
import {formatTime} from "@/utils/function";

interface WatchTogetherKodikProps {
    src: string
    id: string
    hubId?: any
}

interface WatchLog {
    accessToken: string
    hubId: string
    seconds: number
    releaseId: number
    season: number
    episode: number
    translationTitle: string
    isPaused: boolean
}

interface User {
    hubId: string
    username: string
    isPaused: boolean
    main: boolean
    seconds: number
    releaseId: number
    season: number
    episode: number
    translationTitle: string
}

const WatchTogetherKodik = ({src, id, hubId}: WatchTogetherKodikProps) => {
    useRef(0);
    const [showHud, setShowHud] = useState(true)
    useRef(setInterval(() => {
    }));
    const router = useRouter()

    const [hubTitle, setHubTitle] = useState("")

    const hubIdHost = useRef()

    const useEffectIterate = useRef(0)

    const watchLogs = useRef<WatchLog>()

    const ArrayUser = useRef<Array<User>>([])
    const [userList, setUserList] = useState<Array<User>>()

    const [isShowHub, setIsShowHud] = useState(true)

    const updateUser = (user: User, isHost: boolean) => {

        if (!isHost){
            if (user.main){
                if (watchLogs.current?.isPaused != user.isPaused){

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
                if (!watchLogs.current?.seconds || Math.abs(watchLogs.current?.seconds - user.seconds) > 3){
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

    useEffect(() => {
        const kodikMessageListener = async (message: any) => {
            let Token = (await getJwt()).access;

            const {key, value} = message.data;

            function checkPause(key: string) {
                if (key === 'kodik_player_pause') {
                    return true
                }
                if (key === 'kodik_player_play') {
                    return false
                }
                return watchLogs?.current?.isPaused ? watchLogs?.current?.isPaused : false
            }

            watchLogs.current = {
                hubId: hubIdHost.current || "0",
                releaseId: +id,
                seconds: key === "kodik_player_time_update" ? value : watchLogs?.current?.seconds || 0,
                episode: key === 'kodik_player_current_episode' ? value.episode : watchLogs?.current?.episode || 0,
                season: key === 'kodik_player_current_episode' ? value.season : watchLogs?.current?.season || 0,
                translationTitle: key === 'kodik_player_current_episode' ? value.translation.title : watchLogs?.current?.translationTitle || "",
                accessToken: Token || "",
                isPaused: checkPause(key) || true
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
        axios({
            method: "get",
            url: URLUsers + `/hubs/leave/${hubIdHost}`,
            headers: {"Authorization": "Bearer " + (await getJwt()).access}
        }).then(() => {
            router.push("/welcome")
        })
    }

    useEffect(() => {
            async function ConnectHub(stompClient: any, isHost: boolean, title: string, socket: any) {
                hubIdHost.current = hubId
                setHubTitle(title)
                const handleConnect = () => {
                    console.log('Соединение установлено.', hubId);

                    stompClient.subscribe(`/topic/watchlogs-${hubId}`, (message: any) => {
                        const watchLogResultDto = JSON.parse(message.body);
                        updateUser(watchLogResultDto, isHost)
                    });

                    setInterval(async () => {
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
                            stompClient = new Client({
                                webSocketFactory: () => socket,
                                debug: (str: string) => console.log(str),
                            });

                            stompClient.subscribe(`/topic/watchlogs-${hubId}`, (message: any) => {
                                const watchLogResultDto = JSON.parse(message.body);
                                updateUser(watchLogResultDto, isHost)
                            });
                        }

                    }, 1000)
                };

                const handleError = (frame: any) => {
                    console.error('Произошла ошибка STOMP:', frame);
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
                    useEffectIterate.current += 1
                }).catch(e => console.log(e))
            }

            async function getInfo(stompClient: any, id: string | number, isHost: boolean, socket: any) {
                axios({
                    method: "get",
                    url: URLUsers + `/hubs/find/id/${id}`,
                    headers: {"Authorization": "Bearer " + (await getJwt()).access}
                }).then(res => {
                    ConnectHub(stompClient, isHost, res.data.title, socket).catch(e => console.log(e))
                    useEffectIterate.current += 1
                }).catch(e => console.log(e))
            }

            if (useEffectIterate.current === 0) {
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
                <iframe id="kodik-player" style={{border: "none"}} allowFullScreen allow="autoplay; fullscreen"
                        width={"100%"} height={"75%"} src={src}/>
                <div className={isShowHub ? "watch_together_hud" : "watch_together_hud close"}>
                    <div style={{textAlign: "right", cursor: "pointer", fontSize: "12px"}} onClick={() => leave()}>Выйти из комнаты</div>
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
                            <div className={"watch_together_hud_text_item"}>{user.username}</div>
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