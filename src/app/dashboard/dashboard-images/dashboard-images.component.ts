import {Component, OnInit} from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {NgbModal} from '@ng-bootstrap/ng-bootstrap';
import {Apollo} from 'apollo-angular';
import * as moment from 'moment';
import {map} from 'rxjs/operators';
import {COUNT_QUERY, IMAGE_DELETE, IMAGES_QUERY} from '../../_gql';
import {Image, Pagination, Query} from '../../_models';
import {Helper, ToastService} from '../../_services';
import {ImageConfirmModalComponent} from '../../components/confirm-modals';
import {ImageOpenModalComponent} from '../../components/confirm-modals/image-open-modal.component';

@Component({
  selector: 'app-dashboard-images',
  templateUrl: './dashboard-images.component.html',
  styleUrls: ['./dashboard-images.component.css']
})
export class DashboardImagesComponent implements OnInit {
  images: any;
  pagination: Pagination = new Pagination();

  pageChange(page: number) {
    this.LoadData(page);

    this.router.navigate([], {queryParams: {page: page}});
  }

  constructor(
    private apollo: Apollo,
    private toastService: ToastService,
    private _modalService: NgbModal,
    private route: ActivatedRoute,
    private router: Router,
  ) {
    // this.pagination = {
    //   page: 1,
    //   loading: false,
    //   elems: {
    //     ItemPerPage: 10,
    //     CountElement: 1,
    //     TypeElement:'image'
    //   },
    // }
  }

  ngOnInit() {
    let page = Number(this.route.snapshot.queryParamMap.get('page')) || 1;
    this.pagination.page = page;
    this.LoadData(this.pagination.page)
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
      size /= 1024;
      step++;
    }
    return size.toFixed(2).toString() + ' ' + this.getSizePrefix(step);
  }

  LoadData(page: number) {

    this.apollo.watchQuery<Query>({
      query: COUNT_QUERY,
      fetchPolicy: 'network-only',
      variables: {
        'typeElement': 'image'
      }
    })
      .valueChanges.subscribe(({data, loading}) => {
      this.pagination.loading = loading;
      this.pagination.elems = data.getCountElements;
    });


    this.images = this.apollo.watchQuery<Query>({
      query: IMAGES_QUERY,
      fetchPolicy: 'network-only',
      variables: {
        'page': page
      }
    })
      .valueChanges
      .pipe(
        map(result => {

          return result.data.images;
        })
      );


  }

  copy(row: Image) {
    Helper.copy(row.URI);
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
        let id = Number(this.route.snapshot.queryParamMap.get('page')) || 1;
        this.LoadData(id);
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
