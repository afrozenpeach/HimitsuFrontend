import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { CategoriesComponent } from './categories/categories.component';
import { ChannelsComponent } from './channels/channels.component';
import { MessagesComponent } from './messages/messages.component';
import { MomentModule } from 'ngx-moment';
import { MomentTimezoneModule } from '../shared/moment-timezone/moment-timezone.module';

const routes: Routes = [
  { path: '', component: CategoriesComponent, pathMatch: 'full' },
  { path: 'channels/:category', component: ChannelsComponent },
  { path: 'messages/:channel', component: MessagesComponent }
];

@NgModule({
  declarations: [
    MessagesComponent,
    ChannelsComponent,
    CategoriesComponent
  ],
  imports: [
    CommonModule,
    MomentModule,
    MomentTimezoneModule,
    RouterModule.forChild(routes)
  ]
})
export class ArchivesModule { }
