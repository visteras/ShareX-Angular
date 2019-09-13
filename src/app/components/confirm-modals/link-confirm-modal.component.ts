import {Component, Input} from '@angular/core';
import {NgbActiveModal} from '@ng-bootstrap/ng-bootstrap';
import {Link} from '../../_models';

@Component({
  selector: 'link-confirm-modal',
  templateUrl: './link-confirm-modal.component.html'
})
export class LinkConfirmModalComponent {
  @Input() data: Link;

  constructor(public modal: NgbActiveModal) {
  }
}
