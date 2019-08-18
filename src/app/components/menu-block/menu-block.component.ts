import {Component, Input, OnInit} from '@angular/core';
import {IconProp} from '@fortawesome/fontawesome-svg-core';

@Component({
  selector: 'app-menu-block',
  templateUrl: './menu-block.component.html',
  styleUrls: ['./menu-block.component.css'],
})
export class MenuBlockComponent implements OnInit {

  @Input()
  menu: MenuLinks;

  constructor() {
  }

  ngOnInit() {
  }

}

export interface MenuLinks {
  block: Link;
  links: Link[];
}

export interface Link {
  name: string,
  url: string,
  urlOptions: {
    exact: false | boolean,
  };
  icon: IconProp | null,
}
