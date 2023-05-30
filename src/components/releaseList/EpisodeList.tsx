"use client";
import React, { useState } from "react";
import "./episodeList.css";
import List from "@/components/list/List";

interface EpisodeListProps {
    header: string,
    isMouseScroll?: boolean | true
    children?: any
}

const ReleaseList = ({ isMouseScroll = true, children, ...props }: EpisodeListProps) => {

    const [onHover, setOnHover] = useState(false);


    return (
        <div onMouseEnter={() => setOnHover(true)} onMouseLeave={() => setOnHover(false)}>
            <div className={"list_episode_header"}>{props.header}</div>
            <List isMouseScroll={isMouseScroll} onHover={onHover}>
                {children}
            </List>
        </div>
    );
};

export default ReleaseList;