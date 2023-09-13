import { Movie } from "./movie";


export class MovieResponseBody {
    movies?: Movie[];
    relatedMovies?: Movie[];
    currentPage?: number;
    totalPages?: number;
    success?: boolean
    constructor(values: object = {}) {
        this.movies = [];
        this.currentPage = 0;
        this.totalPages = 0;
        this.success = false;
        this.relatedMovies = [];
        Object.assign(this,values);
    }

}