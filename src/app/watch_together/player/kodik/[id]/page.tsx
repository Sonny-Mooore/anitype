
import React from 'react';
import WatchTogetherFrame from "@/components/Frames/watch_togetherFrame/WatchTogetherFrame";
import "../../../../../components/kodik/kodik.css"
interface Props {
    params: { id: string };
}


const Page = async ({ params: { id } }: Props) => {

    return (
        <div style={{ width: "100vw", height: "100vh", overflow: "hidden" }}>
            <WatchTogetherFrame id={id}/>
        </div>
    );
};

export default Page;