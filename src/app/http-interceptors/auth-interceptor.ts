import {HttpEvent, HttpHandler, HttpInterceptor, HttpRequest} from '@angular/common/http';
import {Injectable} from '@angular/core';
import {Router} from '@angular/router';
import {Observable} from 'rxjs';
import {AuthService} from '../auth.service';
import {ConfigService} from '../config.service';


@Injectable()
export class AuthInterceptor implements HttpInterceptor {

  constructor(private auth: AuthService, private config: ConfigService, private router: Router) {
  }

  intercept(req: HttpRequest<any>,
            next: HttpHandler): Observable<HttpEvent<any>> {

    if (req.url == 'assets/config.json') {
      return next.handle(req);
    }

    const refresh = localStorage.getItem(this.config.config.prefix.refresh + '_jwt');
    let access = localStorage.getItem(this.config.config.prefix.access + '_jwt');

    switch (req.url) {
      case this.config.config.domain + this.config.config.urlGraphQL:
        if (access == null || this.auth.IsExpired('access')) {
          if (refresh && !this.auth.IsExpired('refresh')) {
            this.auth.updateAccessToken();
            access = localStorage.getItem(this.config.config.prefix.access + '_jwt');
          }
        }
        const cloned = req.clone({
          headers: req.headers.set('Authorization', 'Bearer ' + access)
        });
        return next.handle(cloned);
        break;
      case this.config.config.domain + this.config.config.urlJwtAccess:
        if (refresh && !this.auth.IsExpired('refresh')) {
          const cloned = req.clone({
            body: {refresh}
          });
          return next.handle(cloned);
        } else {
          this.router.navigate(['/signin']);
          return;
        }
        break;
      case this.config.config.domain + this.config.config.urlJwtRefresh:
        break;
      default:
        console.log(req.url);
        break;
    }

    return next.handle(req);
  }


  //если есть аксес -> проверяем валидность
  //если валидности нет -> запрашиваем новый аксес
  //если нет аксеса -> запрашиваем новый аксес
  //если есть рефреш -> все хорошо. запрашиваем
  //если рефреша нет -> перенаправляем на логин
}
