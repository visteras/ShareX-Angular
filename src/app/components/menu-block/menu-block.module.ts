import {CommonModule} from '@angular/common';
import {NgModule} from '@angular/core';
import {RouterModule} from '@angular/router';
import {FontAwesomeModule} from '@fortawesome/angular-fontawesome';
import {NgbModule} from '@ng-bootstrap/ng-bootstrap';
import {MenuBlockComponent} from './menu-block.component';

@NgModule({
  declarations: [MenuBlockComponent],
  imports: [
    CommonModule,
    FontAwesomeModule,
    RouterModule,
    NgbModule,
  ],
  exports: [
    MenuBlockComponent,
    NgbModule,
  ],
})
export class MenuBlockModule {
}
