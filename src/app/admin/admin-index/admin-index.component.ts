import {Component, OnInit} from '@angular/core';
import {Router} from '@angular/router';
import {curveMonotoneX} from 'd3-shape/src/index';

@Component({
  selector: 'app-admin-index',
  templateUrl: './admin-index.component.html',
  styleUrls: ['./admin-index.component.css']
})
export class AdminIndexComponent implements OnInit {

  // myData = [
  //   ['05.08.19', 117, 123],
  //   ['06.08.19', 137, 234],
  //   ['07.08.19', 142, 543],
  //   ['08.08.19', 198, 234],
  //   ['09.08.19', 336, 324],
  //   ['10.08.19', 339, 345],
  //   ['11.08.19', 123, 534]
  // ];

  view: any[] = undefined;
  colorScheme: {
    name: 'cool',
    selectable: true,
    group: 'Ordinal',
    domain: [
      '#a8385d', '#7aa3e5', '#a27ea8', '#aae3f5', '#adcded', '#a95963', '#8796c0', '#7ed3ed', '#50abcc', '#ad6886'
    ]
  };
  animations: boolean = true;

  data = [
    {
      'name': 'Cameroon',
      'series': [
        {
          'value': 2981,
          'name': new Date('2016-09-10T17:05:48.150Z')
        },
        {
          'value': 5393,
          'name': new Date('2016-09-11T20:31:31.553Z')
        },
        {
          'value': 3180,
          'name': new Date('2016-09-12T09:39:14.891Z')
        },
        {
          'value': 2124,
          'name': new Date('2016-09-13T08:35:48.112Z')
        },
        {
          'value': 5069,
          'name': new Date('2016-09-14T17:49:45.367Z')
        },
        {
          'name': new Date('2016-09-15T18:43:17.042Z'),
          'value': 2839
        },
        {
          'name': new Date('2016-09-16T16:27:30.749Z'),
          'value': 5360
        },
      ]
    }
  ];
  legend: boolean = true;
  curve = curveMonotoneX;

  select(data) {
    console.log('Item clicked', JSON.parse(JSON.stringify(data)));
  }


  constructor( private route: Router) {
  }

  ngOnInit() {
console.log(this.route);
  }
}
