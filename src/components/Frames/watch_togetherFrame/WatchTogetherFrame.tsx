"use client"
import React, {useEffect, useState} from 'react';
import WatchTogetherKodik from "@/components/watch_together_kodik/WatchTogetherKodik";
import {URLBase} from "@/utils/constants";
import axios from "axios";
interface WatchTogetherFrameProps{
    id: string
}

const WatchTogetherFrame = ({id}: WatchTogetherFrameProps) => {

    const [data, setData] = useState<any>()
    
    useEffect(() => {
        async function get() {
            if (id){
                setData(await axios({
                    method: "get",
                    url: URLBase + `/anime/id/${id}`
                }).then((res) => {
                    return res.data;
                }).catch((error) => {
                    console.log(error);
                    return {};
                }))
            }
        }
        get().catch(e => console.log(e))
    }, [id])


    return (
        <>
            {data && <WatchTogetherKodik id={id} src={data?.sources?.kodik}/>}
        </>
    );
};

export default WatchTogetherFrame;