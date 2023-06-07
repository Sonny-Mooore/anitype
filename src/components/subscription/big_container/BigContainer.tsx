import React from 'react';
import "./bigContainer.css"
import "../medium_container/mediumContainer.css"
import NewList from "@/components/subscription/new_list/NewList";
import {BigContainerProps} from "@/utils/interfaces";

const BigContainer = async ({ headerText, children, description}: BigContainerProps) => {

    return (
        <div className={"big_container"}>
            <div className={"big_container_top"}>
                <div className={"medium_container_left_body"}>
                    <div className={"big_container_logo"}>AniType</div>
                    <div className={"medium_container_left_header"}>
                        {headerText}
                    </div>
                    <div className={"medium_container_left_description"}>
                        {description}
                    </div>
                    <div className={"medium_container_left_children"}>
                        {children}
                    </div>
                </div>
                <div className={"medium_container_right_src"} style={{backgroundImage: `url("ipad.png")`, scale: 1.2}}/>
            </div>
            <div className={"big_container_separator"}/>
            <div className={"big_container_bottom"}>
                <NewList/>
            </div>
        </div>
    );
};

export default BigContainer;