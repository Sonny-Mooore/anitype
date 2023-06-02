"use client"
import React, {useEffect, useState} from 'react';
import axios from "axios";
import {URLBase, URLUsers} from "@/utils/constants";
import {getJwt} from "@/utils/JWT";
import CategoriesList from "@/components/categoriesList/CategoriesList";
import {capitalizeFirstLetter, getAnimeTitle} from "@/utils/function";
import CatalogItem from "@/components/catalogItem/CatalogItem";
import CatalogList from "@/components/catalogList/CatalogList";
import {Anime} from "@/utils/interfaces";

const CatalogFrame = () => {

    const [data, setData] = useState<Array<any>>()
    const [ids, setIds] = useState<Array<number>>([])
    const [popular, setPopular] = useState<Array<Anime>>()

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
                url: URLBase + "/anime/find/genres/grouped"
            }).then((response) => {
                return response.data;
            }).catch((error) => {
                console.log(error);
                return [];
            });

            setData(data)
            setIds(ids?.map((e: any)=> e.releaseId))


            let popular = await axios({
                method: "get",
                url: URLBase + "/anime/find/popular"
            }).then((response) => {
                return response.data;
            }).catch((error) => {
                console.log(error);
                return [];
            });
            setPopular(popular)
        }


        get().catch(e => console.log(e))
    }, [])

    return (
        <>
            {data &&
        <div style={{overflow: "hidden"}}>
            <CatalogList header={"Сейчас смотрят"} isMouseScroll={false} isAutoScroll={true} setIds={setIds} ids={ids} >
                {popular?.map((item: any) => <CatalogItem title={getAnimeTitle(item)} description={item.description}
                                                      image={item.poster}
                                                      numberEpisodes={item?.episodesCount ? item?.episodesCount : 0}
                                                      key={item.titles.original + "Сейчас смотрят"} item={item} />)}
            </CatalogList>
            {data?.map((item: any) => <CategoriesList title={capitalizeFirstLetter(item?.genre)} ids={ids} setIds={setIds} data={item?.releases} key={item?.genre + "CategoriesList"}/>)}
            <div style={{ height: "40px" }} />
        </div>
            }
            </>
    );
};

export default CatalogFrame;