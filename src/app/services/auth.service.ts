import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {shareReplay, tap} from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private http: HttpClient) { }

  private logged = false;

  private apiLogin = 'https://niknicius.tk/api';

  private setSession(authData) {
      const hash = authData.hash;
      localStorage.setItem('hash', hash);
  }

  getToken() {
    return localStorage.getItem('hash');
  }

  login(username: string, password: string) {
    return this.http.post(this.apiLogin + '/login', { username, password}).pipe(
      tap(response => this.setSession(response)),
      shareReplay()
    );
  }

  logout() {
    localStorage.removeItem('hash');
  }

  isLogged() {
    if (localStorage.getItem('hash') != null) {
      return true;
    }
    return false;
  }
}
