import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DetailListComponent } from './views/detail-list/detail-list.component';
import { HomeComponent } from './views/home/home.component';
import { Routes, RouterModule } from '@angular/router';

const routes: Routes = [
  {
    path: '', component: HomeComponent
  },
  {
    path:'detail', component: DetailListComponent
  }
  
]

@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    RouterModule.forRoot(routes)
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
