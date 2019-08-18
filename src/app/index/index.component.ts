import { Component, OnInit } from '@angular/core';
import {AppComponent} from '../app.component';
import {ConfigService} from '../_services/config.service';
@Component({
  selector: 'app-index',
  templateUrl: './index.component.html',
  styleUrls: ['./index.component.css']
})
export class IndexComponent implements OnInit {
  title = AppComponent.title;
  constructor(private config: ConfigService) { }

  ngOnInit() {
  }

}
