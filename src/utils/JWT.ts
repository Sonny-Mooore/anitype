import {deleteCookie, getCookie, hasCookie, setCookie} from "cookies-next";
import axios from "axios";
import {URLUsers} from "@/utils/constants";
import {confirmTempAuthentication} from "@/utils/verifications";

type Token = null | undefined | string
interface Tokens {
    access: Token
    refresh: Token
}


export async function getJwt(): Promise<Tokens> {
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
        url: URLUsers + '/auth/access',
        data: {refreshToken: refreshToken},
    }).then(response => {
        confirmTempAuthentication()
        return response.data.accessToken
    }).catch(() => {
        return null
    })
}

export async function getRefreshAndAccessTokenOrNullFromServer(refreshToken: Token){
    return await axios({
        method: 'post',
        url: URLUsers + '/auth/refresh',
        data: {refreshToken: refreshToken}
    }).then(resp => {
        confirmTempAuthentication()
        return {accessToken: resp.data.accessToken, refreshToken: resp.data.refreshToken}
    }).catch(() => {
        return {accessToken: null, refreshToken: null}
    })
}

export function setJwt(access?: Token, refresh?: Token) {
    if (access != null) {
        setCookie('access', access, {
            maxAge: Math.round(86400 / 2) // 0.5 day
        })
        confirmTempAuthentication()
    }
    if (refresh != null) {
        setCookie('refresh', refresh, {
            maxAge: 86400 * 7 // 7 days
        })
        setCookie('refreshTime', Date.now(), {
            maxAge: 86400 * 6
        })
        confirmTempAuthentication()
    }
}

export function removeJwt() {
    deleteCookie('access');

    deleteCookie('refresh');
    deleteCookie('refreshTime');
}