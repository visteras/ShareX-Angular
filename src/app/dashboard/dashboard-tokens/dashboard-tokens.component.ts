import {Component, OnDestroy, OnInit} from '@angular/core';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {NgbModal} from '@ng-bootstrap/ng-bootstrap';
import {Apollo} from 'apollo-angular';
import * as moment from 'moment';
import {map} from 'rxjs/operators';
import {TOKEN_CREATE, TOKEN_DELETE, TOKEN_QUERY, TOKEN_SET_ACTIVE} from '../../_gql';
import {Query, Token} from '../../_models';
import {ConfigService, ToastService} from '../../_services';
import {TokenConfirmModalComponent} from '../../components/confirm-modals/token-confirm-modal.component';
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

  constructor(private apollo: Apollo, private toastService: ToastService, private _modalService: NgbModal) {
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

  deleteToken(token: Token) {
    let r = this._modalService.open(TokenConfirmModalComponent);
    r.componentInstance.token = token;
    r.result.then(t => {
      this.apollo.mutate({
        mutation: TOKEN_DELETE,
        fetchPolicy: 'no-cache',
        variables: {
          'token': token.Token
        }
      }).pipe(
        map(result => result.data.deleteToken)
      ).subscribe((r: Token) => {
        this.LoadData();
        this.toastService.show(r.Name + ' (' + r.Token + ') is deleted', {classname: 'bg-primary text-light', delay: 5000});
      }, error => {
        if (error.error instanceof ErrorEvent) {
          this.toastService.show(error.error.message, {classname: 'bg-danger text-light', delay: 5000});
        } else {
          this.toastService.show(error.message, {classname: 'bg-danger text-light', delay: 5000});
        }
      });
    }).catch(e => {
    });

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
      }
    }).pipe(
      map(result => result.data.createToken)
    ).subscribe((r: Token) => {
      this.LoadData();
      this.toastService.show(r.Name + ' (' + r.Token + ') is created', {classname: 'bg-primary text-light', delay: 5000});
    }, error => {
      if (error.error instanceof ErrorEvent) {
        this.toastService.show(error.error.message, {classname: 'bg-success text-light', delay: 5000});
      } else {
        this.toastService.show(error.message, {classname: 'bg-danger text-light', delay: 5000});
      }
    });
  }

  ngOnDestroy(): void {
  }

  setActive(token: Token) {
    this.apollo.mutate({
      mutation: TOKEN_SET_ACTIVE,
      fetchPolicy: 'no-cache',
      variables: {
        'token': token.Token,
        'state': !token.IsActive
      }
    }).pipe(
      map(result => result.data.setActiveToken)
    ).subscribe((r: Token) => {
      this.LoadData();
      this.toastService.show(r.Name + ' is ' + (r.IsActive ? 'active' : 'not active'), {classname: 'bg-primary text-light', delay: 5000});
    }, error => {
      if (error.error instanceof ErrorEvent) {
        this.toastService.show(error.error.message, {classname: 'bg-danger text-light', delay: 5000});
      } else {
        this.toastService.show(error.message, {classname: 'bg-danger text-light', delay: 5000});
      }
    });
  }

  copy(token: Token) {
    let selBox = document.createElement('textarea');
    selBox.style.position = 'fixed';
    selBox.style.left = '0';
    selBox.style.top = '0';
    selBox.style.opacity = '0';
    selBox.value = token.Token;
    document.body.appendChild(selBox);
    selBox.focus();
    selBox.select();
    document.execCommand('copy');
    document.body.removeChild(selBox);
  }

  unixToString(unix: number): string {
    if (unix === 0) {
      return 'NONE';
    }
    return moment(0).set('second', unix).fromNow();
  }
}
