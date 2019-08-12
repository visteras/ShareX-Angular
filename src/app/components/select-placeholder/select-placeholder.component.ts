import { Component, OnInit } from '@angular/core';
import { Input } from '@angular/core';

export interface SelectOption {
  value: string;
  viewValue: string;
  selected: boolean;
}

@Component({
  selector: 'app-select-placeholder',
  templateUrl: './select-placeholder.component.html',
  styleUrls: ['./select-placeholder.component.css']
})
export class SelectPlaceholderComponent implements OnInit {
  @Input()
  set placeholder(placeholder: string) {
    this._placeholder = placeholder;
  }
  get placeholder(): string { return this._placeholder; }
  // tslint:disable-next-line:variable-name
  _placeholder: string;

  @Input()
  set id(id: string) {
    this._id = id;
  }
  get id(): string { return this._id; }
  // tslint:disable-next-line:variable-name
  _id: string;

  @Input()
  set selectOptions(options: SelectOption[]) {
    this._selectOptions = options;
  }
  get selectOptions(): SelectOption[] { return this._selectOptions; }
  // tslint:disable-next-line:variable-name
  _selectOptions: SelectOption[];

  constructor() { }

  ngOnInit() {
  }

}
