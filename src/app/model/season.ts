import { Episode } from "./episode";

export class Season {

    _id?: string;
    webshow_id?: string;
    season_number?: number;
    title?: string;
    description?: string;
    year?: number;
    trailer?: string;
    poster?: string;
    banner?: string;
    rating?: string;
    enable?: boolean;
    created_at?: string;
    updated_at?: string;
    episodes?: Episode[];
    
    constructor(values: object = {})
    {
        Object.assign(this,values);
    }
}