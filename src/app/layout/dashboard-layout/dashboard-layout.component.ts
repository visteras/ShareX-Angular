import {Component, OnInit} from '@angular/core';
import {Router} from '@angular/router';
import {library} from '@fortawesome/fontawesome-svg-core';
import {
  faEnvelopeOpenText,
  faFolder,
  faHistory,
  faHome,
  faImage,
  faKey,
  faLink,
  faLock,
  faPlusCircle,
  faUsers,
  faWrench
} from '@fortawesome/free-solid-svg-icons';
import {AuthService, JWTAccess} from '../../_services/auth.service';
import {MenuLinks} from '../../components/menu-block/menu-block.component';

@Component({
  selector: 'app-dashboard-layout',
  templateUrl: './dashboard-layout.component.html',
  styleUrls: ['./dashboard-layout.component.css']
})
export class DashboardLayoutComponent implements OnInit {

  user: JWTAccess;


  menu: Menu = {
    dashboard: {
      block: {name: 'Dashboard', url: '/dashboard', urlOptions: {exact: false,}, icon: null,},
      links: [
        {name: 'Dashboard', url: '/dashboard', icon: ['fas', 'home'], urlOptions: {exact: true}},
        {name: 'Токены', url: '/dashboard/tokens', icon: ['fas', 'key'], urlOptions: {exact: false}},
        {name: 'Картинки', url: '/dashboard/images', icon: ['fas', 'image'], urlOptions: {exact: false}},
        {name: 'Ссылки', url: '/dashboard/links', icon: ['fas', 'link'], urlOptions: {exact: false}},
        {name: 'Текст', url: '/dashboard/text', icon: ['fas', 'envelope-open-text'], urlOptions: {exact: false}},
        {name: 'Файлы', url: '/dashboard/files', icon: ['fas', 'folder'], urlOptions: {exact: false}},
      ]
    },
    admin: {
      block: {name: 'Admin', url: '/admin/index', urlOptions: {exact: false,}, icon: null,},
      links: [
        {name: 'Panel', url: '/admin/index', icon: ['fas', 'lock'], urlOptions: {exact: true}},
        {name: 'Users', url: '/admin/users', icon: ['fas', 'users'], urlOptions: {exact: false}},
        {name: 'All files', url: '/admin/users', icon: ['fas', 'history'], urlOptions: {exact: false}},
        {name: 'Config', url: '/admin/config', icon: ['fas', 'wrench'], urlOptions: {exact: false}},
      ]
    },
  };


  constructor(private auth: AuthService, private router: Router) {
    library.add(faHome, faImage, faLink, faKey, faEnvelopeOpenText, faFolder, faPlusCircle, faLock, faUsers, faHistory, faWrench);

  }

  logout(){
    this.auth.logout()
    this.router.navigate(['/'])
  }

  ngOnInit() {
    // if (!this.auth.IsLoggedIn()) {
    //   let res = this.auth.updateAccessToken();
    //   console.log('result: ' + res);
    //   if (!res) {
    //     console.log('redirect');
    //     document.location.href = '/';
    //     return;
    //   }
    // }
    // const token = this.auth.getAccessToken();
    // if (token == null) {
    //   document.location.href = '/';
    //   return;
    // }
    // this.user = token;
  }

}

export interface Menu {
  dashboard: MenuLinks,
  admin: MenuLinks,
}
