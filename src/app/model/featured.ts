export class Featured {

    _id?: string;
    title?: string;
    description?: string;
    year?: number;
    rating?: string;
    duration?: number;
    tags?: string[];
    enable_comments?: boolean;
    categories?: string[];
    poster?: string;
    banner?: string;
    guid?: number;
    trailer?: string;
    feature_title?: string;
    type?:string;
    
    constructor(values: object = {})
    {
        Object.assign(this,values);
    }
}