import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor,
  HttpResponse,
  HttpErrorResponse
} from '@angular/common/http';
import { EMPTY, Observable, catchError, finalize, tap, throwError } from 'rxjs';
import { LoaderService } from './services/loader.service';
// import { ErrorHandlerService } from './services/error-handler.service';
import { ToastrService } from 'ngx-toastr';


@Injectable()
export class RequestInterceptor implements HttpInterceptor {

  constructor(private loadingService: LoaderService, private toastr: ToastrService) {}

  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    const token = localStorage.getItem('Bearer');
    if(token){
      request = request.clone({
        setHeaders:{
          Authorization: `Bearer ${token}`
        }
      })
    }
    this.loadingService.setLoading(true);
    return next.handle(request).pipe(
      catchError(err => {
        let errorMessage = 'An unknown error occurred';
        if (err instanceof HttpErrorResponse) {
          if (err.error && typeof err.error === 'string') {
            errorMessage = err.error; // if string
          } else if (err.error && err.error.error) {
            errorMessage = err.error.errorMessage; // if object
          }
          this.toastr.error(errorMessage);
       } else {
          this.toastr.error(errorMessage);
       }
       return throwError(err);
      }),
      finalize(() => {
        this.loadingService.setLoading(false);
      })
    );
  }
}
