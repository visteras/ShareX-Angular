import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { SignInOutLayoutComponent } from '../../layout/sign-in-out-layout/sign-in-out-layout.component';
import { SignInComponent } from './sign-in.component';

const routes: Routes = [
  {
    path: 'signin',
    component: SignInOutLayoutComponent,
    children: [
      { path: '', component: SignInComponent },
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class SignInRoutingModule { }
