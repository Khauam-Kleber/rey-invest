import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../environments/environment';
import { User } from '../models/user.model';
import { map } from 'rxjs/operators';
import { BehaviorSubject, Observable } from 'rxjs';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class UsersService {
    private userSubject: BehaviorSubject<User>;
    public user: Observable<User>;

    private storage: Storage;
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
        .pipe(map(user => {
            // store user details and jwt token in local storage to keep user logged in between page refreshes
            localStorage.setItem('user', JSON.stringify(user));
            this.userSubject.next(user);
            return user;
        }));
    }

    logout() {
        // remove user from local storage and set current user to null
        localStorage.removeItem('user');
        this.userSubject.next(null);
        this.router.navigate(['/auth/signin']);
    }

    
    create(user: User) {
        return this.http.post(`${environment.apiUrl}/users`, user);
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
                // update stored user if the logged in user updated their own record
                // localStorage.setItem('user', JSON.stringify(user));
                // if (id == this.userValue.id) {
                //     const user = { ...this.userValue, ...params };
                //     this.userSubject.next(user);
                // }
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
