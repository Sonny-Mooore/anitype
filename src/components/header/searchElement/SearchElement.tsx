import React from "react";
import "./searchElement.css";
import Link from "next/link";
import {SearchElementProps} from "@/utils/interfaces";
import {getRankColor, transformTitle} from "@/utils/function";


const SearchElement = ({ id, imageUrl, searchRank, date, title}: SearchElementProps) => {
    return (
        <Link href={`/anime/${id}`}>
            <div className={"search_element"}>
                <div className={"search_poster"} style={{ backgroundImage: `url(${imageUrl})` }} />
                <div className={"search_body"}>
                    <div className={"search_info"}>
                        <div className={"search_title"}>{transformTitle(title)}</div>
                        <div style={{ display: "flex"}}>
                            {searchRank !== 0 && <div className={"search_rank"}
                                  style={{color: getRankColor(searchRank)}}>{searchRank}</div>}
                            <div className={"search_date"}>аниме, {date}</div>
                        </div>
                        {/*<div className={`search_status ${status}`}>{status === "released" ? "Вышел" : "Онгоинг"}</div>*/}
                    </div>
                    <button className={"search_result_button"}>Смотреть</button>
                </div>
            </div>
        </Link>
    );
};

export default SearchElement;