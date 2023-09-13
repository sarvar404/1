export class Source {
    id?: number;
    title?: string;
    quality?: string;
    size?: string;
    kind?: string;
    premium?: 1;
    external?: boolean;
    type?: string;
    url?: string;

    constructor(values: object = {})
    {
        Object.assign(this,values);
    }

}