"use client"
import React from 'react';
import {URLUsers} from "@/utils/constants";
import {getJwt} from "@/utils/JWT";
import {useRouter} from "next/navigation";
import "../../app/anime/[id]/anime.css"
import axios from "axios";
interface WatchTogetherButtonProps{
    id: string
}

const WatchTogetherButton = ({ id }:WatchTogetherButtonProps) => {

    const router = useRouter()

    async function createHub(){
        axios({
            method: "post",
            url: URLUsers + "/hubs",
            headers: {"Authorization": "Bearer " + (await getJwt()).access}
        }).then((res) => {
            router.push(`/watch_together/player/kodik/${id}?hub=${res.data.id}`)
        })
    }

    return (
        <div className={"catalog_info_watch_button watch_together"} onClick={() => createHub()}>
            Смотреть вместе
        </div>
    );
};

export default WatchTogetherButton;