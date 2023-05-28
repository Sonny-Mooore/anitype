
"use client";
import React from "react";
import Header from "@/components/header/Header";
import HeaderMobile from "@/components/header/HeaderMobile";
import "./catalog.css";
import CatalogList from "@/components/catalogList/CatalogList";
import axios from "axios";
import { URL } from "@/utils/constants";
import CatalogItem from "@/components/catalogItem/CatalogItem";

async function getData() {
    return await axios({
        method: "get",
        url: URL + "/anime/find/popular"
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
        <div style={{ height: "100vh" }}>
            <Header selected={"catalog"} />
            <HeaderMobile selected={"catalog"} />
            <div style={{ height: "100px" }} />
            <CatalogList header={"Сейчас смотрят"} isMouseScroll={false}>
                {data.map((item: any) => <CatalogItem title={item.titles.ruAlt} description={item.description}
                    image={item.poster}
                    numberEpisodes={item.episodesCount}
                    key={item.titles.original} item={item} />)}
            </CatalogList>
        </div>
    );
};

export default Page;