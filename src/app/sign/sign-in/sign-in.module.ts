import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {ReactiveFormsModule} from '@angular/forms';
import {LayoutModule} from '../../layout/layout.module';

import { SignInRoutingModule } from './sign-in-routing.module';
import { SignInComponent } from './sign-in.component';
import { AppComponent } from '../../app.component';

@NgModule({
  imports: [
    CommonModule,
    SignInRoutingModule,
    LayoutModule,
    ReactiveFormsModule,
  ],
  declarations: [SignInComponent]
})

export class SignInModule {
  // title = AppComponent.title;
}
