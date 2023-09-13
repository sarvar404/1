
export class SubtitleInfo {

   id?: number;
   image?: string;
   language?: string;
   subtitles?: Subtitle[];
    constructor(values: object = {})
    {
        Object.assign(this,values);
    }
}

export class Subtitle {

    id?: number;
    type?: string;
    url?: string;
     constructor(values: object = {})
     {
         Object.assign(this,values);
     }
 }