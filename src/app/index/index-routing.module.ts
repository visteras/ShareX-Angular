import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {MainLayoutComponent} from '../layout/main-layout/main-layout.component';
import {IndexComponent} from './index.component';
const routes: Routes = [
  {
    path: 'index',
    component: MainLayoutComponent,
    children: [
      {path: '', component: IndexComponent}
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class IndexRoutingModule {
}
