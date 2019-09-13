import {HttpClient} from '@angular/common/http';
import {Injectable} from '@angular/core';
import * as moment from 'moment';
import {BehaviorSubject, Observable} from 'rxjs';
import {map} from 'rxjs/operators';
import {ConfigService} from './config.service';
import {Prefix} from './prefix';

export class JWTRefresh {
  iss: string;
  sub: string;
  aud: string[];
  nbf: number;
  iat: number;
  jti: string;
  user_id: string;
  login: string;
  jwt: string;
  exp: number;
}

export class JWTError {
  status: number;
  error: string;
}

export class JWTAccess {
  iss: string;
  sub: string;
  aud: string[];
  nbf: number;
  iat: number;
  jti: string;
  refresh_jti: string;
  is_admin: boolean;
  user_id: string;
  login: string;
  jwt: string;
  exp: number;
}

@Injectable({providedIn: 'root'})
export class AuthService {
  private currentUserSubject: BehaviorSubject<JWTAccess>;
  private currentUser: Observable<JWTAccess>;

  constructor(private http: HttpClient, private config: ConfigService) {
    this.currentUserSubject = new BehaviorSubject<JWTAccess>(this.getAccessToken());
    this.currentUser = this.currentUserSubject.asObservable();
  }

  public get currentUserValue(): JWTAccess {
    // console.log(this.currentUserSubject.value);
    return this.currentUserSubject.value;
  }

  login(login: string, password: string): Promise<JWTAccess | JWTError> {

    return this.http.post<JWTRefresh>(this.config.config.domain + this.config.config.urlJwtRefresh, {login, password}).toPromise()
      .catch(err => {
          const e: JWTError = {
            status: err.status,
            error: err.error.error,
          };
          return e;
        }
      ).then(dataRefresh => {
        if (dataRefresh['status'] && dataRefresh['status'] != 200) {
          return (dataRefresh as JWTError);
        }
        this.setToken(dataRefresh, Prefix.Refresh);
        return this.updateAccessToken().toPromise()
          .catch(errRefresh => {
            return (errRefresh as JWTError);
          })
          .then(dataAccess => {
            if (dataAccess['status'] && dataAccess['status'] != 200) {
              return dataAccess as JWTError;
            } else {
              return dataAccess as JWTAccess;
            }
          });


      });


    // return this.http.post<JWTRefresh>(this.config.config.domain + this.config.config.urlJwtRefresh, {login, password})
    //   .pipe(r => {
    //     r.subscribe(response => {
    //         this.setToken(response, Prefix.Refresh);
    //         this.updateAccessToken().then(data => {
    //           this.currentUserSubject.next(data);
    //         });
    //         console.log('Login True');
    //       }, error => {
    //         console.log('Login False')
    //       }
    //     )
    //   });


  }

  private setToken(authResult, prefix: Prefix) {
    const expiresAt = authResult.exp.toString();
    localStorage.setItem(prefix + '_exp', expiresAt);
    let token = atob(authResult.jwt);
    localStorage.setItem(prefix + '_jwt', token);
    let res = JSON.parse(atob(token.split('.')[1]));
    localStorage.setItem('user_id', res['user_id']);
    localStorage.setItem('login', res['login']);
    if (prefix == Prefix.Access) {
      localStorage.setItem('is_admin', res['is_admin']);
      localStorage.setItem('refresh_jti', res['refresh_jti']);
    }
  }

  logout() {
    localStorage.removeItem(Prefix.Refresh + '_jwt');
    localStorage.removeItem(Prefix.Refresh + '_exp');
    localStorage.removeItem(Prefix.Access + '_jwt');
    localStorage.removeItem(Prefix.Access + '_exp');
    localStorage.removeItem('user_id');
    localStorage.removeItem('login');
    localStorage.removeItem('is_admin');
    localStorage.removeItem('refresh_jti');
    this.currentUserSubject.next(null);
  }

  public IsLoggedIn() {
    return !this.IsExpired(Prefix.Access);
  }

  public IsAdmin(): boolean {
    return this.getAccessToken().is_admin
  }

  getRefreshToken(): JWTRefresh | null {
    return JSON.parse(localStorage.getItem(Prefix.Refresh + '_jwt'));
  }

  getAccessToken(): JWTAccess | null {
    let tkn = localStorage.getItem(Prefix.Access + '_jwt');
    if (tkn == null) {
      return null;
    }
    let token = atob(tkn.split('.')[1]);
    if (token !== null) {
      return JSON.parse(token);
    } else {
      return null;
    }

  }

  IsExpired(token: Prefix) {
    let res = this.expiration(token);
    if (res !== null) {
      return !moment().isBefore(moment(res));
    }
    return true;
  }

  expiration(token: Prefix) {
    let expiration: string | null = null;
    switch (token) {
      case Prefix.Access:
        expiration = localStorage.getItem(Prefix.Access + '_exp');
        break;
      case Prefix.Refresh:
        expiration = localStorage.getItem(Prefix.Refresh + '_exp');
        break;
    }
    if (expiration !== null) {
      const expiresAt = JSON.parse(expiration);
      return moment(0).set('second', expiresAt);
    }
    return null;
  }

  updateAccessToken(): Observable<JWTAccess> {
    let token = localStorage.getItem(Prefix.Refresh + '_jwt');
    console.log('Всё начинается, токен (' + token + ')');


    return this.http.post<JWTAccess>(this.config.config.domain + this.config.config.urlJwtAccess, {refresh: token}).pipe(map(data => {
      this.setToken(data, Prefix.Access);
      console.log(data);
      const token = atob(atob(data['jwt']).split('.')[1]);
      let user = JSON.parse(token) as JWTAccess;
      this.currentUserSubject.next(user);
      return user;
    }));
    // return u;
  }

  // updateAccessToken(): Promise<JWTAccess | JWTError> {
  //   let token = localStorage.getItem(Prefix.Refresh + '_jwt');
  //   console.log('Всё начинается, токен (' + token + ')');
  //
  //   return this.http.post<JWTAccess>(this.config.config.domain + this.config.config.urlJwtAccess, {refresh: token}).toPromise()
  //     .catch(err => {
  //       const e: JWTError = {
  //         status: err.status,
  //         error: err.error.error,
  //       };
  //       return e;
  //     }).then(data => {
  //       if (data['status'] && data['status'] != 200) {
  //         return (data as JWTError);
  //       }
  //       this.setToken(data, Prefix.Access);
  //       const token = atob(atob(data['jwt']).split('.')[1]);
  //       let user = JSON.parse(token) as JWTAccess;
  //       this.currentUserSubject.next(user);
  //       return user;
  //     });
  // }
}


