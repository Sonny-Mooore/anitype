import React from 'react';
import "./subscription.css"
import Header from "@/components/header/Header";
import MediumContainer from "@/components/subscription/medium_container/MediumContainer";
import SubscribeButton from "@/components/subscription/subscribe_button/SubscribeButton";
import BigContainer from "@/components/subscription/big_container/BigContainer";
import SubscriptionSelectContainer
    from "@/components/subscription/subscription_select_container/SubscriptionSelectContainer";
const Page = () => {
    return (
        <div >
            <Header selected={"subscription"}/>
            <div className={"subscription_body"}>
                <MediumContainer headerText={"Подписавшись на AniType, вы сможете наслаждаться захватывающими аниме-фильмами и сериалами"}
                                 description={"Увлекательные фильмы и сериалы, разнообразные жанры - все это предлагает AniType!"}
                                 src={""}>
                    <SubscribeButton/>
                </MediumContainer>
                <div style={{height: 30}}/>
                {/*@ts-ignore*/}
                <BigContainer headerText={"Новинки каждую неделю и эксклюзивы"}
                              description={"Наслаждайтесь великолепными анимационными фильмами и сериалами прямо на нашем сайте"}
                              src={""}/>
                <div style={{height: 30}}/>
                <SubscriptionSelectContainer/>
                <div style={{height: 50}}/>
            </div>
        </div>
    );
};

export default Page;