import {deleteCookie, getCookie, setCookie} from "cookies-next";
export function setUserName(name: string) {
    setCookie('userName', name, {
        maxAge: 86400 * 7,
    })
}

export function getUserName(): string {
    return <string>getCookie('userName')
}

export function clearUserInfo() {
    deleteCookie('userName')
}

//users/my/info