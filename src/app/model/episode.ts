export class Episode {

    _id?: string;
    webshow_id?: string;
    season_number?: number;
    episode_number?: number;
    title?: string;
    description?: string;
    year?: number;
    trailer?: string;
    duration?: number;
    poster?: string;
    banner?: string;
    rating?: string;
    enable?: boolean;
    created_at?: string;
    updated_at?: string;
    
    
    
    constructor(values: object = {})
    {
        Object.assign(this,values);
    }
}