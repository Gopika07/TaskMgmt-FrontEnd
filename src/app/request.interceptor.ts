import { Injectable } from '@angular/core';
import { HttpRequest, HttpHandler, HttpEvent, HttpInterceptor, HttpResponse, HttpErrorResponse, HttpEventType } from '@angular/common/http';
import { EMPTY, Observable, catchError, finalize, of, switchMap, tap, throwError } from 'rxjs';
import { LoaderService } from './services/loader.service';
import { ToastrService } from 'ngx-toastr';

@Injectable()
export class RequestInterceptor implements HttpInterceptor {
  constructor(private loadingService: LoaderService, private toastr: ToastrService) {}

  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    const token = localStorage.getItem('Bearer');
    if (token) {
      request = request.clone({
        setHeaders: {
          Authorization: `Bearer ${token}`,
        }
      });
    }

    const storedETag = localStorage.getItem(request.urlWithParams);
    if (request.method === 'GET') {
      request = request.clone({
        setHeaders: {
          'If-None-Match': storedETag || ''
        }
      });
    }

    this.loadingService.setLoading(true);

    return next.handle(request).pipe(
      switchMap(event => {
        if (event instanceof HttpResponse && request.method === 'GET') {
          if (event.status === 304) {
            const cachedResponse = localStorage.getItem(`${request.urlWithParams}_cache`);
            if (cachedResponse) {
              console.log('Data not modified, using cached data.');
              return of(new HttpResponse({ body: JSON.parse(cachedResponse), status: 200 }));
            } else {
              console.log('No cached data available, fetching fresh data.');
              return of(event);
            }
          } else if (event.status === 200) {
            const newETag = event.headers.get('ETag');
            if (newETag) {
              localStorage.setItem(`${request.urlWithParams}_cached`, JSON.stringify(event.body));
              localStorage.setItem(request.urlWithParams, newETag);
            } else {
              console.log('ETag header is missing in the response.');
            }
          }
        }
        return of(event);
      }),
      catchError((err: HttpErrorResponse) => {
        if (err.status === 304) {
          const cachedResponse = localStorage.getItem(`${request.urlWithParams}_cache`);
          if (cachedResponse) {
            console.log('Data not modified, using cached data.');
            return of(new HttpResponse({ body: JSON.parse(cachedResponse), status: 200 }));
          } else {
            console.log('No cached data available, fetching fresh data.');
            return throwError(err);
          }
        } else {
          let errorMessage = 'An unknown error occurred';
          if (err.error && typeof err.error === 'string') {
            errorMessage = err.error; //string
          } else if (err.error && err.error.error) {
            errorMessage = err.error.errorMessage; //object
          }
          this.toastr.error(errorMessage);
          return throwError(err);
        }
      }),
      finalize(() => {
        this.loadingService.setLoading(false);
      })
    );
  }
}