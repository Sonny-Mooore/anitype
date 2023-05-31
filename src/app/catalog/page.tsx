import React from "react";
import Header from "@/components/header/Header";
import "./catalog.css";
import CatalogFrame from "@/components/Frames/CatalogFrame/CatalogFrame";

const Page = async () => {

    return (
        <div>
            <Header selected={"catalog"} />
            <div style={{ height: "100px" }} />
            <CatalogFrame/>
        </div>
    );
};

export default Page;