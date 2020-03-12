import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from '../../environments/environment';

const httpOptions = {
    headers: new HttpHeaders({
        'Content-Type':  'application/json',
        /*'Access-Control-Allow-Origin': '*'*/
        //'Authorization': 'my-auth-token'
    })
};

@Injectable({
  	providedIn: 'root'
})
export class ConfigService {

    private config: any;

    constructor(private http: HttpClient) { 

    }

    getConfig(): Promise<void | any> {
        return this.http.get<any>(environment.configAPIUrl)
            .toPromise().then(data => {
                this.config = { ...data };
                return this.config;
            },
            error => {
                console.log(error);
            });
    }

    getUrl(key: string) {
        return this.config.urls[0][key];
    }

}