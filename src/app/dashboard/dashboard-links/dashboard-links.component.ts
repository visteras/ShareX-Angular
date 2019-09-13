import {Component, OnInit} from '@angular/core';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {NgbModal} from '@ng-bootstrap/ng-bootstrap';
import {Apollo} from 'apollo-angular';
import * as moment from 'moment';
import {map} from 'rxjs/operators';
import {LINK_CREATE, LINK_DELETE, LINK_QUERY} from '../../_gql/link';
import {Query} from '../../_models';
import {Link} from '../../_models/link';
import {AuthService, ConfigService, Helper, ToastService} from '../../_services';
import {LinkConfirmModalComponent} from '../../components/confirm-modals/link-confirm-modal.component';

@Component({
  selector: 'app-dashboard-links',
  templateUrl: './dashboard-links.component.html',
  styleUrls: ['./dashboard-links.component.css']
})
export class DashboardLinksComponent implements OnInit {
  formNewLink: FormGroup;
  links: any;

  constructor(private apollo: Apollo, private toastService: ToastService, private _modalService: NgbModal, private auth: AuthService, private config: ConfigService) {
    this.formNewLink = new FormGroup({
      CustomName: new FormControl('', []),
      ToSite: new FormControl('', [
        Validators.required,
        //Validators.pattern('')
      ]),
    });
  }

  ngOnInit() {
    this.LoadData();
  }


  LoadData() {
    this.links = this.apollo.watchQuery<Query>({
      query: LINK_QUERY,
      fetchPolicy: 'network-only',
      variables: {
        'page': 1
      }
    })
      .valueChanges
      .pipe(
        map(result => result.data.links)
      );
  }

  createLink() {
    if (this.formNewLink.controls['ToSite'].hasError('ToSite')) {
      return;
    }
    this.apollo.mutate({
      mutation: LINK_CREATE,
      fetchPolicy: 'no-cache',
      variables: {
        'link': {
          ToSite: this.formNewLink.controls['ToSite'].value,
          CustomName: this.formNewLink.controls['CustomName'].value,
        }
      }
    }).pipe(
      map(result => result.data.createLink)
    ).subscribe((r: Link) => {
      this.LoadData();
      this.toastService.show('Link ' + r.Name + ' (' + r.ToSite + ') is created', {classname: 'bg-primary text-light', delay: 5000});
    }, error => {
      if (error.error instanceof ErrorEvent) {
        this.toastService.show(error.error.message, {classname: 'bg-success text-light', delay: 5000});
      } else {
        this.toastService.show(error.message, {classname: 'bg-danger text-light', delay: 5000});
      }
    });
  }

  unixToString(unix: number): string {
    if (unix === 0) {
      return 'NONE';
    }
    return moment(0).set('second', unix).fromNow();
  }

  copy(row: Link) {
    let lnk = 'l/' + row.Name;
    if (row.CustomName) {
      lnk = row.CustomName;
    }
    Helper.copy(this.config.config.domain + 'l/' + lnk);
  }

  deleteLink(link: Link) {
    let r = this._modalService.open(LinkConfirmModalComponent);
    r.componentInstance.data = link;
    r.result.then(t => {
      this.apollo.mutate({
        mutation: LINK_DELETE,
        fetchPolicy: 'no-cache',
        variables: {
          'id': link.ID
        }
      }).pipe(
        map(result => result.data.deleteLink)
      ).subscribe((r: Link) => {
        this.LoadData();
        this.toastService.show('Link ' + r.Name + ' (' + r.ToSite + ') is deleted', {classname: 'bg-primary text-light', delay: 5000});
      }, error => {
        if (error.error instanceof ErrorEvent) {
          this.toastService.show(error.error.message, {classname: 'bg-success text-light', delay: 5000});
        } else {
          this.toastService.show(error.message, {classname: 'bg-danger text-light', delay: 5000});
        }
      });
    }).catch(e => {
    });
  }
}
