import {Component, TemplateRef} from '@angular/core';
import {ToastService} from '../../_services';


@Component({
  selector: 'app-toasts',
  template: `
      <ngb-toast
              *ngFor="let toast of toastService.toasts"
              [class]="toast.classname"
              [autohide]="true"
              [delay]="toast.delay || 5000"
              (hide)="toastService.remove(toast)"
      >
          <ng-template [ngIf]="isTemplate(toast)" [ngIfElse]="text">
              <ng-template [ngTemplateOutlet]="toast.textOrTpl"></ng-template>
          </ng-template>

          <ng-template #text>{{ toast.textOrTpl }}</ng-template>
      </ngb-toast>
  `,
  styles: [`:host {
      position: fixed;
      bottom: 0;
      left: 0;
      margin: .5em;
      z-index: 1200;
  }`]
})
export class ToastsContainer {
  constructor(public toastService: ToastService) {
  }

  isTemplate(toast) {
    return toast.textOrTpl instanceof TemplateRef;
  }
}
