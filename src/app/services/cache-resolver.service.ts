import { HttpResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
@Injectable()
export class CacheResolverService {
  private cache = new Map<string, [Date, HttpResponse<any>]>();
  constructor() {}
  set(key:any, value:any, timeToLive: number | null = null) {
    console.log('Set cache key', key);
    if (timeToLive) {
      const expiresIn = new Date();
      expiresIn.setSeconds(expiresIn.getSeconds() + timeToLive);
      this.cache.set(key, [expiresIn, value]);
    } else {
      this.cache.set(key, [null!, value]);
    }
  }

  get(key:any) {
    const tuple = this.cache.get(key);
    if(!tuple) return null;
    // Extract tuple
    const expiresIn = tuple[0];
    const httpSavedResponse = tuple[1];
    const now = new Date();
    // Check if Time To Live has expired
    if(expiresIn && expiresIn.getTime() < now.getTime()) {
      // Delete if expired
      this.cache.delete(key);
      return null;
    }
    return httpSavedResponse;
  }
}