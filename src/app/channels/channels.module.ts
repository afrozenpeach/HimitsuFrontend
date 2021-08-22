import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { ChannelsComponent } from './channels.component';
import { MomentModule } from 'ngx-moment';

const routes: Routes = [
  { path: '', component: ChannelsComponent, pathMatch: 'full' }
];

@NgModule({
  declarations: [
    ChannelsComponent
  ],
  imports: [
    CommonModule,
    MomentModule,
    RouterModule.forChild(routes)
  ]
})
export class ChannelsModule { }
