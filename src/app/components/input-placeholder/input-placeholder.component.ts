import { Component, OnInit } from '@angular/core';
import { Input } from '@angular/core';

@Component({
  selector: 'app-input-placeholder',
  templateUrl: './input-placeholder.component.html',
  styleUrls: ['./input-placeholder.component.css']
})
export class InputPlaceholderComponent implements OnInit {
  @Input()
  set type(type: string) {
    this._type = type;
  }
  get type(): string { return this._type; }
  // tslint:disable-next-line:variable-name
  _type: string;

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

  constructor() { }

  ngOnInit() {
  }

}
