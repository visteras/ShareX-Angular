import {Component, Input} from '@angular/core';
import {NgbActiveModal} from '@ng-bootstrap/ng-bootstrap';
import {Image} from '../../_models';

@Component({
  selector: 'image-open-modal',
  styleUrls: ['./image-open-modal.component.css'],
  templateUrl: './image-open-modal.component.html'
})
export class ImageOpenModalComponent {
  @Input() data: Image;

  constructor(public modal: NgbActiveModal) {
  }
}
