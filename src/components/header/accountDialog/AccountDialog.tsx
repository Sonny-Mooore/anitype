import React, {Dispatch, SetStateAction, useState} from 'react';
import "./accountDialog.css"
import Image from "next/image";

interface AccountDialogProps{
    active: boolean
    setActive: Dispatch<SetStateAction<boolean>>
}

const AccountDialog = ({active, setActive}: AccountDialogProps) => {

    const [avatar, setAvatar] = useState("")

    return (
        <div className={active ? "accountDialog_background active" : "accountDialog_background"} onClick={() => setActive(false)}>
            <div className={"accountDialog_container"} onClick={e => e.stopPropagation()}>
                <div className={"accountDialog_container_left_body"}>
                    <div className={"accountDialog_container_left_body_list_item active"}>Основные</div>
                    <div className={"accountDialog_container_left_body_list_item"}>Персонализация <Image width={10} height={10} src={"/road-work.svg"} alt={"work"}/></div>
                    <div className={"accountDialog_container_left_body_list_item"}>Друзья <Image width={10} height={10} src={"/road-work.svg"} alt={"work"}/></div>
                </div>
                <div className={"accountDialog_container_separator"}></div>
                <div className={"accountDialog_container_right_body"}>
                    <div className={"accountDialog_container_right_body_top_container"}>
                        <div className={"accountDialog_container_right_body_avatar"}>
                            <div className={"accountDialog_container_right_body_pick_avatar"}>
                                <Image width={40} height={40} src={"/image-upload.svg"} alt={"upload"}/>
                            </div>
                        </div>
                        <div className={"accountDialog_container_right_body_user_name"}>Fllcker</div>
                    </div>
                    <div className={"accountDialog_container_right_body_user_info_container"}>
                        <div className={"accountDialog_container_right_info_block"}>
                            <div>
                                <div className={"accountDialog_container_right_info_block_title"}>
                                    Имя пользователя
                                </div>
                                <div className={"accountDialog_container_right_info_block_text"}>
                                    Fllcker
                                </div>
                            </div>
                            <div className={"accountDialog_container_right_info_block_change_button"}>Изменить</div>
                        </div>
                        <div className={"accountDialog_container_right_info_block"}>
                            <div>
                                <div className={"accountDialog_container_right_info_block_title"}>
                                    Email
                                </div>
                                <div className={"accountDialog_container_right_info_block_text"}>
                                    zalupa@gmail.com
                                </div>
                            </div>
                            <div className={"accountDialog_container_right_info_block_change_button"}>Изменить</div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default AccountDialog;