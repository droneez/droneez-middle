import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ConfigService } from './../services';
import { User } from './../models';

@Injectable({ 
	providedIn: 'root' 
})
export class UserService {

    constructor(private http: HttpClient, private configService: ConfigService) {
    }

    getAll() { 
        return this.http.get<User[]>(`${this.configService.apiUrl}/users`);
    }

    register(user: User) {
        return this.http.post(`${this.configService.apiUrl}/users/register`, user);
    }

    delete(id: number) {
        return this.http.delete(`${this.configService.apiUrl}/users/delete/${id}`);
    }
}