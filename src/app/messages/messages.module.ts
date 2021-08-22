import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { MessagesComponent } from './messages.component';
import { MomentModule } from 'ngx-moment';
import { MomentTimezoneModule } from '../shared/moment-timezone/moment-timezone.module';

const routes: Routes = [
  { path: '', component: MessagesComponent, pathMatch: 'full' }
];

@NgModule({
  declarations: [
    MessagesComponent
  ],
  imports: [
    CommonModule,
    MomentModule,
    MomentTimezoneModule,
    RouterModule.forChild(routes)
  ]
})
export class MessagesModule { }
