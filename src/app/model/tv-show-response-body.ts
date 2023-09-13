
import { TvShow } from "./tv-show";


export class TvShowResponseBody {
    webshows?: TvShow[];
    currentPage?: number;
    totalPages?: number;
    success?: boolean;
    constructor(values: object = {}) {
        this.webshows = [];
        this.currentPage = 0;
        this.totalPages = 0;
        this.success = false;
        Object.assign(this,values);
    }

}