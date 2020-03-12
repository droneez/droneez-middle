import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpErrorResponse } from '@angular/common/http';
import { catchError, retry } from 'rxjs/operators';
import { Observable, throwError } from 'rxjs';
import { ConfigService } from './config.service';

const httpOptions = {
    headers: new HttpHeaders({
        'Content-Type': 'application/json',
        'Accept': 'application/json'
    })
};

@Injectable({
  	providedIn: 'root'
})
export class ArticlesService {

  	constructor(
  		private http: HttpClient,
  		private configService: ConfigService) {
  	}

  	getArticlesInfos(): Observable<any[]> {
  		const url = `${this.configService.getUrl('articlesInfosUrl')}`;
  		return this.http.get<any[]>(url)
  			.pipe(
  				retry(3),
  				catchError(this.handleError)
  			);
  	}

  	getArticleById(id: number): Observable<any> {
  		const url = `${this.configService.getUrl('articleUrls').read}${id}`;
  		return this.http.get<any>(url)
  			.pipe(
  				retry(3),
  				catchError(this.handleError)
  			);
  	}

  	private handleError(error: HttpErrorResponse) {
        if (error.error instanceof ErrorEvent) {
            // A client-side or network error occurred. Handle it accordingly.
            console.error('An error occurred:', error.error.message);
        } else {
            // The backend returned an unsuccessful response code.
            // The response body may contain clues as to what went wrong,
            console.error(
                `Backend returned code ${error.status}, ` +
                `error was: ${error.message}`
            );
        }
        // return an observable with a user-facing error message
        return throwError('Une erreur est survenue. Veuillez réessayer plus tard.');
    };
}