import React from 'react';
import CatalogItem from "@/components/catalogItem/CatalogItem";
import {getAnimeTitle} from "@/utils/function";
import CatalogList from "@/components/catalogList/CatalogList";
import "../../app/my/my.css";
interface CategoriesListProps{
    title: string
    ids: any
    setIds: any
    data: any
}

const CategoriesList = ({data, title, ids, setIds}: CategoriesListProps) => {



    return (
        <>
            <div className={"separator"} />
            <CatalogList header={title} isMouseScroll={false} ids={ids} setIds={setIds}>
                {data?.map((item: any) => <CatalogItem title={getAnimeTitle(item)} description={item.description}
                                                       image={item.poster}
                                                       numberEpisodes={item?.episodesCount ? item?.episodesCount : 0}
                                                       key={item.titles.original + "CatalogItem"} item={item}/>)}
            </CatalogList>
        </>
    );
};

export default CategoriesList;