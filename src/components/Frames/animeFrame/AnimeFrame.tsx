"use client"
import React, {useEffect, useState} from 'react';
import Header from "@/components/header/Header";
import {episodeDeclension, getAnimeTitle, getRankAnime, getStringGenres} from "@/utils/function";
import Image from "next/image";
import Link from "next/link";
import AddToFavoriteButton from "@/components/addToFavoriteButton/AddToFavoriteButton";
import {Anime, AnimeFrameProps} from "@/utils/interfaces";
import axios from "axios";
import {URLBase, URLUsers} from "@/utils/constants";
import {getJwt} from "@/utils/JWT";
import "../../../app/anime/[id]/anime.css"
import WatchTogetherButton from "@/components/watchTogetherButton/WatchTogetherButton";
import LoadingScreen from "@/components/loadingScreen/LoadingScreen";

const AnimeFrame = ({id}: AnimeFrameProps) => {

    const [data, setData] = useState<Anime>()
    const [ids, setIds] = useState<Array<number>>([])

    useEffect(() => {
        async function get(){
            let ids = await axios({
                method: "get",
                url: URLUsers + `/folders/items/Буду смотреть`,
                headers: {"Authorization": "Bearer " + (await getJwt()).access}
            }).then(res => {
                console.log(res.data)
                return res.data
            }).catch(e => {
                console.log(e)
            })

            let data = await axios({
                method: "get",
                url: URLBase + `/anime/id/${id}`
            }).then((res) => {
                return res.data;
            }).catch((error) => {
                console.log(error);
                return {};
            });
            setData(data)
            setIds(ids.map((e: any)=> e.releaseId))
        }

        get().catch(e => console.log(e))
    }, [id])

    return (
        <>
            {data ? <div className={"anime_main_div"}>
                <Header selected={""}/>
                <div className={"anime_background_image_mob"} style={{
                    backgroundImage: ` radial-gradient(circle, rgba(0, 0, 0, 0) 0%, rgba(0, 0, 0, 1) 70%, rgba(0, 0, 0, 1) 100%),
    linear-gradient(0deg, rgba(0, 0, 0, 1) 5%, rgba(0, 0, 0, 0) 100%),
    url("${data?.poster}")`
                }}/>
                <div className={"anime_body"}>
                    <div className={"anime_left_body"}>
                        <div className={"anime_body_poster"} style={{backgroundImage: `url("${data?.poster}")`}}/>
                    </div>
                    <div className={"anime_central_body"}>
                        <div className={"anime_central_body_title"}>{getAnimeTitle(data)}</div>
                        <div className={"anime_central_body_genres"}>
                            {data?.status === "released" ? <div className={`anime_status ${data?.status}`}>
                                <Image src={"/done.svg"} width={15} height={15} alt={"done"}/>
                            </div> : <Image style={{marginRight: "7px"}} src={"/car.svg"} width={30} height={30} alt={"done"}/>}
                            <div className={"anime_central_body_genres_text"}>
                                {episodeDeclension(data?.episodesCount)} · {data?.year} год
                                · {data?.genres ? getStringGenres(data?.genres) : ""}
                            </div>
                        </div>
                        {data?.description !== "none" ? <div className={"anime_central_body_description"}>{data?.description}</div> :
                            <div className={"anime_central_body_description none"}>Нет описания</div>}
                        <div className={"catalog_info_watch_button_container"}>
                            <Link href={`/player/kodik/${id}`}>
                                <div className={"catalog_info_watch_button"}>
                                    Смотреть
                                </div>
                            </Link>
                            <WatchTogetherButton id={id}/>
                            <AddToFavoriteButton id={+id} isActive={ids.includes(data?.id ? data?.id : -1)}
                                                 setIds={setIds} ids={ids}/>
                        </div>
                    </div>
                    <div className={"anime_right_body"}>
                        <div className={"search_rank anime"} style={{color: data ? getRankAnime(data).color : ""}}>
                            {data && getRankAnime(data).rank !== 0 ? getRankAnime(data).rank : ""}
                        </div>
                        <div className={"add_rating"}>Оценить аниме</div>
                    </div>
                </div>

                {/* Mobile version */}
                <div className={"anime_body_mob"}>
                    <div className={"anime_left_body_mob"}>
                        <div className={"anime_body_poster_mob"} style={{backgroundImage: `url("${data?.poster}")`}}/>
                    </div>
                    <div className={"anime_central_body_mob"}>
                        <div className={"anime_central_body_title_mob"}>{getAnimeTitle(data)}</div>
                        <div className={"anime_central_body_genres_mob"}>
                            {data?.status === "released" ? <div className={`anime_status ${data?.status}`}>
                                <Image src={"/done.svg"} width={15} height={15} alt={"done"}/>
                            </div> : <Image style={{marginRight: "7px"}} src={"/car.svg"} width={30} height={30} alt={"done"}/>}
                            <div className={"anime_central_body_genres_text"}>
                                {episodeDeclension(data?.episodesCount)} · {data?.year} год
                                · {data?.genres ? getStringGenres(data?.genres) : ""}
                            </div>
                        </div>

                        <div className={"catalog_info_watch_button_container_mob"}>
                            <Link href={`/player/kodik/${id}`}>
                                <div className={"catalog_info_watch_button"}>
                                    Смотреть
                                </div>
                            </Link>
                            {/*<WatchTogetherButton id={id}/>*/}
                            <AddToFavoriteButton id={+id} isActive={ids.includes(data?.id ? data?.id : -1)}
                                                 setIds={setIds} ids={ids}/>
                        </div>

                        {data?.description !== "none" ? <div className={"anime_central_body_description_mob"}>{data?.description}</div> :
                            <div className={"anime_central_body_description none"}>Нет описания</div>}

                    {/*    here be buttons */}
                    </div>
                    <div className={"anime_right_body_mob"}>
                        <div className={"search_rank anime"} style={{color: data ? getRankAnime(data).color : ""}}>
                            {data && getRankAnime(data).rank !== 0 ? getRankAnime(data).rank : ""}
                        </div>
                        <div className={"add_rating"}>Оценить аниме</div>
                    </div>
                </div>
                {/**/}
                <div style={{height: "100px"}}></div>
            </div> : <LoadingScreen/>}
        </>

    );
};

export default AnimeFrame;