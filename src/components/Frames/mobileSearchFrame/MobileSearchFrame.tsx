"use client";
import React, {useEffect, useRef, useState} from 'react';
import Header from "@/components/header/Header";
import MobSearchElement from "@/components/mobSearchElement/mobSearchElement";
import "./mobileSearchFrame.css"
import axios from "axios";
import {URLBase} from "@/utils/constants";
import {getRankAnime} from "@/utils/function";

const MobileSearchFrame = () => {

    const [textSearch, setTextSearch] = useState("");
    const [searchResult, setSearchResult] = useState([]);

    const searchInterval = useRef(setInterval(() => ""));

    useEffect(() => {
        clearInterval(searchInterval.current);
        searchInterval.current = setInterval(() => {
            if (textSearch.length !== 0) {
                axios({
                    method: "get",
                    url: URLBase + `/anime/search/title?q=${textSearch}`
                }).then((res: any) => {
                    setSearchResult(res.data);
                }).catch((err: any) => {
                    console.log(err);
                });
            } else {
                setSearchResult([]);
            }
            clearInterval(searchInterval.current);
        }, 1000);
    }, [textSearch]);


    return (
        <>
            <Header selected={"mob-search"}/>

            <p className="only_mobile_warning">Эта страница только для мобильных устройств!</p>

            <div className="mob_search">

                <div className="mob_search_block">
                    <input value={textSearch} onChange={e => setTextSearch(e.target.value)} type="text" className="mob_search_input" placeholder="Фильмы, аниме"/>
                </div>

                <div className="mob_search_results_block">
                    <p>Результаты</p>

                    <div className="mob_search_results">
                        {searchResult.map((el: any) => <MobSearchElement id={el.id} imageUrl={el.poster} title={el.titles.ru} searchRank={getRankAnime(el).rank} date={el.year} key={el.id}/>)}
                    </div>
                </div>
            </div>
        </>
    );
};

export default MobileSearchFrame;