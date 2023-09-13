import { Category } from "./category";

export class Channel {
    _id?: string;
    name?: string;
    poster?: string[];
    banner?: string[];
    source_url?: string;
    categories?: Category[];
    rating?: number;
    enable?: boolean;
    guid?: number;
    created_at?: string;
    updated_at?: string;
    category?: string;
    description?: string;

    constructor(values: object = {})
    {
        this.description='';
        Object.assign(this,values);
    }
}