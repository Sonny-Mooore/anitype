"use client";
import React, { useEffect, useRef, useState } from "react";
import "./header.css";
import Link from "next/link";
import axios from "axios";
import { URLServer } from "@/utils/constants";
import SearchElement from "@/components/header/searchElement/SearchElement";
import {getRankAnime} from "@/utils/function";
import {HeaderProps} from "@/utils/interfaces";




const Header = (props: HeaderProps) => {
    const [isSearch, setIsSearch] = useState(false);
    const [textSearch, setTextSearch] = useState("");
    const [searchResult, setSearchResult] = useState([]);

    const searchInterval = useRef(setInterval(() => ""));

    const inputRef = useRef<HTMLInputElement>(null);

    const [linkActivated, setLinkActivated] = useState<string>("");

    const handleSpanClick = () => {
        if (inputRef.current) {
            inputRef.current.focus();
        }
    };

    function getLinkClassName(selected: string, link: string, isSearch: boolean, linkActivated: string) {
        if (isSearch) return "link hidden";
        if (selected === link && linkActivated === "") return "link selected";
        if (linkActivated === link) return "link activated";
        return "link";
    }

    useEffect(() => {
        clearInterval(searchInterval.current);
        searchInterval.current = setInterval(() => {
            if (textSearch.length !== 0) {
                axios({
                    method: "get",
                    url: URLServer + `/anime/search/title?q=${textSearch}`
                }).then((res: any) => {
                    setSearchResult(res.data);
                    console.log(res.data);
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
        <div className={isSearch ? "header search_show" : "header"}>
            <div className={isSearch ? "header__part search_show" : "header__part"}>
                <Link href={"/welcome"}>
                    <span className="link logo">AniType</span>
                </Link>
            </div>
            <div className={isSearch ? "header__part search_show" : "header__part"}>
                <Link href={"/welcome"} onClick={() => setLinkActivated("welcome")}>
                    <span className={getLinkClassName(props.selected, "welcome", isSearch, linkActivated)}>Главное</span>
                </Link>
                <Link href={"/catalog"} onClick={() => setLinkActivated("catalog")}>
                    <span className={getLinkClassName(props.selected, "catalog", isSearch, linkActivated)}>Каталог</span>
                </Link>
                <Link href={"/my"} onClick={() => setLinkActivated("my")}>
                    <span className={getLinkClassName(props.selected, "my", isSearch, linkActivated)}>Моё</span>
                </Link>

                <div className={isSearch ? "search_container active" : "search_container"}>
                    <input placeholder={"Аниме"} className={isSearch ? "search_input active" : "search_input"} ref={inputRef}
                        value={textSearch} onChange={(e) => setTextSearch(e.target.value)} />
                    <div className={"search_result"}>
                        {searchResult.map((item: any) => <SearchElement id={item.id} imageUrl={item.poster}
                            title={item.titles.ru}
                            searchRank={getRankAnime(item).rank}
                            date={item.year} key={item.id} />)}
                    </div>
                </div>
                <div>
                    <span
                        className={isSearch ? "link_icon search_show" : "link_icon"}
                        onClick={() => {
                            setIsSearch(!isSearch)
                            handleSpanClick()
                        }}
                    >
                        {!isSearch ?
                            <svg viewBox="0 0 24 24" width={23} height={23}
                                className={isSearch ? "header__icon search_show" : "header__icon"} version="1.1"
                                xmlns="http://www.w3.org/2000/svg">
                                <path fillRule="evenodd"
                                    d="M16.4 11a5.9 5.9 0 1 1-11.8 0 5.9 5.9 0 0 1 11.8 0Zm-1.044 6.977a8.5 8.5 0 1 1 2.121-2.121l4.084 4.083-2.122 2.122-4.083-4.084Z">
                                </path>
                            </svg> :
                            <svg className={isSearch ? "header__icon search_show" : "header__icon"}
                                viewBox="0 0 512 512" width={23} height={23}
                                xmlns="http://www.w3.org/2000/svg">
                                <path
                                    d="M437.5,386.6L306.9,256l130.6-130.6c14.1-14.1,14.1-36.8,0-50.9c-14.1-14.1-36.8-14.1-50.9,0L256,205.1L125.4,74.5  c-14.1-14.1-36.8-14.1-50.9,0c-14.1,14.1-14.1,36.8,0,50.9L205.1,256L74.5,386.6c-14.1,14.1-14.1,36.8,0,50.9  c14.1,14.1,36.8,14.1,50.9,0L256,306.9l130.6,130.6c14.1,14.1,36.8,14.1,50.9,0C451.5,423.4,451.5,400.6,437.5,386.6z" />
                            </svg>}
                    </span>
                </div>
            </div>
            <div className={isSearch ? "header__part search_show" : "header__part"}>
                <Link href={"/auth"}>
                    <span className="link">Войти</span>
                </Link>
            </div>
        </div>
    );
};

export default Header;