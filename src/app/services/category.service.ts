import { Injectable } from "@angular/core";
import { GlobalService } from "./global.service";
import { Observable, catchError, of, switchMap, throwError } from "rxjs";
import { HttpClient } from "@angular/common/http";
import { Category } from "../model/category";
import { ResponseBody } from "../model/response-body";



@Injectable()
export class CategoryService {

    constructor(private globalService:GlobalService,
        private _httpCliet: HttpClient){   
    }

    getCategoriesByChoice(data : { id: number}): Observable<Category[]> {
        const headers = GlobalService.getWithSecurityHeaders();
        return this._httpCliet.get<Category[]>(`${GlobalService.publicApiHost}/public/categories/get-categories-by-choice?typeid=${data.id}`, 
         {
            headers
        }).pipe( catchError( (err) => {
            console.log(err);
            return throwError(err);
        }), switchMap((response: ResponseBody) => {
             if(response.success){
                return of(response.data)
             }
            return of(null);   
        }));
    }

}