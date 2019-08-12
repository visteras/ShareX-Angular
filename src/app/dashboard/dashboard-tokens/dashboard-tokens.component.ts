import {Component, OnInit} from '@angular/core';
import {SelectOption} from '../../components/select-placeholder/select-placeholder.component';

@Component({
  selector: 'app-dashboard-tokens',
  templateUrl: './dashboard-tokens.component.html',
  styleUrls: ['./dashboard-tokens.component.css']
})
export class DashboardTokensComponent implements OnInit {

  selectOptions: SelectOption[] = [
    {value: '-', viewValue: 'Select Type', selected: true},
    {value: 'image', viewValue: 'Image Token', selected: false},
    {value: 'link', viewValue: 'Link Token', selected: false},
    {value: 'file', viewValue: 'File Token', selected: false},
    {value: 'text', viewValue: 'Text Token', selected: false},
  ];

  constructor() {
  }

  ngOnInit() {
  }

}
