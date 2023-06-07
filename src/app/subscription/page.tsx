import React from 'react';
import "./subscription.css"
import Header from "@/components/header/Header";

const Page = () => {
    return (
        <div>
            <Header selected={"subscription"}/>

            <div className="subscription_header">
                <h1 className="subscription_header_logo">Samurai</h1>
                <p className="subscription_header_desc">Поддержка разработчиков и куча бонусов</p>
            </div>

            <div className="subscription_bonuses">
                <h1>Преимущества подписки</h1>

                <div className="sub_bonuses_cont">

                    <div className="subscription_bonus">
                        <p className="subscription_bonus_title">Кастомизация профиля</p>
                        <p className="subscription_bonus_desc">Значок рядом с именем пользователя, возможность установить gif аватарку</p>
                    </div>

                    <div className="subscription_bonus">
                        <p className="subscription_bonus_title">Создание коллекций (в разработке)</p>
                        <p className="subscription_bonus_desc">Возможность создания своих коллекций (списков с аниме)</p>
                    </div>

                    <div className="subscription_bonus">
                        <p className="subscription_bonus_title">Имя пользователя</p>
                        <p className="subscription_bonus_desc">Возможность смены имени пользователя, а также снижен лимит (от 3 символов)</p>
                    </div>

                    <div className="subscription_bonus">
                        <p className="subscription_bonus_title">Комментарии (в разработке)</p>
                        <p className="subscription_bonus_desc">Увеличение количества комментариев, которые вы можете оставить к аниме/в день</p>
                    </div>

                    <div className="subscription_bonus">
                        <p className="subscription_bonus_title">Лидербоард (в разработке)</p>
                        <p className="subscription_bonus_desc">Отображение вашего имени пользователя в лидерборде</p>
                    </div>

                    <div className="subscription_bonus">
                        <p className="subscription_bonus_title">Самое главное</p>
                        <p className="subscription_bonus_desc">Поддержка создателей сайта</p>
                    </div>

                </div>
            </div>

            <div className="subscription_footer">
                <h1 className="subscription_header_logo">Цена</h1>
                <p className="subscription_header_desc">69 руб./мес (и подписка друзьям в подарок)</p>

                <div className="subscription_vars">
                    <div className="subscription_var">
                        <p className="subscription_var_title">1 месяц (69 р.)</p>
                        <p className="subscription_var_desc">Подписка другу в подарок!</p>
                    </div>

                    <div className="subscription_var">
                        <p className="subscription_var_title">3 месяца (199 р.)</p>
                        <p className="subscription_var_desc">Подписка двум друзьям в подарок!</p>
                    </div>

                    <div className="subscription_var">
                        <p className="subscription_var_title">6 месяцев (399 р.)</p>
                        <p className="subscription_var_desc">Подписка трём друзьям в подарок!</p>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Page;