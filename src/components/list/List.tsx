"use client";
import React, { useEffect, useRef, useState } from "react";
import {ListProps} from "@/utils/interfaces";

const List = ({ onHover, isMouseScroll, children }: ListProps) => {

    const scrollRef = useRef(null);

    const [scrollLeft, setScrollLeft] = useState(0);
    const [maxScrollLeft, setMaxScrollLeft] = useState(0);

    useEffect(() => {
        const container: any = scrollRef.current;
        setScrollLeft(container.scrollLeft);
        setMaxScrollLeft(container.scrollWidth - container.clientWidth);
    }, []);

    function handleWheel(event: any) {
        event.stopPropagation();
        const container = event.currentTarget;
        const itemWidth = 306;
        const scrollAmount = event.deltaY > 0 ? itemWidth : -itemWidth;

        container.scrollTo({
            left: container.scrollLeft + scrollAmount,
            behavior: "smooth"
        });
        setScrollLeft(container.scrollLeft + scrollAmount);
    }

    function handleScrollLeft() {
        const container: any = scrollRef.current;

        if (container) {
            container.scrollBy({
                left: -306,
                behavior: "smooth"
            });
        }
        setScrollLeft(container.scrollLeft - 306);
    }

    function handleScrollRight() {
        const container: any = scrollRef.current;

        if (container) {
            container.scrollBy({
                left: 306,
                behavior: "smooth"
            });
        }
        setScrollLeft(container.scrollLeft - 306);
    }

    return (
        <div>
            <div className={(scrollLeft > 0) && onHover ? "left_button_1 active" : "left_button_1"}
                onClick={handleScrollLeft}>
                <svg height={30} width={30} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 320 512">
                    <path
                        d="M278.6 233.4c12.5 12.5 12.5 32.8 0 45.3l-160 160c-12.5 12.5-32.8 12.5-45.3 0s-12.5-32.8 0-45.3L210.7 256 73.4 118.6c-12.5-12.5-12.5-32.8 0-45.3s32.8-12.5 45.3 0l160 160z" />
                </svg>
            </div>

            <div className={(maxScrollLeft > scrollLeft) && onHover ? "right_button_1 active" : "right_button_1"}
                onClick={handleScrollRight}>
                <svg height={30} width={30} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 320 512">
                    <path
                        d="M278.6 233.4c12.5 12.5 12.5 32.8 0 45.3l-160 160c-12.5 12.5-32.8 12.5-45.3 0s-12.5-32.8 0-45.3L210.7 256 73.4 118.6c-12.5-12.5-12.5-32.8 0-45.3s32.8-12.5 45.3 0l160 160z" />
                </svg>
            </div>

            <div className={"episode_list"} ref={scrollRef} onScroll={(e) => setScrollLeft(e.currentTarget.scrollLeft)}
                onWheel={isMouseScroll ? handleWheel : undefined}
                style={isMouseScroll ? { overscrollBehaviorY: "none" } : {}}>
                <div className="episode_space" />
                {children}
            </div>
        </div>
    );
};

export default List;