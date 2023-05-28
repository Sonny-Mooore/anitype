"use client";
import React from "react";
import "./welcomePage.css";
import Header from "@/components/header/Header";
import HeaderMobile from "@/components/header/HeaderMobile";
import axios from "axios";
import CatalogList from "@/components/catalogList/CatalogList";
import CatalogItem from "@/components/catalogItem/CatalogItem";
import { URL } from "@/utils/constants";


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
        <div>
            <Header selected={"welcome"} />
            <HeaderMobile selected={"welcome"} />
            <div className="welcome_background">
                <div className="welcome_text">Смотри аниме на AniType</div>
                <div className={"welcome_description_text"}>Огромное количество релизов с озвучкой от любимых студий,
                    современный дизайн и не только, зарегистрируйся прямо сейчас
                </div>
            </div>
            <div className="container">
                <CatalogList header={"Сейчас смотрят"} isMouseScroll={true}>
                    {data.map((item: any) => <CatalogItem title={item.titles.ruAlt} description={item.description}
                                                          image={item.poster}
                                                          numberEpisodes={item.episodesCount}
                                                          key={item.titles.original} item={item} />)}
                </CatalogList>
            </div>
        </div>
    );
};

export default Page;
