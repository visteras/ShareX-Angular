import {HttpClient, HttpErrorResponse, HttpResponse} from '@angular/common/http';
import {Injectable} from '@angular/core';
import {Observable, throwError} from 'rxjs';
import {catchError, retry} from 'rxjs/operators';

export interface Config {
  urlJwtRefresh: string;
  urlJwtAccess: string;
  urlGraphQL: string;
  domain: string;
  prefix: {
    refresh: string,
    access: string
  }
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
      prefix: { refresh: string; access: string };
      urlJwtAccess: string;
      urlJwtRefresh: string;
      domain: string;
    };
  }

  public Load() {
    this.getConfig().subscribe(r => {
        this.config.urlGraphQL = r.urlGraphQL;
        this.config.urlJwtAccess = r.urlJwtAccess;
        this.config.urlJwtRefresh = r.urlJwtRefresh;
        this.config.domain = r.domain;
        this.config.prefix = r.prefix;
        this.config.prefix.refresh = r.prefix.refresh;
        this.config.prefix.access = r.prefix.access;
      }, error => {
        console.log(error);
      }
    );
    console.log(this.config)
  }

  private getConfig(): Observable<Config> {
    return this.http.get<Config>(this.configUrl)
      .pipe(
        retry(3), // retry a failed request up to 3 times
        catchError(this.handleError) // then handle the error
      );
  }

  getConfigResponse(): Observable<HttpResponse<Config>> {
    return this.http.get<Config>(
      this.configUrl, {observe: 'response'});
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
