export interface Anime {
    id?: number;
    status: string
    titles?: {
        ruAlt?: string
        original?: string
        ru?: string
    };
    description?: string;
    poster?: string;
    episodesCount?: number;
    genres?: Array<{ id: number, title: string }>;
    ratings?: {
        id?: number
        imdb?: number
        kinopoisk?: number
        shikimori?: number
    };
    year?: number;
}

export interface CatalogItemProps {
    title: string,
    description: string,
    image: string,
    numberEpisodes: number,
    watchEpisode?: number,
    setSelectItem?: any
    item?: any
    selectItem?: any
}

export interface CatalogListProps {
    header: string,
    isMouseScroll?: boolean | true
    children?: any
    ids?: any
    setIds?: any
    isAutoScroll?: boolean
}

export interface ListProps {
    onHover: any;
    isMouseScroll: boolean;
    children?: any;
}

export interface SearchElementProps {
    id: string
    imageUrl: string,
    title: string,
    searchRank: number,
    date: string,
    status?: string
}

export interface HeaderProps {
    selected: string;
}

export interface HeaderMobileProps {
    selected: string;
}

export interface EpisodeItemProps {
    title: string,
    time: string,
    image: string,
    watch?: { fullTime: number, viewed: number }
}