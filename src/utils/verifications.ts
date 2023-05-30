import {hasCookie, setCookie} from "cookies-next";
import axios from "axios";
import {getAccessTokenOrNullFromServer, getJwt, setJwt} from "@/utils/JWT";
import {URLUsers} from "@/utils/constants";
import {setUserName} from "@/utils/UsersCooke";

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
    return !await axios({
        method: 'get',
        url: URLUsers + `/users/available/username/${login}`
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
        url: URLUsers + '/auth/signup',
        data: {
            username: login,
            password: password
        }
    }).then((response) => {
        setUserName(login)
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
        url: URLUsers + '/auth/login',
        data: {
            username: login,
            password: password
        }
    }).then((response) => {
        setUserName(login)
        console.log(response.data.accessToken, response.data.refreshToken)
        setJwt(response.data.accessToken, response.data.refreshToken)
        return true
    }).catch((error) => {
        console.log(error.response?.data)
        return false
    })
}



export function checkLogin(login: string){
    if (login.length < 1) throw new Error("Введите имя пользователя")
    if (login.search(/[^a-zA-Z0-9]/) !== -1) throw new Error("Имя пользователя должно содержать только английские буквы и цифры")
    if (login.search(/\s/) !== -1) throw new Error("Имя пользователя не должно содержать пробелы")
    if (login.length > 16) throw new Error( "Login должен быть не более 32 символов")
}

export function checkPassword(password: string, passwordRepeat: string){
    if (password !== passwordRepeat) throw new Error("Пароли не совпадают")
    if (password.length < 8) throw new Error("Пароль должен быть не менее 8 символов")
    if (password.length > 32) throw new Error("Пароль должен быть не более 32 символов")
    if (password.search(/[0-9]/) === -1) throw new Error("Пароль должен содержать хотя бы одну цифру")
}