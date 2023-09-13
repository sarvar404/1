import { VideoTypes } from "../video-types";
import { Actor } from "./actor";
import { Category } from "./category";

export class Movie {
    _id?: string;
    title?: string;
    description?: string;
    year?: string;
    rating?: string;
    duration?: string;
    tags?: string[];
    enable_comments?: boolean;
    categories?: Category[];
    poster?: string;
    banner?: string;
    guid?: number;
    trailer?: string
    created_at?: string;
    updated_at?: string;
    actors?: Actor[];
    type?: string = VideoTypes.Movie;

    constructor(values: object = {})
    {
        Object.assign(this,values);
    }
}