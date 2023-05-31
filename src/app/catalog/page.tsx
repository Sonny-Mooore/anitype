import React from "react";
import Header from "@/components/header/Header";
import "./catalog.css";
import CatalogList from "@/components/catalogList/CatalogList";
import axios from "axios";
import { URLBase } from "@/utils/constants";
import CatalogItem from "@/components/catalogItem/CatalogItem";
import {getAnimeTitle} from "@/utils/function";
import CatalogFrame from "@/components/Frames/CatalogFrame/CatalogFrame";

async function getData() {
    return await axios({
        method: "get",
        url: URLBase + "/anime/find/popular"
    }).then((response) => {
        return response.data;
    }).catch((error) => {
        console.log(error);
        return [];
    });
}

const Page = async () => {

    const data = await getData();

    return (
        <div>
            <Header selected={"catalog"} />
            <div style={{ height: "100px" }} />
            <CatalogList header={"Сейчас смотрят"} isMouseScroll={false}>
                {data.map((item: any) => <CatalogItem title={getAnimeTitle(item)} description={item.description}
                    image={item.poster}
                    numberEpisodes={item?.episodesCount ? item?.episodesCount : 0}
                    key={item.titles.original+ "Сейчас смотрят"} item={item} />)}
            </CatalogList>
            <CatalogFrame/>
        </div>
    );
};

export default Page;