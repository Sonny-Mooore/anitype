"use client";
import React, {useEffect, useState} from "react";
import "./catalogItem.css";
import {CatalogItemProps} from "@/utils/interfaces";


const CatalogItem = ({ watchEpisode = 0, ...props }: CatalogItemProps) => {

    //TODO: add watchEpisode, отредактировать шрифт

    const [description, setDescription] = useState("");

    useEffect(() => {
        if (props.description.length >= 285) {
            setDescription(props.description.slice(0, 255) + "...");
        } else {
            setDescription(props.description);
        }
    }, [props.description]);

    return (
        <div className={"catalog_item"} onClick={() => props.setSelectItem(props.item)}
            style={{
                backgroundImage: `linear-gradient(to top, rgba(0, 0, 0, 0.7), rgba(0, 0, 0, 0.0)), url(${props.image})`,
                border: props.selectItem === props.item ? "1px solid rgb(134,134,134)" : "none"
            }}>
            <div className={"hovered"}>
                <div className={"catalog_item_description"}>{description}</div>
                <div className="catalog_item_container_metadata">
                    <div className="catalog_item_name">{props.title}</div>
                </div>
            </div>
        </div>
    );
};
export default CatalogItem;