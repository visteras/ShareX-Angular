import {Component, Input} from '@angular/core';
import {NgbActiveModal} from '@ng-bootstrap/ng-bootstrap';
import {Image} from '../../_models';

@Component({
  selector: 'image-confirm-modal',
  templateUrl: './image-confirm-modal.component.html'
})
export class ImageConfirmModalComponent {
  @Input() data: Image;

  constructor(public modal: NgbActiveModal) {
  }
}
