import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, catchError, from, map, of, switchMap, throwError } from 'rxjs';
import { ResponseBody } from '../model/response-body';
import { UserLogin } from '../model/user-login';
import { GlobalService } from './global.service';
import { AccessToken, AllTokenHeader, Name, RefreshToken, UserName, _Id, xSecurityHeader } from '../user-enums';


@Injectable()
export class AuthService {
  private _authenticated: boolean = false;

  constructor(
    private _httpCliet: HttpClient,
  ) {}

  setItem(key: string, value: string) {
    localStorage.setItem(key, value);
  }

  getItem(key: string): string {
    return localStorage.getItem(key) ?? '';
  }

  doLogin(credentials: UserLogin): Observable<ResponseBody> {

    this._authenticated = false;
    const headers = GlobalService.getLoginHeaders();
    const formData: any = new URLSearchParams();
    formData.set('email', credentials.username);
    formData.set('password', credentials.password);
    return this._httpCliet
      .post<ResponseBody>(
        GlobalService.publicApiHost+
        '/public/login',
        formData.toString(),
        {
          headers,
        }
      )
      .pipe(
        catchError((err) => {
          console.log(err);
          this._authenticated = false;

          return of(
            new ResponseBody({
              code: err.status,
              message: err.statusText,
              values: [],
            })
          );
        }),
        switchMap((response: any) => {
          console.log(response);
          if (
            response.success === true
          ) {
            this._authenticated = true;
            this.setItem(UserName, response?.username);
            this.setItem(AllTokenHeader, JSON.stringify(response));

          }
          return of(response);
        })
      );
  }

  async onContentPlayed(): Promise<boolean> {
    const username = localStorage.getItem('username');

    if (username && username.trim() !== '') {
      return true;
    } else {
      return false;
    }
  }



  doLogout(): Observable<any> {
    localStorage.clear();
    this._authenticated = false;
    return of(true);
  }
  check(): Observable<boolean> {



    if (this._authenticated) {
      return of(true);
    }

    const allheaders = JSON.parse(localStorage.getItem(AllTokenHeader) || '{}');
    if (allheaders?.token && allheaders?.token > 0) {
      return of(true);
    }
    return of(false);
  }

  verifyPinForUser(pin: string) {
    const headers = GlobalService.getUserAuthHeaders();

    // Make the POST request with headers
    return this._httpCliet.post(
      `${GlobalService.publicApiHost}/public/verify-adult-pin`,
      { pin },
      { headers }
    );
  }
}
