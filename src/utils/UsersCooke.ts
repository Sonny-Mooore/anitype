import {deleteCookie, getCookie, hasCookie, setCookie} from "cookies-next";
import {UserInfo} from "@/utils/interfaces";
import axios from "axios";
import {URLUsers} from "@/utils/constants";
import {getJwt} from "@/utils/JWT";

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
        axios({
            method: "get",
            url: URLUsers + "/users/my/info",
            headers: {"Authorization": "Bearer " + (await getJwt()).access}
        }).then(res => {
            console.log(res.data)
            setUserInfo(res.data)
            return res.data
        }).catch(e => {
            console.log(e)
        })
    }

}



//users/my/info