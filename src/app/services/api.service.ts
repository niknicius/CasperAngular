import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  constructor(private http: HttpClient) { }

  private apiUrl = 'https://niknicius.tk/api/';

  post(endpoint: string, body: any) {
    console.log(body);
    return this.http.post(this.apiUrl.concat(endpoint), body);
  }

  put(endpoint: string, body: any) {
    return this.http.put(this.apiUrl.concat(endpoint), body);
  }

  get(endpoint: string) {
    return this.http.get(this.apiUrl.concat(endpoint));
  }

  delete(endpoint: string) {
    return this.http.delete(this.apiUrl.concat(endpoint));
  }

}
