import React, {Dispatch, SetStateAction} from 'react';
import "./accountDialog.css"
import Image from "next/image";

interface AccountDialogProps{
    active: boolean
    setActive: Dispatch<SetStateAction<boolean>>
}

const AccountDialog = ({active, setActive}: AccountDialogProps) => {



    return (
        <div className={active ? "accountDialog_background active" : "accountDialog_background"} onClick={() => setActive(false)}>
            <div className={"accountDialog_container"}>
                <div className={"accountDialog_container_left_body"}>
                    <div className={"accountDialog_container_left_body_list_item active"}>Основные</div>
                    <div className={"accountDialog_container_left_body_list_item"}>Персонализация <Image width={10} height={10} src={"/road-work.svg"} alt={"work"}/></div>
                    <div className={"accountDialog_container_left_body_list_item"}>Друзья <Image width={10} height={10} src={"/road-work.svg"} alt={"work"}/></div>
                </div>
                <div className={"accountDialog_container_separator"}></div>
                <div className={"accountDialog_container_right_body"}>
                    <div className={"accountDialog_container_right_body_top_container"}>
                        <div className={"accountDialog_container_right_body_avatar"}/>
                        <div className={"accountDialog_container_right_body_user_name"}>Fllcker</div>
                    </div>
                    <div className={"accountDialog_container_right_body_user_info_container"}>
                        <div className={"accountDialog_container_right_info_block"}>
                            <div className={"accountDialog_container_right_info_block_title"}></div>
                            <div className={"accountDialog_container_right_info_block_text"}></div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default AccountDialog;