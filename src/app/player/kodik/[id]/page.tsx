import React from "react";
import Kodik from "@/components/kodik/Kodik";
import "./kodik.css"
interface Props {
    params: { id: string };
}

const Page = ({ params: { id } }: Props) => {

    return (
        <>
            <Kodik id={id}/>
        </>
    );
};

export default Page;