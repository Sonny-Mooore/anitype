"use client"
import React, {ChangeEvent, useEffect, useState} from 'react';
import "./accountDialog.css"
import Image from "next/image";
import axios from "axios";
import {URLUserAvatar, URLUsers} from "@/utils/constants";
import {getJwt} from "@/utils/JWT";
import {clearUserInfo, getUserInfo} from "@/utils/UsersCooke";
import {CheckEmailVerificationCode, sendEmailVerificationCode} from "@/utils/function";
import {deleteCookie} from "cookies-next";
import Alert from "@/components/alert/Alert";
import {AccountDialogProps} from "@/utils/interfaces";
const AccountDialog = ({active, setActive, UserAuthState}: AccountDialogProps) => {

    const [avatar, setAvatar] = useState<string>()
    const [userName, setUserName] = useState<string>()
    const [email, setEmail] = useState<string>()

    const [userNameIsChange, setUserNameIsChange] = useState(false)
    const [emailIsChange, setEmailIsChange] = useState(false)

    const [userNameChangeText, setUserNameChangeText] = useState<string | undefined>("")
    const [emailChangeText, setEmailChangeText] = useState<string | undefined>("")

    const [isEmailVerification, setIsEmailVerification] = useState(false)

    const [code, setCode] = useState("")

    const [isCodeShow, setIsCodeShow] = useState(false)

    const [previewUrl, setPreviewUrl] = useState<string | undefined>();

    const [alertState, setAlertState] = useState(false)

    const [alertText, setAlertText] = useState("")

    useEffect(() => {
        async function getInfo(){
            const UserInfo = await getUserInfo()
            setAvatar(URLUserAvatar + UserInfo?.avatar)
            setUserName(UserInfo?.username)
            setUserNameChangeText(UserInfo?.username ? UserInfo?.username : "")
            setEmail(UserInfo?.email)
            setEmailChangeText(UserInfo?.email ? UserInfo?.email : "")
            setIsEmailVerification(UserInfo?.emailVerified ? UserInfo?.emailVerified : false)
        }
        getInfo().catch(e => console.log(e))
    }, [])

    function resizeImage(file: File, width: number, height: number): Promise<Blob> {
        return new Promise((resolve, reject) => {
            const img = document.createElement('img');
            img.src = URL.createObjectURL(file);
            img.onload = () => {
                const canvas = document.createElement('canvas');
                const ctx = canvas.getContext('2d');
                canvas.width = width;
                canvas.height = height;
                if (ctx){
                    ctx.drawImage(img, 0, 0, width, height);
                    canvas.toBlob((blob) => {
                        if (blob) {
                            resolve(blob);
                        } else {
                            reject(new Error('Failed to create blob.'));
                        }
                    }, "null");
                }
            };
            img.onerror = (error) => {
                reject(error);
            };
        });
    }

    const handleFileChange = async (event: ChangeEvent<HTMLInputElement>) => {
        let file = event.target.files ? event.target.files[0] : null;
        if (file != null) {

            const formData = new FormData();

            let resizedFile: Blob | null;

            if (file.type === 'image/gif') {
                resizedFile = file
            } else {
                resizedFile = await resizeImage(file, 250, 250);
            }

            formData.append('file', resizedFile);

            try{
                await axios.post(URLUsers + "/users/pictures/upload/avatar", formData, {
                    headers: {
                        'Content-Type': 'multipart/form-data',
                        "Authorization": "Bearer " + (await getJwt()).access
                    },

                });

                const reader = new FileReader();
                reader.onload = () => {
                    const preview = reader.result as string;
                    setPreviewUrl(preview);
                };
                reader.readAsDataURL(resizedFile);

            }catch (e){
                console.error(e);
            }

        }
    };

    function getAvatar(){
        if (previewUrl){
            return previewUrl
        }else if (avatar){
            return avatar
        }else{
            return "/image-upload.svg"
        }
    }

    function sendCode(){
        sendEmailVerificationCode(emailChangeText).then(() => {
            setIsCodeShow(true)
        }).catch(e => {
            setAlertText(e.response.data.detail)
            setAlertState(true)
        })
    }

    function checkCode(){
        CheckEmailVerificationCode(code).then(() => {
            setIsCodeShow(false)
            setIsEmailVerification(true)
            setEmail(emailChangeText)
            setEmailIsChange(false)
            deleteCookie("UserInfoIsNotOutdated")
        }).catch(e => {
            setAlertText(e.response.data.detail)
            setAlertState(true)
        })
    }

    function exitAccount(){
        clearUserInfo()
        setActive(false)
        UserAuthState(false)
    }

    return (
        <div className={active ? "accountDialog_background active" : "accountDialog_background"} onClick={() => setActive(false)}>
            <Alert state={alertState} setState={setAlertState} alertMessage={alertText}/>
            <div className={"accountDialog_container"} onClick={e => e.stopPropagation()}>
                <div className={"accountDialog_container_left_body"}>
                    <div className={"accountDialog_container_left_body_list_item active"}>Основные</div>
                    <div className={"accountDialog_container_left_body_list_item deactivate"}>Персонализация <Image width={10} height={10} src={"/road-work.svg"} alt={"work"}/></div>
                    <div className={"accountDialog_container_left_body_list_item deactivate"}>Друзья <Image width={10} height={10} src={"/road-work.svg"} alt={"work"}/></div>
                </div>
                <div className={"accountDialog_container_separator"}></div>
                <div className={"accountDialog_container_right_body"}>
                    <div className={"accountDialog_container_right_body_top_container"}>
                        <div className={"accountDialog_container_right_body_avatar"} style={{ backgroundImage: `url(${getAvatar()})`}}>
                            <div className={"accountDialog_container_right_body_pick_avatar"}>
                                <Image width={40} height={40} src={"/image-upload.svg"} alt={"upload"}/>
                                <input type="file" accept=".jpg,.jpeg,.png,.gif" className={"accountDialog_container_right_body_pick_avatar_input"} title={""} onChange={e => handleFileChange(e)}/>
                            </div>
                        </div>
                        <div className={"accountDialog_container_right_body_user_name"}>{userName}</div>
                    </div>
                    <div className={"accountDialog_container_right_body_user_info_container"}>
                        <div className={"accountDialog_container_right_info_block"}>
                            <div>
                                <div className={"accountDialog_container_right_info_block_title"}>
                                    Имя пользователя
                                </div>
                                {userNameIsChange ? <input placeholder={"Введите имя пользователя"} value={userNameChangeText} onChange={e => setUserNameChangeText(e.target.value)} className={"accountDialog_container_right_info_block_text_input"} /> :
                                    <div className={"accountDialog_container_right_info_block_text"}>
                                    {userName}
                                </div>}
                            </div>
                            <div className={"accountDialog_container_right_info_block_change_button"} onClick={() => setUserNameIsChange(!userNameIsChange)}>{!userNameIsChange ? "Изменить" : "Готово"}</div>
                        </div>
                        <div className={"accountDialog_container_right_info_block"}>
                            <div>
                                <div className={"accountDialog_container_right_info_block_title"}>
                                    Email
                                </div>
                                {emailIsChange ? <input placeholder={"Введите email"} value={emailChangeText} onChange={e => setEmailChangeText(e.target.value)} className={"accountDialog_container_right_info_block_text_input"}/> : <div onClick={() => sendEmailVerificationCode(emailChangeText)} className={"accountDialog_container_right_info_block_text"}>
                                    {email ? email : "ㅤ"}
                                </div>}
                            </div>
                            {!isEmailVerification ? <div className={"accountDialog_container_right_info_block_change_button"}
                                  onClick={() => emailIsChange ? sendCode(): setEmailIsChange(!emailIsChange)}>{!emailIsChange ? "Изменить" : "Отправить код"}</div> : <div/>}
                        </div>
                        <div className={isCodeShow ? "accountDialog_container_right_info_block" : "accountDialog_container_right_info_block hidden"}>
                            <div>
                                <div className={"accountDialog_container_right_info_block_title"}>
                                    Код
                                </div>
                                <input placeholder={"Введите код"} value={code} onChange={e => setCode(e.target.value)} className={"accountDialog_container_right_info_block_text_input"}/>
                            </div>
                            <div className={"accountDialog_container_right_info_block_change_button"} onClick={() => checkCode()}>Подтвердить</div>
                        </div>
                    </div>
                    <div className={"accountDialog_container_right_info_block_exit_button"} onClick={exitAccount}>Выйти из аккаунта</div>
                </div>
            </div>
        </div>
    );
};

export default AccountDialog;