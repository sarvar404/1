import { Poster } from "./poster";

export class Slide {

    _id?: string;
    type?: string;
    name?: string;
    typeid?: number;
    posters?: Poster[];
    
    constructor(values: object = {})
    {
        Object.assign(this, values);
    }
}