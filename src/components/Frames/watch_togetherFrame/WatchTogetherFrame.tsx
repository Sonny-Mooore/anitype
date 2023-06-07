"use client"
import React, {useEffect, useState} from 'react';
import WatchTogetherKodik from "@/components/watch_together_kodik/WatchTogetherKodik";
import {URLBase} from "@/utils/constants";
import axios from "axios";
import LoadingScreen from "@/components/loadingScreen/LoadingScreen";
import {WatchTogetherFrameProps} from "@/utils/interfaces";

const WatchTogetherFrame = ({id, hubId}: WatchTogetherFrameProps) => {

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
            {data ? <WatchTogetherKodik src={data?.sources?.kodik} id={id} hubId={hubId}/> : <LoadingScreen/>}
        </>
    );
};

export default WatchTogetherFrame;