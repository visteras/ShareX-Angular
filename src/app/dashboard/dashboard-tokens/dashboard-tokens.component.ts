import {Component, OnDestroy, OnInit} from '@angular/core';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {Apollo} from 'apollo-angular';
import {map} from 'rxjs/operators';
import {TOKEN_CREATE, TOKEN_QUERY} from '../../_gql';
import {Query} from '../../_models';
import {SelectOption} from '../../components/select-placeholder/select-placeholder.component';


@Component({
  selector: 'app-dashboard-tokens',
  templateUrl: './dashboard-tokens.component.html',
  styleUrls: ['./dashboard-tokens.component.css']
})
export class DashboardTokensComponent implements OnInit, OnDestroy {

  selectOptions: SelectOption[] = [
    // {value: '-', viewValue: 'Select Type', selected: true},
    {value: 'image', viewValue: 'Image Token', selected: false},
    {value: 'link', viewValue: 'Link Token', selected: false},
    {value: 'file', viewValue: 'File Token', selected: false},
    {value: 'text', viewValue: 'Text Token', selected: false},
  ];

  myForm: FormGroup;
  tokens: any;

  typeValidator(group: FormGroup): { [s: string]: boolean } {
    if (group.value.type == '') {
      return {'custom-error': true};
    }
    return null;
  }

  constructor(private apollo: Apollo) {
    this.myForm = new FormGroup({
      name: new FormControl('', [
        Validators.required,
      ]),
      type: new FormControl('', [
        Validators.required,
        this.typeValidator,
      ]),
    });

  }

  ngOnInit() {
    this.LoadData();
  }


  LoadData() {
    this.tokens = this.apollo.watchQuery<Query>({
      query: TOKEN_QUERY,
      fetchPolicy: 'network-only',
      variables: {
        'page': 1
      }

    })
      .valueChanges
      .pipe(
        map(result => result.data.tokens)
      );
  }

  createToken() {
    if (this.myForm.controls['type'].hasError('type') || this.myForm.controls['name'].hasError('name')) {
      return;
    }

    console.log(this.myForm);
    this.apollo.mutate({
      mutation: TOKEN_CREATE,
      fetchPolicy: 'no-cache',
      variables: {
        'token': {
          token_name: this.myForm.controls['name'].value,
          token_type: this.myForm.controls['type'].value,
        }
      }}).pipe(
      map(result => result.data.createToken)
    ).subscribe(() => this.LoadData())


  }

  ngOnDestroy(): void {
    // this.tokens.uns;
  }

}
