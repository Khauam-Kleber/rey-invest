import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../environments/environment';
import { User } from '../models/user.model';
import { catchError, map } from 'rxjs/operators';
import { BehaviorSubject, Observable, of, throwError } from 'rxjs';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class UsersService {
    private userSubject: BehaviorSubject<User>;
    public user: Observable<User>;
    public favoritos: any = [];
  
    constructor(
        private http: HttpClient,
        private router: Router,
    ) {
        this.userSubject = new BehaviorSubject<User>(JSON.parse(localStorage.getItem('user')));
        this.user = this.userSubject.asObservable();
    }

    public get userValue(): User {
        return this.userSubject.value;
    }

   login(email, password) {
    return this.http.post<User>(`${environment.apiUrl}/users/login`, { email, password })
        .pipe(
            // catchError(
            //     (error) => {
            //         console.log(error)
            //       return of(error);
            // }),
            map(res => {
            this.updateCurrentUser(res);
            return res;
        }));
        
    }

    // refreshToken(){
    //     let oldToken = this.userValue.access_token
    //     const options ={
    //       param: "oldToken", oldToken,
    //       withCredentials: true
    //     };

    //     return this.http.get(`${environment.apiUrl}/token/refresh`,
    //     {
    //         params: {
    //             oldToken: this.userValue.access_token,
    //          }
    //     })
    //     .pipe(
    //         map(result => {
    //             console.log(result['access_token'])
    //             if(result['access_token']){
    //                 console.log(result)
    //                 this.updateCurrentUser(result);
    //             }else{ 
    //                 this.logout();
    //             }
    //         })
    //     );
    // }

    updateCurrentUser(user){
        localStorage.setItem('user', JSON.stringify(user));
        this.userSubject.next(user);
    }

    logout() {
        // remove user from local storage and set current user to null
        localStorage.removeItem('user');
        this.userSubject.next(null);
        this.router.navigate(['/auth/signin']);
    }

    create(user: User) {
        return this.http.post<any>(`${environment.apiUrl}/users`, user)
    }

    getAll() {
        return this.http.get<User[]>(`${environment.apiUrl}/users`);
    }

    getById(id: string) {
        return this.http.get<User>(`${environment.apiUrl}/users/${id}`);
    }

    getFavoritemsUser() {
        return this.http.get<any>(`${environment.apiUrl}/users/find-favorites/${this.userValue['data'].id}`);
    }

    update(id, params) {
        return this.http.put(`${environment.apiUrl}/users/${id}`, params)
            .pipe(map(x => {
                return x;
            }));
    }

    updateFavorites(id, params) {
        return this.http.put(`${environment.apiUrl}/users/update-favorites/${id}`, params)
            .pipe(map(x => {
              
                return x;
            }));
    }
    
}
