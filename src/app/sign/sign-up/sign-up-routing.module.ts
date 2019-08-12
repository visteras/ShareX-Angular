import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { SignInOutLayoutComponent } from '../../layout/sign-in-out-layout/sign-in-out-layout.component';
import { SignUpComponent } from './sign-up.component';

const routes: Routes = [
  {
    path: 'signup',
    component: SignInOutLayoutComponent,
    children: [
      { path: '', component: SignUpComponent },
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class SignUpRoutingModule { }
