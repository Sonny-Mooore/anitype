import React from "react";
import Link from "next/link";
import {HeaderMobileProps} from "@/utils/interfaces";



const HeaderMobile = (props: HeaderMobileProps) => {
    return (
        <div className="header_mobile">
            <div className="header__center header__part">
                <Link href={"/welcome"}>
                    <span className={props.selected == "welcome" ? "link selected" : "link"}>
                        <svg width={20} height={20} style={{ marginTop: "7px" }} xmlns="http://www.w3.org/2000/svg"
                            viewBox="0 0 576 512">
                            <path
                                d="M575.8 255.5c0 18-15 32.1-32 32.1h-32l.7 160.2c0 2.7-.2 5.4-.5 8.1V472c0 22.1-17.9 40-40 40H456c-1.1 0-2.2 0-3.3-.1c-1.4 .1-2.8 .1-4.2 .1H416 392c-22.1 0-40-17.9-40-40V448 384c0-17.7-14.3-32-32-32H256c-17.7 0-32 14.3-32 32v64 24c0 22.1-17.9 40-40 40H160 128.1c-1.5 0-3-.1-4.5-.2c-1.2 .1-2.4 .2-3.6 .2H104c-22.1 0-40-17.9-40-40V360c0-.9 0-1.9 .1-2.8V287.6H32c-18 0-32-14-32-32.1c0-9 3-17 10-24L266.4 8c7-7 15-8 22-8s15 2 21 7L564.8 231.5c8 7 12 15 11 24z" />
                        </svg>
                    </span>
                </Link>
                <Link href={"/catalog"}>
                    <span className={props.selected == "catalog" ? "link selected" : "link"}>Каталог</span>
                </Link>
                <Link href={"/my"}>
                    <span className={props.selected == "my" ? "link selected" : "link"}>Моё</span>
                </Link>
                <Link href="/">
                    <span className="link link_icon">
                        <svg viewBox="0 0 24 24" width={23} height={23} className="header__icon" version="1.1"
                            xmlns="http://www.w3.org/2000/svg">
                            <path fillRule="evenodd"
                                d="M16.4 11a5.9 5.9 0 1 1-11.8 0 5.9 5.9 0 0 1 11.8 0Zm-1.044 6.977a8.5 8.5 0 1 1 2.121-2.121l4.084 4.083-2.122 2.122-4.083-4.084Z">
                            </path>
                        </svg>
                    </span>
                </Link>
            </div>
        </div>
    );
};

export default HeaderMobile;