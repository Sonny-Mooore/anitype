"use client"
import React, {useEffect, useState} from 'react';
import "./newList.css"
import {Anime} from "@/utils/interfaces";
import {URLBase} from "@/utils/constants";
import axios from "axios";


const NewList = () => {

    const [data, setData] = useState<Array<Anime>>([])

    useEffect(() => {
        async function getData(){
            await axios({
                method: "get",
                url: URLBase + "/anime/find/last"
            }).then((response) => {
                setData(response.data)
            }).catch((error) => {
                console.log(error);
                return [];
            });
        }

        getData().catch(e => console.log(e))
    }, [])


    return (
        <div className={"new_list"}>
            {data.map((item) => <div className={"new_list_item"} key={item.id} style={{backgroundImage: `url("${item.poster}")`}}>

            </div>)}
        </div>
    );
};

export default NewList;