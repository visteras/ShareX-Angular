import { Component, OnInit } from '@angular/core';
import {NgbButtonsModule, NgbButtonLabel} from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-sign-in-out-layout',
  templateUrl: './sign-in-out-layout.component.html',
  styleUrls: ['./sign-in-out-layout.component.css']
})
export class SignInOutLayoutComponent implements OnInit {

  constructor() {
    console.log('SignInOutLayout constructor called');
  }

  ngOnInit() {
  }

}
