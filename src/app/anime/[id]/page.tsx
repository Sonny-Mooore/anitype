import "./anime.css";
import "@/components/catalogList/catalogList.css"
import React from "react";
import axios from "axios";
import { URLBase } from "@/utils/constants";
import Header from "@/components/header/Header";
import HeaderMobile from "@/components/header/HeaderMobile";
import Link from "next/link";
import {getAnimeTitle, getRankAnime, getStringGenres} from "@/utils/function";
import Image from "next/image";

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
        <div className={"anime_main_div"}>
            <Header selected={""} />
            <HeaderMobile selected={""} />
            <div className={"anime_background_image"} style={{
                backgroundImage: ` radial-gradient(circle, rgba(0, 0, 0, 0) 0%, rgba(0, 0, 0, 1) 70%, rgba(0, 0, 0, 1) 100%),
    linear-gradient(0deg, rgba(0, 0, 0, 1) 5%, rgba(0, 0, 0, 0) 100%),
    url("${data?.poster}")`
            }} />
            <div className={"anime_body"}>
                <div className={"anime_left_body"}>
                    <div className={"anime_body_poster"} style={{ backgroundImage: `url("${data?.poster}")` }} />
                    {/*<div className={"anime_episode_count"}>Вышло серий: {data?.episodesCount}</div>*/}
                    {/*<div className={"anime_status"}>Онгоинг</div>*/}
                </div>
                <div className={"anime_central_body"}>
                    <div className={"anime_central_body_title"}>{getAnimeTitle(data)}</div>
                    <div className={"anime_central_body_genres"}>
                        {data?.status === "released" && <div className={`anime_status ${data?.status}`}>
                            <Image src={"/done.svg"} width={15} height={15} alt={"done"}/>
                        </div>}
                        {data?.episodesCount} Серий · {data?.year} год · {data?.genres ? getStringGenres(data?.genres) : ""}</div>
                    <div
                        className={"anime_central_body_description"}>{data?.description !== "none" ? data?.description : ""}</div>
                    <div className={"catalog_info_watch_button_container"}>
                        <Link href={`/player/kodik/${id}`}>
                            <div className={"catalog_info_watch_button"}>
                                Смотреть
                            </div>
                        </Link>
                        <div className={"catalog_info_watch_button add_to_favorites"}>
                            <svg width={20} height={20} xmlns="http://www.w3.org/2000/svg"
                                viewBox="0 0 384 512">
                                <path
                                    d="M0 48V487.7C0 501.1 10.9 512 24.3 512c5 0 9.9-1.5 14-4.4L192 400 345.7 507.6c4.1 2.9 9 4.4 14 4.4c13.4 0 24.3-10.9 24.3-24.3V48c0-26.5-21.5-48-48-48H48C21.5 0 0 21.5 0 48z" />
                            </svg>
                        </div>
                    </div>
                </div>
                <div className={"anime_right_body"}>
                    <div className={"search_rank anime"} style={{color: data ? getRankAnime(data).color : ""}} >
                        {data && getRankAnime(data).rank !== 0 ? getRankAnime(data).rank : ""}
                    </div>
                    <div className={"add_rating"}>Оценить аниме</div>
                </div>
            </div>
            <div style={{ height: "100px" }}></div>
        </div>
    );
};


export default Page;