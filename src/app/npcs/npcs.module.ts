import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { ListComponent } from './list/list.component';
import { NpcComponent } from './npc/npc.component';

const routes: Routes = [
  { path: '', component: ListComponent, pathMatch: 'full' },
  { path: ':npc', component: NpcComponent}
];

@NgModule({
  declarations: [
    ListComponent,
    NpcComponent
  ],
  imports: [
    CommonModule,
    RouterModule.forChild(routes)
  ]
})
export class NPCsModule { }
