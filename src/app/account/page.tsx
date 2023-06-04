import './account.css'
import Image from "next/image";

const Account = () => {
    return <div className="account">
        <div className="account_title">
            <div>
                <Image src="/account/my-account.png" alt="My account icon" width={20} height={20}/>
            </div>
            <span>Мой аккаунт</span>
        </div>
        <div className="account_main">
            <div className="account_main_header">
                <Image src="/account/example-account-header.png" fill alt="Profile header"/>
            </div>
            <div className="account_main_block">
                <div className="account_main_block_head">
                    <div className="account_main_block_head_avatar-container">
                        <div className="account_main_block_head_avatar">
                            <Image src="/account/example-account-avatar.jpg" alt="User's avatar" fill/>
                        </div>
                        <div className="account_main_block_head_online-status"/>
                    </div>
                    <div className="account_main_block_head_name-and-desc">
                        <span>Anonymous</span>
                        <span>Short description</span>
                    </div>
                    <button>Редактировать профиль</button>
                </div>
                <div className="account_main_block_data">
                    <div className="account_main_block_data_row">
                        <div className="account_main_block_data_row_info">
                            <span>Отображаемое имя</span>
                            <span>Anonymous</span>
                        </div>
                        <button>Изменить</button>
                    </div>
                    <div className="account_main_block_data_row">
                        <div className="account_main_block_data_row_info">
                            <span>Электронная почта</span>
                            <span>*******@gmail.com<span>Показать</span></span>
                        </div>
                        <button>Изменить</button>
                    </div>
                    <div className="account_main_block_data_row">
                        <div className="account_main_block_data_row_info">
                            <span>Номер телефона</span>
                            <span>**********2134<span>Показать</span></span>
                        </div>
                        <button>Изменить</button>
                    </div>
                    <div className="account_main_block_data_row">
                        <div className="account_main_block_data_row_info">
                            <span>Телеграм</span>
                            <span>@zafross</span>
                        </div>
                        <button>Изменить</button>
                    </div>
                </div>
            </div>
        </div>
    </div>
}

export default Account