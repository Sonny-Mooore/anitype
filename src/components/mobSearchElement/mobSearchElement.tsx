import React from 'react';
import {SearchElementProps} from "@/utils/interfaces";
import {getRankColor, transformTitle} from "@/utils/function";
import Link from "next/link";
import './mobSearchElement.css'

const MobSearchElement = ({ id, imageUrl, searchRank, date, title}: SearchElementProps) => {
    return (
        <Link href={`/anime/${id}`} className="search_element_mob_root">
            <div className={"search_element_mob"}>
                <div className={"search_poster_mob"} style={{ backgroundImage: `url(${imageUrl})` }} />
                <div className={"search_body"}>
                    <div className={"search_info_mob"}>
                        <div className={"search_title_mob"}>{transformTitle(title)}</div>
                        <div style={{ display: "flex"}}>
                            {searchRank !== 0 && <div className={"search_rank"}
                                                      style={{color: getRankColor(searchRank)}}>{searchRank}</div>}
                            <div className={"search_date"}>аниме, {date}</div>
                        </div>
                        {/*<div className={`search_status ${status}`}>{status === "released" ? "Вышел" : "Онгоинг"}</div>*/}
                    </div>
                    <button className={"search_result_button_mob"}>Смотреть</button>
                </div>
            </div>
        </Link>
    );
};

export default MobSearchElement;