import { Injectable } from "@angular/core";
import { GlobalService } from "./global.service";
import { Observable, catchError, of, switchMap, throwError } from "rxjs";
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Poster } from "../model/poster";
import { Actor } from "../model/actor";
import { SubtitleInfo } from "../model/subtitle-info";
import { MovieResponseBody } from "../model/movie-response-body";
import { ResponseBody } from "../model/response-body";
import { Movie } from "../model/movie";
import { xSecurityHeader } from "../user-enums";




@Injectable({
    providedIn: 'root',
})
export class MovieService {

    constructor(private globalService: GlobalService,
        private _httpCliet: HttpClient) {
    }
    getRelatedMovies(id: string): Observable<MovieResponseBody> {
        const headers = GlobalService.getWithSecurityHeaders();
        return this._httpCliet.get<MovieResponseBody>(`${GlobalService.publicApiHost}/public/movies/get-related-movies?_id=${id}`,
            {
                headers
            }).pipe(catchError((err) => {
                console.log(err);
                return throwError(err);
            }), switchMap((response: any) => {
                console.log(response);
                return of(response);
            }));
    }

    getSelectedMovieDetails(id: string): Observable<ResponseBody> {
        const headers = GlobalService.getWithSecurityHeaders();
        return this._httpCliet.get<ResponseBody>(`${GlobalService.publicApiHost}/public/movies/get-single-movie-detail?_id=${id}`,
            {
                headers
            }).pipe(catchError((err) => {
                console.log(err);
                return throwError(err);
            }), switchMap((response: any) => {
                console.log(response);
                return of(response);
            }));
    }

    getMoviesByCategory(data: { page: number, limit: number, category: string, order: string, alphabeticOrder: string }): Observable<MovieResponseBody> {
        const headers = GlobalService.getWithSecurityHeaders();
        return this._httpCliet.get<MovieResponseBody>(`${GlobalService.publicApiHost}/public/movies/get-movies-category?page=${data.page}&limit=${data.limit}&category=${data.category}&order=${data.order}&alphabeticOrder=${data.alphabeticOrder}`,
            {
                headers
            }).pipe(catchError((err) => {
                console.log(err);
                return throwError(err);
            }), switchMap((response: any) => {
                console.log(response);
                return of(response);
            }));
    }

    getSubtitlesData(id: number, type: string): Observable<SubtitleInfo[]> {
        const headers = GlobalService.getHeaders();
        return this._httpCliet.get<SubtitleInfo[]>(`${GlobalService.apiHost}/api/subtitles/by/${type}/${id}/${GlobalService.apiToken}/${GlobalService.itemPurchaseCode}/`,
            {
                headers
            }).pipe(catchError((err) => {
                return throwError(err);
            }), switchMap((response: any) => {
                return of(response);
            }));
    }

   
    getAdultMovies(): Observable<Movie[]> {
        const securityHeaders =
          GlobalService.getLoginHeaders().get(xSecurityHeader);

        if (securityHeaders === null) {
          throw new Error('x-security-header not found in headers');
        }

        // Create the headers with the 'x-security-header' and other required headers
        const headers = new HttpHeaders({
          'x-security-header': securityHeaders,
        });

        // Adjust the URL as needed to match your Node.js API endpoint
        const apiUrl = `${GlobalService.publicApiHost}/public/get-adults-movie-detail`;

        return this._httpCliet.get<any>(apiUrl, { headers }).pipe(
          catchError((err) => {
            console.log(err);
            return throwError(err);
          }),
          switchMap((response: any) => {
            if (response.success === true) {
              return of(response.movies); // Adjust the response mapping to match your API structure
            } else {
              return throwError('API request failed'); // Handle the error case
            }
          })
        );
      }



}
