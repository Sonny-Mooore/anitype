import React from "react";
import Header from "@/components/header/Header";
import EpisodeList from "@/components/releaseList/EpisodeList";
import "./my.css";
import axios from "axios";
import {URLUsers} from "@/utils/constants";
import FolderList from "@/components/folderList/FolderList";

async function getData(name: string){
    return await axios({
        method: "get",
        url: URLUsers + `/folders/items/${name}`
    }).then(res => {
        return res.data
    }).catch(e => {
        console.log(e)
    })
}


const Page = async () => {

    //const favorite = await getData("Буду смотреть")

    return (
        <div>
            <Header selected={"my"} />
            <div style={{ height: "100px" }} />
            <FolderList folderName={"Буду смотреть"}/>
            <div className={"separator"} />
            {/*<EpisodeList header={"История просмотра"} isMouseScroll={false} />*/}
            {/*<div className={"separator"} />*/}
            {/*<EpisodeList header={"Любимые"} isMouseScroll={false} />*/}
        </div>
    );
};

export default Page;