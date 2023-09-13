import { Channel } from "./channel";
import { Featured } from "./featured";
import { Slide } from "./slide";

export class Dashboard {

    featured?: Featured[];
    channels?: Channel[];
    slides?: Slide[];
    
    constructor(values: object = {})
    {
        this.featured = [];
        this.channels = [];
        this.slides = [];
        Object.assign(this,values);
    }
}