import { Injectable } from '@angular/core';
import {HttpEvent, HttpHandler, HttpInterceptor, HttpRequest} from '@angular/common/http';
import {Observable} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthInterceptorService implements HttpInterceptor {

  constructor() { }

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    const hash = localStorage.getItem('hash');

    if (hash) {
      const clone = req.clone({
        headers: req.headers.set('Authorization', hash)
      });

      return next.handle(clone);
    } else {
      return next.handle(req);
    }
  }
}
