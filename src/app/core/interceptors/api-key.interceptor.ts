import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor
} from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable()
export class ApiKeyInterceptor implements HttpInterceptor {

  constructor() {}

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    if (req.url.includes('https://api.themoviedb.org')) {
      const paramReq = req.clone({
        params: req.params.set(
          'api_key',
          'ff767a08fc1285474f8f591370d12441'
        )
      });
      return next.handle(paramReq);
    } /*else if (req.url.includes('https://www.googleapis.com')) {
      const paramReq = req.clone({
        params: req.params.set(
          'key',
          'AIzaSyCmMgWhraU6ijFOm8XVWeHlb0k93Es22w8'
        )
      });
      return next.handle(paramReq);
    }*/ else {
      return next.handle(req);
    }
  }
}
