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

export function episodeDeclension(number: number | undefined): string {
    if (!number){
        return 'эпизода'
    }
    const remainder  = number % 10;
    const remainderTens  = number % 100;

    if (remainderTens  >= 11 && remainderTens  <= 19) {
        return 'эпизодов';
    } else if (remainder  === 1) {
        return 'эпизод';
    } else if (remainder  >= 2 && remainder  <= 4) {
        return 'эпизода';
    } else {
        return 'эпизодов';
    }
}

