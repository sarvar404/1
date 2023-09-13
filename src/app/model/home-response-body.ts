import { Actor } from "./actor";
import { Channel } from "./channel";
import { Slide } from "./slide";

export class HomeResponseBody {

    channels?: Channel[];
    slides?: Slide[];
    actors?: Actor[];
    
    constructor(values: object = {})
    {
        Object.assign(this,values);
    }
}