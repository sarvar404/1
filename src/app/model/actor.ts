export class Actor {
    _id?: string;
    name?: string;
    poster?: string[];
    role?: string;

    constructor(values: object = {})
    {
        Object.assign(this,values);
    }
}