"use client"
import React, {useEffect, useState} from 'react';
import axios from "axios";
import {URLBase, URLUsers} from "@/utils/constants";
import CatalogItem from "@/components/catalogItem/CatalogItem";
import {getAnimeTitle} from "@/utils/function";
import CatalogList from "@/components/catalogList/CatalogList";
import {getJwt} from "@/utils/JWT";
import {FolderListProps} from "@/utils/interfaces";

const FolderList = ({folderName}: FolderListProps) => {
    
    const [list, setList] = useState([])
    const [ids, setIds] = useState<Array<number>>([])

    useEffect(() => {
        
        async function get(){
            let listId =  await axios({
                method: "get",
                url: URLUsers + `/folders/items/${folderName}`,
                headers: {"Authorization": "Bearer " + (await getJwt()).access}
            }).then(res => {
                return res.data?.map((e: any)=> e.releaseId)
            }).catch(e => {
                console.log(e)
                return []
            })
            let listAnime = []

            if (listId?.join(",") !== ""){
                listAnime =  await axios({
                    method: "get",
                    url: URLBase + `/anime/ids?ids=${listId?.join(",")}`,
                }).then(res => {
                    return res.data
                }).catch(e => {
                    console.log(e)
                })
            }

            setList(listAnime)
            setIds(listId)

        }
        get().catch(e => console.log(e))
    }, [folderName])

    return (
            <CatalogList header={folderName} isMouseScroll={true} ids={ids} setIds={setIds}>
                {list?.map((item: any) => <CatalogItem title={getAnimeTitle(item)} description={item?.description}
                                                           image={item?.poster}
                                                           numberEpisodes={item?.episodesCount ? item?.episodesCount : 0}
                                                           key={item.titles?.original} item={item} />)}
            </CatalogList>
    );
};

export default FolderList;