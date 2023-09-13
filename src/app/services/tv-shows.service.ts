import { Injectable } from "@angular/core";
import { GlobalService } from "./global.service";
import { Observable, catchError, of, switchMap, throwError } from "rxjs";
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Poster } from "../model/poster";
import { TvShowResponseBody } from "../model/tv-show-response-body";
import { TvShow } from "../model/tv-show";
import { xSecurityHeader } from "../user-enums";
import { ResponseBody } from "../model/response-body";

@Injectable()
export class TvShowsService {

    constructor(private globalService:GlobalService,
        private _httpCliet: HttpClient){
    }
    getWebShowsDetailById(id: string): Observable<ResponseBody> {
        const headers = GlobalService.getWithSecurityHeaders();
        return this._httpCliet.get<ResponseBody>(`${GlobalService.publicApiHost}/public/webshows/get-single-webshow-detail?_id=${id}`,
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
    getAdultWebShows(data: { page: number, limit: number, order: string, alphabeticOrder: string }): Observable<TvShowResponseBody> {
        const headers = GlobalService.getWithSecurityHeaders();
        return this._httpCliet.get<TvShowResponseBody>(`${GlobalService.publicApiHost}/public/get-adults-webshow-detail?page=${data.page}&limit=${data.limit}&order=${data.order}&alphabeticOrder=${data.alphabeticOrder}`,
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
    getWebShowsByCategory(data: { page: number, limit: number, category: string, order: string, alphabeticOrder: string }): Observable<TvShowResponseBody> {
        const headers = GlobalService.getWithSecurityHeaders();
        return this._httpCliet.get<TvShowResponseBody>(`${GlobalService.publicApiHost}/public/webshows/get-webshows-category?page=${data.page}&limit=${data.limit}&category=${data.category}&order=${data.order}&alphabeticOrder=${data.alphabeticOrder}`,
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
    

    getAdultSeries(): Observable<TvShow[]> {
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
        const apiUrl = `${GlobalService.publicApiHost}/public/get-adults-webshow-detail`;

        return this._httpCliet.get<any>(apiUrl, { headers }).pipe(
          catchError((err) => {
            console.log(err);
            return throwError(err);
          }),
          switchMap((response: any) => {
            if (response.success === true) {
              return of(response.webshows); // Adjust the response mapping to match your API structure
            } else {
              return throwError('API request failed'); // Handle the error case
            }
          })
        );
      }


}
