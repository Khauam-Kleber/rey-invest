import { Injectable } from '@angular/core';
import { HttpRequest, HttpHandler, HttpEvent, HttpInterceptor, HttpClient, HttpHeaders, } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { UsersService } from '../services/users.service';
import { switchMap, catchError } from 'rxjs/operators';

@Injectable()
export class ErrorInterceptor implements HttpInterceptor {
    constructor(private accountService: UsersService, private http: HttpClient) {}

    intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        return next.handle(request).pipe(catchError(err => {
            if (err.status === 401) {
                 // auto logout if 401 response returned from api
                this.accountService.logout();
                // this.accountService.refreshToken().subscribe((response:any) => this.refresh = false );
            }
            
            const error = err.error.message || err.statusText;
            return throwError(error);
        }))
    }
}