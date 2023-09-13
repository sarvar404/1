

export class Poster {

   _id?: string;
   title?: string;
   type?: string;
   description?: string;
   year?: number;
   rating?: string;
   duration?: string;
   tags?: string[];
   enable_comments?: boolean;
   categories?: string[];
   poster?: string;
   banner?: string;
   guid?: number;
   trailer?: string;
   
    constructor(values: object = {})
    {
        Object.assign(this,values);
    }
}
