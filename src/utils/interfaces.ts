import {Dispatch, SetStateAction} from "react";

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

export interface UserInfo{
    id: string,
    createdDate: string,
    username: string,
    password: string,
    ip: string,
    avatar: string,
    email: string,
    emailVerified: true,
    su: true,

    folders: [
        {
            id: string,
            title: string,
            items: [
                {
                    id: string,
                    releaseId: number,
                    folder: string
                }
            ],
            user: string
        }
    ],


    subscriptions: [
        {
            id: string,
            user: string,
            startDate: string,
            endDate: string
        }
    ],

    comments: [
        {
            id: string,
            createdDate: string,
            value: string,
            releaseId: number,
            user: string
        }
    ],

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
    isMouseScroll?: boolean
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

export interface AddToFavoriteButtonProps{
    id: number
    isActive: boolean
    setIds: any
    ids: any
}

export interface AlertProps {
    state: boolean,
    setState: Dispatch<SetStateAction<boolean>>,
    alertMessage: string
}

export interface CategoriesListProps{
    title: string
    ids: any
    setIds: any
    data: any
}

export interface FolderListProps{
    folderName: string
}

export interface AnimeFrameProps{
    id: string
}

export interface WatchTogetherFrameProps{
    id: string
    hubId?: any
}

export interface AccountDialogProps{
    active: boolean
    setActive: Dispatch<SetStateAction<boolean>>
    UserAuthState: any
}

export interface KodikProps{
    id: any
}

export interface EpisodeListProps {
    header: string,
    isMouseScroll?: boolean
    children?: any
}

export interface BigContainerProps{
    headerText: string
    description: string
    children? :any
    src: string
}

export interface MediumContainerProps{
    headerText: string
    description: string
    src: string
    children?: any
}

export interface SubscriptionSelectItemProps{
    plusList: Array<string>
    price: number
    text: string
}

export interface WatchTogetherKodikProps {
    src: string
    id: string
    hubId?: any
}

export interface WatchLog {
    accessToken: string
    hubId: string
    seconds: number
    releaseId: number
    season: number
    episode: number
    translationTitle: string
    isPaused: boolean
}

export interface User {
    hubId: string
    username: string
    isPaused: boolean
    main: boolean
    seconds: number
    releaseId: number
    season: number
    episode: number
    translationTitle: string
}

export interface WatchTogetherButtonProps{
    id: string
}