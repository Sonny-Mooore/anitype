"use client";
import React, { useState } from "react";
import "./episodeList.css";
import EpisodeItem from "@/components/releaseItem/EpisodeItem";
import List from "@/components/list/List";

interface EpisodeListProps {
    header: string,
    isMouseScroll?: boolean | true
}

const ReleaseList = ({ isMouseScroll = true, ...props }: EpisodeListProps) => {

    const [onHover, setOnHover] = useState(false);


    return (
        <div onMouseEnter={() => setOnHover(true)} onMouseLeave={() => setOnHover(false)}>
            <div className={"list_episode_header"}>{props.header}</div>
            <List isMouseScroll={isMouseScroll} onHover={onHover}>
                <EpisodeItem
                    image={"https://lipsium.cloud.kodik-storage.com/useruploads/00a9c195-c74c-4dfc-9219-007f0f9e7827/84411358c0007a0965d9bf1c3267076c:2023052422/thumb004.jpg"}
                    time={"24 мин"}
                    title={"Ангел по соседству"} />
                <EpisodeItem
                    image={"https://sagitta.cloud.kodik-storage.com/useruploads/00a9c195-c74c-4dfc-9219-007f0f9e7827/84411358c0007a0965d9bf1c3267076c:2023052422/thumb003.jpg"}
                    time={"24 мин"}
                    title={"Ангел по соседству"} />
                <EpisodeItem
                    image={"https://lipsium.cloud.kodik-storage.com/useruploads/00a9c195-c74c-4dfc-9219-007f0f9e7827/84411358c0007a0965d9bf1c3267076c:2023052422/thumb004.jpg"}
                    time={"24 мин"}
                    title={"Ангел по соседству"} />
                <EpisodeItem image={"https://data-vyhoda-info.ru/wp-content/uploads/2022/09/21.jpg"}
                    time={"24 мин"}
                    title={"Унеси меня на луну"} watch={{ fullTime: 2500, viewed: 1000 }} />
                <EpisodeItem
                    image={"https://lipsium.cloud.kodik-storage.com/useruploads/00a9c195-c74c-4dfc-9219-007f0f9e7827/84411358c0007a0965d9bf1c3267076c:2023052422/thumb004.jpg"}
                    time={"24 мин"}
                    title={"Ангел по соседству"} />
                <EpisodeItem
                    image={"https://sagitta.cloud.kodik-storage.com/useruploads/00a9c195-c74c-4dfc-9219-007f0f9e7827/84411358c0007a0965d9bf1c3267076c:2023052422/thumb003.jpg"}
                    time={"24 мин"}
                    title={"Ангел по соседству"} />
                <EpisodeItem
                    image={"https://lipsium.cloud.kodik-storage.com/useruploads/00a9c195-c74c-4dfc-9219-007f0f9e7827/84411358c0007a0965d9bf1c3267076c:2023052422/thumb004.jpg"}
                    time={"24 мин"}
                    title={"Ангел по соседству"} />
                <EpisodeItem
                    image={"https://elvis.cloud.kodik-storage.com/useruploads/00a9c195-c74c-4dfc-9219-007f0f9e7827/84411358c0007a0965d9bf1c3267076c:2023052422/thumb002.jpg"}
                    time={"24 мин"}
                    title={"Ангел по соседству"} />
            </List>
        </div>
    );
};

export default ReleaseList;