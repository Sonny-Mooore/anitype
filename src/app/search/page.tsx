import React from 'react';
import './mobsearch.css'
import Header from "@/components/header/Header";
import SearchElement from "@/components/header/searchElement/SearchElement";
import MobSearchElement from "@/components/mobSearchElement/mobSearchElement";

const Page = () => {
    return (
            <>
                <Header selected={"mob-search"}/>
                <div className="mob_search">

                    <div className="mob_search_block">
                        <input type="text" className="mob_search_input" placeholder="Фильмы, сериалы, персоны"/>
                    </div>

                    <div className="mob_search_results_block">
                        <p>Результаты</p>

                        <div className="mob_search_results">
                            <MobSearchElement id={"1"} imageUrl={"https://st.kp.yandex.net/images/film_big/4789626.jpg"} title={"Атака титанов"} searchRank={8.3} date={"202"}/>
                            <MobSearchElement id={"1"} imageUrl={"https://st.kp.yandex.net/images/film_big/4789626.jpg"} title={"Атака титанов"} searchRank={8.3} date={"202"}/>
                            <MobSearchElement id={"1"} imageUrl={"https://st.kp.yandex.net/images/film_big/4789626.jpg"} title={"Атака титанов"} searchRank={8.3} date={"202"}/>
                            <MobSearchElement id={"1"} imageUrl={"https://st.kp.yandex.net/images/film_big/4789626.jpg"} title={"Атака титанов"} searchRank={8.3} date={"202"}/>
                            <MobSearchElement id={"1"} imageUrl={"https://st.kp.yandex.net/images/film_big/4789626.jpg"} title={"Атака титанов"} searchRank={8.3} date={"202"}/>
                            <MobSearchElement id={"1"} imageUrl={"https://st.kp.yandex.net/images/film_big/4789626.jpg"} title={"Атака титанов"} searchRank={8.3} date={"202"}/>
                            <MobSearchElement id={"1"} imageUrl={"https://st.kp.yandex.net/images/film_big/4789626.jpg"} title={"Атака титанов"} searchRank={8.3} date={"202"}/>
                            <MobSearchElement id={"1"} imageUrl={"https://st.kp.yandex.net/images/film_big/4789626.jpg"} title={"Атака титанов"} searchRank={8.3} date={"202"}/>
                            <MobSearchElement id={"1"} imageUrl={"https://st.kp.yandex.net/images/film_big/4789626.jpg"} title={"Атака титанов"} searchRank={8.3} date={"202"}/>
                        </div>
                    </div>
                </div>
            </>
    );
};

export default Page;