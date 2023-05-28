import {Anime} from "@/utils/interfaces";
import {util} from "zod";
import joinValues = util.joinValues;

export function getRank(anime: any) {
    if (anime.ratings?.shikimori) {
        return anime.ratings?.shikimori;
    }
    if (anime.ratings?.imdb) {
        return anime.ratings?.imdb;
    }
    if (anime.ratings?.kinopoisk) {
        return anime.ratings?.kinopoisk;
    }

}

export function sliceText(text: string | undefined, length: number) {
    return text && text.length > length ? text.slice(0, length) + "..." : text;
}

export function getAnimeTitle(titles: Anime): string{
    return transformTitle(titles?.titles?.ru ? titles?.titles?.ru : "")
}

function transformTitle(input: string): string {
    const tvRegex = /\[ТВ-(\d+)(?:, часть (\d+))?\]/;
    const match = input.match(tvRegex);

    if (match) {
        const seasonNumber = match[1];
        const partNumber = match[2] ? `, часть ${match[2]}` : '';
        return input.replace(tvRegex, `(Сезон ${seasonNumber}${partNumber})`);
    }

    return input;
}

export function getStringGenres(genres: Array<{id: number, title: string}>): string {
    return genres.map((gen) => gen.title).join(", ")
}