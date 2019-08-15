import {HttpClient} from '@angular/common/http';
import {Injectable} from '@angular/core';
import * as moment from 'moment';
import {Observable, Subscription} from 'rxjs';
import {map} from 'rxjs/operators';
import {ConfigService} from './config.service';

export interface JWTRefresh {
  // iss: string,
  // sub: string,
  // aud: string[],
  // exp: number,
  // nbf: number,
  // iat: number,
  // jti: string,
  user_id: string,
  login: string,
  jwt: string,
  exp: number,
}

export interface JWTAccess {
  refresh_jti: string,
  is_admin: boolean,
  user_id: string,
  login: string,
  jwt: string,
  exp: number,
}

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private http: HttpClient, private config: ConfigService) {
  }

  login(login: string, password: string): Observable<boolean> {
    return this.http.post<JWTRefresh>(this.config.config.domain + this.config.config.urlJwtRefresh, {login, password}).pipe(map(res => {
      this.setToken(res, this.config.config.prefix.refresh);
      this.updateAccessToken()
      return true;
    }, error => {
      return false;
    }));
  }

  test(): Observable<boolean> {
    return this.http.get<any>(this.config.config.domain + 'helooo').pipe(map(res => {
      return true;
    }, error => {
      return false;
    }));
  }

  private setToken(authResult, prefix: string) {
    const expiresAt = authResult.exp.toString();
    localStorage.setItem(prefix + '_exp', expiresAt);
    let token = atob(authResult.jwt);
    localStorage.setItem(prefix + '_jwt', token);
    let res = JSON.parse(atob(token.split('.')[1]));
    localStorage.setItem('user_id', res['user_id']);
    localStorage.setItem('login', res['login']);
    if (prefix == 'access') {
      localStorage.setItem('is_admin', res['is_admin']);
      localStorage.setItem('refresh_jti', res['refresh_jti']);
    }
  }

  logout() {
    localStorage.removeItem(this.config.config.prefix.refresh + '_jwt');
    localStorage.removeItem(this.config.config.prefix.refresh + '_exp');
    localStorage.removeItem(this.config.config.prefix.access + '_jwt');
    localStorage.removeItem(this.config.config.prefix.access + '_exp');
    localStorage.removeItem('user_id');
    localStorage.removeItem('login');
    localStorage.removeItem('is_admin');
    localStorage.removeItem('refresh_jti');
  }

  public isLoggedIn() {
    return moment().isBefore(moment(this.getExpiration()));
  }

  getExpiration() {
    const expiration = localStorage.getItem(this.config.config.prefix.access + '_exp');
    const expiresAt = JSON.parse(expiration);
    return moment(0).set('second', expiresAt);
  }

  getRefreshToken() {
    return localStorage.getItem(this.config.config.prefix.refresh + '_jwt');
  }

  getAccessToken() {
    return localStorage.getItem(this.config.config.prefix.access + '_jwt');
  }

  IsExpired(token: string) {
    let res = this.expiration(token);
    if (res !== null) {
      return !moment().isBefore(moment(res));
    }
    return false;
  }

  expiration(token: any) {
    let expiration: string | null = null;
    switch (token) {
      case 'access':
        expiration = localStorage.getItem(this.config.config.prefix.access + '_exp');
        break;
      case 'refresh':
        expiration = localStorage.getItem(this.config.config.prefix.refresh + '_exp');
        break;
    }
    if (expiration !== null) {
      const expiresAt = JSON.parse(expiration);
      return moment(0).set('second', expiresAt);
    }
    return null;
  }

  updateAccessToken(): Subscription {
    let token = localStorage.getItem(this.config.config.prefix.refresh + '_refresh');
    return this.http.post<JWTAccess>(this.config.config.domain + this.config.config.urlJwtAccess, {refresh: token})
      .subscribe(r => {
          this.setToken(r, 'access');
          return true;
        }, error => {
          return false;
        }
      );
  }
}


