import { Injectable } from "@angular/core";
import { environment } from "../../environments/environment";
import { HttpHeaders } from "@angular/common/http";
import { AccessToken, AllTokenHeader, Name, RefreshToken, UserName, _Id } from "../user-enums";


@Injectable()
export class GlobalService {
  public static apiHostPublic: string = environment.apiHostPublic;
  public static apiHost: string = environment.apiHost;
  public static apiToken: string = environment.apiToken;
  public static itemPurchaseCode: string = environment.itemPurchaseCode;
  public static publicApiHost: string = environment.publicApiHost;

  constructor() {}

  static getLoginHeaders(): HttpHeaders {
    return new HttpHeaders({
      'Content-Type': 'application/x-www-form-urlencoded',
      'x-security-header': '755b591e9d70327f62de7c901eee67241',
    });
  }

  static getHeaders(): HttpHeaders {
    return new HttpHeaders({
      'Content-Type': 'application/json',
    });
  }
  static getWithSecurityHeaders(): HttpHeaders {
    return new HttpHeaders({
      'Content-Type': 'application/json',
      'x-security-header': '755b591e9d70327f62de7c901eee67241',
    });
  }
  static getNoCacheHeaders(): HttpHeaders {
    return new HttpHeaders({
      'x-security-header': '755b591e9d70327f62de7c901eee67241',
      'Content-Type': 'application/json',
      'no-cache': 'true',
    });
  }
  static getAuthHeaders(): HttpHeaders {
    const allheaders = JSON.parse(localStorage.getItem(AllTokenHeader) || '{}');

    return new HttpHeaders({
      AccessToken: allheaders?.token || '',
      RefreshToken: allheaders?.refreshToken || '',
      _Id: allheaders?._id || '',
    });
  }

  static getUserAuthHeaders() : HttpHeaders {
    const allheaders = JSON.parse(localStorage.getItem(AllTokenHeader) || '{}');
    return new HttpHeaders({
      'x-security-header': '755b591e9d70327f62de7c901eee67241', // Get the 'x-security-header' value
      'x-auth-header': allheaders?.token || '',
      'x-user-id': allheaders?._id || '',
    }); 
  }
}
