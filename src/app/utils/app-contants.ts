import { Injectable } from "@angular/core";
import { environment } from "../../environments/environment";


@Injectable()
export class AppContants {
    public static GENRE_ADULT: string = environment.adults_genre_id;
    
    constructor() {

    }

    

}