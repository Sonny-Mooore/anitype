import React from "react";
import Header from "@/components/header/Header";
import EpisodeList from "@/components/releaseList/EpisodeList";
import "./my.css";
import axios from "axios";
import {URLUsers} from "@/utils/constants";
import {getAnimeTitle} from "@/utils/function";
import CatalogItem from "@/components/catalogItem/CatalogItem";
import CatalogList from "@/components/catalogList/CatalogList";

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

    const favorite = await getData("Буду смотреть")

    return (
        <div>
            <Header selected={"my"} />
            <div style={{ height: "100px" }} />
            <CatalogList header={"Буду смотреть"} isMouseScroll={true}>
                {favorite?.map((item: any) => <CatalogItem title={getAnimeTitle(item)} description={item.description}
                                                      image={item.poster}
                                                      numberEpisodes={item?.episodesCount ? item?.episodesCount : 0}
                                                      key={item.titles.original} item={item} />)}
            </CatalogList>
            <div className={"separator"} />
            <EpisodeList header={"История просмотра"} isMouseScroll={false} />
            <div className={"separator"} />
            <EpisodeList header={"Любимые"} isMouseScroll={false} />
        </div>
    );
};

export default Page;