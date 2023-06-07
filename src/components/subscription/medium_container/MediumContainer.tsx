import React from 'react';
import "./mediumContainer.css"
import {MediumContainerProps} from "@/utils/interfaces";

const MediumContainer = ({children, headerText, description}: MediumContainerProps) => {
    return (
        <div className={"medium_container"}>
            <div className={"medium_container_left_body"}>
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
            <div className={"medium_container_right_src"} style={{backgroundImage: `url("space-gray-mackbook.png")`}}>

            </div>
        </div>
    );
};

export default MediumContainer;