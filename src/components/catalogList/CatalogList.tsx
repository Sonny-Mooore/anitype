"use client";
import React, {useEffect, useRef, useState} from "react";
import "@/components/releaseList/episodeList.css";
import "./catalogList.css";
import CatalogItem from "@/components/catalogItem/CatalogItem";
import List from "@/components/list/List";
import {episodeDeclension, getRankAnime, getStringGenres, sliceText} from "@/utils/function";
import Link from "next/link";
import {Anime, CatalogListProps} from "@/utils/interfaces";
import AddToFavoriteButton from "@/components/addToFavoriteButton/AddToFavoriteButton";


const CatalogList = ({ isMouseScroll = true, ...props }: CatalogListProps) => {

    const [onHover, setOnHover] = useState(false);

    const [headerOnHover, setHeaderOnHover] = useState(false);

    const [selectItem, setSelectItem] = useState<Anime | null>();

    const initUseEffect = useRef<boolean>(false)

    const elementScroll = useRef(null)

    useEffect(() => {
        if (initUseEffect.current){
            const i = setInterval(() => {
                scrollToElement(elementScroll)
                clearInterval(i);
            }, 750);
        }
        initUseEffect.current = true;
    }, [selectItem]);


    const scrollToElement = (ref: React.RefObject<HTMLElement>) => {
        if (ref.current) {
            ref.current.scrollIntoView({
                behavior: 'smooth',
                block: 'start',
            });
        }
    };



    return (
        <div onMouseEnter={() => setOnHover(true)} onMouseLeave={() => setOnHover(false)}>
            <div className={"list_catalog_header"} onMouseEnter={() => setHeaderOnHover(true)}
                onMouseLeave={() => setHeaderOnHover(false)}>
                <div className={"list_catalog_header_text"}>{props.header}</div>
                <div className={!headerOnHover ? "catalog_button active" : "catalog_button"}>
                    <svg style={{ marginTop: "2px" }} height={20} width={20}
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 320 512">
                        <path
                            d="M278.6 233.4c12.5 12.5 12.5 32.8 0 45.3l-160 160c-12.5 12.5-32.8 12.5-45.3 0s-12.5-32.8 0-45.3L210.7 256 73.4 118.6c-12.5-12.5-12.5-32.8 0-45.3s32.8-12.5 45.3 0l160 160z" />
                    </svg>
                </div>
            </div>
            <List onHover={onHover} isMouseScroll={isMouseScroll}>
                {props?.children?.map((i: any) => <CatalogItem title={i.props.title} description={i.props.description}
                    image={i.props.image}
                    numberEpisodes={i.numberEpisodes}
                    setSelectItem={setSelectItem} item={i.props.item}
                    selectItem={selectItem} key={i.props.item.id + props.header} />)}
            </List>
            <div className={selectItem ? "catalog_full_info_container active" : "catalog_full_info_container"} ref={elementScroll}>
                <div className={"catalog_left_info_container"}>
                    <div className={"catalog_left_info_header"}>
                        {selectItem ? selectItem?.titles?.ruAlt : null}
                    </div>
                    <div className={"catalog_info_rank_genres_container"}>
                        <div className={"search_rank_catalog_list"} style={{color: selectItem ? getRankAnime(selectItem).color : ""}} >{selectItem && getRankAnime(selectItem).rank !== 0 ? getRankAnime(selectItem).rank : ""}</div>
                        <div className={"catalog_info_genres"}>{selectItem?.episodesCount} {episodeDeclension(selectItem?.episodesCount)} · {`${selectItem?.year} · ${selectItem?.genres ? getStringGenres(selectItem?.genres) : ""}`}</div>
                    </div>
                    {selectItem?.description != "none" && <div className={"catalog_info_description"}>
                        {selectItem ? sliceText(selectItem?.description, 300) : null}
                    </div>}
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
                        <AddToFavoriteButton id={selectItem?.id ? selectItem?.id : 0} isActive={props.ids?.includes(selectItem?.id ? selectItem?.id : -1)} ids={props.ids} setIds={props.setIds}/>
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