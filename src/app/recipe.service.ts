import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { IErecipe } from './recipe';
import { Observable, throwError } from 'rxjs';
import { catchError, retry, tap } from 'rxjs/operators';



@Injectable()
export class RecipeService {

  private _url = 'http://localhost:3000';

  private httpOptions = {
    headers: new HttpHeaders({
       'Content-Type': 'x-www-form-urlencoded',
       'accept': 'application/json',
    })
  };

  constructor(private http: HttpClient) { }

  getRecipe(): Observable<IErecipe[]> {
    return this.http.get<IErecipe[]>(this._url + '/api/recipes', this.httpOptions).pipe(
      retry(3),
      catchError(this.handleError)
    );

      // return this.http.get<recipe[]>(this._url).pipe(
    //   tap( // Log the result or error
    //     data => console.log(data),
    //     error => this.handleError(error)
    //   )
    // );
  }


  private handleError(error: HttpErrorResponse) {
    if (error.error instanceof ErrorEvent) {
      console.log('An error occured:', error.error.message);
    } else {
      console.error(
        `Backend returned code ${error.status}, ` +
        `body was: ${error.error}`);
    }
     // return an observable with a user-facing error message
     return throwError(
      'Something bad happened; please try again later. Error: ' + error.error );
  }

}
