import { Injectable } from '@angular/core';
import { GlobalService } from './global.service';
import { Observable, catchError, of, switchMap, throwError } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { Dashboard } from '../model/dashboard';

@Injectable()
export class HomeService {
  constructor(
    private _httpClient: HttpClient
  ) {}

  getHomePageData(cache: boolean): Observable<Dashboard> {
    const headers = cache
      ? GlobalService.getWithSecurityHeaders()
      : GlobalService.getNoCacheHeaders();
      return this._httpClient.get<Dashboard>(`${GlobalService.publicApiHost}/public/home-details`,
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
