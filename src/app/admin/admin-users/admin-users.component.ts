import {Component, OnInit} from '@angular/core';
import {Router} from '@angular/router';
import {Apollo} from 'apollo-angular';
import {curveMonotoneX} from 'd3-shape/src/index';
import {map} from 'rxjs/operators';
import {USERS_QUERY} from '../../_gql';
import {Query} from '../../_models';


@Component({
  selector: 'app-admin-users',
  templateUrl: './admin-users.component.html',
  styleUrls: ['./admin-users.component.css']
})
export class AdminUsersComponent implements OnInit {

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

  users: any;


  constructor(private route: Router, private apollo: Apollo) {
  }

  ngOnInit() {
    // console.log(this.apollo);

    this.users = this.apollo.watchQuery<Query>({
      query: USERS_QUERY(),
      fetchPolicy: 'network-only',
      variables: {
        'page': 1
      }
    })
      .valueChanges
      .pipe(
        map(result => result.data.users)
      );

  }
}


