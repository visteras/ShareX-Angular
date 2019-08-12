import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {LayoutModule} from '../../layout/layout.module';

import { SignInRoutingModule } from './sign-in-routing.module';
import { SignInComponent } from './sign-in.component';
import { AppComponent } from '../../app.component';

@NgModule({
  imports: [
    CommonModule,
    SignInRoutingModule,
    LayoutModule,
  ],
  declarations: [SignInComponent]
})

export class SignInModule {
  // title = AppComponent.title;
}
