import {Component, OnInit} from '@angular/core';
import {NgbModal} from '@ng-bootstrap/ng-bootstrap';
import {Apollo} from 'apollo-angular';
import * as moment from 'moment';
import {map} from 'rxjs/operators';
import {IMAGE_DELETE, IMAGES_QUERY, LINK_DELETE} from '../../_gql';
import {Image, Link, Query} from '../../_models';
import {AuthService, ConfigService, Helper, ToastService} from '../../_services';
import {ImageConfirmModalComponent, LinkConfirmModalComponent} from '../../components/confirm-modals';
import {ImageOpenModalComponent} from '../../components/confirm-modals/image-open-modal.component';

@Component({
  selector: 'app-dashboard-images',
  templateUrl: './dashboard-images.component.html',
  styleUrls: ['./dashboard-images.component.css']
})
export class DashboardImagesComponent implements OnInit {
  images: any;

  constructor(private apollo: Apollo, private toastService: ToastService, private _modalService: NgbModal, private auth: AuthService, private config: ConfigService) {
  }

  ngOnInit() {
    this.LoadData();
  }

  unixToString(unix: number): string {
    if (unix === 0) {
      return 'NONE';
    }
    return moment(0).set('second', unix).fromNow();
  }

  getSizePrefix(step: number): string {
    let type: string = 'B';
    switch (step) {
      case 0:
        type = 'B';
        break;
      case 1:
        type = 'KB';
        break;
      case 2:
        type = 'MB';
        break;
      case 3:
        type = 'GB';
        break;
      case 4:
        type = 'TB';
        break;
    }
    return type;
  }

  getSize(size: number): string {
    let step: number = 0;
    while (size >= 1024) {
      size /=1024
      step++
    }
    return size.toFixed(2).toString() +" "+ this.getSizePrefix(step)
  }

  LoadData() {
    this.images = this.apollo.watchQuery<Query>({
      query: IMAGES_QUERY,
      fetchPolicy: 'network-only',
      variables: {
        'page': 1
      }
    })
      .valueChanges
      .pipe(
        map(result => result.data.images)
      );
  }

  copy(row: Image) {
    Helper.copy(row.URI)
  }



  deleteImage(row: Image) {

    let r = this._modalService.open(ImageConfirmModalComponent);
    r.componentInstance.data = row;
    r.result.then(t => {
      this.apollo.mutate({
        mutation: IMAGE_DELETE,
        fetchPolicy: 'no-cache',
        variables: {
          'id': row.ID
        }
      }).pipe(
        map(result => result.data.deleteImage)
      ).subscribe((r: Image) => {
        this.LoadData();
        this.toastService.show('Image ' + r.Name + ' (' + r.FileName + ') is deleted', {classname: 'bg-primary text-light', delay: 5000});
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

  openImage(row: Image) {
    let r = this._modalService.open(ImageOpenModalComponent, {size: 'lg', centered: true});
    r.componentInstance.data = row;
    r.result.then(t => {

    }).catch(e => {
    });
  }
}
