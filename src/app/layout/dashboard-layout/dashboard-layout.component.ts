import {Component, OnInit} from '@angular/core';
import {library} from '@fortawesome/fontawesome-svg-core';
import {faEnvelopeOpenText, faFolder, faHome, faImage, faKey, faLink, faPlusCircle} from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-dashboard-layout',
  templateUrl: './dashboard-layout.component.html',
  styleUrls: ['./dashboard-layout.component.css']
})
export class DashboardLayoutComponent implements OnInit {

  constructor() {
    library.add(faHome, faImage, faLink, faKey, faEnvelopeOpenText, faFolder, faPlusCircle);
    console.log('DashboardLayout constructor called');
  }

  ngOnInit() {
  }

}
