import { Injectable } from '@angular/core';
import { HttpRequest, HttpHandler, HttpEvent, HttpInterceptor, HttpErrorResponse, HttpClient, HttpResponse } from '@angular/common/http';
import { Observable, throwError, } from 'rxjs';
import { UsersService } from '../services/users.service';
import { environment } from 'src/environments/environment';


@Injectable()
export class JwtInterceptor implements HttpInterceptor {
    constructor(private accountService: UsersService) { }
   

    intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any> > {
        // add auth header with jwt if user is logged in and request is to the api url
        const user = this.accountService.userValue;
        const isLoggedIn = user && user.access_token;
        const isApiUrl = request.url.startsWith(environment.apiUrl);
        if (isLoggedIn && isApiUrl) {
            request = request.clone({
                setHeaders: {
                    Authorization: `Bearer ${user.access_token}`
                }
            });
        }

        return next.handle(request)
        // .pipe(catchError((err: HttpErrorResponse) => {
        //     if (err.toString() === "Unauthorized" && !this.refresh) {
        //       this.refresh = true;
        //       return this.http.put(`${environment.apiUrl}/token/refresh`, {oldToken: user.token}).pipe(
        //         switchMap((res: any) => {
        //             user.token = res.token;
      
        //             localStorage.setItem('user', JSON.stringify(user));
                    
        //             return next.handle(request.clone({
        //                 setHeaders: {
        //                 Authorization: `Bearer ${user.token}`
        //                 }
        //             }));
        //         })
        //       );
        //     }
        //     this.refresh = false;
        //     return throwError(() => err);
        // }));
    }


}