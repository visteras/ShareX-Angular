import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SignOutRoutingModule } from './sign-out-routing.module';
import { SignOutComponent } from './sign-out.component';

@NgModule({
  imports: [
    CommonModule,
    SignOutRoutingModule
  ],
  declarations: [SignOutComponent]
})
export class SignOutModule { }
