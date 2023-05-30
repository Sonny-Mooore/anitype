"use client"
import React, {useState} from 'react';
import {useRouter} from "next/navigation";
import {checkLogin, checkPassword, checkUserInDataBase, registerUser, signIn} from "@/utils/verifications";
import Alert from "@/components/alert/Alert";
import "./authContainer.css"

const AuthContainer = () => {
    const router = useRouter()

    const [authenticationState, setAuthenticationState] = useState('log')
    const [login, setLogin] = useState('')
    const [password, setPassword] = useState('')
    const [passwordRepeat, setPasswordRepeat] = useState('')

    const [isShowAlert, setIsShowAlert] = useState(false)
    const [alertMessage, setAlertMessage] = useState('')

    const [isVisibleLoginAcceptButton, setIsVisibleLoginAcceptButton] = useState(true)
    const [isVisiblePassword, setIsVisiblePassword] = useState(false)
    const [isVisiblePasswordAcceptButton, setIsVisiblePasswordAcceptButton] = useState(false)
    const [isVisiblePasswordRepeat, setIsVisiblePasswordRepeat] = useState(false)
    const [isVisiblePasswordRepeatAcceptButton, setIsVisiblePasswordRepeatAcceptButton] = useState(false)

    function getClassNameAuthContainer(){
        if (isVisiblePasswordRepeat) return "authContainer activePasswordRepeat"
        if (isVisiblePassword) return "authContainer activePassword"
        return "authContainer"
    }

    async function checkRegistrationUser(login: string){

        let response = await checkUserInDataBase(login)

        if (response){
            setIsVisibleLoginAcceptButton(false)
            setIsVisiblePassword(true)
            setIsVisiblePasswordAcceptButton(true)
        }
        else if ( !response){
            setAuthenticationState('reg')
            setIsVisibleLoginAcceptButton(false)
            setIsVisiblePassword(true)
            setIsVisiblePasswordAcceptButton(false)
            setIsVisiblePasswordRepeat(true)
            setIsVisiblePasswordRepeatAcceptButton(true)
        }
        else {
            setAlertMessage(response)
            setIsShowAlert(true)
        }
    }

    function setDefault(){
        setAuthenticationState('log')
        setPassword('')
        setPasswordRepeat('')
        setIsVisibleLoginAcceptButton(true)
        setIsVisiblePassword(false)
        setIsVisiblePasswordAcceptButton(false)
        setIsVisiblePasswordRepeat(false)
        setIsVisiblePasswordRepeatAcceptButton(false)
    }

    async function registrationUser(login: string, password: string, repeatPassword: string){

        try {
            checkLogin(login)
        }
        catch (e: any) {
            setAlertMessage(e.message)
            setIsShowAlert(true)
            return
        }

        try {
            checkPassword(password, repeatPassword)
        }
        catch (e: any) {
            setAlertMessage(e.message)
            setIsShowAlert(true)
            return
        }

        let registrationResult = await registerUser(login, password)

        if (registrationResult){
            router.push('/welcome')
        }
    }

    async function loginUser(login: string, password: string){

        let loginResult = await signIn(login, password)
        if (loginResult){
            router.push('/welcome')
        }
        else {
            setAlertMessage("Неверное имя пользователя или пароль")
            setIsShowAlert(true)
        }
    }


    return (
        <div className="authBackground">
            <Alert alertMessage={alertMessage} setState={setIsShowAlert} state={isShowAlert}/>
            <div className="authBackButton">
                <svg height="32px" viewBox="0 0 32 32" width="32px" xmlns="http://www.w3.org/2000/svg" onClick={() => router.back()}>
                    <path d="M28,14H8.8l4.62-4.62C13.814,8.986,14,8.516,14,8c0-0.984-0.813-2-2-2c-0.531,0-0.994,0.193-1.38,0.58l-7.958,7.958  C2.334,14.866,2,15.271,2,16s0.279,1.08,0.646,1.447l7.974,7.973C11.006,25.807,11.469,26,12,26c1.188,0,2-1.016,2-2  c0-0.516-0.186-0.986-0.58-1.38L8.8,18H28c1.104,0,2-0.896,2-2S29.104,14,28,14z"/>
                </svg>
            </div>
            <div className={getClassNameAuthContainer()}>
                <div className="authTitle">{authenticationState === 'log' ? "Вход" : "Создать аккаунт"}</div>
                <div className="authInputContainer">
                    <div className="authInputAndButtonContainer">
                        <input className={isVisiblePassword ? "authInput login textChange" : "authInput login"} placeholder="Имя пользователя" value={login} onChange={e => {setLogin(e.target.value); setDefault()}}/>
                        {isVisibleLoginAcceptButton && <div className={"authAcceptButton"} onClick={() => checkRegistrationUser(login)}>
                            <svg viewBox="0 0 448 512" xmlns="http://www.w3.org/2000/svg">
                                <path d="M322.7,128.4L423,233.4c6,5.8,9,13.7,9,22.4c0,8.7-3,16.5-9,22.4L322.7,383.6c-11.9,12.5-31.3,12.5-43.2,0  c-11.9-12.5-11.9-32.7,0-45.2l48.2-50.4h-217C93.7,288,80,273.7,80,256c0-17.7,13.7-32,30.6-32h217l-48.2-50.4  c-11.9-12.5-11.9-32.7,0-45.2C291.4,115.9,310.7,115.9,322.7,128.4z"/>
                            </svg>
                        </div>}
                    </div>
                    <div className={isVisiblePassword ? "authInputAndButtonContainer" : "authInputAndButtonContainer unActive"}>
                        <input type="password" className={authenticationState === 'log' ? "authInput password noRepeat" : "authInput password repeat"} placeholder="Пароль" value={password} onChange={e => setPassword(e.target.value)}/>
                        {isVisiblePasswordAcceptButton && <div onClick={() => loginUser(login, password)} className={"authAcceptButton"}>
                            <svg viewBox="0 0 448 512" xmlns="http://www.w3.org/2000/svg">
                                <path d="M322.7,128.4L423,233.4c6,5.8,9,13.7,9,22.4c0,8.7-3,16.5-9,22.4L322.7,383.6c-11.9,12.5-31.3,12.5-43.2,0  c-11.9-12.5-11.9-32.7,0-45.2l48.2-50.4h-217C93.7,288,80,273.7,80,256c0-17.7,13.7-32,30.6-32h217l-48.2-50.4  c-11.9-12.5-11.9-32.7,0-45.2C291.4,115.9,310.7,115.9,322.7,128.4z"/>
                            </svg>
                        </div>}
                    </div>
                    <div className={isVisiblePasswordRepeat && isVisiblePassword && authenticationState !== 'log' ? "authInputAndButtonContainer" : "authInputAndButtonContainer unActive"}>
                        <input type="password" className={authenticationState === 'log' ? "authInput repeatPassword" : "authInput repeatPassword active"} placeholder="Повторите пароль" value={passwordRepeat} onChange={e => setPasswordRepeat(e.target.value)}/>
                        <div onClick={() => registrationUser(login, password, passwordRepeat)} className={isVisiblePasswordRepeat && isVisiblePasswordRepeatAcceptButton ? "authAcceptButton": "authAcceptButton unActive"}>
                            <svg viewBox="0 0 448 512" xmlns="http://www.w3.org/2000/svg">
                                <path d="M322.7,128.4L423,233.4c6,5.8,9,13.7,9,22.4c0,8.7-3,16.5-9,22.4L322.7,383.6c-11.9,12.5-31.3,12.5-43.2,0  c-11.9-12.5-11.9-32.7,0-45.2l48.2-50.4h-217C93.7,288,80,273.7,80,256c0-17.7,13.7-32,30.6-32h217l-48.2-50.4  c-11.9-12.5-11.9-32.7,0-45.2C291.4,115.9,310.7,115.9,322.7,128.4z"/>
                            </svg>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default AuthContainer;