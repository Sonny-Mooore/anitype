import React from 'react';
import "./SubscriptionSelectItem.css"

interface SubscriptionSelectItemProps{
    plusList: Array<string>
    price: number
    text: string
}
const SubscriptionSelectItem = ({plusList, price, text}: SubscriptionSelectItemProps) => {
    return (
        <div className={"subscription_select_item"}>
            <div className={"subscription_select_item_header"}>Подписка даёт:</div>
            {plusList.map((item, index) => <div className={"subscription_select_item_plus_text"} key={index}>· {item}</div>)}
            <div className={"subscription_select_item_button"}>{price} ₽ {text}</div>
        </div>
    );
};

export default SubscriptionSelectItem;