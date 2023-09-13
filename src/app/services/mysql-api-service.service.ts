import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class MysqlApiService {

  private baseUrl = 'http://localhost:3900';

  constructor(private http: HttpClient) { }

  getData() {
    return this.http.get(`${this.baseUrl}/api/data`);
  }

  postData(data: any) {
    return this.http.post(`${this.baseUrl}/api/data`, data);
  }

  updateData(id: any, data: any) {
    return this.http.put(`${this.baseUrl}/api/data/${id}`, data);
  }

  deleteData(id: any) {
    return this.http.delete(`${this.baseUrl}/api/data/${id}`);
  }

  postVideoDuration(duration: any) {
    return this.http.post(`${this.baseUrl}/api/video/duration`, { duration });
  }
}
