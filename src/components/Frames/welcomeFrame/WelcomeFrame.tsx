"use client"
import React, {useEffect, useRef, useState} from 'react';
import Header from "@/components/header/Header";
import CatalogList from "@/components/catalogList/CatalogList";
import CatalogItem from "@/components/catalogItem/CatalogItem";
import {getAnimeTitle} from "@/utils/function";
import {Anime} from "@/utils/interfaces";
import {URLBase, URLUsers} from "@/utils/constants";
import {getJwt} from "@/utils/JWT";
import axios from "axios";

const WelcomeFrame = () => {

    const [data, setData] = useState<Array<Anime>>()
    const [ids, setIds] = useState<Array<number>>([])

    const iterateUseEffect = useRef(0)

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
                url: URLBase + "/anime/find/popular"
            }).then((response) => {
                return response.data;
            }).catch((error) => {
                console.log(error);
                return [];
            });

            setData(data)
            setIds(ids.map((e: any)=> e.releaseId))
        }

        if (iterateUseEffect.current === 0){
            get().catch(e => console.log(e))
            iterateUseEffect.current += 1
        }
    }, [])

    return (
        <>
            <Header selected={"welcome"} />
            {data &&
        <div style={{overflow: "scroll"}}>

            <div className="welcome_background">
                <div className="welcome_text">Смотри аниме на AniType</div>
                <div className={"welcome_description_text"}>Огромное количество релизов с озвучкой от любимых студий,
                    современный дизайн и не только, зарегистрируйся прямо сейчас
                </div>
            </div>
            <div className="container">
                <CatalogList header={"Сейчас смотрят"} isMouseScroll={true} ids={ids} setIds={setIds} isAutoScroll={true}>
                    {data?.map((item: any) => <CatalogItem title={getAnimeTitle(item)} description={item.description}
                                                          image={item.poster}
                                                          numberEpisodes={item?.episodesCount ? item?.episodesCount : 0}
                                                          key={item.titles.original} item={item}/>)}
                </CatalogList>
            </div>
            <div style={{height: "50px", marginTop: "10px"}}/>
        </div>}
        </>
    );
};

export default WelcomeFrame;