import React from "react";
import Header from "@/components/header/Header";
import "./my.css";
import FolderList from "@/components/folderList/FolderList";


const Page = () => {

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