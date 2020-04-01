import { Injectable } from '@angular/core';
import { HttpClient/*, HttpHeaders*/ } from '@angular/common/http';
import { BehaviorSubject, Observable } from 'rxjs';
import { map, catchError } from 'rxjs/operators';
import { ConfigService } from './../services';

import { User } from './../models/user';

/*const httpOptions = {
    headers: new HttpHeaders({
        'Content-Type':  'application/json',
        'Access-Control-Allow-Origin': '*'
        //'Authorization': 'my-auth-token'
    })
};*/

@Injectable({ 
	providedIn: 'root' 
})
export class AuthenticationService {
    private currentUserSubject: BehaviorSubject<User>;
    public currentUser: Observable<User>;

    constructor(private http: HttpClient, private configService: ConfigService) {
        this.currentUserSubject = new BehaviorSubject<User>(JSON.parse(localStorage.getItem('currentUser')));
        this.currentUser = this.currentUserSubject.asObservable();
    }

    public get currentUserValue(): User {
        return this.currentUserSubject.value;
    }

    login(username, password) {
        return this.http.post<any>(`${this.configService.apiUrl}/users/authenticate`, { username, password })
            .pipe(
                map(data => {
                    if(!data.error) {
                        // store user details and jwt token in local storage to keep user logged in between page refreshes
                        localStorage.setItem('currentUser', JSON.stringify(data));
                        this.currentUserSubject.next(data);
                        //return data;
                    }
                    return data;
                    
                })/*,
                catchError(error => {
                    return error;
                })*/
            );
    }

    logout() {
        // remove user from local storage and set current user to null
        localStorage.removeItem('currentUser');
        this.currentUserSubject.next(null);
    }
}