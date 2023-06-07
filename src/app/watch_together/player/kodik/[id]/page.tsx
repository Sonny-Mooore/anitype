import React from 'react';
import WatchTogetherFrame from "@/components/Frames/watch_togetherFrame/WatchTogetherFrame";
import "../../../../../components/kodik/kodik.css"
interface Props {
    params: { id: string };
}


const Page = ({ params: { id }, ...props }: Props) => {
    return (
        <div style={{ width: "100vw", height: "100vh", overflow: "hidden" }}>
            {/*@ts-ignore*/}
            <WatchTogetherFrame id={id} hubId={props.searchParams?.hub}/>
        </div>
    );
};

export default Page;