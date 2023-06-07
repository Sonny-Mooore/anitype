"use client"
import React, {useEffect} from 'react';
import {addToFavorite, removeToFavorite} from "@/utils/function";
import "./addToFavoriteButton.css"
import {checkUserAuth} from "@/utils/verifications";
import {useRouter} from "next/navigation";

interface AddToFavoriteButtonProps{
    id: number
    isActive: boolean
    setIds: any
    ids: any
}
const AddToFavoriteButton = ({id, isActive, setIds, ids}: AddToFavoriteButtonProps) => {

    const router = useRouter()
    
    useEffect(() => {
        router.prefetch("/auth")
    }, [router])

    return (
        <div className={isActive ? "catalog_info_watch_button add_to_favorites active" : "catalog_info_watch_button add_to_favorites"} onClick={async () => {
            if (isActive) {
                if (await checkUserAuth()){
                    removeToFavorite(id).catch(e => console.log(e))
                }else{
                    router.push("/auth")
                }
                const newArray: number[] = ids.filter((element: any) => element !== id);
                setIds(newArray)
            }
            else {
                if (await checkUserAuth()) {
                    addToFavorite(id).catch(e => console.log(e))
                }else{
                    router.push("/auth")
                }
                const copiedArray: number[] = [...ids];
                setIds([...copiedArray, id])
            }
        }}>
            <svg width={20} height={20} xmlns="http://www.w3.org/2000/svg"
                 viewBox="0 0 384 512">
                <path
                    d="M0 48V487.7C0 501.1 10.9 512 24.3 512c5 0 9.9-1.5 14-4.4L192 400 345.7 507.6c4.1 2.9 9 4.4 14 4.4c13.4 0 24.3-10.9 24.3-24.3V48c0-26.5-21.5-48-48-48H48C21.5 0 0 21.5 0 48z" />
            </svg>
        </div>
    );
};

export default AddToFavoriteButton;