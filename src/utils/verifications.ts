import {hasCookie, setCookie} from "cookies-next";
import axios from "axios";
import {getAccessTokenOrNullFromServer, getJwt, setJwt} from "@/utils/JWT";
import {URLServer} from "@/utils/constants";

export async function checkUserAuth(){
    return await getAccessTokenOrNullFromServer((await getJwt()).refresh) != null;
}

export function confirmTempAuthentication(){
    setCookie('tempAuthentication', "true", {
        maxAge: 43200 // 0.5 day
    })
}

export function checkTempAuthentication(){
    return hasCookie('tempAuthentication');
}

export async function checkUserInDataBase(login: string) {
    return await axios({
        method: 'get',
        url: URLServer + `users/isExists?email=${login}`
    }).then((response) => {
        return response.data
    }).catch((error) => {
        console.log(error.response?.data)
        return "Ошибка сервера"
    })
}

export async function registerUser(login: string, password: string) {
    return await axios({
        method: 'post',
        url: URLServer + 'auth/signup',
        data: {
            email: login,
            password: password
        }
    }).then((response) => {
        console.log(response.data.accessToken)
        setJwt(response.data.accessToken, response.data.refreshToken)
        return true
    }).catch((error) => {
        console.log(error.response?.data)
        return false
    })
}

export async function signIn(login: string, password: string){
    return await axios({
        method: 'post',
        url: URLServer + 'auth/login',
        data: {
            email: login,
            password: password
        }
    }).then((response) => {
        setJwt(response.data.accessToken, response.data.refreshToken)
        return true
    }).catch((error) => {
        console.log(error.response?.data)
        return false
    })
}



export function checkLogin(login: string){
    if (login.length < 1) throw new Error("Введите Email")
    if (login.length > 32) throw new Error( "Email должен быть не более 32 символов")
    if (login.search(/@/) === -1) throw new Error( "Введите корректный Email")
    if (login.search(/\./) === -1) throw new Error( "Введите корректный Email")
    if (login.search(/[^A-Za-z0-9@.]/) !== -1) throw new Error("Введите корректный Email")
}

export function checkPassword(password: string, passwordRepeat: string){
    if (password !== passwordRepeat) throw new Error("Пароли не совпадают")
    if (password.length < 8) throw new Error("Пароль должен быть не менее 8 символов")
    if (password.length > 32) throw new Error("Пароль должен быть не более 32 символов")
    if (password.search(/[A-Z]/) === -1) throw new Error("Пароль должен содержать хотя бы одну заглавную букву")
    if (password.search(/[a-z]/) === -1) throw new Error("Пароль должен содержать хотя бы одну строчную букву")
    if (password.search(/[0-9]/) === -1) throw new Error("Пароль должен содержать хотя бы одну цифру")
    if (password.search(/[^A-Za-z0-9]/) === -1) throw new Error("Пароль должен содержать хотя бы один спецсимвол")
}