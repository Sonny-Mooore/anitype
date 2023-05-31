import "./anime.css";
import "@/components/catalogList/catalogList.css"
import React from "react";
import AnimeFrame from "@/components/Frames/animeFrame/AnimeFrame";

interface Props {
    params: { id: string };
}

const Page = async ({ params: { id } }: Props) => {


    return (
        <AnimeFrame id={id}/>
    );
};


export default Page;