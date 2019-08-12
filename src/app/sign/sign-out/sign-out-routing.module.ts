import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { SignInOutLayoutComponent } from '../../layout/sign-in-out-layout/sign-in-out-layout.component';
import { SignOutComponent } from './sign-out.component';

const routes: Routes = [
  {
    path: 'signout',
    component: SignInOutLayoutComponent,
    children: [
      { path: '', component: SignOutComponent },
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class SignOutRoutingModule { }
