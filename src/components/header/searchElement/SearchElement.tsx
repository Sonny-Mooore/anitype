import React from "react";
import "./searchElement.css";
import Link from "next/link";
import {SearchElementProps} from "@/utils/interfaces";


const SearchElement = ({ id, imageUrl, searchRank, date, title }: SearchElementProps) => {
    return (
        <Link href={`/anime/${id}`}>
            <div className={"search_element"}>
                <div className={"search_poster"} style={{ backgroundImage: `url(${imageUrl})` }} />
                <div className={"search_body"}>
                    <div className={"search_info"}>
                        <div className={"search_title"}>{title}</div>
                        <div style={{ display: "flex" }}>
                            <div className={"search_rank"}>{searchRank}</div>
                            <div className={"search_date"}>аниме, {date}</div>
                        </div>
                    </div>
                    <button className={"search_result_button"}>Смотреть</button>
                </div>
            </div>
        </Link>
    );
};

export default SearchElement;