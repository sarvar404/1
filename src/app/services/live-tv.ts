import { Injectable } from '@angular/core';
import { GlobalService } from './global.service';
import { Observable, catchError, of, switchMap, throwError } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';

import { xSecurityHeader } from '../user-enums';
import { Channel } from '../model/channel';
import { HomeResponseBody } from '../model/home-response-body';

@Injectable()
export class LiveTVService {
  constructor(private _httpCliet: HttpClient) {}

  getLiveTv(): Observable<Channel[]> {
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
    const apiUrl = `${GlobalService.publicApiHost}/public/get-live-tv-total`;
  
    return this._httpCliet.get<any>(apiUrl, { headers }).pipe(
      catchError((err) => {
        console.log(err);
        return throwError(err);
      }),
      switchMap((response: any) => {
        if (response.success === true) {
          const channelArray: Channel[] = response.data.map((channelData: any) => new Channel(channelData));
          return of(channelArray); // Map the response data to an array of Channel objects
        } else {
          return throwError('API request failed'); // Handle the error case
        }
      })
    );
  }

  getSportTv(): Observable<Channel[]> {
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
    const apiUrl = `${GlobalService.publicApiHost}/public/get-sport-tv-total`;
  
    return this._httpCliet.get<any>(apiUrl, { headers }).pipe(
      catchError((err) => {
        console.log(err);
        return throwError(err);
      }),
      switchMap((response: any) => {
        if (response.success === true) {
          const channelArray: Channel[] = response.data.map((channelData: any) => new Channel(channelData));
          return of(channelArray); // Map the response data to an array of Channel objects
        } else {
          return throwError('API request failed'); // Handle the error case
        }
      })
    );
  }
  
}
