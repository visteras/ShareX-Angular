import {HttpClient, HttpErrorResponse, HttpResponse} from '@angular/common/http';
import {Injectable} from '@angular/core';
import {Observable, throwError} from 'rxjs';
import {catchError, retry} from 'rxjs/operators';

export interface Config {
  urlJwtRefresh: string;
  urlJwtAccess: string;
  urlSignUp: string;
  urlGraphQL: string;
  domain: string;
}

@Injectable({
  providedIn: 'root'
})
export class ConfigService {
  configUrl = 'assets/config.json';
  config: Config;

  constructor(private http: HttpClient) {
    this.config = new class implements Config {
      urlGraphQL: string;
      urlJwtAccess: string;
      urlJwtRefresh: string;
      urlSignUp: string;
      domain: string;
    };
  }

  public Load(): Promise<Config> {
    return this.getConfig().toPromise()
  }

  private getConfig(): Observable<Config> {
    return this.http.get<Config>(this.configUrl)
      .pipe(
        retry(3), // retry a failed request up to 3 times
        catchError(this.handleError) // then handle the error
      );
  }

  private handleError(error: HttpErrorResponse) {
    if (error.error instanceof ErrorEvent) {
      // A client-side or network error occurred. Handle it accordingly.
      console.error('An error occurred:', error.error.message);
    } else {
      // The backend returned an unsuccessful response code.
      // The response body may contain clues as to what went wrong,
      console.error(`Backend(${error}) returned code ${error.status}, body was: ${error.error}`);
    }
    // return an observable with a user-facing error message
    return throwError(
      'Something bad happened; please try again later.');
  };
}
