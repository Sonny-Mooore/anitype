"use client";
import React from "react";
import { URLBase } from "@/utils/constants";
import axios from "axios";
import Kodik from "@/components/kodik/Kodik";
import "./kodik.css"
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


    const data = await getData(id);


    return (
        <div style={{ width: "100vw", height: "100vh", overflow: "hidden" }}>
            <Kodik src={data?.sources?.kodik} id={id}/>
        </div>
    );
};

export default Page;