import React from 'react';
import "../medium_container/mediumContainer.css"
import "./SubscriptionSelectContainer.css"
import SubscriptionSelectItem
    from "@/components/subscription/subscription_select_container/subscription_select_item/SubscriptionSelectItem";
const SubscriptionSelectContainer = () => {
    return (
        <div className={"medium_container select"}>
            {/*<div className={"subscription_select_container_header"}></div>*/}
            <div style={{display: "flex"}}>
                <SubscriptionSelectItem text={"за месяц"} price={69} plusList={["Кастомизацию своего профиля", "Поддержку создателей сайта", "Подписку другу в подарок"]}/>
                <SubscriptionSelectItem text={"за 3 месяца"} price={199} plusList={["Кастомизацию своего профиля", "Поддержку создателей сайта", "Подписку двум друзьям в подарок"]}/>
                <SubscriptionSelectItem text={"за 6 месяцев"} price={399} plusList={["Кастомизацию своего профиля", "Поддержку создателей сайта", "Подписку трём друзьям в подарок"]}/>
            </div>
        </div>
    );
};

export default SubscriptionSelectContainer;