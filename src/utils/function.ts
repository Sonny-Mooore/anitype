import {Anime} from "@/utils/interfaces";
import axios from "axios";
import {URLUsers} from "@/utils/constants";
import {getJwt} from "@/utils/JWT";

export function sliceText(text: string | undefined, length: number) {
    return text && text.length > length ? text.slice(0, length) + "..." : text;
}

export function getAnimeTitle(titles: Anime): string{
    return transformTitle(titles?.titles?.ru ? titles?.titles?.ru : "")
}

export function transformTitle(input: string): string {
    const tvRegex = /\[ТВ-(\d+)(?:, часть (\d+))?]|\[ТВ]/;
    const match = input.match(tvRegex);

    if (match) {
        if (match[0] === '[ТВ]') {
            return input.replace(tvRegex, '');
        }

        const seasonNumber = match[1];
        const partNumber = match[2] ? `, часть ${match[2]}` : '';
        return input.replace(tvRegex, `(Сезон ${seasonNumber}${partNumber})`);
    }

    return input;
}


export function getStringGenres(genres: Array<{id: number, title: string}>): string {
    return genres.map((gen) => gen.title).join(", ")
}

export function getRankAnime(anime: Anime) {
    let rank = getAScoreFromAnime(anime);
    return {rank: rank, color: getRankColor(rank)}
}

export function getRankColor(rank: number) {
    if (rank >= 7) {
        return "#35e500"
    }
    if (rank >= 5) {
        return "gray"
    }
    return "red"
}

export function getAScoreFromAnime(anime: Anime): number {
    if (anime.ratings?.shikimori) {
        return anime.ratings?.shikimori;
    }
    if (anime.ratings?.imdb) {
        return anime.ratings?.imdb;
    }
    if (anime.ratings?.kinopoisk) {
        return anime.ratings?.kinopoisk;
    }
    return 0;
}

export async function addToFavorite(id: number | undefined){
    axios({
        method: "post",
        url: URLUsers + "/folders/add",
        data: {
            folderTitle: "Буду смотреть",
            releaseId: id
        },
        headers: {"Authorization": "Bearer " + (await getJwt()).access}
    })
}

export async function removeToFavorite(id: number | undefined){
    axios({
        method: "post",
        url: URLUsers + "/folders/remove",
        data: {
            folderTitle: "Буду смотреть",
            releaseId: id
        },
        headers: {"Authorization": "Bearer " + (await getJwt()).access}
    }).catch(e => console.log(e))
}

export function episodeDeclension(number: number | undefined): string {
    if (!number){
        return ''
    }
    if (number < 0){
        return 'Фильм'
    }

    const remainder  = number % 10;
    const remainderTens  = number % 100;

    if (remainderTens  >= 11 && remainderTens  <= 19) {
        return number + ' эпизодов';
    } else if (remainder  === 1) {
        return number + ' эпизод';
    } else if (remainder  >= 2 && remainder  <= 4) {
        return number + ' эпизода';
    } else {
        return number + ' эпизодов';
    }
}

export function capitalizeFirstLetter(str: string | undefined): string {
    if (!str) return '';
    return str.charAt(0).toUpperCase() + str.slice(1);
}

export function formatTime(seconds: number): string {
    const hours = Math.floor(seconds / 3600);
    const minutes = Math.floor((seconds % 3600) / 60);
    const remainingSeconds = seconds % 60;

    const formattedHours = hours > 0 ? hours.toString().padStart(2, '0') : '';
    const formattedMinutes = minutes.toString().padStart(2, '0');
    const formattedSeconds = remainingSeconds.toString().padStart(2, '0');

    let formattedTime = '';

    if (formattedHours !== '') {
        formattedTime += `${formattedHours}:`;
    }

    formattedTime += `${formattedMinutes}:${formattedSeconds}`;

    return formattedTime;
}

export async function sendEmailVerificationCode(email: string | undefined){
    axios({
        method: "post",
        url: URLUsers + "/verify/email/send",
        data: {email: email},
        headers: {"Authorization": "Bearer " + (await getJwt()).access}
    }).then((res) => {
        console.log("code send", res)
        return true
    }).catch(e => {
        console.log(e)
        throw e
    })
}

export async function CheckEmailVerificationCode(code: string){
    axios({
        method: "get",
        url: URLUsers + `/verify/email/accept/${code}`,
        headers: {"Authorization": "Bearer " + (await getJwt()).access}
    }).then((res) => {
        console.log("code check", res)
        return true
    }).catch(e => {
        console.log(e)
        throw e
    })
}