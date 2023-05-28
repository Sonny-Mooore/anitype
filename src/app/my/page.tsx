import React from "react";
import Header from "@/components/header/Header";
import HeaderMobile from "@/components/header/HeaderMobile";
import EpisodeList from "@/components/releaseList/EpisodeList";
import "./my.css";

const Page = () => {
    return (
        <div>
            <Header selected={"my"} />
            <HeaderMobile selected={"my"} />
            <div style={{ height: "100px" }} />
            <EpisodeList header={"Буду смотреть"} isMouseScroll={false} />
            <div className={"separator"} />
            <EpisodeList header={"История просмотра"} isMouseScroll={false} />
            <div className={"separator"} />
            <EpisodeList header={"Любимые"} isMouseScroll={false} />
        </div>
    );
};

export default Page;