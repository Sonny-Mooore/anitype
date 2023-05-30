"use client";
import React from "react";
import { URLBase } from "@/utils/constants";
import axios from "axios";
import Kodik from "@/components/kodik/Kodik";
import "./kodik.css"
import {useRouter} from "next/navigation";
interface Props {
    params: { id: string };
}

async function getData(id: string) {
    return await axios({
        method: "get",
        url: URLBase + `/anime/id/${id}`
    }).then((res) => {
        return res.data;
    }).catch((error) => {
        console.log(error);
        return {};
    });
}

const Page = async ({ params: { id } }: Props) => {
    const router = useRouter()

    const data = await getData(id);


    return (
        <div style={{ width: "100vw", height: "100vh", overflow: "hidden" }}>
            <div className={"kodik_close_button"} onClick={() => router.push(`/anime/${id}`)}>
                <svg height="20px" viewBox="0 0 512 512" width="20px" xmlns="http://www.w3.org/2000/svg">
                    <path d="M437.5,386.6L306.9,256l130.6-130.6c14.1-14.1,14.1-36.8,0-50.9c-14.1-14.1-36.8-14.1-50.9,0L256,205.1L125.4,74.5  c-14.1-14.1-36.8-14.1-50.9,0c-14.1,14.1-14.1,36.8,0,50.9L205.1,256L74.5,386.6c-14.1,14.1-14.1,36.8,0,50.9  c14.1,14.1,36.8,14.1,50.9,0L256,306.9l130.6,130.6c14.1,14.1,36.8,14.1,50.9,0C451.5,423.4,451.5,400.6,437.5,386.6z"/>
                </svg>
            </div>
            <Kodik src={data?.sources?.kodik}/>
        </div>
    );
};

export default Page;