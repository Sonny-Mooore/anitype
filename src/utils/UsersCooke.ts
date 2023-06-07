import {deleteCookie, getCookie, hasCookie, setCookie} from "cookies-next";
import {UserInfo} from "@/utils/interfaces";
import axios from "axios";
import {URLUsers} from "@/utils/constants";
import {getJwt, removeJwt} from "@/utils/JWT";

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
    localStorage.removeItem("UserInfo")
    deleteCookie("UserInfoIsNotOutdated")
    removeJwt()
    deleteCookie('tempAuthentication')
}

export function setUserInfo(userInfo: UserInfo){
    setUserName(userInfo.username)
    localStorage.setItem('UserInfo', JSON.stringify(userInfo));
    setCookie("UserInfoIsNotOutdated", true, {maxAge:  600})
}

export async function getUserInfo(): Promise<UserInfo | undefined>{
    if (hasCookie('UserInfoIsNotOutdated')){
        const storedObject = localStorage.getItem('UserInfo');
        if (storedObject) {
            return JSON.parse(storedObject)
        }
    }else{
        return await axios({
            method: "get",
            url: URLUsers + "/users/my/info",
            headers: {"Authorization": "Bearer " + (await getJwt()).access}
        }).then(res => {
            setUserInfo(res.data)
            return res.data
        }).catch(e => {
            console.log(e)
        })
    }

}

export async function getSubscription(){
    return await axios({
        method: "get",
        url: URLUsers + "/subscriptions/active",
        headers: {"Authorization": "Bearer " + (await getJwt()).access}
    }).then(res => {
        return res.data
    }).catch(e => {
        return []
    })
}



//users/my/info