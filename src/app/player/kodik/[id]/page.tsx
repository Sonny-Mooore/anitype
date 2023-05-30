import React from "react";
import { URLBase } from "@/utils/constants";
import axios from "axios";

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
            <iframe width={"100%"} height={"100%"} src={data?.sources?.kodik} />
        </div>
    );
};

export default Page;