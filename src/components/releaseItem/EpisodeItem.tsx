import React from "react";
import "./episodeItem.css";
import {EpisodeItemProps} from "@/utils/interfaces";


const EpisodeItem = (props: EpisodeItemProps) => {
    return (
        <div className={"episode_item"}
            style={{ backgroundImage: `linear-gradient(to top, rgba(0, 0, 0, 0.7), rgba(0, 0, 0, 0.0)), url(${props.image})` }}>
            <div className="episode_item_container_metadata">
                <div className="episode_item_name">{props.title}</div>
                <div className="episode_item_time">{props.time}</div>
            </div>
            {/*{props.watch && <div className="release_item_container_watch">*/}
            {/*    <div className="time_container">*/}
            {/*        <div className="time_fill" style={{width: `${props.watch.viewed / props.watch.fullTime * 100}%`}}/>*/}
            {/*    </div>*/}
            {/*</div>}*/}
        </div>
    );
};

export default EpisodeItem;