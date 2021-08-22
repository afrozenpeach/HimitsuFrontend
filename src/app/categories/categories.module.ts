import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CategoriesComponent } from './categories.component';
import { RouterModule, Routes } from '@angular/router';
import { MomentModule } from 'ngx-moment';

const routes: Routes = [
  { path: '', component: CategoriesComponent, pathMatch: 'full' }
];

@NgModule({
  declarations: [
    CategoriesComponent
  ],
  imports: [
    CommonModule,
    MomentModule,
    RouterModule.forChild(routes)
  ]
})
export class CategoriesModule { }
