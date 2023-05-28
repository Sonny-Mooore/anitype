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