import { Injectable } from '@angular/core';
import { GlobalService } from './global.service';
import { Observable, catchError, of, switchMap, throwError, map, interval, concatMap } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';

import { AccessToken, RefreshToken, _Id, xSecurityHeader } from '../user-enums';
import { SourceContentResponseBody } from '../model/source-content-body';
import { SharedService } from './shared.service';
import { SubscriptionChangeEnum } from '../model/subscription-change-enum';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  constructor(
    private _httpCliet: HttpClient,
    private _sharedService: SharedService
  ) {}

  private subscriptionCheck(): Observable<boolean> {

    // Create the headers with the 'x-security-header' and other required headers
    const headers = GlobalService.getUserAuthHeaders();

    // Adjust the URL as needed to match your Node.js API endpoint
    const apiUrl = `${GlobalService.publicApiHost}/public/subscription-validity`;

    return this._httpCliet.get<any>(apiUrl, { headers }).pipe(
      catchError((err) => {
        console.log(err);
        return throwError(err);
      }),
      map((response: any) => {
        if (
          response.subscriptionInfo &&
          response.subscriptionInfo.isSubscriptionActive
        ) {
          return true; // Subscription is active
        } else {
          return false; // Subscription is not active
        }
      })
    );
  }

  observeDeviceAndSubscriptionChanges() : Observable<SubscriptionChangeEnum> {
   return new Observable((observer) => {
       this.postDeviceDetails().subscribe((value: any) => {
          // start a timer here
          const intervalObservable = interval(5000);
          const subscriptionObservable = intervalObservable.pipe(
            concatMap((value) => {
              return new Observable<SubscriptionChangeEnum>((timerObserver) => {
                // 1. need to check if the subscription is active
                // 2. need to check if its the same device
                this.subscriptionCheck().subscribe((subscriptionValid: boolean)=> {
                  if(!subscriptionValid) {
                    timerObserver.next(SubscriptionChangeEnum.Expired);
                    timerObserver.complete();
                  }
                  else {
                    this.deviceDetailsCheck().subscribe((deviceValid: boolean)=> {
                      if(!deviceValid) {
                        timerObserver.next(SubscriptionChangeEnum.Another_Device);
                        timerObserver.complete();
                      }
                      else {
                        timerObserver.next(SubscriptionChangeEnum.Valid);
                        timerObserver.complete();
                      }
                    }); 
                  }
                });  
              });
            }));
          
            subscriptionObservable.subscribe((value) => {
              if(value != SubscriptionChangeEnum.Valid) {
                observer.next(value);
                observer.complete();
              }
            });
      });
    });
  }

  private postDeviceDetails(): Observable<any> {

    // Create the request body
    const requestBody = {
      device_id: this._sharedService.getDeviceId(), 
      platform: 'Browser', 
      model: 'Browser',
    };

    // Create the headers with the 'x-security-header' and other required headers
    const headers = GlobalService.getUserAuthHeaders();
    // Adjust the URL as needed to match your Node.js API endpoint
    const apiUrl = `${GlobalService.publicApiHost}/public/device-details`;

    // Make the POST request with headers and body
    return this._httpCliet.post(apiUrl, requestBody, { headers }).pipe(
      catchError((err) => {
        console.log(err);
        return throwError(err);
      })
    );
  }

  private deviceDetailsCheck(): Observable<boolean> {
    // Create the request body
    const requestBody = {
      device_id: this._sharedService.getDeviceId(), 
    };

    const headers = GlobalService.getUserAuthHeaders();
    const apiUrl = `${GlobalService.publicApiHost}/public/check-device`;

    // Make the POST request with headers and body
    return this._httpCliet.post(apiUrl, requestBody, { headers }).pipe(
      catchError((err) => {
        console.log(err);
        return throwError(err);
      }),
      map((response: any) => {
        // Check the 'isDeviceAvailable' flag in the response
        if (response.isDeviceAvailable === true) {
          return true; // Device is available
        } else {
          return false; // Device is not available
        }
      })
    );
  }

  getSourceData(type: string, _id: string): Observable<SourceContentResponseBody> {
    
    // Create the headers with the 'x-security-header' and other required headers
    const headers = GlobalService.getUserAuthHeaders();

    // Adjust the URL as needed to match your Node.js API endpoint for getting sources
    const apiUrl = `${GlobalService.publicApiHost}/public/get-sources?type=${type}&_id=${_id}`;

    // Make the GET request with headers
    return this._httpCliet.get<SourceContentResponseBody>(apiUrl, { headers }).pipe(
      catchError((err) => {
        console.log(err);
        return throwError(err);
      }),
      switchMap((response: any) => {
        // Check the response data here
        return of(response);
      })
    );
  }

}
