import { Injectable } from "@angular/core";
import { GlobalService } from "./global.service";
import { Observable, catchError, of, switchMap, throwError } from "rxjs";
import { HttpClient } from "@angular/common/http";
import { myListResponseBody } from "../model/myListResponseBody";




@Injectable()
export class MylistService {

    constructor(private globalService:GlobalService,
        private _httpCliet: HttpClient){   
    }

    getMyListData(data : { id:number, key: string}): Observable<myListResponseBody> {
        const headers = GlobalService.getHeaders();
        return this._httpCliet.get<myListResponseBody>(`${GlobalService.apiHost}/api/mylist/${data.id}/${data.key}/${GlobalService.apiToken}/${GlobalService.itemPurchaseCode}/`, 
         {
            headers
        }).pipe( catchError( (err) => {
            console.log(err);
            return throwError(err);
        }), switchMap((response: any) => {
            console.log(response);
            return of(response);   
        }));
    }

    

}