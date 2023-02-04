import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor,
  HttpResponse
} from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { tap } from 'rxjs/operators';
import { SnackBarService } from "../../shared/services/snackbar.service";

@Injectable()
export class ErrorHandlingInterceptor implements HttpInterceptor {

  constructor(private snackBarService: SnackBarService) { }

  intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {
    return next.handle(request)
      .pipe(
        tap(e => {
          if (request.method == "POST" || request.method == "GET")
            if (e instanceof HttpResponse && e.status == 200) {
              this.snackBarService.openSnackSuccess();
            }
        }, error => {
          this.snackBarService.openSnackError(error.message);
          return throwError(error);
        })
      )
  }
}
