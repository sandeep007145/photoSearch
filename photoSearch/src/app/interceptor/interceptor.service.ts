import { Injectable, ChangeDetectorRef } from '@angular/core';
import { HttpInterceptor, HttpHandler, HttpEvent, HttpResponse, HttpErrorResponse } from '@angular/common/http';
import { HttpRequest } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { map, catchError } from 'rxjs/operators';
// import { NgProgress } from '@ngx-progressbar/core';
declare var toastr: any;


@Injectable()
export class InterceptorService implements HttpInterceptor {
    expiredOrNot: any;
    nextApi: Boolean = false;
    constructor(
        // public ngProgress: NgProgress,
    ) { }

    intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        // this.ngProgress.start();
        let token;
        const acess_token = null;
        if (acess_token) {
            token = request.clone({
                setHeaders: {
                    'Authorization': 'Bearer' + acess_token
                }
            });
        } else {
            token = request.clone({
                setHeaders: {
                }
            });
        }
        return next.handle(token)
            .pipe(map((event: HttpEvent<any>) => {
                if (event instanceof HttpResponse) {
                    // this.ngProgress.done();
                    return event;
                }
            }))
            .pipe(catchError((err: HttpEvent<any>) => {
                let message: string;
                // this.ngProgress.done();
                if (err instanceof HttpErrorResponse) {
                    if (err.error && err.error.message) {
                        message = err.error.message;
                        switch ((<HttpErrorResponse>err).status) {
                            case 409 || 402:
                                message = 'duplicate entry';
                                break;
                            case 500:
                                break;
                            case 400:
                                message = '';
                                break;
                            case 401:
                                break;
                            case 403:
                                message = '';
                                break;
                            case 404:
                                message = '';
                                toastr.error('Requested page is not found');
                                break;
                            case 412:
                                message = '';
                                break;
                            default:
                                return throwError(err);
                        }
                    }
                }
                return throwError(err);
            }));
    }
}
