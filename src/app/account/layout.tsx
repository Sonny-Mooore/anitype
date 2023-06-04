'use client';

import {FC, PropsWithChildren} from 'react'
import Header from "@/components/header/Header";
import './layout.css'
import Image from 'next/image'
import Link from "next/link";
import {usePathname} from "next/navigation";
import clsx from "clsx";

const ProfileLayout: FC<PropsWithChildren> = ({children}) => {
    const pathname = usePathname()

    return <>
        <Header selected={"auth"}/>
        <div style={{height: "100px"}}/>
        <div className="account-layout">
            <div className="account-layout_sidebar">
                <div className="account-layout_sidebar_block">
                    <span className="account-layout_sidebar_block-title">Основное</span>
                    <Link href="/account"
                          className={clsx('account-layout_sidebar_block-item', pathname === '/account' && 'selected')}>
                        <div>
                            <Image src="/account/my-account.png" alt="My account icon" width={20} height={20}/>
                        </div>
                        <span>Мой аккаунт</span>
                    </Link>
                    <Link href="#"
                          className={clsx('account-layout_sidebar_block-item', pathname === '/account/profile' && 'selected')}>
                        <div>
                            <Image src="/account/profile.png" alt="Profile icon" width={20} height={20}/>
                        </div>
                        <span>Профиль</span>
                    </Link>
                    <Link href="#"
                          className={clsx('account-layout_sidebar_block-item', pathname === '/account/friends' && 'selected')}>
                        <div>
                            <Image src="/account/friends.png" alt="My account icon" width={20} height={20}/>
                        </div>
                        <span>Друзья</span>
                    </Link>
                    <Link href="#"
                          className={clsx('account-layout_sidebar_block-item', pathname === '/account/notifications' && 'selected')}>
                        <div>
                            <Image src="/account/notifications.png" alt="My account icon" width={20} height={20}/>
                        </div>
                        <span>Уведомления</span>
                    </Link>
                </div>
                <div className="account-layout_sidebar_block">
                    <span className="account-layout_sidebar_block-title">Настройки</span>
                    <Link href="#"
                          className={clsx('account-layout_sidebar_block-item', pathname === '/account/design' && 'selected')}>
                        <div>
                            <Image src="/account/design.png" alt="My account icon" width={20} height={20}/>
                        </div>
                        <span>Внешний вид</span>
                    </Link>
                    <Link href="#"
                          className={clsx('account-layout_sidebar_block-item', pathname === '/account/language' && 'selected')}>
                        <div>
                            <Image src="/account/language.png" alt="My account icon" width={20} height={20}/>
                        </div>
                        <span>Язык</span>
                    </Link>
                    <Link href="#"
                          className={clsx('account-layout_sidebar_block-item', pathname === '/account/preferences' && 'selected')}>
                        <div>
                            <Image src="/account/preferences.png" alt="My account icon" width={20} height={20}/>
                        </div>
                        <span>Предпочтения</span>
                    </Link>
                    <Link href="#"
                          className={clsx('account-layout_sidebar_block-item', pathname === '/account/security' && 'selected')}>
                        <div>
                            <Image src="/account/security.png" alt="My account icon" width={20} height={20}/>
                        </div>
                        <span>Безопасность</span>
                    </Link>
                    <Link href="#"
                          className={clsx('account-layout_sidebar_block-item', pathname === '/account/private' && 'selected')}>
                        <div>
                            <Image src="/account/private.png" alt="My account icon" width={20} height={20}/>
                        </div>
                        <span>Конфиденциальность</span>
                    </Link>
                </div>
                <div className="account-layout_sidebar_block">
                    <span className="account-layout_sidebar_block-title">Другое</span>
                    <Link href="#" className="account-layout_sidebar_block-item">
                        <div>
                            <Image src="/account/windows-app.png" alt="My account icon" width={20} height={20}/>
                        </div>
                        <span>Приложение</span>
                    </Link>
                    <Link href="#" className="account-layout_sidebar_block-item">
                        <div>
                            <Image src="/account/discord.png" alt="My account icon" width={20} height={20}/>
                        </div>
                        <span>Наш discord сервер</span>
                    </Link>
                    <Link href="#" className="account-layout_sidebar_block-item">
                        <div>
                            <Image src="/account/telegram.png" alt="My account icon" width={20} height={20}/>
                        </div>
                        <span>Наш telegram канал</span>
                    </Link>
                </div>
            </div>
            {children}
        </div>
    </>
}

export default ProfileLayout