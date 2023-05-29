"use client";
import React, {useEffect, useRef, useState} from "react";
import "@/components/releaseList/episodeList.css";
import "./catalogList.css";
import CatalogItem from "@/components/catalogItem/CatalogItem";
import List from "@/components/list/List";
import {getRankAnime, getStringGenres, sliceText} from "@/utils/function";
import Link from "next/link";
import {Anime, CatalogListProps} from "@/utils/interfaces";


const CatalogList = ({ isMouseScroll = true, ...props }: CatalogListProps) => {

    const [onHover, setOnHover] = useState(false);

    const [headerOnHover, setHeaderOnHover] = useState(false);

    const [selectItem, setSelectItem] = useState<Anime | null>();

    const initUseEffect = useRef<boolean>(false)

    useEffect(() => {
        if (initUseEffect.current){
            const i = setInterval(() => {
                Scroll();
                clearInterval(i);
            }, 750);
        }
        initUseEffect.current = true;
    }, [selectItem]);

    function Scroll() {
        window.scrollTo({
            top: 800,
            behavior: "smooth"
        });
    }


    return (
        <div onMouseEnter={() => setOnHover(true)} onMouseLeave={() => setOnHover(false)}>
            <div className={"list_catalog_header"} onMouseEnter={() => setHeaderOnHover(true)}
                onMouseLeave={() => setHeaderOnHover(false)}>
                <div className={"list_catalog_header_text"}>{props.header}</div>
                <div className={!headerOnHover ? "catalog_button active" : "catalog_button"}>
                    <svg style={{ marginTop: "5.5px" }} height={20} width={20}
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 320 512">
                        <path
                            d="M278.6 233.4c12.5 12.5 12.5 32.8 0 45.3l-160 160c-12.5 12.5-32.8 12.5-45.3 0s-12.5-32.8 0-45.3L210.7 256 73.4 118.6c-12.5-12.5-12.5-32.8 0-45.3s32.8-12.5 45.3 0l160 160z" />
                    </svg>
                </div>
            </div>
            <List onHover={onHover} isMouseScroll={isMouseScroll}>
                {props.children.map((i: any) => <CatalogItem title={i.props.title} description={i.props.description}
                    image={i.props.image}
                    numberEpisodes={i.numberEpisodes}
                    setSelectItem={setSelectItem} item={i.props.item}
                    selectItem={selectItem} key={i.props.title} />)}
            </List>
            <div className={selectItem ? "catalog_full_info_container active" : "catalog_full_info_container"}>
                <div className={"catalog_left_info_container"}>
                    <div className={"catalog_left_info_header"}>
                        {selectItem ? selectItem?.titles?.ruAlt : null}
                    </div>
                    <div className={"catalog_info_rank_genres_container"}>
                        <div className={"search_rank"} style={{color: selectItem ? getRankAnime(selectItem).color : ""}} >{selectItem && getRankAnime(selectItem).rank !== 0 ? getRankAnime(selectItem).rank : ""}</div>
                        <div className={"catalog_info_genres"}>{`${selectItem?.year}, ${selectItem?.genres ? getStringGenres(selectItem?.genres) : ""}`}</div>
                    </div>
                    <div className={"catalog_info_description"}>
                        {selectItem ? sliceText(selectItem?.description, 300) : null}
                    </div>
                    <div className={"catalog_info_watch_button_container"}>
                        <Link href={`/player/kodik/${selectItem?.id}`}>
                            <div className={"catalog_info_watch_button"}>
                                Смотреть
                            </div>
                        </Link>
                        <Link href={`/anime/${selectItem?.id}`}>
                            <div className={"catalog_info_watch_button more_detailed"}>
                                Подробнее
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
                <div className={selectItem ? "catalog_info_container active" : "catalog_info_container"}
                    style={{ backgroundImage: selectItem ? `linear-gradient(90deg, rgba(0, 0, 0, 1) 0%, rgba(0, 0, 0, 0.8184523809523809) 17%, rgba(0, 0, 0, 0) 34%, rgba(0, 0, 0, 0) 80%), url("${selectItem?.poster}")` : "" }}>
                    <div style={{ width: "10px", height: "10px" }} onClick={() => setSelectItem(null)}>
                        <svg
                            className={"catalog_info_close_button"}
                            viewBox="0 0 512 512" width={23} height={23}
                            xmlns="http://www.w3.org/2000/svg">
                            <path
                                d="M437.5,386.6L306.9,256l130.6-130.6c14.1-14.1,14.1-36.8,0-50.9c-14.1-14.1-36.8-14.1-50.9,0L256,205.1L125.4,74.5  c-14.1-14.1-36.8-14.1-50.9,0c-14.1,14.1-14.1,36.8,0,50.9L205.1,256L74.5,386.6c-14.1,14.1-14.1,36.8,0,50.9  c14.1,14.1,36.8,14.1,50.9,0L256,306.9l130.6,130.6c14.1,14.1,36.8,14.1,50.9,0C451.5,423.4,451.5,400.6,437.5,386.6z" />
                        </svg>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default CatalogList;