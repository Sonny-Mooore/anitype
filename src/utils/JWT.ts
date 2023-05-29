import {deleteCookie, getCookie, hasCookie, setCookie} from "cookies-next";
import axios from "axios";
import {URLServer} from "@/utils/constants";

type Token = null | undefined | string
interface Tokens {
    access: Token
    refresh: Token
}


export async function getJwt() {
    const tokens : Tokens = {
        access: null,
        refresh: null
    }

    if (hasCookie('refresh')) tokens.refresh = getCookie('refresh') as Token
    if (hasCookie('access')) tokens.access = getCookie('access') as Token

    if (tokens.refresh != null && !hasCookie('refreshTime')){
        let jwt = await getRefreshAndAccessTokenOrNullFromServer(tokens.refresh)
        setJwt(jwt.accessToken, jwt.refreshToken)
        tokens.access = jwt.accessToken
        tokens.refresh = jwt.refreshToken
        return tokens
    }

    if (tokens.access == null && tokens.refresh != null){
        let access = await getAccessTokenOrNullFromServer(tokens.refresh)
        setJwt(access, null)
        tokens.access = access
    }



    return tokens
}

export async function getAccessTokenOrNullFromServer(refreshToken: Token){
    return await axios({
        method: 'post',
        url: URLServer + 'auth/access',
        headers: {"X-Forwarded-For": refreshToken},
        data: {refreshToken: refreshToken},
    }).then(response => {
        return response.data.accessToken
    }).catch(e => {
        console.log(e.response?.data)
        return null
    })
}

export async function getRefreshAndAccessTokenOrNullFromServer(refreshToken: Token){
    return await axios({
        method: 'post',
        url: URLServer + 'auth/refresh',
        headers: {"X-Forwarded-For": refreshToken},
        data: {refreshToken: refreshToken}
    }).then(resp => {
        return {accessToken: resp.data.accessToken, refreshToken: resp.data.refreshToken}
    }).catch(() => {
        return {accessToken: null, refreshToken: null}
    })
}

export function setJwt(access?: Token, refresh?: Token) {
    if (access != null) {
        setCookie('access', access, {
            maxAge: 86400 // 1 day
        })
    }
    if (refresh != null) {
        setCookie('refresh', refresh, {
            maxAge: 86400 * 31 // 7 days
        })
        setCookie('refreshTime', Date.now(), {
            maxAge: 86400 * 28
        })
    }
}

export function removeJwt() {
    deleteCookie('access');

    deleteCookie('refresh');
    deleteCookie('refreshTime');
}