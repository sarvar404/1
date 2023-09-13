import { Injectable } from "@angular/core";
import { GlobalService } from "./global.service";
import { Observable, catchError, of, switchMap, throwError } from "rxjs";
import { HttpClient } from "@angular/common/http";


import { Channel } from "../model/channel";




@Injectable()
export class SearchService {

    constructor(private globalService: GlobalService,
        private _httpCliet: HttpClient) {
    }

    // getData(searchString: string): Observable<any> {
    //     const headers = GlobalService.getNoCacheHeaders();
    //     return this._httpCliet.get<any>(`${GlobalService.apiHost}/api/search/${searchString}/${GlobalService.apiToken}/${GlobalService.itemPurchaseCode}/`,
    //         {
    //             headers
    //         }).pipe(catchError((err) => {
    //             console.log(err);
    //             return throwError(err);
    //         }), switchMap((response: any) => {
    //             console.log(response);
    //             return of(response);
    //         }));
    // }

    getData(searchString: string): Observable<any> {
        const headers = GlobalService.getNoCacheHeaders();
        return this._httpCliet.get<any>(`${GlobalService.apiHostPublic}/api/public/search?title=${searchString}`,
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



}