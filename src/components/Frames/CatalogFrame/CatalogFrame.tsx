"use client"
import React, {useEffect, useState} from 'react';
import axios from "axios";
import {URLBase, URLUsers} from "@/utils/constants";
import {getJwt} from "@/utils/JWT";
import CategoriesList from "@/components/categoriesList/CategoriesList";
import {capitalizeFirstLetter} from "@/utils/function";

const CatalogFrame = () => {

    const [data, setData] = useState([])
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
                url: URLBase + "/anime/find/genres/grouped"
            }).then((response) => {
                return response.data;
            }).catch((error) => {
                console.log(error);
                return [];
            });

            setData(data)
            setIds(ids.map((e: any)=> e.releaseId))
        }


        get().catch(e => console.log(e))
    }, [])

    return (
        <div style={{overflow: "hidden"}}>
            {data?.map((item: any) => <CategoriesList title={capitalizeFirstLetter(item?.genre)} ids={ids} setIds={setIds} data={item?.releases} key={item?.genre + "list"}/>)}
        </div>
    );
};

export default CatalogFrame;