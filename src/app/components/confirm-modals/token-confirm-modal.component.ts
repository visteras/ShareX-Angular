import {Component, Input, TemplateRef} from '@angular/core';
import {NgbActiveModal} from '@ng-bootstrap/ng-bootstrap';
import {Token} from '../../_models';

@Component({
  selector: 'token-confirm-modal',
  templateUrl: './token-confirm-modal.component.html'
})
export class TokenConfirmModalComponent {
  @Input() token: Token
  constructor(public modal: NgbActiveModal) { }
}
