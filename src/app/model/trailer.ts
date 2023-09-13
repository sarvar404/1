export class Trailer {
    id?: number;
    type?: string;
    url?: string;

    constructor(values: object = {})
    {
        Object.assign(this,values);
    }
}